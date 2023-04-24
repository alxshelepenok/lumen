---
template: post
draft: false
title: 'Fleek Network Bi-Weekly Update: Feb. 10th, 2023'
slug: Fleek-network-update-feb-10
date: 2023-02-10T06:00:00Z
socialImage: https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/fn-update-10.jpeg
canonical: ''
description: 'Get caught up on the progress of our SDK, KPIs, Devnet, Reputation System,
  and more with the latest Bi-Weekly Update:'
category: ''
tags:
- Fleek
- CDN
- Fleek Network Update
- Decentralized CDN
- Fleek Network

---
![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/fn-update-10.jpeg)We are back with another Fleek Network Bi-Weekly Update, giving the community the inside scoop on the development progress of Fleek Network. Our goal is to build with transparency and ensure our community is always in the loop!

This week, we cover updates and progress on:

* Network KPIs
* FN SDK
* Devnet
* Reputation System
* Narwhal Integration

Let's unpack each of these items and catch up on all the development we’ve been working on since the last Bi-Weekly Update:

## Completed Work: Fleek Network KPIs, Devnet, and More

Each passing week, we get closer and closer to the release of our incentivized testnet. A major milestone in that journey is the release of our Devnet, which we rolled out this week. This version of the Devnet does not include the consensus, incentive, and governance modules, but will expand to include these layers in the future. The Devnet will allow us to easily test, iterate, and build the network! For more information, check out the [GitHub repo](https://github.com/fleek-network/ursa).

As a follow-up to an in-progress item mentioned in the [last bi-weekly update](https://blog.fleek.co/posts/Fleek-Network-Bi-Weekly-Update-Jan-27https://blog.fleek.co/posts/Fleek-Network-Bi-Weekly-Update-Jan-27), we have identified key performance indicators to benchmark the performance of nodes in the network. KPIs include:

* TTFB (Time to First Byte)
* Throughput (Request/second per node)
* Latency

Expect to see this list of metrics expand with the release of our global & local metrics dashboards. If you have metrics we missed that you think should be tracked, let us know in our [Discord server](https://discord.gg/fleekxyz)!

We have also debugged bootstrap failures by implementing random KAD walks to keep the routing table fresh, as well as added a cache to our rust proxy implementation. Check out the [PRs here](https://github.com/fleek-network/ursa).

To further improve performance, we have also replaced Bloom filters with Cuckoo filters. Prior to implementing Cuckoo filters, we [published our research](https://docs.fleek.network/blog/bloom-and-cuckoo-filters-for-cache-summarization) exploring the difference between the two options. We plan to publish more research in a similar fashion very soon, so stay tuned!

## In Progress: Reputation System, SDK, and Consensus

In terms of ongoing work, we continue to make progress on a range of milestones pivotal to the release of Fleek Network.

### Reputation System

Our team is currently working on a verifiable reputation system extended from [Eigentrust](http://ilpubs.stanford.edu/562/1/2002-56.pdf). The reputation system will allow each node to assign trust-based scores to other nodes they interact with. Nodes that have high aggregated reputation scores, from high performance and good behavior, will receive more requests and vice versa. For this implementation, we are testing both distributed and secure methods to see if they will work with our protocol– expect an update on our findings in the next Fleek Network Update.

### Fleek Network SDK

Additionally, the Fleek Network SDK is nearing completion, which will allow apps to easily integrate with our early iteration of Fleek Network. This will enable developers to cache files, sign transactions, access blockchain data, and act as a PUT and GET for interacting with Fleek Network. The SDK will be written in Typescript, with a Rust implementation coming soon. We can’t wait to see all the cool integrations you build!

### Consensus Layer

Narwhal, the consensus layer for Fleek Network, work also continues, with the foundation being laid based on Sui’s implementation. Our first pull request has been submitted for this, which you can find on our [GitHub](https://github.com/fleek-network/ursa).

What else is underway?

* Researching and developing the Gateway and Networking components
* Replacing NGINX on the cache nodes to allow for more cache control
* Continued work on isolating revm for our application layer

Get more details on all of the above, and everything else we're working on [here](https://github.com/fleek-network/ursa)!

## Research Pieces, Articles, and Videos You May Have Missed:

Since our last Fleek Network Bi-Weekly Update, we’ve released a few new guides and videos to help you get started with Fleek Network:

* [How to secure a Network Node with SSL/TLS]()
* [L2 Architecture Thread](https://twitter.com/fleek_net/status/1621655061095931907?s=20&t=bbcB8v3vGRnrrkFlrj_HTQ)

—

That’s all for this update! For live updates and access to the team, be sure to check out our [GitHub](https://github.com/fleek-network), join our [Discord server](https://discord.gg/fleekxyz), and subscribe to updates on [Fleek.Network](https://fleek.network/)! 

We'll be back with another progress report in \~2 weeks' time– see you all then ⚡