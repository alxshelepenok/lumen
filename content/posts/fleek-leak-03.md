---
template: post
draft: false
title: Fleek Leak 03
slug: fleek-leak-03
date: 2023-02-16T03:00:00Z
socialImage: https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/fl16fb.png
canonical: ''
description: Issue number three of the Fleek Leak is landing ⚡, with updates on custom
  domains and our SDK.
category: Announcements
tags:
- Fleek Leak
- Fleek SDK
- Deploys
- Custom Domains

---
![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/fl16fb.png)

Issue number three of the Fleek Leak is landing ⚡, coming back after back-to-back release weeks!

A few weeks later we’re counting **sites deployed with Fleek in the hundreds**, and we are preparing for some of our releases: **custom domains, and the SDK!** Let’s do a recap of what’s next, and some alpha on our SDK.

## So, What Are We Building? ⚡️

This weeks we focused on expanding our current services with added logic (Deployments), and setting the stage for our next releases:

* Yet another services (Custom Domains)
* Deploy System and Enhancements
* The road to our SDK release

***

## Deploy System: Making Our Deploy Flow Smarter

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/image 1.png)

But, don’t we have deployments already? Yes! What we are doing right now is expanding the foundations of our system deployment service to offer in-depth deploy management.

Today, you are able to deploy a site to IPFS and get a site’s hash. Simple, and straightforward. However, we are preparing an update that to begin with will **save and allow you to see your past deployments for any given site**, and their IPFS hashes.

This unlocks dozens of possibilities when it comes to deployment management. Knowing past historic deployments, **we’ll be able to easily enable deployment rollbacks,** or previews for non-live iterations.

***

## Custom Domains: The Power of Event Tracking.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzBjZWY5ZGJkOTQwZDFjMDJkODk3M2VjODI2MzI3MjM5NGI3YTc3MCZjdD1n/KvD3fWqBEiZwyLjKu8/giphy.gif)

The work we are doing with Custom Domains has been defined by a fundamental thing: building our services to be **event-based**. Meaning for any action that occurs, there will be a record of the action!

Yes, at a glance, the Custom Domains feature will enable you to **map a site’s latest deployment to a CDN pull-zone**, which then you can use to use any DNS domain with your site on IPFS. In a nutshell, your sites will go from `https://ipfs.io/ipfs/QmPMo`…. To _anycustomdomainyouwant_.com.

But, aside from the file/CID mapping to CDN zone that Fleek handles in the background, **events shine in how your custom domains continue to work.** Upon each new deployment for a given site, the custom domains service will **detect that your site received an update and will automatically update the CDN pullzone** to represent the latest version of your site!

***

## Fleek SDK: Authentication & Decoupling & Browser Support

These weeks we’ve been working on many SDK-related pieces. These two are the pieces we are finalizing to **prepare the SDK for browser support**.

The first, is the update of the SDK’s structure to allow for **other methods of authentication** (i.e. api keys) in the future. Today, the SDK supports the authentication flow we use for our CLI environment (personal access token), but to allow users to safely utilize and integrate it anywhere we need to expand the available options.

The second is **the decoupling of certain** packages utilized on the SDK that were not compatible with a browser environment. We isolated said packages (mostly node-js oriented), refactored our IPFS service so that on browsers we don’t rely on incomplete packages, and bundled browser-compatible versions where needed.

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/gif-sdk-test.gif)_With the SDK you can build things like.. An IPFS storage web app! (the above is a PoC)._

With those two pieces above, and many more in the back, **we can allow developers to safely integrate the SDK and use it in browser-based environments.** Want to build an NFT marketplace that mints and stores the file on IPFS? Or a web3 chat and host shared files on IPFS? You got it. **See the gif above for an alpha storage app we built during testing.**

***

We continue to see our bet on Fleek’s new architecture flourish! We work and move in layers: First, building with our services (sites, storage, IPFS, custom domains, etc..), then creating GraphQL APIs to interact with them, which we integrate and expose through the SDK which is leveraged currently by the CLI, to finally use them to build and power… Our App’s UI. Fleek’s circle of life ⚡.

Stay tuned for the Custom Domains release and all else we are preparing! We’re also rounding the corner to **ETHDenver,** so keep an ear out because news are coming soon on where you’ll be able to find the team, and catch our workshops.

For more resources visit our[ LinkTree.](https://linktr.ee/fleek)