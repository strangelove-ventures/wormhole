package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgExecuteGovernanceVAA{}, "wormhole/ExecuteGovernanceVAA", nil)
	cdc.RegisterConcrete(&MsgRegisterAccountAsGuardian{}, "wormhole/RegisterAccountAsGuardian", nil)
	cdc.RegisterConcrete(&MsgStoreCode{}, "wormhole/StoreCode", nil)
	cdc.RegisterConcrete(&MsgInstantiateContract{}, "wormhole/InstantiateContract", nil)
	cdc.RegisterConcrete(&MsgMigrateContract{}, "wormhole/MigrateContract", nil)
	cdc.RegisterConcrete(&MsgCreateAllowlistEntryRequest{}, "wormhole/CreateAllowlistEntryRequest", nil)
	cdc.RegisterConcrete(&MsgDeleteAllowlistEntryRequest{}, "wormhole/DeleteAllowlistEntryRequest", nil)
	cdc.RegisterConcrete(&MsgAddWasmInstantiateAllowlist{}, "wormhole/AddWasmInstantiateAllowlist", nil)
	cdc.RegisterConcrete(&MsgDeleteWasmInstantiateAllowlist{}, "wormhole/DeleteWasmInstantiateAllowlist", nil)
	cdc.RegisterConcrete(&MsgExecuteGatewayGovernanceVaa{}, "wormhole/ExecuteGatewayGovernanceVaa", nil)
	cdc.RegisterConcrete(&MsgGuardianSetUpdateProposal{}, "wormhole/GuardianSetUpdateProposal", nil)
	cdc.RegisterConcrete(&MsgGovernanceWormholeMessageProposal{}, "wormhole/GovernanceWormholeMessageProposal", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgExecuteGovernanceVAA{},
		&MsgStoreCode{},
		&MsgInstantiateContract{},
		&MsgMigrateContract{},
		&MsgCreateAllowlistEntryRequest{},
		&MsgDeleteAllowlistEntryRequest{},
		&MsgExecuteGatewayGovernanceVaa{},
		&MsgGovernanceWormholeMessageProposal{},
		&MsgGuardianSetUpdateProposal{},
		&MsgRegisterAccountAsGuardian{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
