---
template: post
draft: false
title: 'Deploying Your First Website With Fleek! '
slug: deploy-your-first-website-with-fleek
date: 2022-04-13T04:00:00.000+00:00
socialImage: https://storageapi2.fleek.co/fleek-team-bucket/blog/fleek-guide.png
canonical: https://blog.fleek.xyz/post/release-sites-deployment-beta-cli/
description: 'It doesn''t matter what your preferred framework is, deploying a website
  on the open web has never been easier with Fleek! '
category: Tutorial
tags:
- IPFS
- Fleek

---
![](https://storageapi2.fleek.co/fleek-team-bucket/blog-images/deploy-fleek.png)

Just getting started on Fleek? In this quick guide, you’ll find resources to kick start your journey with your favorite framework!

Learn how to deploy a Blog, Portfolio, or Personal Site on Fleek. Whether you’re hosting on IPFS or the Internet Computer, It’ll take you just a few clicks to get started.

## Deploying Your Site to IPFS With Fleek

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/deploy-settings.png)  
The first step to take to deploy a site is to understand what you’ll be working with. Are you using plain html, or a framework like React? Is that framework hands-on, or no code? Depending on your pick, you’ll have a different approach to building your site.

Here are in-depth instructions per framework:

* [Hugo](https://blog.fleek.co/posts/go-with-hugo-and-fleek)
* [Angular](https://blog.fleek.co/posts/angularjs-on-ipfs-on-fleek)
* [NuxtJS](https://blog.fleek.co/posts/Deploying-nuxtJS-through-IPFS-on-Fleek)
* [Jekyll](https://blog.fleek.co/posts/deploy-jekyll-blog-on-fleek)
* [Gatsby](https://blog.fleek.co/posts/Gatsby-Fleek)
* [WordPress](https://blog.fleek.co/posts/wordpress+fleek)
* [NextJS](https://blog.fleek.co/posts/fleek-nextJS)
* [React](https://blog.fleek.co/posts/fleek-create-react-app)
* [Forestry CMS](https://blog.fleek.co/posts/make-website-without-coding-cms)
* [Webflow Static](https://blog.fleek.co/posts/hosting-static-webflow-sites-on-fleek)

Whatever your choice is, **step two happens in the same place for everyone: a GitHub repository.** You will need to create your site and push the project to a Github Repository. With that in hand, you’ll be ready to **visit the Hosting tab in the Fleek app, and hit “Add New Site”.**

Connect your GitHub account to Fleek, select your site’s repo and branch, and watch as it detects the framework and build settings for you. If you’re using a custom framework, you can input them manually. Click deploy to start the process and soon enough your site will be ready on IPFS or the IC!

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/Git to fleek gidf.gif)

That’s all! Fleek will run your build and will create a preview URL of your site under a Fleek-powered subdomain. You’ll also be able to verify the content on IPFS (or the IC) via a separate and direct url.

***

## Next Steps- Customizing a DNS, ENS or HNS Domain

After deploying your site on Fleek, a random domain name will be generated for the site. These domain names will look different depending on if you’re hosting on the IC or IPFS.

While they are useful as a preview, you’ll probably want to customize your site/app with your own domain! That can be done in a **few simple steps**.

### For DNS Domains

1. Go to your site's page and select “Add or register domain”
2. Enter the Custom Domains tab.
3. Add a Custom Domain and configure the appropriate records.

Verify the domain by clicking on the “**Check DNS configuration**” button in your “**Domain Managemen**t” settings.

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/checkdns.png)

Follow the instructions to add the domain, click “**Verify DNS configuration**” and wait for the site to propagate. If your verification was successful, the domain will now be blue in your “**Custom Domain**” menu.

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/finished-add-domain.png)  
Though the original random domain names differ, the process for adding a custom DNS domain is the same for both IPFS & Internet Computer sites/apps. For an in-depth guide on customizing your DNS domains, or a guide on how to use Cloudflare as the CDN, click [here](https://docs.fleek.co/domain-management/custom-dns-domains/)!

### For Handshake (HNS) Domains

Adding a Handshake domain is a similar process and just as easy as adding a DNS address! With Handshake, instead of buying domains themselves, users buy Top Level Domains like .domain or .fleek. After buying your HNS domain from Namebase, deploy your site with Fleek and navigate to “**Domain Management**”. Verify the domain via Namebase or via your own Nameserver.

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/records.png)

Redeploy your site, and you will now have HNS domains pointing to your IPFS hosted project! For an in-depth guide on connecting HNS domains to your site, click [here](https://docs.fleek.co/domain-management/hns-domains/).

### For Ethereum Name Service (ENS) Domains

Having your site point to your ENS address brings your site a step further into Web3. Though just called a name and considered a decentralized domain, ENS names are much more than that. ENS gives the ability to directly integrate **payment processing**, **identity records and more** under the **same address**. A decentralized name, with distributed files through IPFS, puts you well on your way to owning a truly decentralized website.

After deploying your Fleek account, adding your ENS domain to redirect to IPFS is a simple process! On your website’s configure page, navigate to “**Domain Management**” in your settings. Set Fleek as the controller (Don’t worry, you still retain full ownership as the registrant!), and verify this transaction.

![](https://storageapi2.fleek.co/f125a21f-ef9d-41cf-bc2c-0ce7af7f515f-bucket/Blog/ENS Domain Setup Flow.gif)  
Pay the ensuing ETH gas fee, and your site will now direct to your ENS domain. This is the only gas fee required on the user’s side. Future deployments that require fees for automatic content hash updates will be costless via the use of IPNS. For an in-depth guide on connecting your ENS domain to your site, click [here](https://blog.fleek.co/posts/guide-ens-domains-ipfs-ethereum-name-service).

An ENS domain can encompass the entirety of an online entity or company, all within a single decentralized web address. Companies can handle payments, and direct to sites or socials with one single address. And with Fleek, integrating these addresses into your sites, and having them point to your content in IPFS is as easy as adding any DNS domain!

***

## Why Deploy Through Fleek & Host on the Open Web?

Aside from how easy it is to deploy a website through Fleek, hosting on IPFS or the IC has distinct Web3 perks!

Instead of hosting files and data at large centralized centers, IPFS distributes the data across nodes run by anyone in the world. Since IPFS stores data peer-to-peer, this not only creates a **safer** system but also a **censorship-resistant** one.

Additionally, since IPFS distributes data across nodes and points to specific data, addresses can make sure resources are coming from the closest source. This creates a **faster**, more **reliable** experience!

In the case of Internet Computer hosting, you can rely on a decentralized and blockchain-run infrastructure that can store your content directly onto a smart contract (canister).

***

That’s all for today’s quick guide! As always you can find us on Twitter, our Discord community (the Psychedelic Discord server), if you need further assistance or have questions regarding your experience at Fleek.

* [Sign up](https://app.fleek.co/) to try Fleek
* Join us on the [Psychedelic Discord Community](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co