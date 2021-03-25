---
template: post
draft: true
title: IC Action - An Open Source GitHub Action to Deploy Canisters to the Internet
  Computer!
slug: ic-action-deploy-canisters-internet-computer
date: 2021-03-25T03:00:00Z
socialImage: ''
canonical: ''
description: ''
category: ''
tags: []

---
We're back with a surprise open source release for developers working on DFINITY's Internet Computer! The team just made public the [**IC Action**](https://github.com/FleekHQ/IC-Deploy-Action)**,** a GitHub Action anyone can use to deploy **any type of canisters** seamlessly to DFINITY's Internet Computer through GitHub's CI/CD pipeline.

This IC deploy action wraps commands from [DFINITY's DFX](https://github.com/dfinity/docs) command line tool, triggering new deployments when you push commits to GitHub, deploying and updating your canisters on the Internet Computer.

## The Internet Computer & Fleek

If nothing rings a bell, well, _you've missed a big one_. A couple weeks ago we announced that Fleek was joining the [Internet Computer's ecosystem](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting) in full force, releasing a stack of Internet Computer focused  features to Fleek:

* Static frontend hosting on the Internet Computer
* A new Internet Computer HTTP Gateway
* Canister Proxying

In Fleek, DFINITY's Internet Computer comes as an alternative to IPFS, hosting wise, with a different set of perks and purpose. It's a trustless, permissionless, and open blockhain-based infrastructure that in the future could allow us to rebuild Fleek on top of a 100% decentralized infrastructure. But, if you look outside of Fleek, it is much more.

The Internet Computer itself is a new approach at rebuilding the web through a unified protocol capable of running the entire base layer of the web (hosting / storage / services/ etc..) in that open and decentralized blockchain network.

And in the center of it all? Canisters.

On the Internet Computer, everything lives in canisters. Think smart contracts on Ethereum, but capable of powering FE, BE, and pretty any web service because they include both program and state. 

Its execution is still governed by a secure protocol (the Internet Computer Protocol), but capable of hosting services that scale services more performantly, since they are built just for that very thing.

If you're still catching up with the IC, we suggest you binge watch the ["Exploring Entrepeneurship in the Open Internet Boom"](https://dfinity.org/techcrunch/), hosted by DFINITY, and start prepping up for Mainnet's Beta Genesis, because it's closing in fast. There's a lot of exciting experimental technology ramping up to a new step in blockchain/Web3 development.

## Fleek's IC Deploy Action for Deploying Canisters via GitHub

There are many ways to deploy and work with canisters, like DFINITY's [dfx CLI](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html) and SDK. But, working on the IC for a while, we thought everyone could use a little CI seamlessness on their canister management lives. So, the team jumped onto the task and built this open source GitHub Action for it

**TL;DR on how it works?** First you'll create and deploy a project/canister using the dfx CLI in your repository, and then you'll add Fleek's IC Deploy Action to your CI/CD pipeline, which will automatically trigger new deployments to you canister when commits are pushed to that repo.

Now the long version.

### Using Fleek's IC Deploy Action

Kick things off by configuring and deploying a project to the Internet Computer using the [dfx CLI](https://sdk.dfinity.org/docs/developers-guide/cli-reference.html). You have to start with this so that your repository has the right canister identifiers and configuration files.

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

## Deploy, deploy, deploy!

Quick and easy. With all secrets set, your canister deployed, you're ready to push seamlessly to your canisters via a seamless CI workflow on every commit. Feeling like Fleek already.

The added perk is that you can get that seamless flow but with any canister, not just FE-hosted sites. 