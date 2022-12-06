---
template: post
draft: true
title: An Overview of Fleek.xyz’s Architecture
slug: fleek-xyz-architecture-overview
date: 2022-12-05T16:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/thumbnails/Fleek-XYZ-Architecture.png
canonical: ''
description: New architecture who dis? Here’s a high level overview of how our new
  platform was designed & why it unlocks total freedom, flexibility, and extensibility
  for web3 developers.
category: GENERAL
tags:
- Extendability
- Fleek.xyz
- Architecture

---
![](https://storageapi.fleek.co/fleek-team-bucket/thumbnails/Fleek-XYZ-Architecture.png)

TL;DR

* The new fleek.xyz is extensible, enabling external contributors to build and surface new services and features leveraging any underlying infra/protocols.
* Building services is made simple thanks to the new fleek.xyz architecture centered around 4 key building blocks: CLI, SDK, open API, and UI
* All Fleek.xyz services will be independent of each other, where one or many of the building blocks can be leveraged, and developers can pick and choose which services they want and discard the rest.
* Interested? [Sign up to be one of our beta testers](https://fleek.xyz).

***

In case you’ve missed it, [we’ve just announced our Series A led by Polychain](https://blog.fleek.co/posts/introducing-fleek-network-and-fleek-xyz). One of the reasons we’ve raised is to build Fleek.xyz, a next-gen development platform for web3, and the successor to our current Fleek.co platform.

In an effort to build more in public, this blog is part one of a two part series that will outline the what, why, and how of Fleek.xyz development. Part one, this blog, is a dive into **what is the new Fleek.xyz architecture and why it unlocks total freedom, flexibility, and extensibility** for web3 developers. 

Part two will be released next week, outlining how we are already actively making strides to get there.

***

# A New Way of Doing Things

![](https://storageapi.fleek.co/fleek-team-bucket/Blogs/xyz-arch-blocks.png)

The new Fleek.xyz platform is all about having the freedom and flexibility to create what you want. We’re releasing four core building blocks to enable you to do so – **a CLI, SDK, open API, and UI.**

Each building block gives you access to all of the Fleek services, just in different ways. For those who want a more uniform, directed experience, access our platform and services through our UI. For those looking to compose new services leveraging any of our underlying services/protocols, our CLI, SDK, and API will be your friend.

When new services/protocols become available (maybe Akash or Arweave 👀), they will bubble up from CLI, to SDK and API, then finally landing on the UI. Along the way, each new feature will go through a public beta where some of [our power users](https://discord.gg/fleekxyz) will get the chance to provide valuable feedback.

***

# Peeling Back the Layers

![](https://storageapi.fleek.co/fleek-team-bucket/Blogs/xyz-arch-services.png)

Going one level deeper, we have Fleek services. Each service is independent of each other and together are accesible from all of the four core building blocks (see diagram above).

**The key word here is independent**. Internally, independent services mean that we can move fast, without worrying about how changes might affect other services or the teams building them. It also means that projects like templates (yes, definitely coming in the future) are able to be bootstrapped to production way quicker than before.

For developers building with Fleek, independent services gives maximum freedom of expression by allowing devs to **pick and choose exactly what they want to build with and discard the rest**. Only looking to manage your IPNS records with Fleek but don’t need hosting or storage? Go for it. No strings attached.

***

# What This Means for Web3 Devs

Most importantly, our new architecture **unlocks total freedom in the ways that you can use and extend our platform.**

From day one, this means you’ll be able to pick and choose how you want to interact with our services (CLI, SDK, open API, and UI) and how you want to compose them using together to leverage the underlying services and protocols.

Later on, this means giving **developers and protocols themselves the freedom to extend the Fleek platform how they see fit**. Don't see service that you or your community would find extremely valuable? Build it yourself. Our main goal is to provide friendly low-level tools for others to experiment and add cool new features that we would never have thought of!

Lastly, this update means that we’ll be able to ship to you faster. Expect supercharged development cycles in public. There will be plenty of room for beta testers to get involved and help to shape how our tools look. If this sounds like you, [let us know](https://discord.gg/fleekxyz)!

***

That’s all we’ve got for you today. Building in public ftw!

Part two of this series on the _how_ of Fleek.xyz development is coming soon, including how we structure teams around services and _how_ new services are created.

In the meantime, join [our discord](https://discord.gg/fleekxyz), follow [our twitter](https://twitter.com/fleekxyz), and sign up for [our beta waitlist](https://fleek.xyz)!

**.. oh, and we’re building a decentralized content & application delivery network called** [**Fleek Network**](https://fleek.network)**. Go check it out, it will play a key role in Fleek’s story in 2023 and beyond.**

⚡️