---
template: post
draft: true
title: 'To Dfinity and Beyond:  Static Front-end Hosting, ICP Gateway, and the Next
  Steps.'
slug: to-dfinity-and-beyond-dfinity-frontend-hosting
date: 2021-03-09T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/ToDfinityandBeyond.png
canonical: ''
description: It’s happening. Dfinity + Fleek are coming together to power front-end
  and sites hosting, a new IC Gateway, and our path forward into building trustless
  web services.
category: Release
tags:
- Hosting
- Dfinity

---
![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/ToDfinityandBeyond.png)

Major day for Fleek doesn’t begin to even cover it. Today, in tandem with [Dfinity’s “Exploring Entrepreneurship in the Open Internet Boom” Techcrunch](https://dfinity.org/techcrunch/) event, we are revealing that we are joining the Dfinity ecosystem in **full force** and becoming one of the first projects to release on the Internet Computer’s Mainnet.

It’s a special release day, because not only we have a series of new Dfinity-specific features coming out into the Fleek platform, like **Static Front-end Hosting** on the Internet Computer! Meaning you can now host your websites and apps on a trustless blockchain-based infrastructure; or our Dfinity ICP Gateway, for accessing canisters over HTTP; our Canister Proxying for sites; and a powerful hosting CLI to manage it all!

But we are also sharing **our path forward with Dfinity, and into our idea of building a truly trustless, decentralized, and permissionless version** of our Open Web services (hosting, storage, etc.) on Dfinity canisters!

Buckle up, because when we say “To Dfinity and Beyond” we mean it.

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/dfinitybeyond.webp)

### TL;DR Agenda

#### New Dfinity Feature Releases:

1. Frontend Hosting on Dfinity
2. Fleek's Dfinity/ICP Gateway
3. Canister Proxying
4. Fleek's Hosting CLI

#### The Next Steps

1. Building Canister-based Services
2. Why do it on Dfinity
3. Wrapping it up!

***

## New Dfinity Features in Fleek.

1. Static Frontend Hosting.

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/dfinitydapp.png)

As of this moment, you can **take your static front-ends and host them on the Internet Computer with Fleek**! In just a couple of clicks, you can move your site further into Web 3.0 by hosting it on a computational blockchain network growing to become the trustless base layer of the new web.

It’s as easy as it is to host any static site on IPFS with Fleek. You just need to:

1. Connect your GitHub
2. Pick a repository
3. Select Dfinity
4. Configure, build, and deploy

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/hosting-dfinity.gif)

That is all there is to it. **Fleek abstracts the entire process for you.** Canister creation, content updates, resolving, cycle management (though right now cycles are free-use on Mainnet, until they are fully implemented).

You can take any static site you used before in Fleek, and take it to the Internet Computer. All supported Jamstack sites on IPFS are **fully supported** on Dfinity, and there is **no change whatsoever in build settings or requirements.**

You can build **static frontends**, which means either static websites as we mentioned, or Dapps or front-end apps that don’t require a back-end infrastructure and leverage instead APIs from the FE to implement services/features!

### How Does Fleek Achieve Frontend Hosting on the ICP?

The process in the background is straightforward. When you connect your repository to Fleek, and make a deployment, Fleek uses the **Dfinity SDK** [(view documentation)](https://sdk.dfinity.org/docs/index.html) to create a front-end Canister on mainnet, and build and deploy your website’s code to it. Right now, we do front-end canisters only (thus, static sites), but in the future we will allow for back-end as well.

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/flow.png)

Then, the continuous deployment process begins! With your canister up and running, upon any pushed changes to your linked repository’s branch, Fleek will use the Dfinity SDK again to make Canister calls and update your website’s content **reflecting changes immediately.** This means you get all the usual perks, but with your site on ICP:

* No content update delays
* No risk of conflicts
* Automatic SSL / DNS
* CDN and caching

All these are considered, in many ways, Web 2.0 elements that act as a bridge between the now evolving Web 3.0. As resolving becomes native to more devices and platforms (like browsers, or native apps and Dapps), each will be replaced by its Web 3.0 alternative.

### Domain Management and Resolving on Dfinity

When you deploy a new site on the Internet Computer with Fleek, **a free generic preview link** will be created, using Fleek’s Dfinity/ICP Gateway and the your front-end Canister’s ID.

It will look something like this: \[CANISTER_ID\].ic.fleek.co

    https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/checkdns.png)

This URL is a direct HTTP access to your site/app on Dfinity! We’ll go into the Gateways detail on the next point. But, of course, **we allow for custom DNS domains on Dfinity and the process is the same as it is with other environments.**

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/verifydns.png)

