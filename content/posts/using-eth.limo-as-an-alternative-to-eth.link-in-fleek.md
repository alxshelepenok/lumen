---
template: post
draft: true
title: Using Eth.Limo as an Alternative to Eth.Link in Fleek
slug: eth-limo-alternative-eth-link
date: 2021-09-10T04:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/blog/Eth.limo-background.png
canonical: ''
description: Explore using Eth.Limo as a decentralized alternative to Cloudflare's
  Eth.Link gateway.
category: ''
tags:
- Cloudflare
- CDN
- ENS
- Eth.Link
- Eth.Limo

---
![](https://storageapi.fleek.co/fleek-team-bucket/blog/Eth.limo-background.png)

Over the last few weeks we have been getting a lot of customer service requests regarding IPFS websites being unable to resolve. Unfortunately, this is an issue with Eth.Link, which is a Cloudflare product and is out of our control. 

However, it's not our style to leave our customers without any alternative solutions. This article introduces you to Eth.Limo, a new decentralized alternative to the Eth.Link gateway 🔥

### ENS, IPFS, & Fleek 

Anyone who’s building on the decentralized web probably knows of ENS (Ethereum Naming Service), a decentralized alternative to centralized DNS options. ENS leverages smart contracts on the Ethereum blockchain to builds their naming service.

Pointing your ENS domain to an IPFS (InterPlanetary File System) content hash that’s hosted on Fleek gets you about 90% of the way to running a truly decentralized static website. 

Eth.Limo, a decentralized gateway for resolving ENS domains, gets you the last 10% 😎 

Web3 is still nascent, and as a result most browsers aren’t able to resolve .eth domains. Users can use 3rd party extensions like MetaMask to resolve .eth domains, but this is an extra step that can be a pain point for some users. 

### The Cloudflare Dilemma

In response to this problem, the platform Cloudflare created eth.link, a centralized gateway for resolving .eth domains on any browser.

Yay, everything solved… not so fast 🙅‍♀️

Cloudflare’s .eth.link gateway has some issues of its own: it’s still centralized, unreliable at times, and caching refreshes can take anywhere from 24 to 48 hours after an update to the content of a website.

### A New Player in Town: Eth.Limo

[Eth.limo](http://eth.limo/) is a decentralized alternative to eth.link and represents another big step towards a true dWeb 🥳

Limo operates by hosting its own set Ethereum nodes in order to automatically resolve the IPFS hash of all requests sent to ENS domains. Limo returns the static content back to the client over the HTTPS protocol, allowing any browser to resolve .eth domains by using the eth.limo gateway. 

Most importantly, Limo has been [reporting high uptimes](https://twitter.com/eth_limo/status/1433093424178253828?s=20) vs its centralized counterpart. 

### How do I Setup Eth.Limo?

You don't have to do _anything_ to use eth.limo to resolve your ENS domains. Visit https://<your-domain>.eth.limo and see for yourself! 

### Wrapping it up

Well that's it for now. We hope this helped for everyone having problems resolving their websites with eth.link. 

As always, feel free to reach out to us on Twitter or Discord to let us know about any features, bugs, or improvements you think our team should take care of next 🤟

* [Sign up](https://app.fleek.co) to try Fleek ⚡️
* Join our [Community Chat](https://discord.com/invite/yVEcEzmrgm) 💬
* Follow us on [Twitter](https://twitter.com/FleekHQ) 🐦
* Subscribe to our [Youtube channel ](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)📺
* Check out our [Tech Docs](https://docs.fleek.co/) ✍️