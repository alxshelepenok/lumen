---
template: post
draft: false
title: 'Build3rs Stack: Pocket Network'
slug: builders-stack-pocket-network
date: 2023-02-10T03:00:00Z
socialImage: https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/builders.png
canonical: ''
description: 'The builder''s guide to getting started with Pocket: where it fits in
  the decentralized Web3 infra-stack, and what you can build with it.'
category: Guides
tags:
- Guides
- Pocket Network
- Infrastructure

---
![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/builders.png)

Welcome to the Build3rs Stack! A new content series we’re starting at Fleek highlighting all Web3 infrastructure protocols from a developer and app-building perspective.

As an orchestrator of web3 infrastructure, we want to help answer **what** **you can build** with each of these technologies and how they fit in a dApp/web3 build!

The first one we will cover today? [Pocket Network](http://pokt.network) (Pocket in short), a protocol that provides access to decentralized **RPC endpoints**, and can enable the **building of decentralized applications (DApps) on multiple blockchains**. Let’s dive in!

***

## TL;DR: What is Pocket and how does it work?

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/Pocket-feature-image.png)Pocket Network is a decentralized protocol that provides a network of remote procedure call (RPC) nodes to relay blockchain data/calls from any supported blockchain to DApps and end-users. Which makes it a great chain-agnostic provider for those uses!

Today, most RPC providers are centralized (like [Infura](https://www.infura.io/)), or developers need to spin up their own infrastructure for an independent resource. Pocket eliminates that need with a **decentralized infrastructure network.** No need to rely on a centralized provider (at risk of data alteration and privacy concerns, censorship, or outages), or to run your own infrastructure.

Independent “node runners” and providers run RPC nodes for the network, and Pocket incentivizes them with the network’s token ($POKT) for providing this data relaying service. Users (i.e. web3 developers) simply register an app in the Pocket Portal (Pocket’s gateway to its service), and then connect to any of Pocket’s supported blockchains and start receiving decentralized RPC service.

In other words, the network operates as a marketplace where DApps seeking web3 access to blockchain data (demand) are connected with infrastructure providers running full nodes (supply).

***

## Pocket in Features: RPC Blockchain Data & Interactions.

RPC (Remote Procedure Call) is a communication interface that enables applications to interact with a blockchain. It acts as a bridge between the DApp and a blockchain, allowing the dApp to send requests to the nodes, and receive responses in return. Pocket acts as this bridge, and decentralizes this “middleware” layer between DApps and blockchains.

Whether you need to show your users recent transaction data, or send and sign a new transaction to a network, RPC is one of the core foundations of building web3 experiences and services. Pocket allows you to use decentralized RPC endpoints to:

* Do on-chain data queries (e.g. query a user’s token balance).
* Do on-chain interactions (send and sign transactions)
* [And do so on all supported chains.](https://docs.pokt.network/supported-blockchains/)

Looking at [Ethereum’s JSON RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/) documentation and its methods, you can have a wide example and understanding of what interactions RPC usually provides on-chain.

***

## When would I use it as a builder? Applied Use-cases

To understand how Pocket Network fits your dApp’s stack, we need to know what we can build and achieve with the features above. Let’s go over some applied uses.

Here are some examples where you would need to fetch data on-chain, and Pocket could help you do so in a decentralized and performant way:

**Data: Fetching Precise on-chain User Balances (e.g.** [**Dune**](https://dune.com/browse/dashboards)**)**

In block explorers and network monitoring platforms, sometimes fetching data directly from the chain is critical to provide real-time insights to users. With Pocket, any data-oriented platform can achieve this in a decentralized way ensuring -for example- the latest updated data on a user’s token balances.

**Interactions: Having your Defi dApp Trigger a Trade (e.g.** [**Aave**](https://aave.com/)**)**

Given RPC calls can trigger transactions on-chain, it’s an easy way to have a frontend or dApp communicate with an on-chain protocol, like Aave, to trigger a particular transaction or trade.

**Chain-support: Building a Multi-Chain Wallet: (e.g.** [**Metamask**](https://metamask.io/)**)**

Pocket’s chain-agnostic factor is sometimes overlooked. Wonder how wallets like Metamask can support multiple chains at once, and make calls to them? Pocket can help achieve exactly that on a per-chain basis because of its ample folder of supported chains. The network acts as a one-stop shop for multi-chain RPC service, instead of having to piecemeal different RPC solutions for different chains that your DApp operates on.

***

## Get Building with Pocket

As a dev, you access Pocket via the [Pocket Portal](https://www.portal.pokt.network/), its developer interface. Portal endpoints are compatible with any environment that can integrate an RPC URL. These are the things you need to get started:

1. **Get an endpoint:** sign up in the Pocket Portal, create an app, and [get the endpoint](https://docs.pokt.network/apps/get-endpoint) for the chain(s) that you need. (You can start with 250k daily relays for free).
2. **Integrate into your app: With your Pocket endpoint ready, you can use the libraries below to integrate and start making decentralized RPC calls from your project.**

### Pocket’s Developer Stack:

Pocket has several SDKs and resources, depending on the environment you want to develop on or the service you might need.

* [Pocket HTTP DB - Access the Portal DB via Restful API.](https://github.com/pokt-foundation/pocket-http-db)
* [Portal API - single endpoint to all supported chains.](https://github.com/pokt-foundation/portal-api)
* [Pocket-go GOlang library.](https://github.com/pokt-foundation/pocket-go)
* [Pocket Tools - Examples, Tools, and Demo](https://github.com/pokt-foundation/pocket-tools)
* [Example dApps built on Pocket](https://docs.pokt.network/use/dapps/)

***

## Wrapping it up.

This guide serves as a starting point, with the necessary information to get started building with Pocket! If you want more info on Pocket, you can join the [Pocket Community Discord](https://discord.com/invite/uYs6Esum3r) and find them on [Twitter](https://twitter.com/POKTnetwork).

Want to stay up-to-speed with web3 infra, or Fleek’s role in the infrastructure space? Hop by our Discord, and chat with the team!