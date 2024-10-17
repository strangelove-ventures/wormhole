# 5. Tilt Testing Architecture Efforts

Date: 2024-10-16

## Status

Accepted

## Context

The Strangelove team has made extensive efforts to build architecture and processes for running the Wormhole project Tilt tests in a known, repeatable, and reliable way. Each of these efforts has been met with challenges and has not been entirely successful. This document captures the architecture and processes that have been attempted.

Various attempts have been made to run Tilt CI tests in a known, repeatable, and reliable way. These attempts have included:

1. Running Tilt locally for each developer on various platforms during development:
   1. MacOS - Was unsuccessful for all developers due to unknown issues that prevented deployment of full Tilt infrastructure
   2. Windows under WSL 2 - Was successful for some developers who had high-end development machines, others who had older hardware were unable to run the tests
2. Deploying a GCP Compute Instance of various configurations and sizes to run manual Tilt tests.
3. Deploying a server as a Github Runner attached to the Strangelove Wormhole fork to run the Tilt CI Github Action steps.

### Nature of the Failures

#### MacOS Failures

The MacOS failures were due to unknown issues that prevented the deployment of the full Tilt infrastructure. The Tilt tests would run for a few minutes and then fail with various errors. The errors were not consistent and were not able to be resolved.

These should be explored further.

### Windows Under WSL 2 Successes and Failures

Two developers had machines that were able to get Kubernetes running under WSL 2. One developer had a machine that was unable to run the tests due to hardware limitations. The tests were able to run successfully on the high-end machines, but the tests were not able to run on the lower-end machine.

#### Lower-end Machine Specs, Tilt errored out:

* CPU: Ryzen 5 3600, 6 core, 12 thread @ Boosted 4.2 GHz
* Memory: 32 GB DDR4 3600MHz
* Storage: Allocated 100GB of NVMe M.2

Failure reasons: Tilt build steps would never finish, and various pod deployments would timeout waiting for other pods to be ready.

#### Higher-end Machine Specs, Tilt passed:

* CPU: Ryzen 9 7900X, 12 core, 24 thread @ Boosted 5.6 GHz
* Memory: 64 GB DDR5 4800MHz
* Storage: Allocated 100GB of SSD

### GCP Compute Instance/Github Runner Failures

The instances deployed were lacking resources to complete a full Tilt CI run. Either RAM would run out, or CPU bottlenecks would prevent the workflow from finishing the run before timeouts would occur.

## Decision

A comprehensive architecture and process for running Tilt tests has not been successfully implemented. The Strangelove team will continue to investigate and implement solutions to run Tilt tests in a known, repeatable, and reliable way.

Documentation should be updated to provide a repeatable method of deploying infrastructure that is capable of running the Tilt CI workflows.

## Consequences

Every avenue to run Tilt tests has been met with various challenges that prevented full runs of the Tilt tests. When a Tilt test fails during actual PR CI workflows, this makes it difficult to recreate the issues locally. This leads to longer debugging times and slower development cycles.
