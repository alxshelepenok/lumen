---
template: post
title: We Added Filecoin to the Space Daemon
slug: filecoin-added
draft: true
date: 2020-10-01T12:18:31.636+00:00
description: The Space Daemon is getting the Filecoin treatment! Learn about our recent
  Filecoin integration and what it means for decentralized web.
category: General
socialImage: https://fleekblog-team-bucket.storage.fleek.co/space-daemon-filecoin/Space+Filecoin.jpg
tags:
- Filecoin

---
![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-filecoin/Space+Filecoin.jpg)

October 15th: Mark this date on your calendars, folks!

Indeed, as announced in a [recent blog post from Protocol Labs](https://filecoin.io/blog/mainnet-ignition/), the Filecoin Mainnet will launch on October 15th. This is a landmark event not just for Filecoin, but for the Dweb community as a whole.

And at Fleek we're excited for the Filecion Launch!

# The Space Daemon: Now with more Filecoin

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-filecoin/mario-filecoin-l.png)

We've recently added support for Filecoin to the Space Daemon. In effect, we've added the option of joining the Filecoin network through an implementation of [Textile's Powergate](https://docs.textile.io/powergate/),  thus allowing developers to leverage the capabilities of both Space and Filecoin.

In fact, we even showcased our Powergate implementation in a recent [Space Daemon Masterclass](https://www.youtube.com/watch?v=pWJ5fty-7mA). Such developments demonstrate that the Space Daemon is meant to be an integral part of the decentralized web alongside Filecoin.

But why not simply run your own Filecoin node without the Space Daemon and call it day? Why are both important?

That's because of _an important role_ fulfilled by the Daemon.

# An important role

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-filecoin/one-does-not.jpeg)

Filecoin does not encrypt uploaded files is therefore public, perusable by anyone.

This is a conscious decision made by the Protocol Labs team, leaving the door open for developers to decide if and how files should be encryped, thus making Filecoin a generic storage layer which can be tailored to any situation.

Of course, there are many applications in which privacy from encryption is not that important. However, for most use cases, including ones which include some sort user login, protecting user data is mandatory.

But this fact begs important questions related to encryption of uploaded files: How should we handle encryption on Filecoin? Who will control the cryptographic keys? How will users share specific data in a secure manner, if they'll even be able to do so?

After all, one does not simply uploads to Filecoin.

Luckily, the Space Daemon is perfect for this. The Daemon takes care of encryption using keys stored on the user's machine. Furthermore, the Daemon comes with optional sharing and identity functionality that can be used to share data with other users. Such capabilities allows developers to create advanced applications that respect privacy without pulling their hair out.

As such, the Space Daemon fulfills an important function in the Filecoin ecosystem.

# The future looks bright

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-filecoin/4guj4g.gif)

There's still more work to be done to make our Filecoin implementation the best it could be. In fact, we are currently working on improving it as we speak.

Such improvements include harmonizing the Powergate node and the Daemon by exposing our encrypted data layer and adding supplementary functions to the Daemon to make such interactions as easy as possible.

And since we need to make those changes anyway to add Filecoin functionality to our upcoming [Space Storage app](https://space.storage/), these improvements should come in due time. That being said we are always open to suggestions.

If you are developing an application on top of the Space Daemon and want some of those features quicker, you can contact us and it will be a pleasure to help you out!

* Sign up for [Space Beta](https://space.storage)
* Follow us on [Twitter](https://twitter.com/spacestorage)
* Reach out at hi@space.storage
* Check out our [Tech Docs](https://docs.fleek.co/space-daemon/overview/)
* Spread the word