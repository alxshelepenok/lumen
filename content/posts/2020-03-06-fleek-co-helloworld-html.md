---
template: post
title: Deploy and Host your site on IPFS Using Fleek
slug: fleek helloWorld
draft: false
date: 2020-03-06T03:02:20.010Z
description: Create and deploy a static website using Fleek and IPFS
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-plus-ipfs.png 
tags:
  - Tutorial
  - Resource
---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-plus-ipfs.png)

## Overview

We're going to deploy a site onto IPFS in under 30 seconds using [Fleek](http://Fleek.co/). Let's get started!

If you don't have a site or app handy in a GitHub repo, let's create a simple `index.html`. If you do, just skip directly to STEP 2. 

Fleek will connect to your git provider and auto-detect whatever framework your site is using for quick deployment (you can also customize build settings if you'd like).

![](./media/Rebrand-release/GatsbyPrefilledSettings.png)


## Step 1: Set Up a Repo on Github

Create an empty repository, clone it, and start coding.

![](./media/image 2.png)

Create an `index.html` file and add some content.

![](./media/image 3.png)

add, commit, push (you know the drill)

![](./media/image 4.png)

Now your repository is ready to go!

![](./media/image 5.png)

## Step 2: Set Up Fleek

Go to: <https://app.fleek.co/>

Sign in or up with Github or Email

![](./media/image 6.png)

Add New Site

![](./media/image 7.png)

Connect with Github.

![](./media/image 8.png)

Pick a repository.

![](./media/image 9.png)

If you're using the Hello World example, there is no framework selected and the build settings are empty for this deployment.

Deploy the Site!

![](./media/image 10.png)

Deployment takes 30 seconds.

![](./media/Image 11.png)

Once complete, view your website.

![](./media/Image 12.png)

You can view the website using the provided domain name.

`https://<your-custom-domain>.on.fleek.co`

![](./media/image 13.png)

Or verify with the CID.

`https://ipfs.io/ipfs/<CID>`

![](./media/Image 14.png)

## Step 3: Updates

Fleek will automatically redeploy your website whenever you make changes to GitHub. The provided domain name will remain the same and will point to the new CID. This enables you to build fast modern websites hosted on IPFS.

* [Sign up](https://app.fleek.co)
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ) 
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co 
