---
template: post
draft: true
title: 'Build3rs Stack: Arweave'
slug: builders-stack-arweave
date: 2023-02-17T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/arweave-builderstack.png
canonical: ''
description: 'The builder''s guide to Arweave: where it fits in your project''s Web3
  infra-stack, and what you can achieve with it..'
category: Guides
tags:
- Web3 Stack
- Hosting
- Storage
- Web3 Infrastructure
- Arweave

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/arweave-builderstack.png)

**Welcome to the Build3rs Stack**! In this content series we cover the most important parts of the web3 infrastructure stack for builders, and go over their applied use-cases.

**Today we will cover:** [**Arweave**](https://www.arweave.org/). Arweave is a permanent and decentralized web platform built on an open ledger. It's main service? A permanent storage protocol, with a particular mechanism: you only pay for storage once, and store data permanently on a decentralized network.

***

## TL;DR: What is Arweave?

![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/arweave-main.png)

While storing contract data might be efficient and possible in blockchains like Ethereum, doing so for larger sized files or bulks of databases, it’s not. Arweave, a permanent and decentralized web platform aims to solve these issues with a **data-preservation network** that decouples many storage needs from other networks (as well as other features like computation, DBs).

Arweave's unique architecture allows for the creation of an **infinitely scalable storage system** that is secured by a consensus mechanism that is both energy-efficient and sustainable.

As a miner, **you provide storage, bandwidth (to serve and connect data), and computational** power to the network, which is in turn used by developers and users!

For users, unlike traditional centralized systems, Arweave's blockweave only requires a **one-time transaction fee for storage, ensuring that you can store their data permanently** without incurring ongoing costs.

**All of these features together form the Permaweb**: a permanent and decentralized web built on top of Arweave; a set of modular and interchangeable protocols (storage, databases, contracts) allowing developers and users to build decentralized projects, end-to-end, on a resilient knowledge base that is replicated across the world.

***

## Arweave in Features: Permanent Storage & Contracts

As a permanent data storage network, Arweave can be the home to several components of your project's stack. **From files and databases, to smart contracts**, you can build, store, and run a decentralized application end-to-end in Arweave.

In short, the main features Arweave can provide to you as a builder are:

* Permanent file storage.
* Permanent frontend/site hosting.
* Queryable databases on the Permaweb.
* Smart contracts

Smart contracts in particular are powered by [SmartWeave](https://arwiki.wiki/#/en/smartweave). SmartWeave is a smart contracting system built on top of Arweave that allows users to build and run the logic of their programs through this network.

One particular perk of using Arweave for contracts is that **contract state is computed on the user’s machine**, not the network, removing that burden from the network itself. This allows contracts to have more complex operations without causing added network compute fees, and to be built in multiple friendlier languages (e.g. JS).

***

## When would I use it as a builder? Applied Use-cases

Let’s break down some applied examples using Arweave’s features to fully understand how and when a decentralized application can leverage its stack:

**Databases - Store a database of actions in your dApp, and query it! (e.g:** [**weaveDB**](https://weavedb.dev/)**)**

Arweave’s retrieval capabilities and GraphQL support, make it a great option for this use-case. For example, WeaveDB has used Arweaves storage/contract capabilities to build a NoSQL database powered by Arweave Warp Contracts.

**Contracts: Build complex data-driven multi-contract dApps . (e.g:** [**Warp**](https://warp.cc/)**)**

Arweave's unique contract execution capabilities and environment open up the door for new smart contract development implementations. Warp makes the best of Arweave’s lazy-contract-state update perk with its own custom transaction lifecycle, and several contract abstractions (such as cross-contract calls). By separating state from execution, performance is optimized and the network can be kept light.

**Storage - On-chain decentralized storage layer for a content app - (e.g:** [**Mirror**](https://mirror.xyz)**)**

By leveraging Arweave, Mirror can create a platform that ensures posts made on the platform are preserved indefinitely. Because Arweave's decentralized storage is designed to be resistant to censorship, posts stored on Arweave are guaranteed to be accessible and unchanged for as long as the network continues to operate.

***

## Getting Started with Arweave

Arweave has a suite of tools available for many different uses such as decentralized databases, web3 profiles, and permanent storage.

**Your first step?** Visit Arweave’s [development documentation](https://docs.arweave.org/developers) to get acquainted with the basics, and then you can find an end-to-end guide (from storage to contracts), in the [ArWiki!](https://arwiki.wiki/#/en/main)

Here are some of other useful resources and platform you can use to get started:

* [ArDrive](https://ardrive.io/) - GUI for uploading data to Arweave
* [PermaPages](https://permapages.arweave.dev) - Permanent web3 profiles and permaweb pages
* [WeaveDB](https://weavedb.dev) - NoSQL database as a smart contract on Arweave. Similar to Firestore
* [ArweaveJS](https://github.com/ArweaveTeam/arweave-js) - Arweave JavaScript SDK for interacting with the network
* [ArConnect](https://arconnect.io) - Arweave web wallet
* [Permaweb Cookbook](https://cookbook.arweave.dev) - 0 to 1 guides and concepts for building on the permaweb
* [Warp Contracts](https://warp.cc/) - Secure and scalable smart contracts for Arweave
* [Dapps built on Arweave](https://list.weavescan.com/) - All the ecosystem projects built on Arweave.

***

## Wrapping it up.

We hope to help you start your road on Arweave with this overview of applied use-cases and tools! Give Arweave a follow on [Twitter](https://twitter.com/ArweaveEco) for more information on its stack.

Keep an eye out for our next episode of the Build3rs Stack! Pay the team a visit on [Discord](https://discord.gg/fleekxyz) and let us know which protocol you'd like to hear about next.

For more resources visit [our LinkTree](https://linktr.ee/fleek).