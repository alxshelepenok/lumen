---
template: post
draft: true
title: Login Revamp, Drip Library, and More UI/UX Enhancements ✨
slug: login-revamp-drip-uiux-enhancements
date: 2022-04-14T04:00:00Z
socialImage: https://storageapi2.fleek.co/fleek-team-bucket/screencapture-dev-app-fleek-co-2022-04-13-00_24_58.png
canonical: ''
description: Fleek's authentication page is receiving an upgrade in looks which will
  soon evolve to add wallet logins! Also in this release, the Fleek Drip library,
  powering our new UI.
category: Announcement
tags:
- Web3
- IPFS
- Release

---
News are coming to Fleek! In today's release, we've redesigned the app's authentication page, migrated Fleek to use our new Drip library using Radix & Stitches, and made a ton of UI/UX improvements to the app suggested by users!

Get ready, because we're working hard to **rebuild the Fleek experience and create a Web3 native app for everyone**. This first step will allow us to segway onto Web3 logins and payments (wallet integrations), and soon enough into a full-platform revamp.

***

## The New Authentication Page ✨

(GIF)

![](https://storageapi2.fleek.co/fleek-team-bucket/screencapture-dev-app-fleek-co-2022-04-13-00_24_58.png)

Fleek's receiving a freshen-up, and we're starting with the authentication page. Whenever you sign up or sign in to Fleek, you'll be greeted with this new view!

The revamped authentication page uses the Drip library (read more below), and has an improved flow for email verification and GitHub account linking.

Not only does this page provide a **cleaner and up to 30% faster experience**, but it'll be the stepping stone upon which we add **a lot more Web3 native login options to Fleek.**

### A Segway Into Web3 Auth Options

This new design is the base layer upon which we'll bring **crypto wallet logins onto Fleek,** using [Sign in With Ethereum](https://login.xyz/) to allow Metamask, Gnosis, Rainbow, and other Ethereum wallet users to log in to Fleek.

(image)

Expect an update in the next week that will expand our folder of authentication providers to include these wallet options. Check out the sneak peek above!

***

## The Drip Library 💧

To prepare for the rebuild of the Fleek UI into a friendlier Web3 experience, we created the **open-source Drip library and design system. Drip is built on React with core styling libraries under the hood (Radix/Stitches)** that ensure the best UI/UX and accessibility possible.

From our end, we want to be efficient and speedy about our new dApp's development. From the community's perspective? We want to share components, layouts, and resources useful for **any developer building Web3 dApps.**

It begins with a set of components particular to our road in rebuilding Fleek (e.g. the authentication layout), and it will evolve to a **shopify-esque type of library where developers can find resources for creating any type of dApp.** We will use it to power the UIs of different Fleek  / Psychedelic projects going forward, growing the library with different repurposable layouts.

* [View the repository here.](https://github.com/Psychedelic/react-drip)
* [Check out the storybook!](https://sqn2g-6yaaa-aaaad-qbuma-cai.ic.fleek.co/)
* View the Figma.