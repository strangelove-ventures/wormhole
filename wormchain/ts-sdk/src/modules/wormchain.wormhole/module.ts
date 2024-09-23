//@ts-nocheck
// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgDeleteAllowlistEntryRequest } from "./types/wormchain/wormhole/tx";
import { MsgMigrateContract } from "./types/wormchain/wormhole/tx";
import { MsgExecuteGovernanceVAA } from "./types/wormchain/wormhole/tx";
import { MsgStoreCode } from "./types/wormchain/wormhole/tx";
import { MsgRegisterAccountAsGuardian } from "./types/wormchain/wormhole/tx";
import { MsgExecuteGatewayGovernanceVaa } from "./types/wormchain/wormhole/tx";
import { MsgInstantiateContract } from "./types/wormchain/wormhole/tx";
import { MsgAddWasmInstantiateAllowlist } from "./types/wormchain/wormhole/tx";
import { MsgCreateAllowlistEntryRequest } from "./types/wormchain/wormhole/tx";
import { MsgDeleteWasmInstantiateAllowlist } from "./types/wormchain/wormhole/tx";

import { Config as typeConfig} from "./types"
import { ConsensusGuardianSetIndex as typeConsensusGuardianSetIndex} from "./types"
import { EventGuardianSetUpdate as typeEventGuardianSetUpdate} from "./types"
import { EventPostedMessage as typeEventPostedMessage} from "./types"
import { EventGuardianRegistered as typeEventGuardianRegistered} from "./types"
import { EventConsensusSetUpdate as typeEventConsensusSetUpdate} from "./types"
import { GuardianKey as typeGuardianKey} from "./types"
import { GuardianValidator as typeGuardianValidator} from "./types"
import { GuardianSet as typeGuardianSet} from "./types"
import { ValidatorAllowedAddress as typeValidatorAllowedAddress} from "./types"
import { WasmInstantiateAllowedContractCodeId as typeWasmInstantiateAllowedContractCodeId} from "./types"
import { IbcComposabilityMwContract as typeIbcComposabilityMwContract} from "./types"
import { ReplayProtection as typeReplayProtection} from "./types"
import { SequenceCounter as typeSequenceCounter} from "./types"

export { MsgDeleteAllowlistEntryRequest, MsgMigrateContract, MsgExecuteGovernanceVAA, MsgStoreCode, MsgRegisterAccountAsGuardian, MsgExecuteGatewayGovernanceVaa, MsgInstantiateContract, MsgAddWasmInstantiateAllowlist, MsgCreateAllowlistEntryRequest, MsgDeleteWasmInstantiateAllowlist };

type sendMsgDeleteAllowlistEntryRequestParams = {
  value: MsgDeleteAllowlistEntryRequest,
  fee?: StdFee,
  memo?: string
};

type sendMsgMigrateContractParams = {
  value: MsgMigrateContract,
  fee?: StdFee,
  memo?: string
};

type sendMsgExecuteGovernanceVAAParams = {
  value: MsgExecuteGovernanceVAA,
  fee?: StdFee,
  memo?: string
};

type sendMsgStoreCodeParams = {
  value: MsgStoreCode,
  fee?: StdFee,
  memo?: string
};

type sendMsgRegisterAccountAsGuardianParams = {
  value: MsgRegisterAccountAsGuardian,
  fee?: StdFee,
  memo?: string
};

type sendMsgExecuteGatewayGovernanceVaaParams = {
  value: MsgExecuteGatewayGovernanceVaa,
  fee?: StdFee,
  memo?: string
};

type sendMsgInstantiateContractParams = {
  value: MsgInstantiateContract,
  fee?: StdFee,
  memo?: string
};

