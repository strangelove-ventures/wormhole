// SPDX-License-Identifier: Apache 2

/// This module implements the mechanism to publish the Wormhole contract and
/// initialize `State` as a shared object.
module wormhole::setup {
    use sui::object::{Self, UID};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};

    use wormhole::state::{Self};

    // NOTE: This exists to mock up sui::package for proposed upgrades.
    use wormhole::dummy_sui_package::{Self as package, UpgradeCap};

    /// Capability created at `init`, which will be destroyed once
    /// `init_and_share_state` is called. This ensures only the deployer can
    /// create the shared `State`.
    struct DeployerCap has key, store {
        id: UID
    }

    /// Called automatically when module is first published. Transfers
    /// `DeployerCap` to sender.
    ///
    /// Only `setup::init_and_share_state` requires `DeployerCap`.
    fun init(ctx: &mut TxContext) {
        let deployer = DeployerCap { id: object::new(ctx) };
        transfer::transfer(deployer, tx_context::sender(ctx));

        // TODO: remove this once we have a proper upgrade mechanism in Sui 
        // 0.28.0
        let upgrade_cap = package::mock_new_upgrade_cap(
            object::id_from_address(@wormhole), ctx
        );
        transfer::transfer(upgrade_cap, tx_context::sender(ctx));
    }

    #[test_only]
    public fun init_test_only(ctx: &mut TxContext) {
        init(ctx);
    }

    /// Only the owner of the `DeployerCap` can call this method. This
    /// method destroys the capability and shares the `State` object.
    public entry fun init_and_share_state(
        deployer: DeployerCap,
        upgrade_cap: UpgradeCap,
        governance_chain: u16,
        governance_contract: vector<u8>,
        initial_guardians: vector<vector<u8>>,
        guardian_set_epochs_to_live: u32,
        message_fee: u64,
        ctx: &mut TxContext
    ) {
        // Destroy deployer cap.
        let DeployerCap { id } = deployer;
        object::delete(id);

        // Share new state.
        transfer::share_object(
            state::new(
                upgrade_cap,
                governance_chain,
                governance_contract,
                initial_guardians,
                guardian_set_epochs_to_live,
                message_fee,
                ctx
            )
        );
    }
}

#[test_only]
module wormhole::setup_tests {
    use std::option::{Self};
    use std::vector::{Self};
    use sui::object::{Self};
    use sui::test_scenario::{Self};

    use wormhole::cursor::{Self};
    use wormhole::external_address::{Self};
    use wormhole::guardian::{Self};
    use wormhole::guardian_set::{Self};
    use wormhole::setup::{Self, DeployerCap};
    use wormhole::state::{Self, State};
    use wormhole::wormhole_scenario::{person};

    // NOTE: This exists to mock up sui::package for proposed upgrades.
    use wormhole::dummy_sui_package::{Self as package};

    #[test]
    public fun test_init() {
        let deployer = person();
        let my_scenario = test_scenario::begin(deployer);
        let scenario = &mut my_scenario;

        // Initialize Wormhole smart contract.
        setup::init_test_only(test_scenario::ctx(scenario));

        // Process effects of `init`.
        let effects = test_scenario::next_tx(scenario, deployer);

        // We expect two objects to be created: `DeployerCap` and `UpgradeCap`.
        assert!(vector::length(&test_scenario::created(&effects)) == 2, 0);

        // We should be able to take the `DeployerCap` from the sender
        // of the transaction.
        let cap =
            test_scenario::take_from_address<DeployerCap>(
                scenario,
                deployer
            );

        // The above should succeed, so we will return to `deployer`.
        test_scenario::return_to_address(deployer, cap);

        // Done.
        test_scenario::end(my_scenario);
    }

    #[test]
    public fun test_init_and_share_state() {
        let deployer = person();
        let my_scenario = test_scenario::begin(deployer);
        let scenario = &mut my_scenario;

        // Initialize Wormhole smart contract.
        setup::init_test_only(test_scenario::ctx(scenario));

        // Ignore effects.
        test_scenario::next_tx(scenario, deployer);

        let governance_chain = 1234;
        let governance_contract =
            x"deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";
        let initial_guardians =
            vector[
                x"1337133713371337133713371337133713371337",
                x"c0dec0dec0dec0dec0dec0dec0dec0dec0dec0de",
                x"ba5edba5edba5edba5edba5edba5edba5edba5ed"
            ];
        let guardian_set_epochs_to_live = 5678;
        let message_fee = 350;

        // Take the `DeployerCap` and move it to `init_and_share_state`.
        let deployer_cap =
            test_scenario::take_from_address<DeployerCap>(
                scenario,
                deployer
            );
        let deployer_cap_id = object::id(&deployer_cap);

        // This will be created and sent to the transaction sender automatically
        // when the contract is published. This exists in place of grabbing
        // it from the sender.
        let upgrade_cap =
            package::test_publish(
                object::id_from_address(@0x0),
                test_scenario::ctx(scenario)
            );

        setup::init_and_share_state(
            deployer_cap,
            upgrade_cap,
            governance_chain,
            governance_contract,
            initial_guardians,
            guardian_set_epochs_to_live,
            message_fee,
            test_scenario::ctx(scenario)
        );

        // Process effects.
        let effects = test_scenario::next_tx(scenario, deployer);

        // We expect one object to be created: `State`. And it is shared.
        let created = test_scenario::created(&effects);
        let shared = test_scenario::shared(&effects);
        assert!(vector::length(&created) == 1, 0);
        assert!(vector::length(&shared) == 1, 0);
        assert!(
            vector::borrow(&created, 0) == vector::borrow(&shared, 0),
            0
        );

        // Verify `State`. Ideally we compare structs, but we will check each
        // element.
        let worm_state = test_scenario::take_shared<State>(scenario);

        assert!(state::governance_chain(&worm_state) == governance_chain, 0);

        let expected_governance_contract =
            external_address::from_nonzero_bytes(governance_contract);
        assert!(
            state::governance_contract(&worm_state) == expected_governance_contract,
            0
        );

        assert!(state::guardian_set_index(&worm_state) == 0, 0);
        assert!(
            state::guardian_set_epochs_to_live(&worm_state) == guardian_set_epochs_to_live,
            0
        );

        let guardians =
            guardian_set::guardians(state::guardian_set_at(&worm_state, 0));
        let num_guardians = vector::length(guardians);
        assert!(num_guardians == vector::length(&initial_guardians), 0);

        let i = 0;
        while (i < num_guardians) {
            let left = guardian::as_bytes(vector::borrow(guardians, i));
            let right = *vector::borrow(&initial_guardians, i);
            assert!(left == right, 0);
            i = i + 1;
        };

        assert!(state::message_fee(&worm_state) == message_fee, 0);

        // Clean up.
        test_scenario::return_shared(worm_state);

        // We expect `DeployerCap` to be destroyed. There are other
        // objects deleted, but we only care about the deployer cap for this
        // test.
        let deleted = cursor::new(test_scenario::deleted(&effects));
        let found = option::none();
        while (!cursor::is_empty(&deleted)) {
            let id = cursor::poke(&mut deleted);
            if (id == deployer_cap_id) {
                found = option::some(id);
            }
        };
        cursor::destroy_empty(deleted);

        // If we found the deployer cap, `found` will have the ID.
        assert!(!option::is_none(&found), 0);

        // Done.
        test_scenario::end(my_scenario);
    }
}