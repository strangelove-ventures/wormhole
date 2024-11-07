# 6. Transfer Wasmd Fork Logic to Wormchain Ante Handler

Date: 2024-07-29

## Status

Accepted

## Context

The Wormchain repo depends on a fork of `wasmd` to prevent certain types of Wasm transactions from being accepted by the chain. The Strangelove team proposed migrating the logic to an Ante Handler on chain to remove the need to maintain a fork of `wasmd`.

## Decision

After some discussion and investigation, the Strangelove team has decided to transfer the fork logic to an Ante Handler on Wormchain. This will allow the Wormchain to be more in line with the Cosmos SDK and reduce the maintenance overhead of maintaining a fork of `wasmd`.

## Consequences

The Wormchain will no longer depend on a fork of `wasmd` and will be able to upgrade to newer versions of the Cosmos SDK more easily. The Strangelove team will need to implement the Ante Handler and test it to ensure that it works as expected. As of now, the Strangelove team has not identified any major risks associated with this decision.