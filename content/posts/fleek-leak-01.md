---
template: post
draft: false
title: 'Fleek Leak 01'
slug: fleek-leak-01
date: 2023-01-12T07:00:00Z
canonical: ''
socialImage: https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleek-leak-01.png
description: Progress update incoming ⚡️ Over the last few weeks we’ve been jamming on our CLI beta (Jan 18th), adding compute to Fleek, and an NFAs MVP. Let’s dive into why & what you can expect!
category: Blog
tags:
- Fleek Leak
- Progress
- CLI
- Akash
- Beta

---

![](https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleek-leak-01.png)

Welcome to a new year, Fleek fam! ⚡️ To kickoff 2023 we’re introducing **the Fleek Leak**, a new bi-weekly update segment for us to uncover the veil on all of the awesome things we’re cooking up. The goal is simple: involve everyone in the community more in the development process rather than just the finished product of all things Fleek.xyz.

2022 was a big year for Fleek. We announced [Fleek Network](https://fleek.network), a decentralized content and application delivery network for web3, and [Fleek.xyz](https://fleek.xyz), a new Fleek platform that empowers users to compose our services how they want & eventually even create their own Fleek services.

We left off last year taking the first steps towards sunsetting Fleek.co by [deprecating some of our old domains](https://blog.fleek.co/posts/fleek-co-gateway-storage-url-deprecation) & [turning on custom storage domains](https://blog.fleek.co/posts/fleek-co-how-to-add-custom-storage-domains). If you’re an legacy Fleek user take both of those as mandatory reading before proceeding to the good stuff.

But that’s not really why you’re here, you’re here for the juice, the alpha, on what we’ve been up to behind closed doors. Let’s go 🔥 

# So, What’ve We Been Building? ⚡️

Let’s agree to skip all of the fluff and get straight to the point, alright? Building an entirely new web3 development platform from the ground requires a lot of initial lifting. The most important things that we are actively working on and preparing for release in Q1 are:

- **Lots of services (IPFS Pinning, IPNS, Sites Deployments, etc)**
- **Shipping the CLI beta (coming soon!)**
- **Adding a new category to Fleek 🤫**
- **More NFAs stuff**

---

# Services, Services Everywhere

![](https://storageapi.fleek.co/fleek-team-bucket/Blogs/xyz-arch-services.png)

Fleek.xyz is built with a modular, independent service structure in mind (as mentioned [here](https://blog.fleek.co/posts/fleek-xyz-architecture-overview)) to unlock maximum composability, freedom, and extensibility for web3 developers. Internally, this means the ability to work on multiple services in parallel! 

We are currently focused on four main services:
- IPFS Pinning [ **Jan 18th** ]
- IPNS Management [ **Jan 18th** ]
- Sites Deployment [ **Jan 23rd** ]
- Custom Domains [ **Jan 23rd** ]

The cool thing about the new Fleek.xyz architecture is that **you’ll be able to use any of these services independent of each other or pick and choose the ones you want**. This will enable developers to create their own stack, with brand new interactions between different web3 protocols that haven’t been seen or thought of before.

The latter is sort of what we’re doing for our custodied services in our UI - We’re simply telling the story that we want to tell, in order to make use-case driven flows. For example, deploying a site to an ENS name, and automatically back up all of your asset files to the storage provider of your choice. We’ll be creating all of this by **consuming the exact same Fleek SDK that you’ll have access to**.

In addition to these four services, **we’re working on two cross-service services** (say that five times fast): Authentication & Event Passing. 

Why should you care? Both are keystone services for those who want to build their own Fleek integrations in the future. Auth for connecting new services to Fleek’s user base, already in testing, and Event Passing so that services can talk with one-another and respond to each other’s actions.

---

# Soon: CLI Beta with Pinning + IPNS

On **January 18th** (mark your calendars, it's coming up soon 🗓) we’ll be dropping the new Fleek.xyz CLI that will allow you try out two of our services.

<!-- gif of pinning beta -->

The **first service we’re debuting is our IPFS pinning beta**. Most of you probably already know the drill - upload any file to IPFS and we’ll ensure it stays pinned through our global network of nodes for everyone to retrieve. 

<!-- gif of ipns beta -->

Here’s one you haven’t seen before 👀 **Manage an IPNS** tied to your Fleek account and map any IPFS hash to it. Previously this was offered as part of the ENS flow, now access it independently and soon build with it through our SDK.


---

# Compute Is Coming…

<!-- gif -->

The title says it all 😎 we’re in the process of **adding compute options to Fleek**! 

Static sites can take you a long way, but these days more and more of the web is relying on servers to power web apps. But we don’t need to tell you guys this, **you’ve asked for this feature a lot**. The only thing holding us back was making sure that (1) the compute protocols that we integrate were hardened and reliable (2) that we could provide a solid value add versus other alternatives. We finally feel like we’re there. 

<!-- akash preview -->

**And that’s why we’re integrating with [Akash](https://akash.network/)**. 🔥

Fleek will bring significant value to new and existing Akash users by focusing on improving the developer experience & lowering the technical barriers to entry to make Akash a viable option to use in production use cases. More details & Akash compute beta coming soon.

**p.s. yes, this confirms SSR coming to Fleek.**


---

# NFAs Moving to MVP

Before the end of 2022, we [dropped some alpha](https://blog.fleek.co/posts/introducing-nfas-non-fungible-apps) on a new project we’ve been tinkering with for a while: Non-Fungible Apps (NFAs).

Since this initial release it’s been full steam ahead 🚂 We’ve been gathering feedback from some big players and trying to reconcile on some primary implementations that we could use for a first use case of NFAs. Ultimately, thanks to some valuable feedback from the [dYdX](https://dydx.exchange/) team among others, we’ve landed on **community hosting**.

In a nutshell, community hosting through NFAs will unlock the ability for web3 app owners to **allow members of their community to run frontends for them**. Similar to what [Liquity](https://www.liquity.org/) has pioneered, this expands the amount of access points to an app, further decentralizing its most vulnerable attack vector.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/nfa-roadmap.png)

In addition to the community hosting MVP, we’ve got a lot more in our backlog such as an EIP submission to fully standardize the usage, management, and consumption of NFAs.

Interested? NFAs are open source and we’ve got a working branch up and running for this MVP. You can view the code [here](https://github.com/fleekxyz/non-fungible-apps/tree/feat/app-mirrors).

---

As a last note we’re also working on some housekeeping items like **setting up a dedicated Fleek.xyz blog** (as we deprecate blog.fleek.co and migrate that content), **designing a new landing page**, and completely **open sourcing the Fleek roadmap** including a project backlog so users can keep up with everything we do.

Reminders to keep your eyes peeled on January 18th for our first beta release. If you haven’t already, sign up for the [beta waitlist](https://fleek.xyz)! Or ask nicely in our [Discord](https://discord.gg/fleekxyz) and maybe we’ll let you hop the line 😉

For more resources visit [our LinkTree](https://linktr.ee/fleek).