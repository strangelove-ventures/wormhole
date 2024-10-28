use crate::{
    contract::{execute, instantiate, query},
    ibc::{
        ibc_channel_close, ibc_channel_connect, ibc_channel_open, ibc_packet_ack,
        ibc_packet_receive, ibc_packet_timeout,
    },
};
use abstract_cw_multi_test::{
    ibc::IbcSimpleModule, no_init, App, AppBuilder, BankKeeper, ContractWrapper,
    DistributionKeeper, Executor, MockAddressGenerator, MockApiBech32, StakeKeeper, WasmKeeper,
};
use cosmwasm_std::{Addr, Empty, MemoryStorage, StdError};
use wormhole_bindings::{fake::WormholeKeeper, WormholeQuery};

pub type MockIbcApp = (
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
);

pub fn create_receiver_app(hrp: &'static str) -> MockIbcApp {
    let mut app = AppBuilder::new_custom()
        .with_ibc(IbcSimpleModule::default())
        .with_wasm(WasmKeeper::new().with_address_generator(MockAddressGenerator))
        .with_api(MockApiBech32::new(hrp))
        .with_custom(wormhole_bindings::fake::WormholeKeeper::default())
        .build(no_init);

    let user = app.api().addr_make("user");

    let contract_wrap = ContractWrapper::new(
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
    );

    let receiver_code_id = app.store_code(Box::new(contract_wrap));

    let contract_addr = app
        .instantiate_contract(
            receiver_code_id,
            user.clone(),
            &Empty {},
            &[],
            "receiver_contract",
            None,
        )
        .unwrap();

    (app, user, contract_addr)
}
