---
template: post
draft: true
title: Release Updates - Fleek CLI & API, and Github Actions
slug: release-update-fleek-cli-github-actions
date: 
socialImage: ''
canonical: ''
description: ''
category: ''
tags: []

---
![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/clirelease.png)
Thought we'd take a break from news for a while after announcing [Static Frontend Hosting, a new Gateway, and Canister Proxying on the Internet Computer](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting)? Well, not today.

![](https://storageapi.fleek.co/fleek-team-bucket/no.gif)

We keep them updates coming 🔥 Today's release gives **developers a lot more control over their experience in Fleek**, especially over our Hosting suite of tools for building sites on the Open Web, and for integrating Fleek to other experiences:

* Hosting CLI
* GitHub Actions
* Fleek's GraphQL API

## The Fleek CLI 💻

We have reworked our CLI and have built it to be as powerful and encompassing as ever. You can now interact Fleek’s Hosting pipeline and integrate GitHub actions through this command line interface.

With the CLI, new **hosting/deployment features are possible**, for example:

* Fleek site deployments from local machines/other environments.
* GitHub actions integration to the deployment pipeline.

All commands are simplified and abstracted so that you can just install and get started managing your Fleek hosting via your terminal. You can find all resources to get started here, and we’ve prepared a quick example on how to work with it:

* Fleek CLI Overview
* Technical Documentation

### GitHub Actions via the CLI ✅

We wanted to do a quick double-click on the GitHub actions. With the new CLI release, they are effectively integrated into our Hosting product, so that you can easily leverage them via a command on the CLI.

This adds an entirely new layer of functionality for developers to use on Fleek’s hosting suite, enabling more complex deployments, workflow automation, and customization of the hosting/deployment process. A powerful addition to the set!

## Getting Started With the Fleek CLI

To install the CLI:

    npm install -g @fleekhq/fleek-cli

To confirm your installation, you can run \`fleek help\` which will show you a complete list of subcommands supported in the current version.

Next, you’ll need to login to the CLI using your credentials, to do that run the \`fleek login\` command and wait for a browser window to open, log in to your fleek account and the CLI will automatically store your authentication token.

To support flexibility each CLI command is categorized within a topic, for example, all of the functionalities related to the Fleek hosting are put together in the \`site\` topic. Each Fleek command has the following shape:

    fleek [topic]:[subcommand] [options]

To get the help message dedicated to each topic just type \`fleek help \[topic\]\`, which will show you a brief description of all the commands available in the topic.

But for now, let’s build a simple website together and deploy it to Fleek.

One of the primary functions of the Fleek CLI is that it will give you the possibility to deploy websites from your local machine (or for that matter any environment other than our Fleek CI which currently works seamlessly with Github repositories).

… to be continued