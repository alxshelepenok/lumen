---
template: post
draft: true
title: IC Action - An Open Source GitHub Action to Deploy Canisters to the Internet
  Computer!
slug: ic-action-deploy-canisters-internet-computer
date: 2021-03-25T03:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Group%205815.png
canonical: ''
description: ''
category: ''
tags: []

---
![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Group%205815.png)

We're back with a surprise open source release for developers working on DFINITY's Internet Computer! The team just made public the [**IC Action**](https://github.com/FleekHQ/IC-Deploy-Action)**,** a GitHub Action anyone can use to deploy **any type of canisters** seamlessly to DFINITY's Internet Computer through GitHub's CI/CD pipeline.

This IC deploy action wraps commands from [DFINITY's DFX](https://github.com/dfinity/docs) command line tool, triggering new deployments when you push commits to GitHub, deploying and updating your canisters on the Internet Computer.

## The Internet Computer & Fleek 🌀

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/Dfinity+Fleek.png)

If nothing rings a bell, well, _you've missed a big one_. A couple weeks ago we announced that Fleek was joining the [Internet Computer's ecosystem](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting) in full force, releasing a stack of Internet Computer focused  features to Fleek:

* Static frontend hosting on the Internet Computer
* A new Internet Computer HTTP Gateway
* Canister Proxying

In Fleek, DFINITY's Internet Computer comes as an alternative to hosting on IPFS, with a different set of perks and purpose. It's a trustless, permissionless, and open blockhain-based infrastructure, and in the future it could allow us to rebuild Fleek on top of a 100% decentralized infrastructure. 

But, if you look outside of Fleek, it is much more.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/illshowyou.webp)

The Internet Computer itself is a new approach at rebuilding the web through a unified protocol capable of running **the entire base layer of the web** (hosting / storage / services/ etc..) as well as the apps and experiences of it in that open and decentralized computing blockchain network.

And in the center of it all? Canisters.

On the Internet Computer, everything lives in canisters. Think smart contracts on Ethereum, but **capable of powering FE, BE, and pretty much any web service** because they can include both program and state and are built to scale performantly. They are built specifically for supporting the web.

Still, like Smart Contracts, its execution is governed by a secure protocol (the Internet Computer Protocol) on the blockchain, and they can be only affected by it.

If this is the first time you're hearing about it you might need to step back, take a breather, and binge watch the ["Exploring Entrepeneurship in the Open Internet Boom"](https://dfinity.org/techcrunch/), hosted by DFINITY and explore [their site](). There's a lot of exciting experimental technology ramping up to potentially become a new leap forward in blockchain/Web3 development, and the Internet Computer's Mainnet Beta Genesis is coming up, so got to prep up!

## Fleek's IC Deploy Action for Deploying Canisters via GitHub ⚡

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/Group 5818.png)

Feel a little less lost? Then back to the news! There are **many ways to deploy your projects and code to canisters on the Internet Computer**. 

For example, DFINITY's [dfx CLI](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html) and SDK.

But, having worked on the Internet Computer for a while in the past months, we thought everyone could use **a** **little CI/CD seamlessness on their canister management lives**. So the team jumped onto the task and built this [open source GitHub Action](https://github.com/FleekHQ/IC-Deploy-Action) for it 🔥

**TL;DR on how it works?** First you'll create and deploy a project/canister using the dfx CLI in your repository, and then you'll add Fleek's IC Deploy Action to your CI/CD pipeline, which will automatically trigger new deployments to you canister when commits are pushed to that repo.

Now the long version.

### Using Fleek's IC Deploy Action

Here's the [IC Deploy Action's repository](https://github.com/FleekHQ/IC-Deploy-Action), you can also find it in the action marketplace. But, before getting started with the IC Action, kick things off by configuring and deploying a project to the Internet Computer using the [dfx CLI](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html). 

You have to start with this so that your repository has the right canister identifiers and the configuration files to fill in the necessary GitHub secrets. 

To create a new project with the dfx CLI:

    dfx new hello-world

Then deploy that new project to the Internet Computer to have your first canister up and running. If you need to install dependencies, make sure to do so with `npm install`.

    dfx deploy --network=ic

With your dependencies install, and your work deployed, you got your first canister! You should see a canister_ids.json file on your repository, which identifies your Canister on the Internet Computer. **Make sure that after deploying your first canister you push these files to GitHub**, as they are needed later on.

Canisters also deploy with a particular entity, `default` by default. We'll use Github secrets to export the private key for that identity.

### Adding the GitHub Action to Your Repository

Now that your canister is live on the IC, you can create workflow file `github/workflows/deploy.yml` in your repository:

    on: [push]
    
    jobs:
      test-deploy:
        runs-on: ubuntu-latest
        name: A job to deploy canisters to the IC
        steps:
          - uses: actions/checkout@v2
          - name: Install dependencies
            run: npm install
          - name: Deploy canisters
            id: deploy
            uses: fleekhq/ic-deploy-action@v1
            with:
              identity: ${{ secrets.DFX_IDENTITY }}
              wallets: ${{ secrets.DFX_WALLETS }}
          - name: Show success message
            run: echo success!

**You'll notice two Github secrets in there.** `DFX_IDENTITY` and `DFX_WALLETS` which you need to complete to make future deployments to that identity/canister.

### Exporting Identity

First we'll need to export the content of the default identity and format it in a single line. In Linux, for example, it can be found in `~/.config/dfx/identity/default/identity.pem`.

You'll need to run the following command and copy the output to the `DFX_IDENTITY` secret in the workflow's file snippet (you'll need to modify the command if your path to `identity.pem` is different).

    awk 'NF {sub(/\r/, ""); printf "%s\\r\\n",$0;}' ~/.config/dfx/identity/default/identity.pem

### Exporting Wallets

If identity was easy, then the `DFX_WALLETS` secrets is nothing. In the same directory where you found the `identity.pem` file, you'll find `wallets.json`. Copy the contents of it and paste it on the `DFX_WALLETS` Github secret on the workflow's snippet. You can retrieve the content using a command like the one below:

    cat ~/.config/dfx/identity/default/wallets.json

If you can't find these files in the directory, you probably haven't deployed your canisters.

## Deploy, deploy, deploy! 🛢️

That's all! Quick and easy. With all secrets set and your canister deployed, you're ready to push seamlessly to your canisters via GitHub's CI/CD workflow on every commit. **Feeling like Fleek already.**

The added perk is that you get that seamless flow, with any canister type, not just FE-hosted sites. Plus all the collaboration, organization, and version control features you're pretty much used to today.

We hope this little tool helps devs fast-track their work on the Internet Computer. Like we said, this is an open source tool that works for any type of canister, and it's not tied to Fleek's platform in any way (FE canisters won't appear in Fleek), other than the coding wizards from the team that build it ⚡

From here forward, this IC Action is **open to collaboration!** As we mentioned on the Action's repository, there are a lot of canister variations and settings that people might want to add into this tool in the future. For example, not using the default identity, or having deployments that flush the canister's memory.

**Consider this a community project,** everyone's welcome to jam on it 🤙. Just follow the instructions on the repo, create a pull request with your upgrades, and hop in our [Slack Community](https://slack.fleek.co/) to chat it out!

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co