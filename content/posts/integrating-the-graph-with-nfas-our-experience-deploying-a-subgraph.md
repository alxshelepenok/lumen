---
template: post
draft: false
title: 'Integrating The Graph with NFAs: Our Experience Deploying a Subgraph.'
slug: thegraph-and-nfas-deploying-subgraphs
date: 2023-02-13T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/xyz-ntwrk-release-image.png
canonical: ''
description: Maximizing flexibility and freedom in NFA data retrieval with The Graph.
category: Guides
tags:
- Subgraphs
- Guides
- Non-fungible Applications
- NFAs
- The Graph

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/xyz-ntwrk-release-image.png)

In an effort to supercharge our Non-Fungible Apps (NFAs), we’ve begun to integrate different web3 native protocols into the stack – **starting with subgraphs (open APIs) on** [**The Graph**](https://thegraph.com/). This is our first implementation of The Graph, and while we’re still very much in the early phase, we wanted to share our experience & implementation, as well as provide the web3 community with an up-to-date guide on using The Graph in 2023.

In terms of our specific implementation, the integration of The Graph into our NFA stack will enable ultimate flexibility in a user's **ability to fetch data from the NFA contract**. Developers will be able to query and filter information from our NFA contract.

From a developer perspective, creating and implementing an alternative to The Graph would have been a massive undertaking and, **with how web3-optimized The Graph is,** would surely be subpar. We’re beyond excited to be using The Graph to build a robust and flexible NFA ecosystem!

We’ve made this initial implementation [open-source on our GitHub](https://github.com/fleekxyz/non-fungible-apps), and we’re open to any and all feedback ⚡

***

## What is The Graph?

Before diving into our experience, it's important to understand what The Graph is and how it's used.

The Graph is a much-needed **decentralized protocol for querying and indexing data on blockchains**, as on-chain event data is usually not very friendly to query. It allows developers to build and deploy subgraphs, which are APIs that can be queried with a standard GraphQL API. Each subgraph's manifest describes the data structure of contracts of interest and how they should be indexed. In other words, subgraphs organize blockchain data in order to easily integrate that data into front ends.

In our case, we're using subgraphs to index and query data from our NFA contracts. For more information on The Graph, check out [the protocol’s website](http://thegraph.com/) and [documentation](https://thegraph.com/docs)!

***

## Our Experience Deploying a Subgraph in 2023

We are building Fleek.xyz as an **open-source, extensible, and protocol-agnostic protocol first and foremost**. In that spirit, we believe it's important to share our experience integrating these protocols into our initial offerings, including NFAs.

We’ve configured our subgraph to **detect when specific events happen with our NFA smart contracts**. Indexers on The Graph Network pick up these events and pass them to our handlers that we’ve deployed through our subgraph. At this point, we can use our subgraph to query specific data.

![](https://storage.fleek.zone/fleek-team-bucket/Blogs/nfa-infra-graph.jpg)

This could be information like specific token holders, blocks, transactions, or whatever else is needed to supercharge your applications.

***

## Deploying a Subgraph: A Guide

This is a step-by-step guide for deploying a subgraph using The Graph CLI. To deploy a subgraph, **you need a live, deployed, and verified contract instance**. The process of deploying a contract is described in a separate guide, which you can [find here](https://github.com/fleekxyz/non-fungible-apps/tree/main#-deployment).

After you have a live contract, you can use the following commands to bootstrap your subgraph. But before doing so, make sure you have the graph-cli package installed on your machine:

    # If you want to use yarn:
    $ yarn global add @graphprotocol/graph-cli
    
    # If you want to use npm:
    $ npm install -g @graphprotocol/graph-cli

Now, with Graph CLI installed, simply run:

    graph init --contract-name CONTRACT_NAME --index-events --studio --from-contract CONTRACT_ADDRESS --abi PATH/TO/ABI/JSON --network mumbai SUBGRAPH_NAME

And follow the steps in the wizard. You’ll be asked to specify the protocol, indexed chain and deployed contract address and a basic subgraph is initialized for you. By default, contract events are automatically indexed as database entities. You can now extend your subgraph or just deploy the bootstrapped one directly.

### Building the Subgraph

You **run either the yarn build or npm run build commands** to build the subgraph. These commands use the graph-cli package to build the WASM, new schemas, and config files of the subgraph. This is an important step before deploying the subgraph.

### Deploying the Subgraph

The Graph offers **two ways to index subgraphs**: The Graph Network and The Graph’s hosted service.

At the time of writing, only the Ethereum mainnet and Gnosis chain are available on The Graph Network. While the hosted service [will eventually deprecate in the future](https://thegraph.com/blog/transitioning-to-decentralized-graph-network/), it is currently the only option for deploying subgraphs to other networks. Seeing as the NFA contract is deployed to Polygon, **we’ve opted for the hosted service.** [**Polygon**](https://twitter.com/graphprotocol/status/1598287276618182656) **and** [**other chains**](https://twitter.com/graphprotocol/status/1615772852745027594) are in the process of being integrated onto The Graph Network.

To deploy the subgraph to the hosted service, you first **create a subgraph on** [**thegraph.com**](https://thegraph.com/) and copy the access token. Then, you run the following command, replacing the access token and your Github username/subgraph name:

    graph deploy --product hosted-service --deploy-key YOUR_ACCESS_TOKEN --version-label v0.0.1 YOUR_GITHUB_USERNAME/SUBGRAPH_NAME_ON_HOSTED_SERVICE

The hosted service will then start indexing all relevant data from the genesis block to the latest block. This process can take time, especially if the contract has many transactions and events. You can specify the block it starts to index from. It's logical to use the block height at which the contract was created for the starting block. This is possible to specify in the subgraph.yaml file. When the blocks are processed, the status of the subgraph will change to Synced.

Tip: We used the Polygon testnet mumbai for our initial integration. We developed a script to quickly and easily verify the contract on Polygonscan. You can find it here!

### Re-deployment

If a change is needed in the subgraph, you should update the schema.graphql and subgraph.yaml files to match the changes in the contract.

* To update the contract address, you need to change the address in the networks.json and subgraph.yaml files.
* To update entities and handlers, you must update the schema.graphql file and add or remove events in the subgraph.yaml file's dataSources.mapping.eventHandlers.
* To regenerate the TS files, run yarn codegen or npm run codegen.

If you need new handlers, you can update the ./src/fleek-nfa.ts file and add functions to handle the new events.

Tip: The command \`graph build\` builds and generates files removing the need to run \`yarn codegen\` each time you change the schema.

After completing all of these steps, and re-running the command mentioned in the \`Deploying a Subgraph\` section, you should have successfully deployed a subgraph on The Graph’s hosted service!

***

## Fleek 🤝The Graph

We are super pumped to integrate not only The Graph, but tons of other web3 native protocols into our NFA stack. Integrating The Graph is a first major step in creating a flexible ecosystem for NFAs. For more information on our vision for NFAs, check out our Community Hosting article here!

If you have any questions about NFAs, our integration of The Graph, or just want to jam with the team on any of these ideas, join us in our Discord Server ⚡