Simply specify your custom domain, click **verify DNS configuration**, and add the appropriate record to your domain’s CNAME (instructions might vary according to your provider). Once all is set and done, you can click verify again (wait a couple minutes until it propagates) and your Dfinity site will be up and running on your own custom domain.

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/finished-add-domain.png)

What about **blockchain domains like ENS** (Ethereum Name Service) **or HNS** (Handshake)**?** We are working with all parties to combine Dfinity + Blockchain Domains, adding more and more options to peel off layers of centralization. We already have worked on experimental implementations, so expect news soon...

## New Dfinity Features in Fleek.

1. Fleek's Dfinity/ICP Gateway.

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/portal-gateway.webp)

There are two main things we had to address when tackling Dfinity Hosting on Fleek. First, there isn’t a standard and quick way of **accessing Canister data on the Internet Computer via HTTP**, on the current web standards, without having to make actual Canister calls.

**Check out the Gateway’s open sourced repository here!**

What’s more, this goes for **all canisters on Dfinity and their data**, not just FE canisters created by Fleek.

Secondly, we also have to consider that even if hosted on Dfinity, if we wanted to surface static sites from the ICP on the current Web 2.0 we would need to handle basic concepts such as SSL, CDN, and DNS for our users.

Combine these two issues, and a little bit of radioactive open source code, and you get the reason why **Fleek’s Dfinity/ICP Gateway was born!** Our very own transdimensional portal, (minus the disintegration-risk) that **anyone, not just Fleek users,** can use to access their Dfinity-hosted Canister data over HTTP and an accessible URL format.

The Fleek Dfinity/ICP Gateway lives on: ic.fleek.co

To access any canister, just add your canister ID before the URL (), to get a url like this:

    [CANISTER_ID].ic.fleek.co

For example, for this Create React App we mentioned above! [_https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/_](https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/ "https://x4ytk-6yaaa-aaaab-qaiqq-cai.ic.fleek.co/")

## New Dfinity Features in Fleek.

1. Canister Proxying: Proxy & Service Workers.

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/proxy-service-workers@2x.png)

The Gateway itself as a proxy between users, and canisters on the Internet Computer. So, when it receives a request for a certain Canister ID, it translates that request, and the user receives the canister’s data through HTTP.

However, that is not all the Gateway does. Fleek’s Dfinity/ICP Gateway gives user **two Canister proxying options,** or ways to connect visitors to your static site.

1. Using Fleek's seamless proxy (more centralized, but no loading state)
2. Using Fleek's service workers (less centralized, initial loading state)

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/service-worker.jpeg)

### Using Fleek as a Proxy

The default option is using Fleek as a proxy, meaning the initial request will hit our servers, translate the user’s request, and return the data from the canister to the visitor. This experience is just as any current website, **seamless**, **but it does mean Fleek acts as a constant intermediary** between the user and the ICP.

This is also the **default option for bots, crawlers, and extraterrestrial** requests. For example, search engines and social crawlers. This way we ensure your static site on Dfinity is crawlable, indexed, and its metadata is readable by bots for important details like… Displaying Twitter cards, or images when sharing links on social!

### Using Fleek's Service Workers

This alternative option is for users that want to further decentralize their experience, and **connect their users directly to the ICP.** How does it work? If selected, **only the first request will hit our Gateway,** which will return a bootstrap script to the user, installing a Service Worker on their browser once, to connect them directly to Dfinity and retrieving all further requests directly from there, **without having Fleek as a constant intermediary.**

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Loading (2).gif)

When you use the Service Workers option, a **Dfinity loading animation will appear once** upon first visit (as the service worker is registered). All further visits are as seamless as the proxy, no loading screen, but without Fleek as a constant middleman.

## New Dfinity Features in Fleek.

1. Fleek CLI for Hosting.

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/fleekclicoding.webp)

Last, but definitely not least. We are pairing up this release with the rework of the **Fleek CLI**, adding full functionality to control **our entire Hosting (IPFS and Dfinity) suite and workflow through your terminal**, and enabling a ton of new features like:

* Using alternative deployment environments (e.g. local machine)
* Integrating custom GitHub Actions into your workflow

You can push a site right **from your desktop, to the Internet Computer or IPFS**, through Fleek with a personalized workflow, and extra control over the entire process. This is the first of many updates to Fleek that are entirely **developer-focused**, and don’t be surprised if you hear about a new **Fleek API** soon...

Get started with it, **visit the CLI’s** [**quick overview here**](http://docs.fleek.co/fleek-cli/overview/)**.**

## The Next Steps

1. Building Canister-based Services

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Group 5643.png)