type sendMsgAddWasmInstantiateAllowlistParams = {
  value: MsgAddWasmInstantiateAllowlist,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreateAllowlistEntryRequestParams = {
  value: MsgCreateAllowlistEntryRequest,
  fee?: StdFee,
  memo?: string
};

type sendMsgDeleteWasmInstantiateAllowlistParams = {
  value: MsgDeleteWasmInstantiateAllowlist,
  fee?: StdFee,
  memo?: string
};


type msgDeleteAllowlistEntryRequestParams = {
  value: MsgDeleteAllowlistEntryRequest,
};

type msgMigrateContractParams = {
  value: MsgMigrateContract,
};

type msgExecuteGovernanceVAAParams = {
  value: MsgExecuteGovernanceVAA,
};

type msgStoreCodeParams = {
  value: MsgStoreCode,
};

type msgRegisterAccountAsGuardianParams = {
  value: MsgRegisterAccountAsGuardian,
};

type msgExecuteGatewayGovernanceVaaParams = {
  value: MsgExecuteGatewayGovernanceVaa,
};

type msgInstantiateContractParams = {
  value: MsgInstantiateContract,
};

type msgAddWasmInstantiateAllowlistParams = {
  value: MsgAddWasmInstantiateAllowlist,
};

type msgCreateAllowlistEntryRequestParams = {
  value: MsgCreateAllowlistEntryRequest,
};

type msgDeleteWasmInstantiateAllowlistParams = {
  value: MsgDeleteWasmInstantiateAllowlist,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgDeleteAllowlistEntryRequest({ value, fee, memo }: sendMsgDeleteAllowlistEntryRequestParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgDeleteAllowlistEntryRequest: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgDeleteAllowlistEntryRequest({ value: MsgDeleteAllowlistEntryRequest.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgDeleteAllowlistEntryRequest: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgMigrateContract({ value, fee, memo }: sendMsgMigrateContractParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgMigrateContract: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgMigrateContract({ value: MsgMigrateContract.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgMigrateContract: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgExecuteGovernanceVAA({ value, fee, memo }: sendMsgExecuteGovernanceVAAParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExecuteGovernanceVAA: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExecuteGovernanceVAA({ value: MsgExecuteGovernanceVAA.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExecuteGovernanceVAA: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgStoreCode({ value, fee, memo }: sendMsgStoreCodeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgStoreCode: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgStoreCode({ value: MsgStoreCode.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgStoreCode: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgRegisterAccountAsGuardian({ value, fee, memo }: sendMsgRegisterAccountAsGuardianParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgRegisterAccountAsGuardian: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgRegisterAccountAsGuardian({ value: MsgRegisterAccountAsGuardian.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgRegisterAccountAsGuardian: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgExecuteGatewayGovernanceVaa({ value, fee, memo }: sendMsgExecuteGatewayGovernanceVaaParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExecuteGatewayGovernanceVaa: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExecuteGatewayGovernanceVaa({ value: MsgExecuteGatewayGovernanceVaa.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExecuteGatewayGovernanceVaa: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgInstantiateContract({ value, fee, memo }: sendMsgInstantiateContractParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgInstantiateContract: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgInstantiateContract({ value: MsgInstantiateContract.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgInstantiateContract: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgAddWasmInstantiateAllowlist({ value, fee, memo }: sendMsgAddWasmInstantiateAllowlistParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAddWasmInstantiateAllowlist: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgAddWasmInstantiateAllowlist({ value: MsgAddWasmInstantiateAllowlist.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgAddWasmInstantiateAllowlist: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreateAllowlistEntryRequest({ value, fee, memo }: sendMsgCreateAllowlistEntryRequestParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateAllowlistEntryRequest: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateAllowlistEntryRequest({ value: MsgCreateAllowlistEntryRequest.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateAllowlistEntryRequest: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgDeleteWasmInstantiateAllowlist({ value, fee, memo }: sendMsgDeleteWasmInstantiateAllowlistParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgDeleteWasmInstantiateAllowlist: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgDeleteWasmInstantiateAllowlist({ value: MsgDeleteWasmInstantiateAllowlist.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgDeleteWasmInstantiateAllowlist: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgDeleteAllowlistEntryRequest({ value }: msgDeleteAllowlistEntryRequestParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgDeleteAllowlistEntryRequest", value: MsgDeleteAllowlistEntryRequest.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgDeleteAllowlistEntryRequest: Could not create message: ' + e.message)
			}
		},
		
		msgMigrateContract({ value }: msgMigrateContractParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgMigrateContract", value: MsgMigrateContract.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgMigrateContract: Could not create message: ' + e.message)
			}
		},
		
		msgExecuteGovernanceVAA({ value }: msgExecuteGovernanceVAAParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgExecuteGovernanceVAA", value: MsgExecuteGovernanceVAA.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExecuteGovernanceVAA: Could not create message: ' + e.message)
			}
		},
		
		msgStoreCode({ value }: msgStoreCodeParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgStoreCode", value: MsgStoreCode.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgStoreCode: Could not create message: ' + e.message)
			}
		},
		
		msgRegisterAccountAsGuardian({ value }: msgRegisterAccountAsGuardianParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgRegisterAccountAsGuardian", value: MsgRegisterAccountAsGuardian.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgRegisterAccountAsGuardian: Could not create message: ' + e.message)
			}
		},
		
		msgExecuteGatewayGovernanceVaa({ value }: msgExecuteGatewayGovernanceVaaParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgExecuteGatewayGovernanceVaa", value: MsgExecuteGatewayGovernanceVaa.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExecuteGatewayGovernanceVaa: Could not create message: ' + e.message)
			}
		},
		
		msgInstantiateContract({ value }: msgInstantiateContractParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgInstantiateContract", value: MsgInstantiateContract.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgInstantiateContract: Could not create message: ' + e.message)
			}
		},
		
		msgAddWasmInstantiateAllowlist({ value }: msgAddWasmInstantiateAllowlistParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgAddWasmInstantiateAllowlist", value: MsgAddWasmInstantiateAllowlist.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgAddWasmInstantiateAllowlist: Could not create message: ' + e.message)
			}
		},
		
		msgCreateAllowlistEntryRequest({ value }: msgCreateAllowlistEntryRequestParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgCreateAllowlistEntryRequest", value: MsgCreateAllowlistEntryRequest.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateAllowlistEntryRequest: Could not create message: ' + e.message)
			}
		},
		
		msgDeleteWasmInstantiateAllowlist({ value }: msgDeleteWasmInstantiateAllowlistParams): EncodeObject {
			try {
				return { typeUrl: "/wormchain.wormhole.MsgDeleteWasmInstantiateAllowlist", value: MsgDeleteWasmInstantiateAllowlist.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgDeleteWasmInstantiateAllowlist: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Config: getStructure(typeConfig.fromPartial({})),
						ConsensusGuardianSetIndex: getStructure(typeConsensusGuardianSetIndex.fromPartial({})),
						EventGuardianSetUpdate: getStructure(typeEventGuardianSetUpdate.fromPartial({})),
						EventPostedMessage: getStructure(typeEventPostedMessage.fromPartial({})),
						EventGuardianRegistered: getStructure(typeEventGuardianRegistered.fromPartial({})),
						EventConsensusSetUpdate: getStructure(typeEventConsensusSetUpdate.fromPartial({})),
						GuardianKey: getStructure(typeGuardianKey.fromPartial({})),
						GuardianValidator: getStructure(typeGuardianValidator.fromPartial({})),
						GuardianSet: getStructure(typeGuardianSet.fromPartial({})),
						ValidatorAllowedAddress: getStructure(typeValidatorAllowedAddress.fromPartial({})),
						WasmInstantiateAllowedContractCodeId: getStructure(typeWasmInstantiateAllowedContractCodeId.fromPartial({})),
						IbcComposabilityMwContract: getStructure(typeIbcComposabilityMwContract.fromPartial({})),
						ReplayProtection: getStructure(typeReplayProtection.fromPartial({})),
						SequenceCounter: getStructure(typeSequenceCounter.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			WormchainWormhole: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;