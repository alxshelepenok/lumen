---
template: post
draft: false
title: 'Non-Fungible Apps (NFAs): Community Hosting'
slug: nfa-community-hosting
date: 2023-01-21T04:00:00Z
canonical: https://blog.fleek.xyz/post/nfa-community-hosting/
socialImage: https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/community-hosting-thumb1.png
description: Update incoming! We’re working on an initial implementation of Non-Fungible Applications (NFAs) that focuses on decentralizing the access points to community owned web3 apps.
category: Blog
tags:
- NFT
- Progress
- Non-Fungible Apps
- NFA
- Community Hosting

---

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/community-hosting-thumb1.png)

**TL;DR** 
- The NFAs project now has a dedicated team & roadmap!
- Thanks to feedback from our ecosystem we’re focusing the NFAs MVP on community hosting.
- NFAs will empower communities to support their favorite web3 apps by creating new access points to their frontend.
- Fleek will hook into the NFAs contract to expedite the verification process.

---

A month ago we dropped an announcement that we were working on a new web3 primitive: Non-Fungible Apps (NFAs). If you missed the announcement, [go read it](https://blog.fleek.co/posts/introducing-nfas-non-fungible-apps), brush up on the core concept of NFAs (at least the TL;DR), and this blog will make much more sense.

Today, we’re back to announce that we’re working on the MVP for NFAs (to be released in April) that will have a large focus on **decentralizing one of the most vulnerable yet most used parts of web3 apps – their frontend**. In tandem with the Fleek.xyz platform, community hosted NFAs will enable founders, DAOs, and developers alike to empower their community to run verifiable frontends for them. 

We’ll touch on a few different topics in this blog, jump ahead using the links below:
- [What are NFA Access Points and why should I care?](#decentralizing-web3-app-access-points)
- [What progress has been made on NFAs and what is left?](#mvp-development-progress)
- [How does Fleek tie into all of this?](#so-how-does-fleekxyz-fit-into-the-picture)

Prefer to dig into code instead of reading? You’re in luck, NFAs have been open source from day one and we’ve got [an MVP working branch](https://github.com/fleekxyz/non-fungible-apps/tree/develop) in development for you to check out. 

---

# Decentralizing Web3 App Access Points

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/nfa-blog-infographic-3.jpeg)

Community hosting will enable NFA owners to **store a verifiable on-chain list of approved frontends for their web3 app**. Community members who wish to extend the censorship resistance of their favorite web3 app’s frontend will be able to mint their own mirror of the NFA that we’re calling **Access Points**. 

In their simplest form, NFA Access Points will be **independently run domains that point to the frontend content (in the form of IPFS / IPNS content hash) of the NFA that they’re mirroring**. When an NFA updates their frontend contents, the new content hash will trickle down to all Access Points, ensuring that all Access Points consistently point to NFAs frontend.

With multiple access points to the same frontend content, an app’s resilience to censorship goes up. For example, if Fleek’s frontend was minted as an NFA and Fleek.xyz (our official frontend) went down, community hosted versions (let’s imagine they’re something like fleek4ever.co and imonfleek.xyz) would still be able to serve our frontend’s content to users.

To keep Access Points trustworthy, NFAs will implement a social moderation component as well. “Watchers” will be able act as community stewards by independently validating that Access Points are redirecting to the proper NFA/Frontend content, and report when an Access Point is misbehaving. 

For user safety, we’re creating an extension to MetaMask snap that ensures that the domain you’re accessing points to the exact frontend content set by the NFA. Wallets who surface NFAs will also be able to surface Access Points to increase the amount of trusted access points for web3 app users. Goodbye sketchy phishing domains 🎣.

---

# MVP Development Progress

It’s official, **the NFA project now has a small team inside Fleek** dedicated towards pushing the project forward! 🥳

First item on the team’s list: figure out what needs to be done to have an NFA MVP done for April, package those stories & features up in a roadmap, and start executing. 

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/nfas-mvp-waterfall.jpeg)

The road to NFAs MVP mainnet consists of three main components that are actively being developed in parallel. 

## App UI
While anyone will be able to interact with the NFA contract directly, we’re building an official frontend for minting NFAs from source, managing access controls to NFAs, and easily minting new NFA Access Points.

## Contracts
Alongside the first NFAs release, we dropped [NFA’s V0](https://github.com/fleekxyz/non-fungible-apps) which included a POC from which the NFAs contract could be hardened from.

We’re currently working on extending the V0 contracts to include logic for new things such as community hosting, on-chain SVG storage for NFA preview images, and gas optimizations.

  Once solidified, we’ll bundle all of this up into [an EIP](https://eips.ethereum.org/) for maximum visibility & composability within the ecosystem, and then deploy the NFA contract to Polygon’s mainnet.

## Fleek / Off-Chain
To add some extra magic 🪄 to NFAs we’re spinning up a few off-chain components: 

- An NFAs subgraph via TheGraph protocol ([PR here](https://github.com/fleekxyz/non-fungible-apps/pull/72))
- Build verification pipeline leveraging Fleek.xyz.
- DNS verification for Access Point validity.

The subgraph will enable easy composition of NFA data (**say, for wallets looking to surface NFAs 👀**) and the build & DNS verification are key components to keeping NFAs honest.

Build verification will leverage Fleek.xyz’s build pipeline to verify that the source code of the NFA matches the decentralized storage hash in the NFA’s metadata & give it a verified tag if true. 

---

# So, How Does Fleek.xyz Fit into the Picture?

We are building the NFA contract with the Fleek.xyz platform in mind. We see the contract as a way for on-chain management of web3 apps and, with the users permission, integrations with outside services (such as build verification through Fleek.xyz). 

The Fleek.xyz team will also be spinning up an official NFA frontend for minting and managing your NFAs, available at **nfa.fleek.xyz** in April. 

In the future, **NFAs will be fully integrated into the Fleek.xyz platform**. For example, you will have the option to mint their site as an NFA during deployment. New pushes to your tracked github repo would get built & could automatically update your NFA’s metadata (& get propagated down to all access points mirroring your NFA) without you having to do a thing. 

---

That’s a wrap! If you’ve got any questions, want to start playing around with NFAs early, or want to contribute some code (we’re open source, ya know) hop over to [our Github](https://github.com/fleekxyz/non-fungible-apps0) or [our Discord](https://discord.gg/fleek)! 

Enjoyed brushing up on NFAs? You’ll love our other recent blogs:
- [Introducing NFA’s: Non-Fungible Apps](https://blog.fleek.co/posts/introducing-nfas-non-fungible-apps)
- [Fleek CLI Beta Announcement (w/ IPFS Pinning)](https://blog.fleek.co/posts/release-ipfs-pinning-ipns-beta-fleek-xyz)

For all other socials, docs, contact info, and more, checkout [our Linktree](https://linktr.ee/fleek) ⚡️ 
