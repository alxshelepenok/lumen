---
template: post
draft: true
title: 'Introducing the Space SDK: Build Your Web & Mobile App on the Open Web'
slug: introducing-space-sdk-release
date: 2021-02-02T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/Blog Inline/SpaceSDK.png
canonical: https://blog.space.storage/posts/introducing-space-sdk-release
description: The Space SDK is a complimentary framework that enables the use of features
  enabled by IPFS, Textile, Ethereum, GunDB, and other Open Web protocols via the
  Space API.
category: Release
tags:
- Textile
- IPFS
- GunDB
- Space

---
![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/SpaceSDK.png)

The team’s thrilled to showcase our latest open source endeavor… A new library for developing decentralized applications on web and mobile: **the Space SDK!**

The **Space SDK** is a JavaScript/TypeScript library that you can integrate with your **website or mobile application** to enable them to store files in a user-owned way on the distributed web ([IPFS](https://ipfs.io/)/[Textile](https://textile.io/) nodes), and easily access to more Web 3.0 protocols via an implementation of the Space API.

**You can find the repository and documentation here:**

* [Space SDK Github Page](https://github.com/FleekHQ/space-sdk)
* [Space SDK Documentation](https://fleekhq.github.io/space-sdk/docs/)
* [Entire Space SDK package breakdown](https://fleekhq.github.io/space-sdk/docs/sdk)

This is an early version of the SDK, and more updates are coming to it this week as its first expansion (Sharing features), as well as in the upcoming months as we test it out in the open and receive feedback and suggestions to explore new ideas!

The Space SDK is a complimentary framework that enables the use of [IPFS](https://ipfs.io/), [Textile](http://textile.io/), [Ethereum](https://ethereum.org/), [GunDB](https://gun.eco/), and other Open Web protocols via the Space API, **without the need of running local instances** like an IPFS node on the user’s device, and allowing for web and mobile experiences that can:

* Store files and data in user-controlled storage.
* Enable public or private and e2e encrypted file sharing.
* Integrate a user-owned key-pair based identity system.
* Host/deliver content via user-powered global data layers (coming soon!)

All features in the Space SDK are simplified. Things like storage, file sharing, key-based authentication are easily accessible via **ready-to-use methods** 🔥

Unlike the Space Daemon, the Space SDK is **modular and protocol agnostic**. Each module can be customized, meaning, you can take advantage of each module as it is with the protocols/connections we provide, use it as a framework to plug in your own implementations, or replace a piece alltogether!

For example, instead of using the default connection to the Textile hub on the Storage module, **you can replace it with your own storage layer** -for example, [Hypercore](https://hypercore-protocol.org/)- and still be able to work with the rest of the SDK’s functionalities.

That’s how we built the Space SDK: flexible, light, and as mobile and web friendly as possible.

## Different needs, the same perks

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/SDK Chart.png)

If you recall, earlier last year, we released the [Space Daemon](https://github.com/FleekHQ/space-daemon), a library for **desktop** that comes with IPFS/Textile nodes, exposed gRPC methods for features like encrypted file upload, file sharing, user-controlled accounts, and more tools for building Open Web applications, under the same underlying protocols.

Today, the Space SDK arrives to **make all of these features readily available on web/mobile.**

The main difference between the two, aside from the fact **the SDK is built on JavaScript while the Space Daemon is built on GoLang**, is that the Space Daemon embeds an IPFS/Textile node and caches files there, while the SDK only uses GunDB’s decentralized database for storing file/bucket metadata and keys, and relies on the remote Textile Hub for distributed online storage.

This switch comes with a great perk. Not only can web/ mobile apps can access Space’s distributed storage network. But, in the future, we expect to open up Space so that our users, and any other platform **and their users**, can host and deliver content via Space’s open storage layer.

This is one of many stops on our exploration of ways to provide an interface for decentralized storage for both users, and platforms, so stay tuned as we bring more updates later on this year.

## Features Under the Hood

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Features.png)

The Space SDK continues the trend of letting applications distribute their storage, and give users true ownership over their accounts and data. From **user-controlled storage and key management, to end-to-end encrypted file sharing** and interactions powered by Open Web protocols.

Most features available in the Space Daemon are available in the Space SDK, and **those that are not will be added soon, like Sharing!**

These methods are accessible via different interfaces, which are easily replaceable or reconfigured if you want to use your own storage/auth/identity/etc layer.  
Currently, the SDK has the following APIs:

## Users API:

The User Module handles a couple of elements regarding user identity and authentication management. The default implementation provides a basic identity layer on top of the Textile Hub, handling key generation and retrieval for each user, authentication, and session tokens.

* Identity creation and management
* Challenge-based authentication
* Passphrase key backup

## Storage API:

The Storage Module enables web/mobile applications to upload, pin, manage, and fetch files and data from IPFS/Textile, programmatically, using CRUD operations. By default, it points to the Textile Hub and Space Services, but it can be modified to connect other storage layers. [GunDB is used as the default metadata storage](https://fleekhq.github.io/space-sdk/docs/sdk.gundbmetadatastore) used by the UserStorage class.

* Create files / directories
* List files /directories
* Create buckets 
* Sharing **(coming soon!)**

### Interface Highlights ✨

We already went under the hood to see the features the modules/APIs enable, now let's dig a layer deeper and highlight some useful interfaces that are behind those features! You can see all interfaces in the [package breakdown here](https://fleekhq.github.io/space-sdk/docs/sdk).

For example, the **Vault interface**, used by the Users API to store and retrieve sensitive credentials in a secure and encrypted way.

Or the **UserMetadataStore,** that includes all actions to create, update, and retrieve user Bucket metadata records.

## Getting Started: Installation

Installing the Space SDK is extremely quick and easy. Just use the following npm command to install the library and get started:

    npm install @spacehq/sdk

That's all! You're set to get started using our different APIs.

**Users / Identities example:**

    import { Users } from '@spacehq/sdk';
    
    const users = new Users({ endpoint: 'wss://auth-dev.space.storage' });
    
    // createIdentity generate a random keypair identity
    const identity = await users.createIdentity();
    
    // the new keypair can be used to authenticate a new user
    // `users.authenticate()` generates hub API session tokens for the keypair identity.
    const user = await users.authenticate(identity);
    // `user` can be used with the storage class to provide identity.
    
    // user's identity can also be backed up with a special recovery phrase
    const uuid = 'specify-uuid-representing-user-in-your-system';
    const passphrase = 'specify-unique-pass-phrase-related-to-backup-type';
    const backupType = VaultBackupType.Google;
    await users.backupKeysByPassphrase(uuid, passphrase, backupType, user.identity);
    
    // backed up users identity can also be recovered later
    const recoveredUser = await users.recoverKeysByPassphrase(uuid, passphrase, backupType);
    // `recoveredUser` has same authentication as `user` above.
    

Want more examples? Read the [User's class document](https://fleekhq.github.io/space-sdk/docs/sdk.users).

**Storage example:**

    import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';
    
    const storage = new UserStorage(user);
    await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
    const result = await storage.listDirectory({ path: '' });
    // result contains `topFolder` items
    
    // upload a file
    const uploadResponse = await spaceStorage.addItems({
       bucket: 'personal',
       files: [
         {
           path: 'file.txt',
           content: '',
         },
         {
           path: 'space.png',
           content: '',
         }
       ],
    });
    // uploadresponse is an event listener
    uploadResponse.once('done', (data: AddItemsEventData) => {
      const summary = data as AddItemsResultSummary;
      // returns a summary of all files and their upload status
    });
    

Want more examples on storage? Read the [Storage API's documentation.](https://fleekhq.github.io/space-sdk/docs/sdk.userstorage)

# Open Source and Collaborative

The Space SDK is an open source community endeavor. Every module in it is open for developers to build with, expand, and explore without limits, and we will continue to develop it hand in hand with the community!

We think the path forward to the distributed/decentralized web is open source and collaborative, and that is why we’re building the Space SDK as a modular and flexible set of tools that are not bound to a single use case or the current Open Web stack.

# Start Building, and Share With Us

You can get started with the Space SDK on its [Github page](https://github.com/FleekHQ/space-sdk), and join our [Developer Community](https://slack.fleek.co/) in Slack to share your project or chat with the team if you have any questions/suggestions.

We’re looking forward to seeing what cool projects come up! It’s exciting to think that, with the SDK, Dapps and websites across all platforms (web/mobile/desktop) can explore new ways of providing Web3 enabled features 🔥

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co