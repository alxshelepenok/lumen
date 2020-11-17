---
template: post
title: 'Fleek + IPFS: Web3 Deployment Simplified'
slug: Terminal+IPFS
draft: false
date: 2020-03-03T02:39:47.298Z
description: >-
  Fleek.co offers a seamless workflow. It offers all the tools needed to
  deploy and manage sites on IPFS. Focus on content and code. Fleek handles
  the rest.
category: Informational
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-plus-ipfs.png
tags:
  - Informational
  - Guide
---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-plus-ipfs.png)

## Overview

[Fleek.co](https://Fleek.co/) offers a seamless workflow. It offers all the tools needed to deploy and manage sites on IPFS. Focus on content and code. Fleek handles the rest.

## IPFS & Data Integrity

IPFS stands for Interplanetary File System. It’s a distributed file system used for storing and sharing files, data and websites. The system has unique benefits such as decentralization and data integrity. More information [here](https://docs.ipfs.io/introduction/overview/).

![Photo by Nicolas Picard on Unsplash](./media/unsplash_1.jpeg)

IPFS is decentralized by creating a peer-to-peer network that can be hosted anywhere. It provides data integrity *by linking to its content* instead of location. For example:

<https://ipfs.io/ipfs/QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u>

![](./media/ipfshashbrowser.png)

The QmWAT… is the hash of the content “Hello World”.

If someone were to change “Hello World” to “Goodbye World”, the hash **and thus** the link will change.

<https://ipfs.io/ipfs/QmP8CvqzGRgH3WyeVKm8F1Pr6S4PGfuaCx6NVWuc929HWf>

![](./media/goodbye_world.png)

It’ll be impossible to change the content without changing the link, which is great for data integrity. But…

## What if the content changes?

If the content changes, the hash will change and the link will change.

![new content -> new hash -> new link](./media/newcontent-newhash.png)

This can be a headache if you‘re adding/updating content. Imagine a blog with new articles everyday. You’ll have to generate a new hash every time something changes.

Everything downstream will also be changed. If you have a domain name (myawesomeipfswebsiteblog.com), then you’ll have to update the[ values](https://medium.com/coinmonks/how-to-host-a-website-on-ipfs-with-dns-82f1f2fe6361) to the new hash.

![Photo by Aditya Chinchure on Unsplash](./media/waterfall.jpeg)

## Fleek

Fleek aims to simplify web development into one seamless workflow. Simply push changes to Git and Fleek will automatically update, pin and deploy changes downstream.

![](./media/terminalsupplychain.png)

Some features:

* Fleek accommodates many frameworks such as gatsby, jekyll, create-react-app etc.
* Fleek also handles DNS records. Either purchase a domain from them or point it to a domain you purchased elsewhere.
* No need to manually update hashes, TXT values etc.
* Fleek provides a [CID](https://docs.ipfs.io/guides/concepts/cid/)(content identifier) for more IPFS features such as verification and self hosting.

![](./media/deploypage.png)

## More Info

* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ) 
* Contact us at support@fleek.co 

Check out [Tech Docs](https://docs.fleek.co/)
