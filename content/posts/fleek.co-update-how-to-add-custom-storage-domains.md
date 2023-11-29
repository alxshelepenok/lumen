---
template: post
draft: false
title: Fleek.co Update - How To Add Custom Storage Domains
slug: fleek-co-how-to-add-custom-storage-domains
date: 2023-01-03T14:00:00.000+00:00
socialImage: https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleek-co-custom-storage-domain.png
canonical: ''
description: Today, we’re enabling existing Fleek.co users to add custom domains to
  their Fleek storage buckets to increase uptime & accessibility.
category: Announcement
tags:
- Bucket
- Custom Domain
- Storage
- Fleek.co

---
![](https://storageapi.fleek.one/fleek-team-bucket/thumbnails/fleek-co-custom-storage-domain.png)

Today, we’re increasing the uptime & accessibility of storage buckets on our (soon to be legacy) Fleek.co platform by removing reliance on our own domains for accessing storage buckets, and instead **allowing users to use their own custom domains to access their Fleek Storage buckets**.

_This feature is being added for existing Fleek.co Storage users only._ If you’re hearing about Fleek for the first time, you’ll be able to use this feature, and many more, in our upcoming new platform - Fleek.xyz. For the interested, join [the waitlist](https://fleek.xyz) or hop into [our Discord](https://discord.gg/fleek) for early access to the web3 development platform of the future.

***

# How to Add a Custom Storage Domain

Before we dive in, a reminder that last week we **deprecated the ability for new storage buckets to be created on Fleek.co** as a part of the sunsetting process the Fleek.co platform is going through. Users that don’t already have a storage bucket with Fleek can [sign up to be on the waitlist](https://fleek.xyz) for our new more web3 aligned platform, Fleek.xyz.

That said, let’s jump into how to set a custom storage domain through the Fleek.co app and then update the Fleek Storage SDK to pull files from a new custom domain.

## Setting Your Domain In App

First, you'll want to navigate to the Storage tab of the [Fleek.co app](https://app.fleek.co) - this can be found in the vertical navigation bar on the left side of the app.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-co-CSD-landing.png)

You’ll be greeted with a **new component** prompting you to add a custom storage domain. Click `Add Custom Domain` to get started.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-co-CSD-add-modal.png)

Enter the domain you want to map to your storage bucket. Make sure this is a valid domain that you own.

After a bit of thinking, Fleek’s robots will recognize the domain you’re attempting to map. To let your custom domain know the location of your storage bucket, click `⚠ Check DNS Configuration` for the relevant domain information.

> Fleek.co accelerates content through BunnyCDN, a centralized CDN provider. We’re developing [Fleek Network](https://fleek.network), a content & application delivery network for accelerating all of web3’s content in a trustless and decentralized way. Fleek.xyz will be powered by Fleek Network.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-co-CSD-config.png)

Go to your domain provider (or however you update your domain’s records) and update the CNAME record to match the `Host` and `Points to` records from the \`DNS Configuration\` modal. Or if you use a root domain, use a DNS provider that supports ANAME/ALIAS records and use that.

Lastly, Fleek needs to verify that you’ve made the changes on your end and that the domain now points to your storage bucket. To do so, click the `Verify DNS Configuration` button in the same `DNS Configuration` modal that you got the CNAME records from.

![](https://storageapi.fleek.one/fleek-team-bucket/Blogs/fleek-co-CSD-success.png)Done! 🎉 If everything has been done properly, Fleek’s robots will be able to verify your domain and the domain at the top of your storage tab will change from `storageapi.fleek.one` to your custom domain + your bucket ID.

In the example above, we’ve successfully added `storage.mergeit.xyz` as the custom domain for a user with a bucket ID `e402cc35-7532-4131-…`. This Fleek Storage bucket can now be accessed from `storage.mergeit.xyz/e402cc35-7532-4131-8ebe-dd4a5f506c5-bucket`.

> All storage buckets will stay accessible from `storageapi.fleek.one/`_`bucket-id`_, even when a custom domain has been added.

For any further help, reference the ["Custom Storage Domains" section of our docs](https://docs.fleek.co/storage/custom-storage-domains/).

## Consuming Your New Endpoint Via  Fleek.co SDK

If you’re using [our Fleek SDK](https://docs.fleek.co/storage/fleek-storage-js/) to consume your storage bucket, we have published a new version that lets you input your custom storage domain as the endpoint to use.

Please make sure you upgrade the `@fleekhq/fleek-storage-js` package to version 1.0.23. There you can now do the following and use your custom domain:

    const buckets = await fleekStorage.listBuckets({
    	apiKey: 'your key',
    	apiSecret: 'your secret,
    	domain: "your custom domain"
    });

Whether you use the Fleek SDK or not, please update your SDKs and application code to now use your custom URL.

***

# Custom Domains In Fleek.xyz

**Moving away from our services having reliance on our own domains is a trend that we plan to continue** as we roll out Fleek.xyz services in 2023.

In the past, Fleek’s domains have been a target for censorship due to phishing sites being spam hosted through Fleek. This has been a major motivation for us adding custom domain features. **We see making the move to a system that puts ownership over the access to a user’s infrastructure provided by Fleek (be it hosting, storage, delivery, compute, etc) in the hands of the actual user as a big win-win for all.** It decentralizes access to our infra services, removes our domains as a big central point of failure, and also forces out bad actors by putting their own domains at risk.

All Fleek.xyz services where endpoints are relevant will give users the option to route traffic through their own custom domain (exactly as we’ve previously done for sites & just did for storage in Fleek.co). This may eventually lead to the full deprecation of Fleek’s public domains - in this scenario users would wire their domain up to Fleek’s scaffolding as a part of the sign up process and all services (gateways, APIs, deployment previews) deployed would automatically be routed through the user’s custom domain 🔥

***

And with that, we wrap 2022! In Q1 2023 we’ll be continuing the Fleek.co sunsetting process, will start to release the first of the Fleek.xyz betas (IPNS as a Service and CLI site deployments), and continue to share updates as Fleek Network gets closer to a testnet.

Needless to say, **we’re psyched for 2023** and are happy to have you Freaks along for the ride. To keep up with everything we’ve got going on, follow us on [Twitter](https://twitter.com/fleekxyz) or hop into [our Discord](https://discord.gg/fleek) to jam with our team. ⚡
