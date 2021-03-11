---
template: post
draft: true
title: Release Updates - Fleek CLI & API, and Github Actions
slug: release-update-fleek-cli-github-actions
date: 
socialImage: https://storageapi.fleek.co/fleek-team-bucket/cli-api.png
canonical: ''
description: ''
category: ''
tags: []

---
![](https://storageapi.fleek.co/fleek-team-bucket/cli-api.png)

Thought we'd take a break from news for a while after announcing [Static Frontend Hosting, a new Gateway, and Canister Proxying on the Internet Computer](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting)? Well, not today.

![](https://storageapi.fleek.co/fleek-team-bucket/no.gif)

We keep them updates coming 🔥 Today's release gives **developers a lot more control over their experience in Fleek**, especially over our Hosting suite of tools for building sites on the Open Web, and for integrating Fleek to other experiences:

* Hosting CLI
* GitHub Actions
* Fleek's GraphQL API

## The Fleek CLI 💻

We have reworked our CLI to include our hosting pipeline! You can now interact Fleek’s Hosting directly from command line, and do **new cool things like** for example:

* Fleek site deployments from local machines.
* Use custom GitHub actions or deploy from other CIs.

Everything is abstracted into just a couple of commands. Install, login, initialize, deploy, and you're done. Can't get any simpler. 

Unlike using our web app, when you deploy through the CLI, **Fleek doesn't handle the the build process**, which simplifies the need of configuring build settings through the CLI itself. The workflow when using the CLI looks a little something like this:

1. Create a local repository.
2. Build your project locally.
3. Initialize your built repo directory on the CLI
4. Deploy your built site to Fleek through the CLI

**Want to get started with it? Here's all you need:** [CLI Documentation/Overview](https://docs.fleek.co/fleek-cli/overview/)

### To install the CLI:

    npm install -g @fleekhq/fleek-cli

To confirm your installation, you can run \`fleek help\` which will show you a complete list of subcommands supported in the current version.

### Login & Authenticate:

Next, you’ll need to login to the CLI using your credentials, to do that run the **\`fleek login\`** command and wait for a browser window to open, log in to your fleek account and the CLI will automatically store your authentication token.

To support flexibility each CLI command is categorized within a topic, for example, all of the functionalities related to the Fleek hosting are put together in the \`site\` topic. Each Fleek command has the following shape:

    fleek [topic]:[subcommand] [options]

To get the help message dedicated to each topic just type fleek help \[topic\], which will show you a brief description of all the commands available in the topic.

### Initializing a Site

One of the primary functions of the Fleek CLI is that it will give you the possibility to deploy websites from your local machine (or for that matter any environment other than our Fleek CI which currently works seamlessly with Github repositories).

**Open your terminal,** get to your built site/app's repository, and run the following command to **initialize** the site in Fleek, and configure it accordingly.

    fleek site:init

A quick prompt in-terminal will guide you through creating or selecting a site from your Fleek account to initialize the proper settings on your local repository.

If all goes well, a **.fleek.json** file will be created in your local directory with the final site/Fleek configurations needed for the next step!

### Deploying Your Site / Changes

You have your local built site, it is initialized and has its .fleek.json file. Now what?

Time to deploy! From terminal and the same local directory, run:

    fleek site:deploy

And this would package the content in your local machine, and push it to the new site (or existing one) you selected from your Fleek account in the previous step

**That's it!** All you need to know to deploy a static site/app from your local machine.

## GitHub Actions & Other Environments ✅

With the new CLI release, you can basically initialize and configure a built site/app repository to be deployed to Fleek; which, in concept, means you can handle that process from your end and then deploy to Fleek from **other environments and CIs.**

For example, **doing it from your own GitHub CI workflow, using custom GitHub Actions!**

### Using GitHub Actions to Replace the CLI's Deploy

If you want to build and prepare your site locally or however you please, but still use GitHub as your CI, you can replace the need to use `site:init` in the CLI with a GitHub repo that has a **Fleek-deploy GitHub Action.**

1. You run the CLI's `site:init` call on a built repository to create the necessary .fleek.json config file.
2. The updated, built, and initialized code is then pushed to GitHub to reflect changes.
3. You will have a previously setup GitHub action that executes the equivalent of the CLI's `site:deploy` call.
4. Then, upon push or your set up trigger, the GitHub Action will deploy your site to Fleek.

[**We already created a Deploy Action in the GitHub Marketplace **](https://github.com/FleekHQ/action-deploy)which you can use as is, or modified to add anything you need/want in your deployment workflow to Fleek.

View the repository above for detailed instructions on how to configure it with your API key.

### Other Environments, Like Circle CI!