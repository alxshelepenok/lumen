---
template: post
draft: false
title: Fleek Network’s Roadmap Is Public
slug: fleek-network-public-roadmap-stages
date: 2023-02-15T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/end-to-end.png
canonical: ''
description: Take a high level look at what features & objectives our team has been
  working on – from Devnet all the way to Mainnet!
category: Announcements
tags:
- Roadmap
- Fleek Network

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/end-to-end.png)

Since announcing [Fleek Network back in November](https://blog.fleek.co/posts/introducing-fleek-network-and-fleek-xyz) (and starting to build it a lot earlier than that), we’ve been heads down and focused.

Today, we are taking the opportunity to come up for air and share **publicly a high level roadmap** outlining the features and objectives we have been working on and what still needs to be completed before we a ready to launch Fleek Network to Mainnet.

***

## Devnet, Testnet(s), & Mainnet

![Fleek Network Roadmap - ](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/roadmap-fn-feb.png)_You can view the_ [_full-size roadmap_](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/roadmap-fn-feb.png) _here._

This roadmap represents a high level breakdown of the two main stages leading up to Fleek Network mainnet: Devnet & Testnet.

At the time of writing, we are still finishing out some of the core aspects of Devnet. While there will be two distinct phases, items inside each phase are **often being developed in parallel.**

***

## Devnet: Building the Core.

![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/devnet.png)

During the development of the Devnet, the team has been working on laying the foundational components needed to build a decentralized edge network. This includes, but is not limited to, features like:

* 🗺️ The network actors
  * Cache & Gateway Nodes
    * Full chain nodes, validators, and light nodes
      * Full Chain nodes: maintain history but are not necceseraily validators in the network.
      * Validators: don’t have to maintain the full network history.
      * Light nodes: act as light verification nodes.
* **🛣️** Content Routing and Replication
* ✅ Reputation System
* 🤝 Modular Consensus Algorithm
  * Narwhal and Bullshark
* ⚖️ Network Governance and Economics
* 🔗 EVM Compatible application layer
* 🌉 L1 <> L2 <> Fleek Network Bridge

In addition to these crucial bedrock features, we have been working on getting people testing out running Fleek Network nodes so that we can catch feedback early. We will also set the first versions of our **SDK libraries** in Rust and Typescript, which will be used to interact and utilize the network and its features in the future.

So far this has meant open sourcing, deploying test nodes into multiple regions, wallet setup operations, and tooling for getting a local Devnet running.

***

## Testnet: Expanding and Testing.

![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/testnet.png)

Soon, we will move to the Testnet(s) phase. There will be **multiple stages to our Testnet**, each stage will have a specific testing purpose (e.g. to test consensus, performance, incentives, etc.).

The main difference between Testnet and Devnet is that the Testnet is incentivized. This is done to attract operators with higher grade equipment to maximize the geographical distribution of the edge network, lowering our time to first byte (TTFB), and maximizing the testing in a realistic scenario. **Developers can use Fleek Network**, which will be crucial to test its features.

Additionally, in this phase, we will expand our direct **integrations to** **both IPFS & Filecoin**. Fleek Network can fetch content directly from IPFS & Filecoin nodes. While Fleek Network can reach any origin via its gateways through HTTP, we plan to expand our direct integrations to all major web3 storage providers.

### Getting to Mainnet

**The release and transition to Fleek Network’s Mainnet** should mark the success of our Testnets. To reach that stage, we expect to stress-test the network’s components fully to validate their implementation and performance at scale.

Once we hit a high confidence level, Mainnet will go live, and Fleek Network will provide production-ready and decentralized caching and content acceleration to all users.

***

That’s all for today! If you haven’t joined in the testing already, you can do so by spinning up your [own Devnet Fleek Network node](https://docs.fleek.network/guides/Network%20nodes/fleek-network-getting-started-guide), helping us to develop and move Fleek Network across each of these phases. Get setup, and let us know what you think ahead of the Testnet!

For any other resources, checkout [our linktree](https://linktr.ee/fleek) or visit our website to [subscribe to our updates.](https://fleek.network/)