Now, let’s switch gears from **short-term to long-term planning.** What’s the “Beyond” in “To Dfinity and Beyond”? For a while now, at Fleek we have been working on becoming an aggregator of the base layer of the Open Web, combining its protocols (Dfinity, IPFS, Filecoin, Ethereum, Textile, GunDB, ENS, etc.) to create the bits and pieces that together form the base layer of web services that the new internet needs.

The piece that was always left hanging was the centralization and lack of trustlessness in the infrastructure behind the services we provide. An issue that even Dapps today face, while relying on things like AWS in spite of having a partially decentralized infrastructure powered on Ethereum.

It’s an element of trust that is hard to remove, but has to be removed at some point in time so that we can have the base infrastructure of the new web built on trustless and decentralized technologies.

## The Next Steps

## 2) Why do it on Dfinity

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/whydfinity.png)

With Dfinity and the Internet Computer, we want to achieve that. It’s still pretty early, but V1 of our Dfinity Hosting product is an amazing example of the steps we can take by combining a suite of tools built on IPFS, Filecoin, Ethereum, and so on, **with a trustless infrastructure living on the Internet Computer’s** blockchain network.

Dfinity, as a computational blockchain, **provides us with the missing link.** A computational blockchain with smart contract functionality, capable of powering and hosting web services in a trustless, permissionless, and decentralized way.

It’s like the benefits we see in using Ethereum for Dapps, but applied to the **core of the web, which is its supporting infrastructure (hosting / storage / serverless functions / and so on..)**. All this, software logic, data,

So, the natural next step for us is to begin transitioning Fleek from a centralized infrastructure and product, **to a Dfinity, canister-based solution**. Today, our IPFS hosting and storage, for example, relies on us running the infrastructure for it, and the interface itself is dependent on a Web 2.0 infrastructure.

By moving everything, procedurally to Dfinity in a canister-setup that’s open and entirely user-controlled, we can **begin building the new set of canisters** for web services (hosting, storage, auth…). Entirely trustless, community-managed, and permissionless.

For us **Dfinity is an additive to all the protocols we currently work with**, not at all a replacement. In concept it would allow us to take an element of trust (us running an IPFS-node infrastructure for storage and hosting) and build it decentralized, on top of Dfinity, so that our suite of services is not reliant on Web 2.0 infrastructure only we control.

![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/yeahteamwork.gif)

It acts, in a way, as the **base layer** that ensures all other protocols we work with, and the features they provide, are built on top of and supported by an open network, and not closed or centralized providers.

**We are on an exploratory phase,** but in our history of combining Open Web protocols, we have found nothing but great use cases. **IPFS and Filecoin** set the groundwork for new distributed ways of handling storage and hosting; its content addressing and hash model is simply AMAZING.

Much like we combined IPFS and Filecoin in the past (when building [Space](http://space.storage/), for example) to achieve things like user-controlled storage, but where users have Ethereum-based accounts, or can have web-based IPFS storage where keys are protected and decentralized thanks to [GunDB](https://gun.eco/).

We believe that marrying them both to Dfinity in the future, could open up amazing opportunities for creating performant and distributed content networks. A couple of things that we’re excited about is having **dual-hosting, on IPFS and Dfinity,** or on IPFS systems running on Dfinity itself; which we are exploring.

## The Next Steps

1. Wrapping it up 🚀

This deep dive into the Internet Computer, and first batch of releases in Fleek of Dfinity features has helped us get our hands dirty, and really understand the potential behind it and what it could mean for the Open Web.

We’re literally on the edge of our seats, and as confident as ever, that reaching **fully decentralized, trustless, and user-controlled** services is not only possible, but the technology for it is already here, peeling off a bazillion of the remaining trust layers that today affect web services, Dapps, and more complex platforms that can’t be fully decentralized yet because they rely on services like AWS.

It’s month 3 on the year, and we have already announced Space, [the Space SDK](https://blog.fleek.co/posts/introducing-space-sdk-release), [Filecoin Archiving](https://blog.fleek.co/posts/filecoin-archiving-backup-fleek-sites-and-storage), [Fleek Storage V2](https://blog.fleek.co/posts/fleek-storage-is-out-of-beta-v2-release), **and now our first steps into Dfinity**, and a future transition to a decentralized and user-controlled version of our platform that looks as bright as ever.

We told you **2021 in the Open Web was going to be AWESOME** 🔥

So stay posted, because we’re bringing more updates soon, and we are not thinking about slowing down our pace with these kinds of surprises!

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co