---
template: post
draft: true
title: Release Update - New DNS Configuration with CDN Perks & DDOS Protection
slug: new-dns-configuration-ddos-cdn
date: 2021-05-03T04:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/dns-1.png
canonical: ''
description: We're upgrading our infrastructure to offer a faster, safer, and resilient
  DNS configuration with extra CDN benefits and DDOs protection! You can migrate your
  site to it in a click.
category: Announcement
tags:
- DNS
- hosting

---
![](https://storageapi.fleek.co/fleek-team-bucket/dns-1.png)

New upgrade coming for everyone hosting sites/apps on Fleek using custom DNS domains! You can now upgrade your site to our new DNS configuration to unlock extra CDN benefits, DDOS protection, and faster routing. Courtesy of Bunny CDN 😎

# Our New DNS Configuration

We’re upgrading our custom DNS domain infrastructure to move away from HAProxy, and **transition to using** [**BunnyCDN**]() so that we can supercharge all Fleek sites with extra CDN features, security, and a layer of redundancy when it comes to high-availability and 24/7 uptime.

The most important perks this change brings is adding a powerful and scalable anti-DDOS for all of our Fleek users, **no matter their site’s size or plan**, protecting their sites and apps automatically from all DDOS variants, without compromising their uptime or deliverability.

But, there's more perks other than security. Bunny expands our CDN perks with a redundant **perma-cache** layer that ensures, even in the worst scenarios, your site will be up and their files served in the most optimized way possible, **re-routing requests** **in real-time** to avoid downtimes or inefficient requests.

Expect faster, and meaner sites on Fleek, since every single one of them will be enhnanced with these CDN perks⚡

**Important:** This new DNS configuration requires ANAME record support by the DNS service/provider where you have acquired and manage your domain. Make sure it does so before migrating, or move to a new provider if necessary.

## Migrating Your Site to the New DNS ⚡

If you **already have a site on Fleek**, you need to **migrate it from the dashboard to the new DNS configuration** to take advantage of these new features. It only takes a minute!

If you are hosting **a new site or app on Fleek,** you don’t have to do anything but configure your DNS domain when you create it, since this new infrastructure **is now the default setup for all newly created sites**.

This new DNS configuration **will deprecate the previous one, and all sites using the legacy proxy/DNS will stop working by May 31st**. If you are using custom domains, upgrade now to avoid any performance issues, and have your site continue to work after May 31st.

### Migrating Your DNS

[Log into your Fleek account](http://app.fleek.co/), and do this for every site that uses a custom DNS domain. Once you're logged in, **visit the hosting tab, and click on a site on the list** to get started.

Once inside a site's detail view, **visit the SETTINGS** tab and there, look for the **Domain Management** tab on the vertical sub-menu.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/dns.gif)

There, you will see the **Custom Domains** section, showing the **Custom DNS Domain** name you previously set up and connected to your Fleek site/app. **Click on the "Upgrade DNS Configuration" button** to re-configure your site.

![](https://storageapi.fleek.co/fleek-team-bucket/dns-space.png)

In a nutshell, you will need to **update your records** **on your DNS domain.** This is because your custom domains needs to point to **Fleek's new upgraded infrastructure**.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/cname.png)

Remember that to utilize this, it is required that your DNS provider supports **ANAME** records. **Check this** **before starting the upgrade.**

Once you have updated your CNAME record on your DNS provider, come back to Fleek to **Verify the DNS Configuration**. That is all! Your site will be updated to our new faster, and safer, DNS configuration.

## Wrapping it Up 🗞️

That is all for today! This week we are taking extra care on strengthening and scaling our hosting features to give maximum reliability to all the amazing users coming into the platform. Expect more news on this soon!

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co