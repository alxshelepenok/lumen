---
template: post
draft: false
title: Deprecation of IPFS Gateway and Storage API URL on Fleek.co
slug: fleek-co-gateway-storage-url-deprecation
date: 2022-12-14T14:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/fleek-xyz-dep-old-doms.png
canonical: ''
description: We’re starting to take actions to deprecate the legacy Fleek platform
  (Fleek.co), starting with our IPFS Gateway + Storage API domains.
category: Announcement
tags:
- Fleek.co
- Storage API
- IPFS Gateway
- Domains
- Deprecation

---
![](https://storageapi.fleek.co/fleek-team-bucket/fleek-xyz-dep-old-doms.png)

Today, we’re taking some of the initial actions towards our end goal of removing Fleek domains as a potential point of failure by starting to deprecate some of the current domains used on the Fleek.co platform. The areas being affected are Fleek’s public IPFS gateway ([https://ipfs.fleek.co](https://ipfs.fleek.co "https://ipfs.fleek.co")) and our storage API domain ([https://storageapi.fleek.co](https://storageapi.fleek.co "https://storageapi.fleek.co")).

For users of both of those services, this means that **breaking changes are coming and your actions will be required before December 30th, 2022**. Please read on if this applies to you.

Why the deprecations? The quick and short of it is we’re building a new Fleek platform in which one of our goals is to increase decentralization and censorship resistance by removing our own domains as central points of failures. Read through this post, **take action on any changes we’re making**, and at the end we’ll drop some knowledge so you can get caught up on our vision for the Fleek of the future.

***

# Moving to IPFS Gateways as a Service

Fleek currently runs a free public IPFS gateway ([https://ipfs.fleek.co](https://ipfs.fleek.co "https://ipfs.fleek.co")) for speedy resolution of CIDs available on the IPFS network. **We will be shutting down our services for this gateway on Dec 30th 2022**.

To ensure that we don’t break any current integrations that leverage our gateway, starting Monday, the 19th of December, 2022, all traffic to our gateway will still be resolved via a redirect to [https://dweb.link](https://dweb.link "https://dweb.link"), a gateway managed by the IPFS team. **This redirect is only temporary, anyone still using our gateway by Dec 30th 2022 will not have their content resolved.**

Here’s a mini-timeline to make things crystal clear:

* Today - Fleek IPFS Gateway runs as normal.
* Monday - Fleek IPFS Gateway redirects to dweb.link
* Dec 30th 2022 - Gateway shut down.

That said, we are not totally separating ourselves from the gateways game. Our goal is to **pivot to offering gateways as a service** for any clients who might need their own dedicated gateways. Supercharged by [Fleek Network](https://fleek.network), of course 😉

As we flesh out the details for offering this as a true service, feel free to [reach out to us directly](https://discord.gg/fleekxyz) if you’re interested and we’ll happily spin up dedicated gateways.

***

# A New Storage API Appears

Also before the new year, we will be **transitioning away from our current storage API domain**. If you use Fleek Storage please read, actions will be required.

Basically, storageapi.fleek.co will eventually be replaced by storageapi.fleek.one. Both domains are currently available and point to the same content (try [this link](https://storageapi.fleek.co/fleek-team-bucket/Blogs/fleek-ahb.jpeg), then [this one](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-ahb.jpeg)). **We will keep it this way until the 30th of December 2022 at which time you'll have switch any storage domains you have or your application will break.**

Here’s another mini-timeline:

* Today - Migration starts, both storage API links are available and point to the same content.
* Next week - Fleek.co platform adopts the use of new storageapi.fleek.one API route in the storage tab.
* Dec 30th 2022 - Deprecation of storageapi.fleek.co.

Why the switch? Two main reasons.

1. We want to decouple our API structure to have a single unified storage API route that could be used while both the Fleek.xyz and Fleek.co platforms co-exist until the sunsetting of Fleek.co.
2. The reliability of the storageapi.fleek.co domain has degraded over the past few years thanks to censorship from big tech like Google - we’re taking this opportunity to start fresh.

***

# What About Fleek.co As a Whole?

As we mentioned in the intro, unless you’ve been living under a rock you’ve probably heard that we [raised $25M to build Fleek.xyz + Fleek Network](https://blog.fleek.co/posts/introducing-fleek-network-and-fleek-xyz). Part of the move to this new platform is sunsetting the Fleek.co platform and domain in favor of Fleek.xyz.

While we don’t have specifics on the move yet, you can expect us to move pretty much everything to the new .xyz domain. You’ll access our UI from something like app.fleek.xyz and our APIs from something akin to api.fleek.xyz.

However, this is not even our endgame. **One of our main goals with the new platform is to reduce our users' reliance on Fleek domains for their services** by encouraging users to connect their own custom domains so that we can help to spin up your own custom routes to power things like your own gateway, APIs, deployment preview URLs, and more! 🔥

Expect more updates to come in Q1 2023 as we begin the Fleek.co sunsetting process 🤙

***

If you’ve got any questions, concerns, or need any assistance surrounding this migration, hop into [our Discord](https://discord.gg/fleekxyz)! Our team will be happy to jam, help, or answer any of your queries. ⚡️

* For more resources visit [our LinkTree](https://linktr.ee/fleek).