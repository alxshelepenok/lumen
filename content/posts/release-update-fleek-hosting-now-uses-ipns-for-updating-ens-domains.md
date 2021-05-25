---
template: post
draft: true
title: Release Update - Fleek Hosting Now Uses IPNS for Updating ENS Domains!
slug: ens-now-on-ipns-hash-updates
date: 2021-05-25T04:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/blog/ipns-ens.png
canonical: ''
description: Now on Fleek, ENS joins forces with IPNS to make IPFS hash record updates
  scalable and inexpensive to all users, using static IPNS addresses per site, updated
  on IPFS’ Distributed Hash Tables.
category: Announcement
tags:
- IPFS
- IPNS
- ENS

---
![](https://storageapi.fleek.co/fleek-team-bucket/blog/ipns-ens.png)

Hosting a site or app on [IPFS](https://ipfs.io/) with Fleek, and decentralizing its naming with an [Ethereum Name Service (ENS) domain](http://ens.domains/)? Then this upgrade is for you. Now on Fleek, [IPNS ](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup-with-cli)+ ENS combine forces to make ENS IPFS hash record updates scalable, fast, and inexpensive on Fleek.

## ENS Domains on Fleek

![](https://storageapi.fleek.co/fleek-team-bucket/blog/ENS-APP.png)

One of the first features we added to Fleek with IPFS hosting was [using Ethereum Name Service (ENS)](https://blog.fleek.co/posts/guide-ens-domains-ipfs-ethereum-name-service) domain names through our platform. It’s just a dope combo. Distributed storage on one end, and decentralized naming on Ethereum on the other!

As a tl;dr of how they work in Fleek, when you deploy an IPFS site a content hash is created representing your site. This hash changes each time you make a new deployment, since it represents unique content.

How do we pair up your site with ENS? Each ENS domain name has a set of records you update referencing content. One of them is an contentHash, for IPFS/IPNS! Which you can use to point to specific data, or in our case, your site.

When you add an ENS domain through Fleek, you first trigger a transaction to give permission to Fleek to update this record, and then each time you make a deployment, Fleek updates the IPFS hash record on your ENS domain automatically in the background.

Each transaction requires a gas fee. Users only handle the first transaction (giving Fleek permissions), but all future transactions and record updates are covered by Fleek, costing the gas fee required to update the ENS record on the Ethereum network.

## The Scalability & Gas Problem

![](https://storageapi.fleek.co/fleek-team-bucket/blog/gas-fine.png)

We always **double down on abstracting complicated** steps to give dope Web3 experiences, and handling ENS transactions in the background is part of that motto. However, we can’t ignore the fact that both Fleek, and Ethereum, are scaling rapidly.

There were two main issues we needed to tackle. First, gas prices fluctuate constantly, and we’ve seen them go up and down dramatically. So, long term, we had to think about how to handle transactions seamlessly, at scale, without offloading it to the user, but also not becoming the living form of the “this is fine” meme.

Secondly, sometimes the time it takes for a transaction to go through can be variable, depending on the Ethereum network or fluctuating gas. We know how important for any web/app a push to prod can be, so keeping those times stable was also on our mind.

## The Solution: IPNS + ENS

![](https://storageapi.fleek.co/fleek-team-bucket/blog/ipns-ens-fleek.png)

The core issue with ENS updates and transactions is the fact IPFS content hashes change on each deployment, therefore you need to switch that hash every time on your domain.

But, what if you had a different type of record on ENS, that doesn’t change on each deployment, but does reference a changing IPFS hash that you can update every time without having to trigger transactions on the Ethereum network?

That’s what IPNS essentially does for you on Fleek now! IPNS is the InterPlanetary Name System, by the awesome team at IPFS, which uses content-based addressing to create a static address that references a hash record that can be updated.

It is, in a nutshell, a public-private key pair. The name (IPNS address) is the public key, and it contains a record with a hash that is updated by signing and publishing the information with the private key. IPNS addresses are mapped in [IPFS’ distributed hash tables](https://docs.ipfs.io/concepts/dht/) (distributed system for mapping keys to values).

Instead of changing your IPFS hash on your ENS name, we can now set a static IPNS address, and make your IPFS hash updates in a layer 2-ish style.

This way we can reduce ENS transactions to just 1, without losing the distributed/decentralized perks of both IPFS & ENS. When a user adds an ENS domain, a transaction will be made to change the content hash of the ENS domain to the new IPNS address.

From that point forward, all future IPFS hash updates needed every time the user makes a change/deploy will be made on that site’s specific IPNS address record, at zero cost, and no need for gas. Scalable, fast, and cost-effective.

**Does this change affect the experience in any way?** Not at all. You won’t notice anything on the platform. If you are adding a new ENS domain, you’ll have to go through one transaction to change the record to your IPNS record, and that’ll be all. If you **already have an ENS** domain, on the next record hash update / deployment, Fleek will automatically switch to an IPNS record. This means Fleek won't be set as the controller anymore, since there is no longer need for it.

**We will add the option** for users to use ENS-only in the near future, for those users that want to continue using a dynamic IPFS hash on their ENS names instead, updating their hash upon each deployment and handling the transaction themselves.

## Wrapping it up 🗞️

We’re so pumped about how the use of blockchain domains is ramping up. ENS usage alone on Fleek has been nothing but up since last year! And with this update we can ensure we can keep the pace up, and give all users the best experience possible for a long time.

Plus, the work put behind IPNS by the team at IPFS has been amazing! Since go-ipfs 0.5.0 resolving speed shot up by 30-40x and now MetaMask is also resolving its addresses. This, combined with ENS L2 (which we can’t wait to see more of!) will be key to scaling blockchain domains endlessly.

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co