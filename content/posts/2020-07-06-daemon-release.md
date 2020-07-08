---
template: post
title: 'Introducing The Space Daemon: Build Privacy-focused and Peer to Peer Apps'
slug: daemon-release
draft: false
date: 2020-07-06T12:18:31.636+00:00
description: We’re excited to introduce our latest and most exciting decentralized
  development, the Space Daemon. Come learn more and how to use it!
category: Release
socialImage: https://fleekblog-team-bucket.storage.fleek.co/daemon-release/space-daemon.jpg
tags:
- release

---
![](https://fleekblog-team-bucket.storage.fleek.co/daemon-release/space-daemon.jpg)

We’re excited to introduce our latest and most exciting decentralized development, the Space Daemon.

The[ Space Daemon](https://github.com/FleekHQ/space-daemon "Space Daemon") packages together [IPFS](https://ipfs.io/ "IPFS"), [Textile](https://textile.io/ "Textile") Threads/Buckets, and Textile Powergate (Filecoin) into one easy to install and JS interface to make it easy to build peer to peer and privacy focused apps.

Installing the [Space Daemon](https://github.com/FleekHQ/space-daemon "Space Daemon") is easy and comes with all the tools packaged together including IPFS and Textile nodes, and and also exposes gRPC methods specific to the features you want for your app including: File Upload (encrypted), File Sharing, Filecoin Markets, and User Controlled Data. You can access same methods using our [JS client](https://github.com/FleekHQ/space-client "Space Client"), so you don't need to worry about gRCP calls.

Space is the next evolution of Cloud, where users can interact with apps fully private, p2p, and control their own data. Big tech has taken advantage of user data for far too long, it's time to let users take back control and privacy of their data. Here are the features the Space Daemon will bring to your application:

* Fully Private file upload via encrypted textile buckets.
* Peer to Peer file sharing selectively with other people and/or within teams.
* Identity solution enabling users to be fully anonymous or have as many identity associations
* Filecoin network interaction for file storage and retrieval market.
* Super easy to use Js library with easy to understand functions for File CRUD, Sharing, Identity, Backups, etc.
* Datastore for applications and application registry to enable user data controlled applications
* Trustless Data backups
* Local file system mounting
* More...

## Getting Started

### Installation

The installation process is done in two part. The first is to [download the daemon](https://github.com/FleekHQ/space-daemon) and the second is to setup the client so your Javascript application can communicate with the daemon.

The daemon is available for any desktop platforms (Windows, Mac and Linux).

We have detailed instructions in our [docs on installing the space daemon](https://docs.fleek.co/space-daemon/getting-started/#installation).

### Privacy-focused file commands

You can perform any CRUD(Create, Read, Update, Delete) operation with the Space Client, such as adding files, opening files and managing the encrypted buckets in which your files reside.

These operations are performed in a manner mindful of users' privacy through the use of cryptographic keys. 

Learn more about [CRUD commands](https://docs.fleek.co/space-daemon/getting-started/#crud-operations).

### Sharing

Space daemon allows users to share files between them. We provide commands so that those operations can be performed while preserving privacy.

Read more about [sharing files](https://docs.fleek.co/space-daemon/getting-started/#sharing).

### Identity

To simplify app creation the Space Daemon comes with out-of-the-box identity management system. This system is centralized, but optional, and meant for convenience only.

Users can identify themselves with a username and/or email. The identity management system allows users to share files by email without having to use a potentially intimidating-looking public key.

Learn more about how to use [identity in the space client](https://docs.fleek.co/space-daemon/getting-started/#identity).

## Example Desktop App

We've also created a [repository](https://github.com/FleekHQ/space-client-workshop) with an example desktop application to show off the features that can be utilized from the Space Daemon. Its a simple create react app + electron implementation to show [space-daemon](https://github.com/FleekHQ/space-daemon) and [space-client](https://github.com/FleekHQ/space-client) features.

### Run the project:

> You need to install and run [space-daemon](https://github.com/FleekHQ/space-daemon) to run this project

Install project dependencies:

`npm install`

or

`yarn`

Run the project:

`yarn electron:dev`

### ![](https://fleek-team-bucket.storage.fleek.co/spaceDaemonExampleRepo.png)

### Share your creations!

We are excited to see what cool projects you will come up with using the Space Daemon, so share your ideas with us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter").

Happy hacking!

* [Sign up](https://app.fleek.co "Sign Up") to try Fleek
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A "Fleek's Slack")
* Follow us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter")
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw "Fleek's Youtube Channel")
* Check out our [Tech Docs](https://docs.fleek.co/ "Fleek Docs")
* Contact us at support@fleek.co