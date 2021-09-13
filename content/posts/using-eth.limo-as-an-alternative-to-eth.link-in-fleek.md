---
template: post
draft: false
title: Using Eth.Limo as an Alternative to Eth.Link in Fleek
slug: eth-limo-alternative-eth-link
date: 2021-09-10T04:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/blog/Eth.limo-background.png
canonical: ''
description: Explore using Eth.Limo as a decentralized alternative to Cloudflare's
  Eth.Link gateway.
category: Tutorial
tags:
- Cloudflare
- CDN
- ENS
- Eth.Link
- Eth.Limo

---
![](https://storageapi.fleek.co/fleek-team-bucket/blog/Eth.limo-background.png)

Over the last few weeks, we have been getting a lot of support requests regarding IPFS websites using ENS being unable to resolve under .eth.link urls. In the end, we discovered that .ETH.LINK (a resolver/gateway to ENS names provided by Cloudflare) had been having **very inconsistent performances**.

For those that don't know it, ETH.LINK is a centralized gateway that ENS+Cloudflare created to resolve .eth names on regular browsers that don't support ENS by just appending ".link" at the end and letting the service do the resolving (e.g. "fleekhq.eth.link").

It's an easy way to let Web2 users visit your app/dapp. But as always, centralization comes with its risks. For everyone that doesn't know it yet, there is an alternative! **Eth.Limo** a decentralized alternative to the Eth.Link gateway 🔥

### ENS, IPFS, & Fleek

Anyone who’s building on the decentralized web probably knows of ENS (Ethereum Naming Service), a decentralized alternative to centralized DNS options. ENS leverages **smart contracts on the Ethereum blockchain to builds its naming service**.

Pointing your ENS domain to an IPFS (InterPlanetary File System) content hash that’s hosted on Fleek gets you **really far on the way to running a truly decentralized static website**. Distributed files, decentralized name ✅

But, Web3 is still nascent, and as a result, most browsers aren’t able to resolve .eth domains. Users can use 3rd party extensions like MetaMask to resolve .eth domains, but this is an extra step that can be a pain point for some users.

### The Cloudflare Dilemma

In response to this problem, the platform Cloudflare created eth.link, a gateway for resolving .eth domains on any browser.

Yay, everything is solved! Not so fast 🙅‍♀️

Cloudflare’s .eth.link gateway has some issues of its own: it’s still centralized, unreliable at times, and caching refreshes/content retrieval is not consistent and sometimes takes its time.

Whether its performance is improved or not, one fact remains: **Optionality is also an important part of decentralization.** So, having alternatives (with the decentralization perk) is always good.

### A New Player in Town: Eth.Limo

[Eth.limo](http://eth.limo/) is a decentralized alternative to eth.link and represents another big step towards a true dWeb 🥳

Limo operates by hosting its own set Ethereum nodes in order to automatically resolve the IPFS hash of all requests sent to ENS domains. Limo returns the static content back to the client over the HTTPS protocol, allowing any browser to resolve .eth domains by using the eth.limo gateway.

Most importantly, Limo has been [reporting high uptimes](https://twitter.com/eth_limo/status/1433093424178253828?s=20) vs its centralized counterpart. You can visit their site to see the [full specs differences](https://eth.limo/) in both security & privacy policies.

### How do I Setup eth.limo?

You don't have to do _anything_ to use eth.limo to resolve your ENS domains, that's the best thing.

Visit https://<your-ens-domain>.eth.limo and see for yourself! For example... https://fleekhq.eth.limo. 

### Wrapping it up

We hope this helped for everyone having problems resolving their websites with eth.link. Like we said, optionality is an important part of decentralization, so the more the merrier!

As always, feel free to reach out to us on Twitter or Discord to let us know about any features, bugs, or improvements you think our team should take care of next 🤟

* [Sign up](https://app.fleek.co) to try Fleek ⚡️
* Join our [Community Chat](https://discord.com/invite/yVEcEzmrgm) 💬
* Follow us on [Twitter](https://twitter.com/FleekHQ) 🐦
* Subscribe to our [Youtube channel ](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)📺
* Check out our [Tech Docs](https://docs.fleek.co/) ✍️