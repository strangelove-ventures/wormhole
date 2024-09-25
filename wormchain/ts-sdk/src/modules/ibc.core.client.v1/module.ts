//@ts-nocheck
// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";

import { IdentifiedClientState as typeIdentifiedClientState} from "./types"
import { ConsensusStateWithHeight as typeConsensusStateWithHeight} from "./types"
import { ClientConsensusStates as typeClientConsensusStates} from "./types"
import { ClientUpdateProposal as typeClientUpdateProposal} from "./types"
import { UpgradeProposal as typeUpgradeProposal} from "./types"
import { Height as typeHeight} from "./types"
import { Params as typeParams} from "./types"
import { GenesisMetadata as typeGenesisMetadata} from "./types"
import { IdentifiedGenesisMetadata as typeIdentifiedGenesisMetadata} from "./types"

export {  };



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
						IdentifiedClientState: getStructure(typeIdentifiedClientState.fromPartial({})),
						ConsensusStateWithHeight: getStructure(typeConsensusStateWithHeight.fromPartial({})),
						ClientConsensusStates: getStructure(typeClientConsensusStates.fromPartial({})),
						ClientUpdateProposal: getStructure(typeClientUpdateProposal.fromPartial({})),
						UpgradeProposal: getStructure(typeUpgradeProposal.fromPartial({})),
						Height: getStructure(typeHeight.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						GenesisMetadata: getStructure(typeGenesisMetadata.fromPartial({})),
						IdentifiedGenesisMetadata: getStructure(typeIdentifiedGenesisMetadata.fromPartial({})),
						
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
			IbcCoreClientV1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;