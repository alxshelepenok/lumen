---
template: post
draft: false
title: Fleek Leak 02
slug: fleek-leak-02
date: 2023-01-26T03:00:00Z
socialImage: https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/leak2.png
canonical: https://blog.fleek.xyz/post/fleek-leak-02/
description: Time for a development update ⚡️ Over the last few weeks we’ve been jamming
  on our CLI beta (Jan 18th), adding compute to Fleek, and an NFAs MVP. Let’s dive
  into why & what you can expect!
category: Blog
tags:
- CLI
- Progress
- Fleek Leak

---
![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/leak2.png)

Issue number two of the Fleek Leak is here fam! ⚡ We’re keeping the bi-weekly pace up: a release one week, and a development update on the other.

The past week was a pretty big milestone for us, because we released the **first Beta of Fleek.xyz:** [**IPFS Pinning & IPNS Management on the CLI.**](https://blog.fleek.co/posts/release-ipfs-pinning-ipns-beta-fleek-xyz)

Merely a day later **we reached triple digits in files pinned and testers.** We received a lot of helpful feedback, and testing went on without major issues. Thanks everyone for the help!

And now? Onwards! We keep rowing the Fleek boat upstream to prepare our next beta release: **Sites Deployment & Domain Management via the CLI**, the ideal bow-tie to wrap up the month 🎁. Let’s catch up on the work that’s happening now to get there.

# So, What Are We Building? ⚡️

The motto we keep repeating internally? Build and ship in parallel. So while the first beta was coming up, these things were being set up and are now on the final stretch towards completion:

* _More_ services (CLI sites deployment & domain management)
* Expanding the UI with IPFS Pinning.
* Bug-fixes and CLI improvements.

***

## Landing Soon: Sites Deployments & Domains

Alongside with file storage, Sites deployments and Domain management are Fleek’s bread and butter 🧈. That’s why we are working on bringing them to the CLI next.

The Sites service will let you quickly deploy a static site through the CLI and host it on web3 infrastructure (starting with IPFS). While the Domains Management service will enable you to use the CLI to map a custom DNS domain (e.g. dapp.co) to your Fleek-deployed sites!

How will Sites deployment work in the CLI? There will be two options. The first one is **non-managed deployments**, coming up soon, that will use repository configurations and Github actions to build and launch your site.

The second iteration, **managed deployments**, will come later on and offer the option to rely fully on Fleek’s CI/CD service to handle the build and deployment of your site.

Again, our architecture design for Fleek.xyz is [fully modular and extensible](https://blog.fleek.co/posts/fleek-xyz-architecture-overview), which means that while on this release Sites deploy to IPFS initially and Domains will support DNS, in the future we will be able to easily expand to other web3 providers (like ENS).

***

## Preparing the App’s UI for Expansion

While Sites & Domains are landing on the CLI soon for Beta testing, we are preparing the Storage service to make its first appearance on the App’s UI.

The team is working on a simple drag and drop interface for the app’s ui, **to allow users to pin files onto IPFS via a simple drag and drop interface**.

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/meme.png)

For that, we are using an early version of the Fleek SDK, which is now powering the CLI. We are working on a node version of the SDK and starting to integrate it into the UI and browsers overall. This work will set the foundation to prepare the SDK for public use, as we remove dependencies to enable client-use and add a user permissioning layer.

***

That wraps up this edition of Fleek Leak! Set your reminders for next week as we prepare to release these new features into the wild. You can also simply [sign up on our website](https://fleek.xyz/) to get a ping when that happens too 📯. While you wait, [pay our docs](https://docs.fleek.xyz/) a visit and give the beta a try!

A final leak: Now that Sites are around the corner, expect our **DevRel team** to start sharing examples, templates, and build ideas around! We’re preparing an open templates repository for Fleek where we’ll add boilerplates and projects you can quickly deploy through Fleek (e.g. a blog, or a [Lens app](https://www.lens.xyz/)). Got any ideas? Swing by our [Discord](https://discord.gg/fleek) and let us know 😉.

For more resources visit [our LinkTree](https://linktr.ee/fleek).
