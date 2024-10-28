use crate::{ibc as receiver_contract_ibc, interface::create_receiver_app};
use abstract_cw_multi_test::ibc::relayer::{create_channel, create_connection};
use anyhow::Error;
use cosmwasm_std::IbcOrder;
use wormhole_ibc::interface::create_sender_app;

#[test]
pub fn ibc_channel_happy_path() -> anyhow::Result<(), Error> {
    let (mut wormchain, wormchain_user, receiver_contract) = create_receiver_app("worm");
    let (mut sei, sei_user, sender_contract) = create_sender_app("sei");

    let receiver_port = wormchain
        .wrap()
        .query_wasm_contract_info(receiver_contract.clone())?
        .ibc_port
        .unwrap_or(format!("wasm.{}", receiver_contract.clone()));

    let sender_port = sei
        .wrap()
        .query_wasm_contract_info(sender_contract.clone())?
        .ibc_port
        .unwrap_or(format!("wasm.{}", sender_contract.clone()));

    println!(
        "receiver_ibc_port: {:?}, sender_port: {}",
        receiver_port, sender_port
    );

    let (sei_connection_id, _) = create_connection(&mut sei, &mut wormchain)?;

    println!("sei_connection: {:?}", sei_connection_id);

    let new_channel = create_channel(
        &mut sei,
        &mut wormchain,
        sei_connection_id,
        sender_port,
        receiver_port,
        receiver_contract_ibc::IBC_APP_VERSION.to_string(),
        IbcOrder::Unordered,
    )?;

    println!("channel_creation: {:?}", new_channel);

    Ok(())
}
