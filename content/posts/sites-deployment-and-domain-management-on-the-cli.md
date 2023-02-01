---
template: post
draft: true
title: Sites Deployments Release on the CLI Beta.
slug: release-sites-deployment-beta-cli
date: 2023-02-02T03:00:00Z
socialImage: https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/cli-sites.png
canonical: ''
description: New features are coming to the CLI! Today we are releasing the Sites
  Deployments service to the CLI for developers to start testing.
category: Blog
tags:
- Domains
- Sites
- CLI
- Beta
- Release

---
![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/cli-sites.png)

The beta’s growing, and with new testers, new features are coming to the CLI! Today we are releasing the **Sites Deployments service** to the CLI for developers to start testing and [share their feedback](https://github.com/fleekxyz/fleekxyz-support) on. 

Step aside, it’s time to host some sites on IPFS! If you want a quick-start, visit our [updated docs](https://docs.fleek.xyz/) right away ⚡️

***

## Static Sites Deployments on the CLI

![](https://storage.fleek.zone/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/site-demo.png)

The Sites services on Fleek will allow anyone to upload and easily maintain static sites, stored and served by Web3 protocols, starting with IPFS. Visit the [Sites documentation](https://docs.fleek.xyz/services/sites/) to learn how to get your first project live.

    > fleek sites init
    ? Choose one of the existing sites or create a new one.
    ❯ Create a new site

The flow? With one quick command, you can initialize and create a new site project on the CLI. Just specify the output directory and the build command and that would be it! Once the site is configured, you can build and deploy the site to IPFS using the `fleek sites deploy` command.

Any further changes you commit, can then be re-built and deployed for a new IPFS hash and on a following update you will be able to generate a Github action to automate the deployment. We will follow up with managed deployments on a future versions (where Fleek manages the build and deploy). Have feedback? [Let us know here.](https://github.com/fleekxyz/fleekxyz-support)

As an example, we re-deployed our [a quick blog page with the CLI](https://mntis.eth.limo/), and mapped the IPFS hash to an ENS domain name, to make it accessible! Here’s [how to use ENS](https://docs.fleek.xyz/guides/ens/) for that.

## The Templates Repository.

With this release, given you can now make site deployments, we are introducing [**Fleek's templates repository. **](https://github.com/fleekxyz/templates)An open-source Github repository, courtesy of the DevRel crew at Fleek, with quick-to-deploy boilerplates and app examples. Starting with a simple React boilerplate and a Nextra blog!

Being open-source, **anyone is open to contribute or suggest in the repository** the templates they want or need. The DevRel team will expand it as well, so let us know what you want to see next.

These templates will set a foundation that in the future, the Fleek's UI and CLI can pick-up and integrate to provide them as options, inside the development experience itself.

***

The CLI’s growing Fleek fam! We’re on the road to matching the legacy platform’s features, and then breaking further into new services and features for web3 developers. 

We want to see **what sites you’re hosting and trying on the beta!** Ping us on [Twitter](https://twitter.com/fleekxyz) or [Discord](https://discord.gg/fleekxyz) with them.

For more resources visit our [LinkTree](https://linktr.ee/fleek).