---
template: post
draft: true
title: Filecoin Archiving Comes to Fleek Sites and Storage
slug: filecoin-archiving-backup-fleek-sites-and-storage
date: 2021-02-18T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek-Filecoin.png
canonical: ''
description: Archive your IPFS sites and storage hosted on Fleek automatically on
  Filecoin, the decentralized storage network, as a secondary backup layer.
category: Release
tags:
- Hosting
- Storage
- Filecoin

---
![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek-Filecoin.png)

Another update incoming! Last time, we announced the release of the [Space SDK](https://github.com/FleekHQ/space-sdk), our new open source library. Today, we’re excited to announce **we’re enabling automated Filecoin archiving / backups for all sites and storage on Fleek.**

That’s right. We’re adding Filecoin as an archiving storage layer, and everyone using Fleek right now will benefit from it right away, **no extra cost involved and available for all.**

That means that if you have a website running on IPFS with Fleek or store files on IPFS with us, no matter your plan, then you'll benefit from having them backed up on a **decentralized storage network,** taking your project even further into the Web 3.0!

## Why Filecoin Archiving?

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Filecoin.jpg)

Filecoin released its Mainnet last year, on October the 15th, and since then it has hit [milestone after milestone](https://filecoin.io/blog/filecoin-in-2020/), already surpassing 1 Exbibyte (EiB) of decentralized storage capacity and ending the year at a high note.

We crossed paths with the team behind Filecoin and IPFS, Protocol Labs, and have since then aligned our efforts in building the necessary blocks that will make the Web 3.0 not only a possibility, but a robust one.

Storage is one of those blocks. As of today, storage is **one of the most centralized core aspects** of the current web’s infrastructure, and peeling that centralization layer off is not an easy feat.

Not only storage is controlled by a handful of online providers, but the actual files themselves are stored in a centralized server infrastructure. One mistake, and things like AWS’s outage last November occur, taking a chunk of the web down.

The path towards solving this, and the one we are taking with Space and Fleek, is a procedural one. First, we shifted the storage paradigm by offering distributed storage on IPFS that users control.

That was the first step, rebuilding storage around the user, not us. IPFS and Textile allowed that by helping us design a hosted infrastructure that gives users sole control over the keys to the files/data, while also benefiting from the perks and security of having their files pinned redundantly in a distributed storage network.

**However, there is still a layer of trust** in that we help run IPFS nodes. So, naturally, the next step to this procedural process is to peel off that layer.

Filecoin allows us to begin peeling off that infrastructure centralization layer by offering backups and archives that reside in a decentralized and open storage network whose existence doesn’t depend or rely on us as a company/platform.

## Filecoin in Fleek V1: Archiving

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/archive.webp)

In this first V1, Filecoin will work as a secondary archiving layer that is parallel to our main IPFS storage infrastructure. Why not replace our entire storage with it? Because Filecoin’s purpose is different from IPFS in its current state, though it will continue to evolve to eventually replace it in the future.

IPFS provides us with a performant and distributed user-controlled storage layer, ideal for day-to-day performance-heavy content operations; whereas Filecoin’s current state is built to provide a robust and trustless archiving layer that does an amazing job at ensuring the integrity, longevity, and persistence of your files and data. Think of it as Filecoin being your cold storage layer, while IPFS is the hot/warm one.

This is just the beginning, though! As Filecoin grows both its network and functionality to match, surpass, and complement IPFS in features, we expect to continue transitioning more and more of our storage infrastructure to it and enable other use cases using it.

## A Snapshot of the Process

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek Archiving.png)

Now, let’s dive into how Filecoin archiving behaves in this first release. When you upload a file or host a site on IPFS, Fleek will begin to **package them into batches** and ready them to be stored in Filecoin.

These payloads (composed by multiple files, not individual ones) are then sent to a Filecoin miner who receives the pieces of data, prompting a deal on chain upon completion, and beginning Filecoin’s verification process that’s called “sector sealing”. Here the miner generates a proof-of-replication, a unique representation and replica of the data, sealed in the storage “sector” after being encoded into a new configuration.

After this, miners must constantly present a Proof-of-Spacetime, or proof of the continuous storage of this information. The challenge of this PoSt is directly related to the corresponding sealed sector’s features to ensure the representation of data **hasn’t changed.**

And thus, your files and data from Fleek are archived in Filecoin! If you access your Fleek account and navigate to a live site, or to a file in your storage, you will be able to see the corresponding deal ID for the Filecoin transaction confirming it is archived in the network.

In V1, Fleek interacts as with the Filecoin network on behalf of users to generate these data payloads and ensure the viability of the process; we expect to see this framework changing as Filecoin does as well, enabling per-file dynamics in the archiving/retrieval process, and the direct interaction of our users with the network.

## It’s Just Getting Started.

Above all, we’re thrilled! These first live interactions between Fleek and the Filecoin network give us a moving picture of what leveraging decentralized and open storage networks looks like from a platform/app perspective.

The groundwork is set, and the first of many steps has been taken. Now, it’s a matter of growing side by side with Filecoin, and continuing to enable more and more use cases to the public! For example, using Filecoin as a decentralized backup layer for personal storage, [in Space](http://space.storage/), which is going to support it on-launch.

Thanks to the team at Protocol Labs for the amazing work together these past few months, and we’ve got nothing but high hopes for what’s coming next!

And do stay alert for that, because like we said, this is just the beginning. We are one month into the year and we can say that, without a doubt, it will be jam-packed with news from IPFS, Filecoin, us, and the rest of the Open Web community.

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co