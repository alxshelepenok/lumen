---
template: post
draft: true
title: Deploy a React + Vite Boilerplate with Fleek
slug: guide-deploy-react-vite-on-fleek
date: 2023-02-02T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/215173844-c43adf85-963a-4f5f-9645-812df067ce9f.png
canonical: ''
description: Learn how to deploy a React App + Vite boilerplate using the Fleek Sites
  Deployment service on the CLI Beta!
category: Guide
tags:
- Sites
- IPFS

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/215173844-c43adf85-963a-4f5f-9645-812df067ce9f.png)

Fleek Fam! [Abril here](https://twitter.com/abruzuc), from the DevRel team, bringing a new guide on how to deploy a React App + [Vite](https://vitejs.dev/) boilerplate using the [Fleek Sites CLI Beta](https://docs.fleek.xyz/). One of the first examples we are building and adding to our public [Templates repository](https://github.com/fleekxyz/templates).

**What's this template?** A boilerplate! A quick blank-canvas you can rapidly deploy and iterate on with Fleek.

Why React on Vite? This frontend development environment has some extra features like typed APIs, fast hot module replacement, and instant server start that have made it an ideal choice for popular FE frameworks such as react.

***

## Getting Started: Dependencies

You can find the repo with the example [here](https://github.com/fleekxyz/templates/tree/main/boilerplates/react-vite-template). Let's do a quick run of what you need to get started. First, make sure your dependencies are covered:

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Javascript](https://www.javascript.com/)
* [eslint](https://www.npmjs.com/package/eslint)
* [prettier](https://prettier.io/)

### Add, Dev, Build

In your terminal, start by adding the template to your directory, and move to that directory.

      yarn add react-vite-template
      cd react-vite-template

You can then use yarn run dev to initialize the development of this particular package.

    yarn run dev

Finally, after doing any front-end changes in this react boilerplate you would build your project out. But, let's focus on deploying to Fleek first this blank template and then iterating on it!

    yarn build

***

## Deploying to Fleek

The first step to deploy a site using Fleek.xyz CLI is to stand in the project directory and **run fleek sites init command** to initialize your site. Remember that you need to have the Fleek CLI installed, be authenticated, and have created a project first ([here's how](https://docs.fleek.xyz/getting-started/cli/)).

      > fleek sites init

During this process, the CLI checks if a fleek.json file exists, in the case it does not it starts a step by step process to set up the site. The .json defines the configurations of your site.

While initializing you will define:

* The name of your new site.
* The directory from where your site will be uploaded: dist.
* Confirm you want to specify a build command: npm run build.
* And done! Your site's configuration will be set.

  > fleek sites init
  > WARN! Fleek CLI is in beta phase, use it under your own responsibility
  > ✔ Choose one of the existing sites or create a new one. › Create a new site
  > ✔ Type name of you new site. … react-vite-template
  > ✔ Specify the dist directory from where the site will be uploaded from … dist
  > ✔ Do you want to include the optional "build" command? … yes
  > ✔ Specify `build` command … npm run build
  > Success! Fleek config file has been saved.

Now we can see that a fleek.json file has been created with the configuration for our deploy, this files looks a little something like:

      {
      "id": "cldda19st0000kz081v8v9esj",
      "name": "react-vite-template",
      "distDir": "dist",
      "buildCommand": "npm run build"
    }

If we try to run again the fleek sites init command then we will be greeted with the following message, because your site is already initialized:

    > fleek sites init
    WARN! Fleek CLI is in beta phase, use it under your own responsibility
    Error: Configuration file found already.
    > Site already exists in this folder.

Now that we have our site configured and our deploy all set up we can proceed to **deploy it using the fleek sites deploy command**. This will start by checking the existence of the fleek.json file and start the build and upload process.

    > fleek sites deploy
    WARN! Fleek CLI is in beta phase, use it under your own responsibility
     
    > build
    > vite build

Once the process is finished you will have an IPFS CID that represents you site. You can see your newly deployed Vite site via a public IPFS gateway!

    Export successful. Files written to fleek-demos-blog/out
     
    > Success! Deployed! IPFS CID: QmX1BRLkZrZHNYkpWdcviSHMeJWRxk7QbaNPu8YemryBdz

***

## Using an ENS Name With This Site

Now that your site has deployed to IPFS, and you have a hash, how about we add a decentralized domain to it - an [Ethereum Name Service](https://ens.domains/) (ENS) domain! ENS names are decentralized domains built on top of Ethereum, and an alternative to DNS.

What's the best way to do it? Here's the TL;DR.

1. Map your site's IPFS hash site to an IPNS name.
2. Configure your ENS domain with your IPNS name.
3. Done!

**First**, map your IPFS hash to an IPNS name using the Fleek CLI. You can find the step-by-step instructions for this in our [documentation](https://docs.fleek.xyz/services/ens/). Why? Because IPFS hashes change each time your content changes, meaning you would have to set your IPFS hash each time on ENS, and pay the gas for the transaction on Ethereum.

Instead, you use a static IPNS name that on the background represents a dynamic IPFS hash that you can update any time.

**Secondly, you need to** **configure an ENS domain** and add this IPNS hash to the content field of your ENS name. Here's another quick-guide on our documentation!

Once completed - you will be able to visit your site on any public ENS resolver, such as ETH Limo, (domain.eth.limo), or by using any browser or browser extension that allows for the resolving of ENS names (e.g. Metamask).

***

That is all for this guide! Feel free to suggest new templates to use in the [templates repository](https://github.com/fleekxyz/templates/), or come visit us on [Discord](https://discord.gg/fleekxyz) to chat with us and the team to jam on ideas.

For more resources visit [our LinkTree](https://linktr.ee/fleek).