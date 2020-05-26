---
template: post
title: Fully Decentralize Your App With ENS!
slug: fully-decentralized-apps-with-ens
draft: false
date: 2020-05-21T04:02:37.816Z
description: >-
    Leave no centralized stone unturned with an ENS domain!
category: "Tutorial"
socialImage: /ENSCover.jpg
tags:
  - Tutorial
  - ENS
---

![](./media/ENSCover.jpg)


Deploying sites on IPFS allows creators to take advantage of a powerful peer-to-peer file system and, in so doing, embrace distributed technology.

Yet more can still be done to *fully* decentralize an app. What is missing is... an ENS domain!

What is ENS? Why do you need it? How can Fleek make your life 10x easier handling ENS domains?

Let's find out!

# The Web3 Motto: Decentralize Everything!

![](./media/ens/decentralize_everything.jpg)

A fundamental aspect of Web3 technologies is their dedication in not relying on centralized and faillible entities to serve users. Due to their innate robustness, decentralized alternatives are preferable to centralized ones in almost all cases, thus the popular motto: *Decentralize Everything!*

ENS, short for Ethereum Name Service, stands at the forefront of the decentralization movement and is meant to be an alternative to traditional naming systems. ENS domains end with `.eth`, as opposed to traditional domains who end with `.com`, `.org`, `.io`, etc...

The trusted Ethereum blockchain ensures its decentralization, so there's no worries on that front.

That's why Vitalik Buterin, the inventor of Ethereum, [likes ENS so much](https://twitter.com/vitalikbuterin/status/1247997846290198528).

# ENS For FULL Decentralization!
![](./media/ens/centralised_dns.jpg)

While an app deployed on IPFS is decentralized as far as file distribution goes, it cannot be called *fully* decentralized without a human-readable method for sharing its content.

Sadly, traditional domains rely on centralized servers and [monolithic institutions](https://www.houstonchronicle.com/local/explainer/article/Explained-the-controversy-with-ICANN-9443357.php). As such, an app cannot be called fully decentralized if it depends on traditional domains to be shared with others.

ENS therefore unlocks *total* decentralization!

# IPFS + ENS = <3

ENS domains can resolve to IPFS hashes.

We've deployed our Fleek insfrastructure on IPFS + ENS to demonstrate how it works. Simply go to [fleekhq.eth](https://fleekhq.eth/) to witness how an ENS domain resolves to IPFS. Make sure you are using a [browser which resolves ENS domains](https://codeclimbing.com/how-to-visit-ens-enabled-websites-your-gateway-to-web3/) to access the site. Alternatively, you can append `.link` to an ENS domain to access it, such as <https://fleekhq.eth.link>

IPFS and ENS go hand in hand perfectly!

# The Big Problem With ENS... Solved With Fleek

Despite the benefits, there is one big issue with ENS.

Since the ENS domain points to an IPFS hash, the IPFS hash on ENS must be updated *everytime* there is an update to the site, since a new update results in a new IPFS hash. This drawback makes using ENS for modern web development flows very cumbersome.

If ONLY there was a way to automatically update the IPFS hash upon site update, a tool to make ENS integration 10x easier... *wink* *wink*

Fleek simplifies ENS domain integration by auto-publishing new IFPS hashes to ENS anytime it detects a change.

This is accomplished through setting Fleek as the `controller` of the ENS domain. The `controller` is responsible for day-to-day activities such as updating the IPFS hash. The user is the `registrant` which is the role that hash ultimate control of the domain. The `registrant` can change the `controller` at any time.

This makes integrating ENS a breeze and an essential tool for any Dapp developer. Once ENS is setup with Fleek, the developer can simply forget about it and focus on his app.

# Your Turn!
Deploy your site on IPFS and set up your ENS domain on Fleek!

You will reap the benefits of a fully decentralized application through its file system AND its domain.

Now it's your turn to [Decentralize Everything](https://www.youtube.com/watch?v=WSN5BaCzsbo)!


* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) the #community slack channel
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) our Tech Docs
* Contact us at support@fleek.co 
