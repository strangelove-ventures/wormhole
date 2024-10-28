use crate::{
    contract::{execute, instantiate, query},
    ibc::{
        ibc_channel_close, ibc_channel_connect, ibc_channel_open, ibc_packet_ack,
        ibc_packet_receive, ibc_packet_timeout,
    },
};
use abstract_cw_multi_test::{
    ibc::{
        relayer::{create_channel, create_connection},
        types::{Connection, MockIbcQuery},
        IbcPacketRelayingMsg, IbcSimpleModule,
    },
    no_init, AcceptingModule, App, AppBuilder, BankKeeper, ContractWrapper, DistributionKeeper,
    Executor, IbcAcceptingModule, MockAddressGenerator, MockApiBech32, StakeKeeper, WasmKeeper,
};
use cosmwasm_std::{Addr, StdError};
use cw_wormhole::state::{GuardianAddress, GuardianSetInfo};
use hex::decode;
use wormhole_bindings::{fake::WormholeKeeper, WormholeQuery};

static GOV_ADDR: &[u8] = b"GOVERNANCE_ADDRESS";

pub fn create_sender_app(
    hrp: &'static str,
) -> (
    App<
        BankKeeper,
        MockApiBech32,
        MemoryStorage,
        WormholeKeeper,
        WasmKeeper<Empty, WormholeQuery>,
        StakeKeeper,
        DistributionKeeper,
        IbcSimpleModule,
    >,
    Addr,
    Addr,
) {
    let mut app = AppBuilder::new_custom()
        .with_ibc(IbcSimpleModule::default())
        .with_wasm(WasmKeeper::new().with_address_generator(MockAddressGenerator))
        .with_api(MockApiBech32::new(hrp))
        .with_custom(wormhole_bindings::fake::WormholeKeeper::default())
        .build(no_init);

    let user = app.api().addr_make("user");

    let contract_code_id = app.store_code(Box::new(
        ContractWrapper::new(
            |deps, env, info, msg| {
                execute(deps.into_empty(), env, info, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, info, msg| {
                instantiate(deps.into_empty(), env, info, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                query(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
        )
        .with_ibc(
            |deps, env, msg| {
                ibc_channel_open(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                ibc_channel_connect(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                ibc_channel_close(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                ibc_packet_receive(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                ibc_packet_ack(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
            |deps, env, msg| {
                ibc_packet_timeout(deps.into_empty(), env, msg)
                    .map_err(|anyhow_err| StdError::generic_err(anyhow_err.to_string()))
            },
        ),
    ));

    let contract_addr = app
        .instantiate_contract(
            contract_code_id,
            user.clone(),
            &cw_wormhole::msg::InstantiateMsg {
                gov_chain: 0,
                gov_address: GOV_ADDR.into(),
                initial_guardian_set: GuardianSetInfo {
                    addresses: vec![GuardianAddress {
                        bytes: decode("beFA429d57cD18b7F8A4d91A2da9AB4AF05d0FBe")
                            .expect("Decoding failed")
                            .into(),
                    }],
                    expiration_time: 100,
                },
                guardian_set_expirity: 50,
                chain_id: 18,
                fee_denom: "uluna".to_string(),
            },
            &[],
            "wormhole_ibc",
            None,
        )
        .expect("contract should instantiate correctly");

    (app, user, contract_addr)
}
