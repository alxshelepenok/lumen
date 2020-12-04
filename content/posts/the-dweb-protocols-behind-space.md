---
template: post
draft: false
title: The Dweb Protocols Behind Space
slug: the-dweb-protocols-behind-space
date: 2020-12-03T04:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Dweb%20Stack.jpg
description: For Space, we’re using the Dweb protocol stack in the Space Daemon. When
  combined, they allow us to break the molds of how file storage is traditionally
  made, making user-owned and non-siloed decentralized storage possible. Get to know
  what each one them helps us achieve!
category: General
canonical: https://blog.space.storage/posts/the-dweb-protocols-behind-space
tags:
- Space

---
![Distributed Web Stack Space Daemon](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Dweb%20Stack.jpg)

Building a platform for file storage and sharing where users truly own their files and accounts is a challenge that requires combining and experimenting with a lot of new technologies that are being developed for the distributed web.

For Space, we’re using a Dweb protocol stack that, when combined, allows us to break the molds of how file storage is traditionally made, and start building what we believe is the future of it: User-owned, and non-siloed decentralized storage, where users own control over their data, and decide who gets access to it.

We abstract a lot of the technical complexities with these new technologies so the experience feels the exact same as using Dropbox or Google Drive. But under the hood there is some real magic going on.

There’s still ground to cover on the [road to decentralization](https://blog.space.storage/posts/how-is-space-different-from-cloud-storage), but these technologies are allowing us to make many breakthroughs by, for example, providing user-controlled and encrypted online storage backups that we as a company can’t access.

Or by offering an account and data ownership experience that doesn’t bound the access to your online storage and files to our platform exclusively.

Let’s learn a bit more about this Dweb protocol stack, what each protocol is used for, and what they help us achieve.

## Our Ever-growing Dweb Stack

![Distributed Web Protocols](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Distributedweb.jpg)

Enough suspense! The Dweb protocol stack we are using for Space is composed of [IPFS](https://ipfs.io/), [Textile](http://textile.io/), [Ethereum](https://ethereum.org/), [Torus](https://tor.us/), and [Filecoin](https://filecoin.io/).

This stack mutates and grows as we find new combinations and ways to leverage other Web 3.0 technologies in the future.

These are all aggregated in our open source [Space Daemon](https://fleek.co/space-daemon/) and SpaceSDK, which we use in our desktop app and our upcoming web app respectively. It acts as a standard interface that packages Dweb protocols and makes them easy to utilize for everyone, so that any dev can build upon Dweb technologies and achieve the same things we’ll talk about today.

Expect more news on the SpaceSDK soon! This new version of the Dweb stack will make these protocols and their perks accessible on mobile/web. It’s a major hurdle that will open up all platforms to the Dweb experience, and we’re super excited to start sharing it with you.

Now, let’s take an in-depth look at how each of these protocols is used in Space...

## IPFS, the Base Storage Layer

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/IPFS%20Distributed%20Web.jpg)

**What is IPFS?** - The interplanetary file system is a distributed web protocol that enables a peer-to-peer network for data storage and sharing.

Instead of storing your files on a company’s servers, it follows and enables a Web 3.0 paradigm for storage, where each user can become a node or “server” in a distributed network and put their storage in service for hosting and sharing data.

It changes the web’s structure to a participative one, where many individuals across a network can ensure availability and access to files, instead of a centralized authority.

**How does Space use IPFS?** - In Space, IPFS is the base storage layer, which also handles content discovery & routing.

It gives users the ability to store and share files on IPFS, locally or online, without them being centralized entirely to us as a company. Each user has their own IPFS node running locally, that represents their offline/local Space storage, and that storage is then mirrored to the IPFS/Textile nodes we run for to give them access to online backups, and 24/7 availability for sharing.

IPFS has two special characteristics that define how files stored in Space are not siloed or exclusive to our platform. It acts as an open data layer, meaning that what is stored on IPFS is visible to the IPFS network and can be accessed/retrieved from other interfaces (not just Space), as long as you know the file’s hash and/or have your key (which is needed for viewing encrypted IPFS files).

The file hash is its second characteristic. Files on IPFS are content addressed, meaning that to search for a file you address it by what its content is, not by using a URL to its storage location, because that might change and switch over time.

Each file has a unique hash based on its content, and when a user wants to retrieve/search for a file, they specify that hash to the IPFS network, which then searches across peers to find accessible locations, and retrieve the file.

## Textile, for Encryption and Synchronization

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Image%2032.jpg)

**What is Textile?** - If IPFS is the base open storage layer, then Textile is the infrastructure that builds on top of it to expand its capabilities.

It allows for encrypted storage, folder management, data synchronization, and permission-based sharing of files/folders on IPFS, as well as file ownership which isn’t a native concept to IPFS. The latter is important to further develop the idea of users truly owning their files, and it is done by linking a file to a user’s public key.

The two key components of Textile used in Space are Threads, which act as an append-only database of logs between peers that is able to synchronize data across peers on IPFS; and Textile Buckets, which enable remote dynamic folder systems and shared file management on IPFS.

**How does Space use Textile?** We use Textile in many different ways, but primarily we combine it with IPFS to build our core storage experience.

Textile’s Buckets and Threads, combined with our own AES-256 encryption, allow us to give users the perks of distributed local/online storage on IPFS, with the advantage of a sturdier folder management system, added privacy in the network, and an opt-in access control where users can specify who has access to their stored files.

On desktop, each user has their own local Textile/IPFS bucket where they can store encrypted and offline, which is synchronized with a mirrored Bucket on our IPFS/Textile node network. This replication is done by a Textile Thread, which links both Bucket instances and keeps them synchronized.

## Torus, for Account Key Management

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/TorusLabs.jpg)

