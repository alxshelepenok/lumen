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

**_\[Updated as of January the 9th:\]_** _We set the date back to allow more users to migrate to custom domains, and will roll out new rules on the 16th of January to prevent .html, .css, .js files from being served by the storage API. Sites hosted normally will remain unaffected. Read more below._

We’re taking some of the initial actions towards our end goal of removing Fleek domains as a potential point of failure by starting to deprecate some of the current domains used on the Fleek.co platform. The areas being affected are Fleek’s public IPFS gateway ([https://ipfs.fleek.co](https://ipfs.fleek.co "https://ipfs.fleek.co")) and our storage API domains ([https://storageapi.fleek.co](https://storageapi.fleek.co "https://storageapi.fleek.co") and [https://storageapi.fleek.](https://storageapi.fleek. "https://storageapi.fleek.")one).

For users of both of those services, **breaking changes are coming** and your actions will be **required during January, 2023**, for the IPFS gateway and our Storage APIs (we set back the date to allow users time to migrate). Please read on if this applies to you.

Why the deprecations? The quick and short of it is we’re building a new Fleek platform in which one of our goals is to increase decentralization and censorship resistance by removing our own domains as central points of failures. Read through this post, **take action on any changes we’re making**, and at the end we’ll drop some knowledge so you can get caught up on our vision for the Fleek of the future.

***

# Moving to IPFS Gateways as a Service

Fleek currently runs a free public IPFS gateway ([https://ipfs.fleek.co](https://ipfs.fleek.co "https://ipfs.fleek.co")) for speedy resolution of CIDs available on the IPFS network. **We will redirect our gateway traffic from Dec 19th 2022, and aim to deprecate the gateway entirely by Q1 2023**.

To ensure that we don’t break any current integrations that leverage our gateway, starting Monday, the 19th of December, 2022, all traffic to our gateway will still be resolved via a redirect to [https://dweb.link](https://dweb.link "https://dweb.link"), a gateway managed by the IPFS team. **This redirect is only temporary, anyone still using our gateway post deprecation will not have their content resolved.**

Here’s a mini-timeline to make things crystal clear:

* Today - Fleek IPFS Gateway runs as normal.
* Dec 19th - Fleek IPFS Gateway redirects to dweb.link
* Q1 2023 - Gateway shut down with a 2 week notice.

That said, we are not totally separating ourselves from the gateways game. Our goal is to **pivot to offering gateways as a service** for any clients who might need their own dedicated gateways. Supercharged by [Fleek Network](https://fleek.network/), of course 😉

As we flesh out the details for offering this as a true service, feel free to [reach out to us directly](https://discord.gg/fleekxyz) if you’re interested and we’ll happily spin up dedicated gateways.

***

# **Custom Domains for Storage APIs**

Also in this new year, we will be **transitioning away from our current storage API domain**. If you use Fleek Storage please read, actions will be required.

Basically, storageapi.fleek.co and storageapi.fleek.one will be sunset to **favor custom, per-user API domains**. Both domains are currently available and point to the same content (try [this link](https://storageapi.fleek.co/fleek-team-bucket/Blogs/fleek-ahb.jpeg), then [this one](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-ahb.jpeg)).

We have decided to sunset both domains gradually, beginning with the application of content-restricting rules. Users can now set their own [custom domains](https://blog.fleek.co/posts/fleek-co-how-to-add-custom-storage-domains) to their storage buckets in Fleek, which will provide higher availability and performance right off the bat, as well as allow for a non-shared API endpoint for each user.

During January, we will begin downgrading the capabilities of content-serving for our API endpoints, as we progress with the user migration. **We will continue to post updates to our timelines here and on our email communications.**

Here’s the current timeline:

* Today - Users can begin migrating to custom domains.
* Jan 16th 2023 - The first content-restricting rule is introduced. Limiting the serving of .html, .css, and .js files.
* End of Q1 2023 - API shutdown with a 2 week notice.

**The first content restriction rule on this public APIs will come on January the 16th**, by limiting the serving of .html, .css, and .js files on storageapi.fleek.co / storageapi.fleek.one. After the 16th, these files won’t resolve on our public APIs. This won’t affect sites hosted normally via Fleek’s hosting app - and we suggest users “hosting” any sites on their storage bucket directly (not recommended) to migrate to the hosting app. This change also will greatly prevent the hosting of any malicious/phishing .html files on public storage gateways.

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