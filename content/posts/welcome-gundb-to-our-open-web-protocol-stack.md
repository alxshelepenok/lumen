---
template: post
draft: false
title: Welcome GunDB to our Open Web Protocol Stack!
slug: welcome-gundb-to-open-web-protocol-stack
date: 2021-01-20T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/Blog Inline/Gun-Open-Web.jpg
canonical: https://blog.space.storage/posts/welcome-gundb-to-open-web-protocol-stack
description: 'Today, the Open Web stack grows with GunDB, a distributed graph database
  that works in a decentralized network in a peer-to-peer way. '
category: Announcement
tags:
- GunDB
- Space
- SpaceSDK

---
![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Gun-Open-Web.jpg)

When we talk about what the Open Web protocol stack looks like, we’re extremely certain of one thing: **it’s ever-shifting**. It needs to be! Unlike the current web, where the underlying layer doesn’t move a lot, the next web has to be a flexible environment ready to take on new growth and not be bound or bogged down by dependencies.

Today, in one of these evolutions, we’re excited to **welcome** [**Gun**](https://gun.eco/) **-or GunDB- to our stack!**

Gun is a graph database sync protocol with a focus in decentralization, privacy, and encryption. It works anyplace where JavaScript does, and doesn’t require you to install a binary. It helps power communities and P2P platforms like the Internet Archive, **and now Space as part of the Open Web stack!**

The Open Web stack, as a reminder, is a set of decentralized and/or Web3-focused protocols that power the underlying features of the Open Web. As of today, our stack includes **Filecoin, IPFS, Textile, Ethereum, Torus, and now Gun!** These protocols, when combined, help power features like user-owned and controlled storage, Ethereum-based accounts, and other Web3-enabled features.

We’ve packaged these protocols and the features they enable into [open source libraries](https://github.com/FleekHQ) we’re using to build Space, and that we share for anyone who wants to power their apps/sites using the underlying protocols of the Open Web: The [Space Daemon](https://github.com/FleekHQ/space-daemon), for desktop-based applications, and the upcoming SpaceSDK, **the next evolution of the Daemon**, which will also open up these features to browser and mobile as well.

## The Challenge to Solve

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/challenger.webp)

We are currently transitioning from using the Space Daemon, a desktop focused library, to the SpaceSDK for building V1 of Space. Initially, we intended to release the desktop version of the application first.  
  
But, seeing that the SpaceSDK has a higher compatibility platform-wise and future-proofness, we decided to release V1 of Space in the shape of a browser application using that library. The flexibility and power of the SpaceSDK **(you will see more of it real soon!)** means in the future it will be easier to port it to other platforms as well, so building it forward was a no brainer.

However, this shift brought a couple of changes to Space’s initial architecture, which involved the usage of local storage. Storage-wise, there wasn’t an impactful change. Files are still stored online in IPFS/Textile nodes without trouble, without requiring a local mirrored instance.

But, the metadata for those files, their schema, and other sensitive information such as the encryption keys for them **were previously stored locally** on the user’s device, in a Thread in the user’s local Textile instance, which the Space Daemon brought.

Switching to browser and the SDK means **there are no locally hosted Textile/IPFS nodes** to store with. The alternative would have been to store this information in the Textile hub.

In this scenario, two issues were present. First, if we were going to do that, **we would have to encrypt the data** before taking it to the hosted Textile hub, to avoid exposing extremely sensitive information. Secondly, this very encryption would cause some **complications in the querying and fetching** process itself, since we’d have to reference obfuscated data.

It was a very simple use case, fetching very small amounts of data, but in a complex and bound context: browser, private, and encrypted.

## How GunDB Helped Solve It

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/GunandSpace.webp)

Instead of trying to patch and mend a complex solution to make it fit this specific use case, we went for a contextually right fit. Our need? To sync small amounts of sensitive information on a JS-enabled environment (browser) in a distributed, secure, and user-controlled way. **This scenario is a perfect fit for GunDB.**

In short, Gun enables graph distributed databases that are peer-to-peer and work across a decentralized network in which data is synchronized.

GunDB has many amazing features, but its [security features (SEA)](https://gun.eco/docs/User) are the key to this use case. It’s got a decentralized approach, and supports encryption natively. With it, we can easily **derive a Gun “secure” user from a Space user**, and encrypt all information stored by that user in GunDB, giving that sole user control over it.

The information itself is encrypted with a Gun keypair derived from the previously mentioned Space user, so, overall, there is no need to store the Gun keypair. Users simply depend on their Space authentication to verify themselves across these layers and be able to fetch, retrieve, and decrypt. **Just what we needed!**

## Available in the SpaceSDK, Coming Soon.

This new addition to the Open Web protocol roster is part of our last stretch of work **before the V1 release of the SpaceSDK**, the open-source library for building browser/mobile applications powered by these protocols.

We’ll be making all of these features easily available for anyone to build with. So, with it, anyone could plug in Web3-enabled features to their platform, for example to add user-controlled storage on IPFS/Textile, user-owned accounts based on Ethereum, and so on!

We’ll keep spoilers at a minimum until its release, but expect the power of the Space Daemon, **in a modular, open-source, JS-based, and highly customizable package** 🔥 Until then!

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co