**What is Torus?** - Torus is an open source, decentralized key management system that provides for non-custodial key management, abstracted and applied to the sign-in experiences that users enjoy today, such as social sign-ins, and OAuth.

In a way, it allows the best of both worlds when it comes to authentication methods, since it facilitates Web 2.0 notions like account recovery tools and one-click logins across devices, in a Web 3.0 context where account authentication is key-pair based.

**How does Space use Torus? -** We use Torus to decentralize authentication out of our platform, and give users the option of having a key-pair based authentication, but with convenient ways of remotely accessing their keys across any device, or platform (web/mobile).

For authentication, we link users to Ethereum Keys that are sharded and stored on the Torus network. Torus abstracts the key management aspect of the experience on the application, and provides users with a familiar authentication experience (like email magic links, or social sign-ins) to store, recover, and use their keys.

It gives us the flexibility to provide known experiences (social logins), but built in a decentralized and non-custodial way that ensures users are in control of their keys. Plus, it gives us alternate methods of account recovery (instead of seed phrases) to complement with using a Metamask or other Ethereum wallet with your account.

## Ethereum, for Authentication, Payments, & More!

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Ethereum.jpg)

**What is Ethereum? -** Ethereum is a decentralized programmable blockchain with smart contract functionality. Aside from its monetary aspect, it provides a platform for creating decentralized applications and program interactions of both value and action.

**What does Space use Ethereum for?** We use Ethereum keys as the main component for every user’s authentication, tied down to their username. We truly think Ethereum keys are the future of authentication, and it gives us the freedom to integrate things like crypto payments natively into our platform.

For crypto payments, we also use smart contracts on Ethereum. These are set to accept the user’s payment (via credit card / crypto), and tie it to the user’s account (wallet) to give it a referencial dollar balance (based on the value of the coin on the day of the payment).

It also unlocks a lot of possibilities for the future, since having Ethereum keys means we can give room in the future for tokens, NFTs, DAOs and other new interactions on Space.

## Filecoin, an Upcoming Storage Alternative

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/Filecoin.jpg)

**What is Filecoin? -** Filecoin is the continuation of IPFS, built by the same team at Protocol Labs. It’s a cooperative storage network, like IPFS, but with an incentive layer built on top of it that entices users to join and “rent out” their storage space to a network that rewards them for it.

This is the next step in distributed/decentralized storage, where the term user-owned takes full meaning. It would take the traditional cloud storage rental, controlled by a single entity and prone to abuse or control, and replace it with a decentralized network composed of users, storing files in a trustless way that’s user-owned and controlled.

**How is Space using Filecoin?** Space doesn’t offer Filecoin storage openly yet, but we are looking forward to seeing the platform cross milestone after milestone to become a performant alternative, and we’re beginning work to add it as an additional option for backup storage for Space users next year.

It is part of our vision of providing users with several trustless ways to store and backup their files, whether it is to run their own personal node cluster on IPFS, or use a trustless network of decentralized peers on IPFS, or Filecoin, etc.

## A Constant Open Source Evolution

Like we said before, this set of technologies is what today helps pave the way on Space’s road to decentralized file storage. Each of these protocols is evolving day by day -just as of this week ETH 2.0 reached Phase 0 successfully- and will continue to amaze us with new cool use cases that help further build the distributed web.

As we discover and implement these new use cases and Dweb perks in Space, we’ll continue to make them available so that everyone can apply them, easily. Stay tuned to updates on our [Github](https://github.com/FleekHQ)!

Everything we talked about today, and what’s to come in Space and the Space Daemon dweb protocol stack is (and will be) open source, documented, and shared for everyone to use and work upon to build the next standards of the distributed web. 🎊

* Sign up for [Space Beta](https://space.storage)
* Follow us on [Twitter](https://twitter.com/spacestorage)
* Reach out at hi@space.storage
* Check out our [Tech Docs](https://docs.fleek.co/space-daemon/overview/)
* Spread the word