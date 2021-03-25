---
template: post
draft: true
title: IC Action - An Open Source GitHub Action to Deploy Canisters to the Internet
  Computer!
slug: ic-action-deploy-canisters-internet-computer
date: 2021-03-25T03:00:00Z
socialImage: ''
canonical: ''
description: ''
category: ''
tags: []

---
We're back with a surprise open source release for developers working on DFINITY's Internet Computer! The team just made public the [**IC Action**](https://github.com/FleekHQ/IC-Deploy-Action)**,** a GitHub Action anyone can use to deploy **any type of canisters** to DFINITY's Internet Computer via GitHub's CI.

This IC deploy action wraps commands from [DFINITY's DFX](https://github.com/dfinity/docs) command line tool, triggering new deployments from your GitHub commits that deploy and update canisters on the Internet Computer.

## The Internet Computer & Fleek

If nothing rings a bell, well, _you've missed a big one_. A couple weeks ago we announced that Fleek was joining the [Internet Computer's ecosystem](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting) in full force, releasing a stack of IC-focused features to Fleek:

* Static frontend hosting on the Internet Computer
* A new Internet Computer HTTP Gateway
* Canister Proxying

In Fleek, DFINITY's Internet Computer comes as an alternative to IPFS, hosting wise, with a different set of perks and purpose. It's a trustless, permissionless, and open blockhain-based infrastructure that in the future could allow us to rebuild Fleek on top of a 100% trustless infrastructure. But, if you look outside of Fleek, it is much more.

The Internet Computer itself is a new approach at rebuilding the web through a unified protocol capable of running the entire base layer of the web (hosting / storage / services/ etc..) in that open and decentralized blockchain network.

And in the center of it all? Canisters.

On the Internet Computer, everything lives in canisters. Think smart contracts on Ethereum, but capable of powering FE, BE, and pretty any web service because they include both program and state. Its execution is still governed by a secure protocol (the Internet Computer Protocol), but unlike Smart Contracts, they can host scaling services more performantly, as they are designed for it.

If you're still catching up with the IC, we suggest you binge watch the ["Exploring Entrepeneurship in the Open Internet Boom"](https://dfinity.org/techcrunch/), hosted by DFINITY, and start prepping up for Mainnet's Beta Genesis, because it's closing in fast

## Fleek's IC Deploy Action for Deploying Canisters via GitHub

There are many ways to deploy and work with canisters, like DFINITY's [dfx CLI](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html) and SDK. But, after some work we thought everyone could use a little CI on their canister management lives, so the team jumped onto the task and built this open source tool for it!