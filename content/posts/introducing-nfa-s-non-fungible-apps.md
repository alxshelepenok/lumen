---
template: post
draft: false
title: 'Introducing NFA’s: Non-Fungible Apps'
slug: introducing-nfas-non-fungible-apps
date: 2022-12-22T14:00:00Z
socialImage: https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleekxyz-nfa-thumb.png
canonical: https://blog.fleek.xyz/post/introducing-nfas-non-fungible-apps/
description: Today, we’re proposing Non-Fungible Apps (NFAs) -  A new approach for
  on-chain tokenization of apps that will help unlock better decentralization, censorship
  resistance, and community ownership for Web3 frontends.
category: Proposal
tags:
- Smart Contract
- NFT
- Tokenized App
- Non Fungible App
- NFA

---
![](https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleekxyz-nfa-thumb.png)

##### Non-Fungible Apps (NFA) – The concept is quite simple; take everything that makes your web3 app run and orchestrate it through a smart contract for increased transparency, decentralization, and censorship resistance. The NFA owns everything and controls everything. When you transfer your NFA, you’re transferring your _entire_ app.

***

# What are NFAs?

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/nfa-extra-steps.jpeg)Well Rick, you’re actually right! [**NFAs**](https://github.com/fleekxyz/non-fungible-apps) **are an implementation on top of the ERC721 NFT standard that holds the on-chain metadata for _everything_ about your app**. Name, domain, build history, infra endpoints, etc. And unlike most NFT’s, NFA’s will probably update frequently (ex. every time you push a new production build).

But that’s not all, in the endgame we’ve got in mind, **NFAs will handle everything related to keeping your app alive** like owning and updating the content hash that your ENS name (or other domain) points to and paying for your apps decentralized hosting, storage, delivery, databases, RPC endpoints, and much more!

Similar to ENS, NFAs are not as much about the new primitive as much as they are about the supporting ecosystem that brings novelty and usefulness to the new primitive.

***

# Why NFAs?

While the recent announcement of [Fleek Network](https://fleek.network) is a very critical piece for fully decentralizing frontends and apps, there are still other pieces of the stack (ex. DNS, HTTP, etc.) that need addressing, and we think NFA’s can help solve that. **The combination of Fleek Network and NFA’s is what we feel eventually gets us to true decentralized frontend and application hosting**. Let’s dive into the three main reasons why you should be excited about NFA’s.

## Web3 Apps (especially the frontends) Desperately Need Decentralization

Web3 apps of today still suffer from a lack of decentralization. For the most part, every web3 app is still using centralized solutions for hosting, content delivery, storage, DNS, RPC endpoints, etc. Besides this leaving web3 frontends vulnerable to [censorship](https://twitter.com/liamzebedee/status/1577525264963100674) and [hacks](https://www.coindesk.com/business/2021/12/10/badgerdao-reveals-details-of-how-it-was-hacked-for-120m/), it has also created [financial](https://www.coindesk.com/policy/2022/01/03/cftc-fines-crypto-betting-service-polymarket-14m-for-unregistered-swaps/) and even [criminal](https://www.coindesk.com/policy/2022/11/22/tornado-cash-developer-alexey-pertsev-to-remain-in-jail-until-at-least-late-februrary/) liability for web3 projects and their founders. Combine that with the increasingly uncertain regulatory environment around web3, it’s now becoming way too risky for web3 projects to be the sole centralized frontend operators of their apps.

NFAs will help to solve this issue by allowing **smart contracts to trustlessly own and control all of the infrastructure and assets that encompass your web3 app**. For example, NFA’s will be able to automatically update your ENS (or other domain) based on the IPFS CID of your most recent build, pay for your decentralized hosting, storage, or other infra such as usage of an RPC endpoint (ex. POKT Network). **Anything you’d usually do/own/pay for as a founder can now be automated and abstracted to the NFA**.

Here’s where things also get kinda cool. Minting your app as an NFA means that **transferring the NFA actually means transferring the app**. So in the future you could see all the same cool stuff people are doing with NFT’s, and now do it with NFA’s. Buy/sell them, DAO/community own them, take out loans against the app (or its cash flow), etc. Imagine something like Flippa which already allows buying/selling of Shopify stores and Amazon businesses, but way cooler, transparent, and trustless.

***

## Web3 Apps Need Better Censorship Resistance & Accessibility

One of the least addressed centralized points of failure for web3 applications is their reliance on browsers and DNS. Most attempts at censorship happen at this level. **To solve this reliance we need to (1) increase the amount of access points (2) decentralize the way we access apps.**

Cool projects like [Dappnet](http://twitter.com/dappnetbby), [Backpack](https://www.backpack.app/), and others are already trying several different approaches at solving this issue and we are big fans of those efforts. We think NFA’s could be super useful to those and many other projects. For example, crypto wallets or other interfaces that embrace **NFA’s could serve as new access points for web3 apps** that don’t rely on DNS or HTTP, and given they already surface NFT’s the work to support NFA’s would be trivial.

For web3 apps that want to hand over operation of their frontend to their community, NFAs could keep a tamperproof record of approved domains to access the app (almost like IPFS gateways but on an app-specific level). And the NFA could help guarantee that all those approved domains are always running the correct version of the app by checking the CID (and the correct version of the app could be updated/decided by the core team or the DAO, etc.). Another benefit of this is we think this could greatly reduce phishing attacks on web3 apps.

You can think of NFA’s as allowing any web3 project to do something kinda like what Liquity has done for front-end decentralization (we love what they did and took inspiration from them), **but with the flexibility to set it up however you want** (ex. choose if/how you want to incentivize people to run frontends, choose how many different domains you want to host your app, if you want different approved versions of the frontend or all domains point to the same one, etc). And we will add features to the Fleek.xyz platform to make it super easy to mint your site/app as an NFA, manage/update it, and for others to participate/run frontends for your app/NFA.

## Web3 Apps Should Be Controlled by DAO’s/Communities (not Founders/Companies)

Besides the security and liability issues mentioned above, that company/founder-operated frontends are vulnerable to, from a web3 principals perspective it also just seems odd for certain backend infra (ex. smart contracts) to be owned/controlled by a DAO/token holders (and for value accrued from them to go to the DAO), but not any of the other infra/assets or value capture relating to the project.

To be fair, up until recently it has been quite hard for a DAO/smart contract to own and control infrastructure besides the smart contracts that live on that same chain. But with the recent explosion in decentralized infrastructure covering almost all parts of the stack, in addition to advancements in cross-chain/omnichain/threshold cryptography, plus now with the introduction of NFA’s, we finally see a path forward.

**DAO’s, multisigs, and communities can own/control/operate their frontends with NFA’s.** DAOs that own their app through an NFA would be able to use governance or delegating permissions for updating the app, paying for infra, managing the records of infra and access points, have full control over transferring the app in its entirety, and build with less worry of hacks or liability.

To say the least, we’re really excited for NFAs owned by DAOs.

***

# NFAs in Fleek.xyz

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-distracted-nfas.jpeg)

As the [Fleek.xyz](https://fleek.xyz) platform begins to roll out in early 2023, we’ll also be continuously adding more and more functionality to integrate NFAs into the platform. To start, **sites/apps hosted through Fleek will have the option to be minted to the NFA contract**. From there, further integrations for automating updates to the contract via your site's CI / CD pipeline and payments to protocols will be gradually added in.

From Fleek’s POV, **NFAs eventually become almost like the backend for the Fleek platform**, removing our reliance on a centralized backend for the platform. Your NFA’s on-chain dynamic metadata will already carry all of the information that we’d need to surface anyways, it then becomes a matter of us querying it from the contract. And once we add all the billing capabilities to the NFA, we could just facilitate billing through the NFA rather than via the Fleek platform.

That future vision gets us about as close to true decentralized hosting (and Fleek platform decentralization) as we can imagine for right now. And yes, the goal is eventually the **Fleek.xyz platform itself will be an NFA**. 🔥

***

# NFAs V0 & Beyond

To make our first steps down this road, **today we’re presenting** [**our initial implementation of the NFAs contract**](https://github.com/fleekxyz/non-fungible-apps)**.**

Feedback from the web3 community is critical at this early stage. While we understand the problems NFAs solve, the semantics of how to implement them is still up in the air and we want the community’s input before we harden anything. **Please feel free to reach out if you are interested in jamming on these ideas or interested in using NFA’s for decentralizing your web3 app frontend**.

Going beyond V0, we also touched on some key features of NFAs in this blog that we will continue to develop and share with the community, including:

* **An EIP submission**
* **A technical overview of the NFA standard**
* **A deep dive into the community hosting features & how it will enable users to mint their own “prints” of apps for maximum accessibility.**

For more information about the NFAs implementation’s roadmap, also check out [the NFA Github wiki](https://github.com/fleekxyz/non-fungible-apps/wiki)!

***

As you can tell, we’re super stoked about NFAs! Today we first presented what NFAs are and why they’re a game changer for decentralization, censorship resistance, and community ownership of web3 apps.

If you’re passionate about decentralizing apps, please checkout our initial [NFAs implementation repo](https://github.com/fleekxyz/non-fungible-apps). PRs, issues, and discussions are all welcome and appreciated!

Lastly, if you’ve got any questions, ideas, or just want to jam with our team, hop into [our Discord](https://discord.gg/fleekxyz). ⚡️

* For more resources visit [our LinkTree](https://linktr.ee/fleek).