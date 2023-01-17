---
template: post
draft: true
title: The CLI Beta is Live, with IPFS Pinning & IPNS.
slug: release-ipfs-pinning-ipns-beta-fleek-xyz
date: 2023-01-18T03:00:00Z
socialImage: https://storageapi.fleek.one/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/fleek-wide.png
canonical: ''
description: Fleek.xyz’s first beta release is live with the new CLI, including the
  IPFS Pinning and IPNS Mapping services.
category: Announcement
tags:
- Fleek.xyz

---
![](https://storageapi.fleek.one/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/fleek-wide.png)

This is not a drill, it’s Fleek.xyz first beta release. We are stoked to start the first chapter of Fleek’s new platform with the **test-phase of our new CLI and its two services: IPFS pinning and IPNS mapping.** Both services are live and ready to be battle-tested.

Tested by whom, you ask? **Well everyone’s welcome!** If you’ve signed up for our newsletter already, you probably got the heads-up already, else… Our [docs are live and ready](https://docs.fleek.xyz/) for testers to follow, and if you find any bugs or have feedback to share: [let us know here](https://github.com/fleekxyz/fleekxyz-support), it’ll be greatly appreciated!

We’re kicking off with Pinning and IPNS, and expect us to follow up on our next release with Sites Deployment. In this beta, we want to hear from developers testing our CLI, as we prepare to **build these services in Fleek’s UI, API, and SDK.**

Join us as we go over what’s included in this first release. ⚡️

***

# **Fleek’s Command-line Interface**

![](https://storageapi.fleek.one/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/fleek-cli.png)

Today we present the first of Fleek’s building blocks and interface: the Fleek CLI. Together with the Fleek SDK, Fleek API, and Fleek app UI, this command-line-interface will be one of the options for developers to use and integrate Fleek’s services.

    npm install -g @fleekxyz/cli
    $ fleek login
    🔗 Opening browser on https://rough-truth-3196.on.fleek.co/login.html?verificationSession=... 
    🧑‍💻 Please login to continue
    ✅ Successfully logged in.

The command line interface provides direct access to Fleek’s services suite, starting with IPFS Pinning and IPNS hash mapping in this beta. Via simple commands, developers can easily create an account and authenticate to Fleek, push and pin files to IPFS, get their hashes, as well as create and manage IPNS records.

The CLI will grow as more services are added to the platform (Sites Deployments coming next). You can find the CLI’s NPM here, and we welcome everybody to share [any thoughts and feedback here!](https://github.com/fleekxyz/fleekxyz-support)

***

# **IPFS Pinning on Fleek**

![](https://storageapi.fleek.one/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/ipfs-code.png)

Fleek’s bread and butter, web3 storage management and IPFS file pinning. IPFS will be the first service in the storage category, which will be followed by other protocol’s services in the future, such as Filecoin and Arweave, built by us and the community. Given each will be built as independent services, anyone can contribute their own to Fleek.

     > fleek ipfs add hello.txt
     > ⚡ IPFS Hash: Qmanou5uhcGhyW7noyB7LNFJBZkKcuUZnmpHeQSaidJ367

All it takes to pin a file with the CLI is a three-word command, and a file. Fleek will handle the upload to an IPFS node, and will report back the file’s hash as proof of the success of the operation.

You can see [the file in any public IPFS gateway](https://ipfs.io/ipfs/Qmanou5uhcGhyW7noyB7LNFJBZkKcuUZnmpHeQSaidJ367), or browser that resolves IPFS hashes, and soon we will add a user’s usage stats and the ability to fetch all pinned files. In the near future, Fleek will add custom domain gateway options for users who want custom gateway endpoints - as well as a default option.

***

# **IPNS Record Management**

![](https://storageapi.fleek.one/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/ipns-code.png)

The second service in this beta is one of IPFS’ other features, IPNS (the InterPlanetary Name System). IPFS hashes are immutable, which means they are static. If the file changes, the IPFS hash changes as well.

     > fleek ipns create
     > ✅ Success! IPNS record created.
     > 📓 k51qzi5uqu5didozh8jmvbnowwj2d545yacagcply19yvjz8rhn0i1hrbw2thy

IPNS records allow developers to create a static hash that maps to a dynamic record. This way, for example, you could map an IPNS hash to a website’s .html IPFS hash. Each time you make a deployment and the content changes (hence changing the IPFS hash of the file), your main address remains the same for the user (IPNS), but you update the IPFS hash resolved by the IPNS name via the CLI.

How do you do it in the CLI? With the command above. In this beta, you can create and manage new IPNS records, publish auto generated IPNS names for any hash, list all your records, and set IPNS names to resolve to any hash. [More in the documentation](https://docs.fleek.xyz/).

***

Now that the CLI is out on beta, expect updates to its features and services on a regular basis. The team’s working in parallel in more services and in fact, as you read this, we are cooking up Sites Deployments and Custom Domains 😉.

We can’t be more excited to start getting Fleek’s new tools into the hands of the community, so thanks from the team for helping us test! Come say hi on our [Discord](https://discord.gg/fleekxyz), and bring any feature ideas over.

**What’s next on the table?** We’ll be working on improvements to storage, and how users can resolve/access their files, as well as growing the App UI for manual file upload, and Sites Deployments via CLI.

For more resources visit [our LinkTree](https://linktr.ee/fleek).