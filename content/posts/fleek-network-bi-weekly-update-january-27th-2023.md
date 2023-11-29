---
template: post
draft: false
title: 'Fleek Network Bi-Weekly Update: January 27th, 2023'
slug: Fleek-Network-Bi-Weekly-Update-Jan-27
date: 2023-01-26T06:00:00Z
socialImage: 'https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/FN-Update-Jan-27-1.jpeg'
canonical:  https://blog.fleek.network/post/Fleek-Network-Bi-Weekly-Update-Jan-27/ 
description: 'We’re making progress across a range of milestones, including our Governance
  Framework, Narwhal Integration, and more! Read on to get caught up  '
category: 'blog'
tags:
- Decentralized CDN
- CDN
- Fleek Network

---
![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/FN-Update-Jan-27-1.jpeg)

We’re back with another Fleek Network Bi-Weekly Update, giving you a look at everything we’ve been working on since our last check-in! Our [last update](https://blog.fleek.co/posts/fleek-network-2023-kickoff) was focused on all the developments since our initial announcement at the beginning of December.

This Bi-weekly Update, and the ones going forward, will focus on work done in the previous two weeks, as well as give a glimpse of what’s to come in the next. Currently, the team is working on these milestones:

* Governance Framework
* Tokenomics Paper
* Narwhal Integration
* Defining KPIs

Let’s get into each of these, and everything else we’ve done in the last two weeks:

## Completed Work: Fleek Network Development

We’ve already started to see some early Fleek Network participation! Since we’ve given the public the ability to spin up nodes, we’ve seen almost **800 unique nodes** across [7 different regions](https://github.com/fleek-network/ursa/pull/305) of the world.

After [researching](https://docs.fleek.network/blog/bloom-and-cuckoo-filters-for-cache-summarization) how to seamlessly route content to this expanding network of nodes, we’ve [implemented cuckoo filters](https://github.com/fleek-network/ursa/pull/319), replacing the previous bloom filters. This is a more space-efficient implementation, vastly improving the space required to actually index content.

We’ve also created some tests to benchmark this content routing system between peers, allowing us to test how fast data can be fetched P2P.

Previously, we internally tracked node metrics globally when measuring network latency benchmarks and milestones. In the past two weeks, we’ve expanded this dashboard to now include [gateway metrics](https://github.com/fleek-network/ursa/pull/299) as well.

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/gatew-metrics.png)

This isn’t all we’ve completed– we’ve also finished initiatives and features like node-to-client direct streaming for gateways, IPFS origin fetching on cache misses, and more! We’re an open-source project, take a look through our [GitHub](https://github.com/fleek-network) for real-time updates on in-progress developments.

## Fleek Network Development: In Progress PRs

In terms of ongoing work, we’re continuing to make progress on a wide range of developments across the early stages of the network, including work on the Fleek Networks SDK and typescript.

Another area of progress is our governance framework. We’re outlining a reputation system that will allow us to efficiently allocate requests from users of the network. As each node will publish metrics on-chain, we will be able to aggregate these metrics and reward nodes that are more efficient than others with a larger content routing load.

On a higher level, the team is gradually making progress on our initial Narwhal/Bullshark Integration. This is a massive undertaking and will require a large amount of work to ensure a secure implementation.

We’re also making some serious headway on our tokenomics paper– expect to see a public release on this in the near future!

Finally, the team has been defining the KPIs that will be used to track the performance of Fleek Network. Time to First Byte (TTFB) is a metric we plan to track, but we plan to expand this soon. If you have ideas on KPIs you think should be tracked, hop in our [Discord server](https://discord.gg/fleek) and let the team know! We’re an open-source project and are happily open to contributions from our community.

## In Case You Missed It

Since our last Fleek Network Update, we’ve made some changes to our docs! All Fleek Network documentation can now be found on [docs.fleek.network](https://docs.fleek.network/docs), including all research articles, guides, tutorials, and blogs.

You can catch up on all published articles, blogs, and tutorials here:

* [The Fleek Network](https://docs.fleek.network/blog/the-fleek-network)
* [Bloom Filters and Cuckoo Filters for Cache Summarization](https://docs.fleek.network/blog/bloom-and-cuckoo-filters-for-cache-summarization)
* [Running a Fleek Network Node in a Docker Container Video Guide](https://www.youtube.com/watch?v=uAFIDu3UBvw)

## That’s All For This Week ⚡

This is just a small look at everything we’ve been working on over the last few weeks. The team is working in parallel across a wide range of different initiates and implementations, which has turned out to be very efficient at this stage.

We’ll be back in \~2 weeks' time with another progress report to keep you in the loop! Remember– we’re open-source! You can also follow developments as they’re happening, or contribute to the project yourself, directly on our [GitHub](https://github.com/fleek-network).
