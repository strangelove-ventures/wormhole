use crate::{
    contract::{execute, instantiate, query},
    msg::{AllChannelChainsResponse, ExecuteMsg, QueryMsg},
    tests::test_utils::{create_gov_vaa_body, create_transfer_vaa_body, sign_vaa_body},
};
use anyhow::Error;
use cosmwasm_std::{testing::MockApi, Addr, Binary, Empty, StdError};
use cw_multi_test::{no_init, AppBuilder, ContractWrapper, Executor, WasmKeeper};
use wormhole_bindings::{fake::WormholeKeeper, WormholeQuery};
use wormhole_sdk::{
    ibc_receiver::{Action, GovernancePacket},
    vaa::Body,
    Chain, GOVERNANCE_EMITTER,
};

type WormholeApp = cw_multi_test::App<
    cw_multi_test::BankKeeper,
    MockApi,
    cosmwasm_std::MemoryStorage,
    WormholeKeeper,
    WasmKeeper<Empty, WormholeQuery>,
>;

pub struct MockApp {
    app: WormholeApp,
    user: Addr,
    receiver_addr: Addr,
}

pub fn create_app() -> MockApp {
    let mut app = AppBuilder::new_custom()
        .with_custom(wormhole_bindings::fake::WormholeKeeper::default())
        .build(no_init);

    let user = app.api().addr_make("user");

    let receiver_code_id = app.store_code(Box::new(ContractWrapper::new(
        |deps, env, info, msg| {
            execute(deps, env, info, msg)
                .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
        },
        |deps, env, info, msg| {
            instantiate(deps.into_empty(), env, info, msg)
                .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
        },
        |deps, env, msg| {
            query(deps.into_empty(), env, msg)
                // .map(|res| Binary::from(res.0))
                .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
        },
    )));

    let receiver_addr = app
        .instantiate_contract(
            receiver_code_id,
            user.clone(),
            &Empty {},
            &[],
            "receiver_contract",
            None,
        )
        .unwrap();

    MockApp {
        app,
        user,
        receiver_addr,
    }
}

#[test]
pub fn add_channel_chain_happy_path() -> anyhow::Result<(), Error> {
    let MockApp {
        mut app,
        user,
        receiver_addr,
    } = create_app();

    let add_sei_channel_body = create_gov_vaa_body(1, Chain::Sei, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-0");
    let (_, add_sei_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_sei_channel_body);

    let submissions = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_sei_vaa_binary],
        },
        &[],
    );

    assert!(
        submissions.is_ok(),
        "A proper UpdateChannelChain gov vaa should be accepted"
    );

    let channel: AllChannelChainsResponse = app
        .wrap()
        .query_wasm_smart(receiver_addr.clone(), &QueryMsg::AllChannelChains {})?;

    assert_eq!(channel.channels_chains.len(), 1);
    let channel_entry = channel.channels_chains.first().unwrap();
    assert_eq!(
        channel_entry.0,
        Binary::from(*b"channel-0"),
        "the stored channel for sei should initially be channel-0"
    );
    assert_eq!(
        channel_entry.1,
        Into::<u16>::into(Chain::Sei),
        "the stored channel should be for sei's chain id"
    );

    Ok(())
}

