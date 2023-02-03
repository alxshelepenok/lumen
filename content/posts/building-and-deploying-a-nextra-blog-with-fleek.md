---
template: post
draft: true
title: Building and Deploying a Nextra Blog with Fleek
slug: guide-deploy-nextra-blog-on-fleek-xyz
date: 2023-02-03T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/nextra-blog.png
canonical: ''
description: Learn how to deploy a Nextra blog app using the Fleek.xyz Sites Deployment
  service on the CLI Beta!
category: Guide
tags:
- Nextra
- Sites
- IPFS

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/nextra-blog.png)

Hi everyone! [Juan](https://twitter.com/juanbeencoding) from DevRel here, presenting one of our example apps for deploying onto Fleek with its [CLI Beta](https://docs.fleek.xyz/). I'll be showcasing a blog template built on Nextra, which you can also find on our public [Templates repository](https://github.com/fleekxyz/templates).

**What's this template?** A ready to go static blog, which you can use as the home for your articles, and guides. Here's the [repository](https://github.com/fleekxyz/fleek-demos-blog/tree/e801af0673254a10fd9f04d2e8a75db4f259e7d4) for it.

***

### Getting Started: Clone & Customize

Make sure to [clone the repository](https://github.com/fleekxyz/fleek-demos-blog/tree/e801af0673254a10fd9f04d2e8a75db4f259e7d4) to get started. Now, if you want to customize this boilerplate a little bit, these are the commands you need to run on that directory.

You can also skip this if you simply want to deploy this template quickly with its base content and settings!

![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/DESKTOP.png)

Make sure to run yarn to install all needed dependencies

    yarn

You can then use yarn run dev to initialize the development of this particular package.

    yarn run dev

Finally, after doing any front-end changes in this react boilerplate you would build your project out. But, let's focus on deploying to Fleek first this blank template and then iterating on it!

    yarn build

***

## Deploying to Fleek

The first step to deploy a site using Fleek.xyz CLI is to stand in the project directory and **run fleek sites init command** to initialize your site. Remember that you need to have the Fleek CLI installed, be authenticated, and have created a project first ([here's how](https://docs.fleek.xyz/getting-started/cli/)).

      > fleek sites init

This will prompt you to define the following:

* Site name: You can go ahead and create a new site name.
* Specify dist directory: Use `out` which contains the site exported by next
* Build command: You can specify the build command so fleek cli can build & deploy the site for you, you can use `npm run build`

The initialization will create fleek.json file on your project, that hold the configuration for this particular site:

      {
      "id": "c22dda11st0000kz04441gg9esj",
      "name": "fleek-demos-blog",
      "distDir": "out",
      "buildCommand": "npm run build"
    }

You only need to intialize your site once, but you can always modify the settings on your fleek.json file.

With your deployment configured, **use the CLI to trigger the** push to IPFS. Fleek will follow the json configuration to build and deploy the site.

    > fleek sites deploy

The output? Fleek will share the IPFS CID that represents you site.

    Export successful. Files written to fleek-demos-blog/out
     
    > Success! Deployed! IPFS CID: QmavADhLe6ixJhXMgRbftw6iywGLFUMBZ4AejPyy8m9hdS

Here's the site, via [Brave's IPFS gateway](https://bafybeif24hdo3zv3azf2wme7nzkpdjui5dbhwwciq6lkexz744uihvlnie.ipfs.dweb.link/). Some public IPFS gateways don't properly resolve stylings for Next sites.

### Add an ENS Domain to Your Site

The best way to see your site in fully glory is to map your new site to an ENS or DNS domain! [Here is a guide on how to use ENS with your Fleek site](https://docs.fleek.xyz/guides/ens/).

***

That is all for this guide! Feel free to suggest new templates to use in the [templates repository](https://github.com/fleekxyz/templates/), or come visit us on [Discord](https://discord.gg/fleekxyz) to chat with us and the team to jam on ideas.

For more resources visit [our LinkTree](https://linktr.ee/fleek).