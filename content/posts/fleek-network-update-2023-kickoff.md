---
template: post
draft: true
title: 'Fleek Network Update: 2023 Kickoff'
slug: fleek-network-2023-kickoff
date: 2023-01-13T06:00:00Z
socialImage: https://storageapi.fleek.one/fleek-team-bucket/Blogs/Twitter post - 49
  (1).jpg
canonical: ''
description: Progress report on building the foundation for our decentralized content
  and application delivery network.
category: ''
tags:
- Decentralized CDN
- CDN
- Fleek Network

---
![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/Twitter post - 49 (1).jpg)As we look back on the end of 2022 we wanted to give an update on the progress of Fleek Network. It’s our goal to be as open and transparent as possible in our development process – we will continue to provide these updates on a bi-weekly basis! We will start sharing more of our research with the world.

## Fleek Network Progress Report

Since officially announcing the development kick-off at the start of December, the team has been hard at work laying the foundation for Fleek Network.

If you missed it, get the whole picture by checking out our [announcement & vision](https://blog.fleek.co/posts/introducing-fleek-network-and-fleek-xyz) for Fleek Network!

Completed:

* Devnet
* Network Revamp
* Index Providing
* Economics
* Metrics

In Progress:

* Caching and data transfer algorithms
* Gateway
* Consensus
* N/B Integration
* Governance

## Completed Developments: Laying the Foundation for Fleek Network

The focus for the end of 2022 was on improving the performance and reliability of early iterations of Fleek Network.

Right before the start of the holidays, we merged in a Kubernetes setup in **order to deploy our devnet**. The devnet is our way of bootstrapping the network pre-testnet. It includes 20-50 nodes that we’ve deployed to help facilitate the network in its early stages. New participants in the network can quickly connect to these nodes for initial easy discovery of the network.

This will expand to 100-500 community-run nodes when we release our incentivized testnet, which we aim to have our consensus layer integrated into. To make sure the testnet runs smoothly, **we’ve created a PoC test ground that can scale tests up to 100k nodes**!

In order to enable easier integration with other components, and increase composability, **we revamped our entire networking stack**. Including the addition of \`hole punching\`, which allows users to connect to peers through firewalls.

When it comes to look-up time, we managed to cut it down back to milliseconds, with cache nodes now announcing their cached content to global indexers. Gateways can now request these nodes to efficiently find the provider who is serving the content. Expect to see lightning-fast look-up and delivery times with Fleek Network in the future ⚡

We’re currently **finalizing the initial economic paper**, defining the initial token distribution, and introducing a sustainability factor to help the long-term fitness and longevity of the network token.

Finally, we **deployed our metrics dashboard internally**. The dashboard tracks all of our nodes & the “power” of the network and follows along our development theme of transparency.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/9yHQiad.jpg)

We will deploy our metrics dashboard for public use soon, so stay tuned!

## A Look into Fleek Network Development: In-Progress Initiatives

The Fleek Network development team has been busy pushing forward on several key initiatives since the end of 2022.

**One area of focus has been caching and data transfer algorithms**. Optimizing the speed of p2p content routing and replication strategies is always a priority to ensure that users can access the content they need quickly and easily. Utilizing Bloom filters is an interesting prospect for this.In short, nodes would be able to announce their bloom filters to connected peers which helps to index and pinpoint content quickly and efficiently. Expect a longer-form research piece on this exact topic, as we explore the use of bloom filters and other alternatives to create the optimal content routing system.

We’ve taken steps in **creating a global gateway to act as a relay for cache nodes and handle HTTP resolution**. Gateway sessions will allow for streaming content directly from cache nodes to clients. To add, we’re testing the use of graphsync for the incremental verification of content on the client side. We’re also **exploring the use of request-response alternatives, like graphsync, to speed up data transfer protocols**.

On the governance side, the team has been **putting together the contracts that will make governance possible**, including node registry, staking, and token contracts. We’ve begun to define the structure of the DAO and the structure of how it will operate pre and post-launch of the network. We've also started working on BLS contracts to verify signatures and are experimenting with **zk-snarks** **to verify claims by nodes**. Finally, we’re actively working on designing an interaction between Fleek Network consensus layer and its own internal application layer, illustrated by this graphic:

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/MacBook Pro 14_ - 18.jpg)

In terms of consensus, we’ve been defining the transaction types that will be used to interact with the Fleek Network blockchain itself. In order to determine each block's metadata we’ve been creating the block structure, along with header types, a list of messages, and a signature. These blocks will enable state transitions. We are in the process of determining how we reach consensus and transition to a quorum state, given the set of messages in each block. As a first and foremost open-source project, we’re open to any and all contributions to problems we’re tackling in our [Github](https://github.com/fleek-network)!

We have been putting together an **example to demonstrate how the nodes, Narwhal and Bullshark (N/B), will interact**. The initial implementation of N/B is underway– and we will share more info on this in the next bi-weekly update! Finally, we’ve started to define the proofs that will be the basis for our consensus layer:

* Merkle inclusion proofs for Proof-of-Delivery (PoD)
* Packet inspection for Proof-of-Bandwidth (PoB)

We will begin to compose and define the randomness of these proofs to lay the groundwork for our consensus layer. Last but not least, we’ve begun to define where to store old blocks. An option is using the network itself to serve its own old blocks!

## That’s All For This Week ⚡

Since the official announcement of Fleek Network, the development team has been working hard on building the foundation of the network.

We’ve made progress on several key areas, including setting up a devnet, making changes to the network's structure, and adding metrics to track the network's performance. We’re making sure it’s easy for new participants to discover and participate in the network in its early stages.

While the team has made some major strides, we’re still putting a lot of effort into finalizing some key areas such as caching algorithms for content, consensus, governance, and our economics paper in the coming weeks. We plan to continue to share the development process transparently by releasing updates regularly so stay tuned.

If you have any questions about Fleek Network and its development, reach out to the team in our [Discord server](https://discord.gg/fleekxyz)!