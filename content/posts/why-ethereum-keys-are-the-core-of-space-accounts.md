---
template: post
draft: true
title: Why Ethereum Keys are the Core of Space Accounts
slug: why-ethereum-keys-are-the-core-of-space-accounts
date: 2020-12-09T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Space Ethereum.jpg
canonical: https://blog.space.storage/posts/why-ethereum-keys-are-the-core-of-space-accounts
description: Learn why we see Ethereum keys as the future of authentication, and as
  a seamless bridge between Space and Ethereum-based use cases, such as tokens, DAOs,
  NFTs, and Dapps, that can benefit from distributed and user-owned storage.
category: General
tags:
- Authentication
- Ethereum

---
![Ethereum keys in Space Storage](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Space Ethereum.jpg)

In our last piece, we talked about the [Dweb protocols ](https://blog.space.storage/posts/the-dweb-protocols-behind-space)behind the building of Space, and how each of them allows us to take our platform further away from Web 2.0 and into Web 3.0.

One of those protocols is Ethereum, which we think of as the centerpiece of our user’s accounts. We want to tie each user to an ETH key/address, whether they sign up using email and social accounts (via Torus); or by linking their own ETH wallet (via MetaMask or Wallet Connect).

Why? There are many reasons behind this choice. The first and most immediate one is that we think Ethereum keys are the future of authentication. The second one is a long term one. When we think about the future of Space and the Dweb, we see Ethereum as the main connection point for a wide array of tools and use cases that benefit from pairing with a user-owned platform.

Let’s go over a couple reasons and what they mean for us…

## Exploring the Future of Authentication

![Authentication](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Enter%20Password.gif)

At Space, we’ve discussed several times about what the future of authentication looks like. Whether you sign up using email, social media, or an ETH wallet, we all agree with one thing: public/private key pairs proved to be a solid alternative to passwords, and an overall better authentication model.

So far, key pairs have addressed key issues in the authentication process, and many core negative aspects of the Web 2.0 auth paradigm.

We can see this from the get go if we compare both models. With passwords, authentication is handled from the platform’s end, with the user having to expose their main credentials every time to the platform, who also keeps these credentials on their end.

Key pairs, on the other hand, allow for blind verification of a user’s identity, since they don’t need to expose their private key but sign proof that the platform can verify by just knowing the user’s public key.

This means there’s a lot less instances the user has to worry about when it comes to their credential’s security.

However, we do also understand that key pairs fundamentally change the user’s experience entirely. Generating, saving, and safekeeping keys is not the standard experience everyone, and making a hard switch would mean exposing users to a new model that has its own security needs, and ways of handling/storing/backuping than passwords.

Convenience is a known security killer, and we don’t want users to make sacrifices either in their safety, or their experience.

![Experience changes](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Change.gif)

That’s why we’re focusing on finding a place in-between for users to leverage the best aspects of key-pair based authentication, and still maintain a seamless and known login experience. We want to provide a wide selection to cover the spectrum, for both those who simply want to use their email as a login, for example, and those who want to handle their ETH keys with a crypto wallet.

Torus helps us achieve that for the first group, by abstracting key management and letting us provide users with a known sign in experience in the front (using Twitter, or Email magic links, etc.), while abstracting and securely retrieving the users Ethereum private key in the background, via a distributed, non-custodial, sharded key network (the Torus network) that a user can authenticate to with any of their usual, and quick login options.

That way, we can provide a flexible flow for each user without having to grandfather the platform to an authentication model that we think is not the future, and we can build the platform from the ground up so that every user can transition to key-pair auth more easily.

## Rethinking Account Ownership

![user-owned accounts](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Account Ownership.jpg)

There’s another reason, other than security, behind our choice to work with Ethereum key pairs.

Today, accounts in services are usually centralized, and tied in exclusivity/ownership to the platform itself, and not to the user. That’s why in Web2 we have an endless stream of different accounts for each service, all bound to the platform’s existence.

We see Ethereum keys as the opportunity to switch accounts from entity/platform controlled to completely user owned and controlled. Where instead of a platform authorizing you to use their platform internally, you -as your own entity- would authorize different platforms to access your own personal account and permission each platform to access just the specific data it needs in order for you to use the service.

In the storage world itself this has a special connotation, because today not only is your account tied to a specific storage platform, but your storage/files/data are as well.

As we move forward towards distributing storage (on IPFS, Textile, Filecoin, etc), we want to give users the chance to truly own their account and storage, and be able to choose how they want to access it, and where.

We view files stored in Space as platform and interface agnostic, and in that vision, Ethereum keys play a part in building user-owned accounts that are not siloed or specific to the Space interface itself, but rather existing on an open global data network (or the user’s hands) for the user to own.

It’s an ever evolving and improving concept, but we are looking to break the traditional way of handling storage, where companies own the data/accounts, and move towards a place where platforms just become interfaces for a user to surface, manage, and interact with their files/data that live on this open global file/data layer (powered by IPFS and Textile).

## Opening up to Ethereum Use Cases

![ethereum use cases](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Ethereum Keys.jpg)

The final and longer term reason for using Ethereum keys in our architecture, is to serve as a seamless bridge between Ethereum based use cases, and their potential data/file storage, hosting and access needs.

Ethereum is a melting pot of decentralized use cases and possibilities that benefit a lot from integrating with each other.

From tokens, DAOs, NFTs, to the wonderful array of Dapps that are growing each day, it’s simply natural to think that any of these could benefit from being able to interact directly with distributed and user-owned (or ETH wallet or contract owned) files/data.

For us, Ethereum is the base layer that everything will be controlled from in the future (using ETH wallets or contracts), and so having an ETH key/wallet associated with each user allows us to explore combining and integrating different ETH use cases (tokens, DAO’s, NFT’s, etc.) into Space without having to rebuild the wheel and isolate our platform from an already thriving decentralized environment.

For example, by enabling ETH and ERC20 payments, in the future that could evolve into users being able to seamlessly create paywalls or different access token based mechanisms in front of files or content stored in Space.

Or by taking the “user-owned” nature of NFTs to a new level, and allowing users to store/serve the image/file related to their NFT (which lives on IPFS) in the same account as the token itself (which lives on Ethereum) - rather than just relying on NFT platforms to keep the NFT image/file pinned and existing on IPFS forever.

There’s definitely a lot of exciting opportunities for Space to grow, and for the developer community to build on Space and take some of these ideas to the next level (using the SpaceSDK for web or mobile apps or Space Daemon for desktop apps).

Storage is the cornerstone, and from there, there’s a lot of Space to explore! 🚀🚀

* Sign up for [Space Beta](https://space.storage/)
* Follow us on [Twitter](https://twitter.com/spacestorage)
* Reach out at hi@space.storage
* Check out our [Tech Docs](https://docs.fleek.co/space-daemon/overview/)
* Spread the word