#[test]
pub fn add_channel_chain_happy_path_multiple() -> anyhow::Result<(), Error> {
    let MockApp {
        mut app,
        user,
        receiver_addr,
    } = create_app();

    let add_inj_channel_body = create_gov_vaa_body(2, Chain::Injective, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-1");
    let (_, add_inj_vaa_bin) = sign_vaa_body(WormholeKeeper::default(), add_inj_channel_body);
    let add_sei_channel_body = create_gov_vaa_body(3, Chain::Sei, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-2");
    let (_, add_sei_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_sei_channel_body);

    // add a channel for injective and update the channel set for sei
    app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_sei_vaa_binary, add_inj_vaa_bin],
        },
        &[],
    )?;

    // refetch all the channels that are in state
    let AllChannelChainsResponse {
        channels_chains: mut channels,
    }: AllChannelChainsResponse = app
        .wrap()
        .query_wasm_smart(receiver_addr.clone(), &QueryMsg::AllChannelChains {})?;

    channels.sort_by(|(_, a_chain_id), (_, b_chain_id)| a_chain_id.cmp(b_chain_id));

    assert_eq!(channels.len(), 2);

    let channel_entry = channels.first().unwrap();
    assert_eq!(
        channel_entry.0,
        Binary::from(*b"channel-1"),
        "the stored channel should be channel-1 "
    );
    assert_eq!(
        channel_entry.1,
        Into::<u16>::into(Chain::Injective),
        "the stored channel should be for injective's chain id"
    );

    let channel_entry = channels.last().unwrap();
    assert_eq!(
        channel_entry.0,
        Binary::from(*b"channel-2"),
        "the stored channel should be channel-2"
    );
    assert_eq!(
        channel_entry.1,
        Into::<u16>::into(Chain::Sei),
        "the stored channel should be for sei's chain id"
    );

    Ok(())
}

#[test]
pub fn reject_invalid_add_channel_chain_vaas() -> anyhow::Result<(), Error> {
    let MockApp {
        mut app,
        user,
        receiver_addr,
    } = create_app();

    let add_channel_body = create_gov_vaa_body(1, Chain::Wormchain, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-0");
    let (_, add_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_channel_body);

    let invalid_submission = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary],
        },
        &[],
    );

    assert!(
        invalid_submission.is_err(),
        "Cannot add a channel from Gateway to Gateway"
    );

    let invalid_submission = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![Binary::from(vec![0u8; 32])],
        },
        &[],
    );

    assert!(
        invalid_submission.is_err(),
        "VAA should be rejected if it cannot be parsed because it's too short"
    );

    let add_channel_body = create_transfer_vaa_body(1);
    let (_, add_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_channel_body);

    let invalid_submission = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary],
        },
        &[],
    );

    assert!(
        invalid_submission.is_err(),
        "Can only execute governance vaas"
    );

    let add_channel_body = create_gov_vaa_body(1, Chain::Osmosis, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-0");
    let (_, add_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_channel_body);

    // Valid submission
    app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary],
        },
        &[],
    )?;

    let add_channel_body: Body<GovernancePacket> = Body {
        timestamp: 1u32,
        nonce: 1u32,
        emitter_chain: Chain::Solana,
        emitter_address: GOVERNANCE_EMITTER,
        sequence: 1u64,
        consistency_level: 0,
        payload: GovernancePacket {
            chain: Chain::Osmosis,
            action: Action::UpdateChannelChain {
                channel_id: *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-0",
                chain_id: Chain::CosmosHub,
            },
        },
    };
    let (_, add_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_channel_body);

    let invalid_submission = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary],
        },
        &[],
    );

    assert!(
        invalid_submission.is_err(),
        "Cannot add a update a chain besides Gateway"
    );

    Ok(())
}

#[test]
pub fn reject_replayed_add_channel_chain_vaas() -> anyhow::Result<(), Error> {
    let MockApp {
        mut app,
        user,
        receiver_addr,
    } = create_app();

    let add_channel_body = create_gov_vaa_body(1, Chain::Osmosis, *b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00channel-0");
    let (_, add_vaa_binary) = sign_vaa_body(WormholeKeeper::default(), add_channel_body);

    // Valid submission from Osmosis to Gateway
    app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary.clone()],
        },
        &[],
    )?;

    let invalid_submission = app.execute_contract(
        user.clone(),
        receiver_addr.clone(),
        &ExecuteMsg::SubmitUpdateChannelChain {
            vaas: vec![add_vaa_binary],
        },
        &[],
    );

    assert!(invalid_submission.is_err(), "Cannot replay the same VAA");

    Ok(())
}
