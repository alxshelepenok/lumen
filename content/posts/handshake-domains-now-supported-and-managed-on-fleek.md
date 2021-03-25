---
template: post
draft: true
title: Release Update - Handshake Domains, Now Supported on Fleek!
slug: handshake-domains-support-release
date: 2021-03-23T03:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Handshake.png
canonical: https://blog.fleek.co/posts/handshake-domains-support-release
description: Link HNS domains to your IPFS or Interet Computer sites on Fleek! Mix
  the power of decentralized blockchain domains with distributed sites on the Open
  Web.
category: Release
tags:
- Domains
- Handshake
- HNS

---
![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Handshake.png)

Fleek's protocol ranks grow again! Make room for **Handshake**, the peer-to-peer root naming system blockchain. Add **custom HNS domains for both IPFS & Internet Computer hosted sites and apps**, seamlessly, and as quick as it is to set up DNS or ENS.

Handshake and its thriving ecosystem & community blows us away each week with dope news like the [release of dLinks by Namebase](https://www.namebase.io/blog/dlinks-launch/) earlier this year or community projects like [Flip.Flops](http://flip.flops.hns.to/), an email service on top of HNS!

We're pumped about welcoming this ecosystem into Fleek, and add another blockchain alternative to DNS, together with ENS (Ethereum Name Service), as they forge the road towards making unstoppable and user-owned naming a reality on the Open Web.

Plus, let's be honest. Owning top level domains is just cool and we can't wait to see what awesome domain+TLDs combos you bring on to Fleek.

## Handshake & Namebase 🤝

![](https://storageapi.fleek.co/fleek-team-bucket/hnsnmbs.png)

A blockchain-based naming protocol / certificate authority, and a fire registry to compliment it. Name a better duo. If you haven't had the chance yet to know Handshake, it's time to catch up.

Our top picks for a quick start? [HNS' documentation](https://hsd-dev.org/), [learnhns.com](http://learnhns.com/), and [The Shake](https://theshake.substack.com/).

In a nutshell, it acts like a **decentralized extension of DNS' root zone file**, where the ownership data of the web's TLDs are stored.

But with the added perk that it is done through a decentralized blockchain system that's permissionless and uncensorable. **No middlemen or controllers**. Domain buyers own the top level domains, and no entity (ICANN) could snatch it away or avoid the registration of weird & creative TLDs (.mars, .moonmoon, .whatever).

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/comp.png)

It's as if the current DNS registrar role was rethinked, and TLD **owners in HNS would retake that role for themselves**, each being the registrar of their own TLDs and doing with them as they see fit (commercialize domains, sell, transfer, etc), validated and backed by a blockchain network.

It's also **backwards compatible with ICANN's** root zone (.com, .org, etc.) to avoid conflicts with current DNS owners, who have their names and ownership reserved for their domains on HNS.

To top it all, HNS aims to peel off another important layer of trust/centralization of the web. Certificate authorities. Scrap centralized lists in hundreds of authorities for key authenticity verification (known to have gone rogue and compromised security in the past) and replace it with a decentralized blockchain-based and cryptographically-backed key verification.

**Namebase** on the other hand, is a parallel project, a seamless front for HNS, a registry and marketplace app where you can purchase, sell or trade domains on the HNS blockchain. It uses a simple bid/auction process for purchasing TLDs (emphasis on purchase, not rent).

You could operate and interact with [Handshake directly](https://hsd-dev.org/) via their native suite/node; Namebase is the abstraction of that process and a friendly web-platform alternative to installing a full Handshake node.

## Using HNS Domains in Fleek ⚡

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/handshake.webp)  
Recap aside, let's jump into HNS & Fleek! This will be short and quick, because adding HNS domains to your site on Fleek is **as easy as it is to add ENS or DNS** domains to any site. No surprises, and it is supported for both sites/apps hosted on IPFS or DFINITY's Internet Computer.

Once you have a site or app hosted on Fleek, you just need to visit the **Domain Management Tab** inside your site's settings to find HNS.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/hns.gif)

There, click Add HNS, and a modal will pop up where you'll be able to specify an HNS domain, and verify if it is owned already or available for purchase. If it's already owned, you just click Add Domain and you move on to the verification step.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/hnstest (1).png)

How do you verify an HNS domain and link it to your site? Same way you do with DNS. Set up a custom record to point it to your Fleek site. If you use **Namebase** to get your HNS TLD/domain, you can quickly update your records through there, or use your own Handshake Nameserver as an alternative.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/records%20(1).png)

Hit verify HNS Configuration, and you're done 🚀 You've paired up Open Web hosting with a blockchain-based domain name.

### Accessing HNS Domains

Handshake domains live on the Handshake blockchain, much like ENS names live on Ethereum, and are not yet fully supported/resolved but most browsers.

Still, while that gap is bridged, there are many ways of sites using HNS domains. The most quick and easy way is to use [**hns.to**](https://hns.to/) to quickly verify that your new  site is up and running correctly. hns.to is a Handshake resolver, you can use its search engine to find your site, or append at the end of your HNS domain name `my.site.hns.to` to view it over HTTP.

Another option is to use an **HNS compatible browser or extension**, [like PUMA](https://www.pumabrowser.com/), or the [LinkFrame extension](https://chrome.google.com/webstore/detail/linkframe/klcheodcjdbkbiljlcfiphagmkhbifmm?hl=en-US&authuser=0) for Chrome. 

If you want, you can also change your **devices' DNS** to point to HNS resolving ones, like [HDNS](https://www.hdns.io/); or go all the way and install **Handshake's node,** [**hds **](https://hsd-dev.org/)to resolve their domains trustlessly.

Without a doubt there's a ton of options, and if you need more you can peek at Namebase's guide, [separated by technical level](https://learn.namebase.io/starting-from-zero/how-to-access-handshake-sites#level-3-dns).

## Wrapping it Up 🗞️

For us the main driving factor of Web3 is how open and collaborative and community-driven it is. The creativity engine of the Open Web is just on fire 24/7 🔥

To keep that engine fired, it's a must to keep integrating new protocols (like Handshake!) and helping to abstract and connect them to enable devs and users to easily explore the new internet's raw potential.

And Handshake's ecosystem packs a punch, we can't wait to see what new opportunities it opens up, and jam with the community on what could come next for HNS + Fleek. Feel free to pop into our Slack community and to brainstorm with the team on some ideas ⚡.

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co