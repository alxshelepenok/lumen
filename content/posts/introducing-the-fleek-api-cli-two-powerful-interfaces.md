---
template: post
draft: false
title: Release Updates - Fleek Hosting CLI & API, and Github Actions
slug: release-update-fleek-cli-github-actions
date: 
socialImage: https://storageapi.fleek.co/fleek-team-bucket/cli-api.png
canonical: ''
description: A new hosting CLI & GraphQL API to manage and control your hosting suite
  on Fleek. Deploy from local machine, use custom GitHub Actions, and more!
category: Release
tags:
- Hosting
- CLI
- API

---
![](https://storageapi.fleek.co/fleek-team-bucket/cli-api.png)

Thought we'd take a break from news for a while after announcing trustless [Static Frontend Hosting, a new Gateway, and Canister Proxying on the Internet Computer](https://blog.fleek.co/posts/to-dfinity-and-beyond-dfinity-frontend-hosting)? Well, _not today._

![](https://storageapi.fleek.co/fleek-team-bucket/no.gif)

We keep updates coming 🔥 Today's release gives **developers a lot more control over their experience in Fleek**, especially over our Hosting suite of tools for building sites on the Open Web, and for integrating Fleek to other experiences:

* Hosting CLI
* GitHub Actions
* Fleek's GraphQL API

## The Hosting CLI 💻

We gave our CLI a power up, and now it includes our hosting pipeline! You can now interact with Fleek’s Hosting directly from command line, **and try new cool workflow alternatives** like:

* Fleek site deployments from local machine.
* Usinh custom GitHub actions or deploy from other CIs.

Everything is abstracted into just a couple of commands. Install, login, initialize, deploy, and you're done. Can't get any simpler. **Want to get started with it? Here's all you need:** [CLI Documentation/Overview](https://docs.fleek.co/fleek-cli/overview/).

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/5bfd08e4-c403-4481-b53c-c110806e1870_text.gif)

Unlike using our web app, when you deploy through the CLI, **Fleek doesn't handle the build process**, which simplifies the need of configuring build settings through the CLI itself. The workflow when using the CLI looks a little something like this:

1. Create a local repository.
2. Build your project locally.
3. Initialize your built repo directory on the CLI
4. Deploy your built site to Fleek through the CLI

### Install the CLI:

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

**Time to deploy!** From terminal and the same local directory, run:

    fleek site:deploy

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/launch.gif)

And this would package the content in your local machine, and push it to the new site (or existing one) you selected from your Fleek account in the previous step

**That's it!** All you need to know to deploy a static site/app from your local machine.

## GitHub Actions & Other Environments ✅

With the new CLI release, you can basically initialize and configure a built site/app repository to be deployed to Fleek; which, in concept, means you can handle that process from your end and then deploy to Fleek from **other environments and CIs.**

For example, **doing it from your own GitHub CI workflow, using custom GitHub Actions!**

### Using GitHub Actions to Replace the CLI's Deploy

If you want to build and prepare your site locally or however you please, but still use GitHub as your CI, you can replace the need to use `site:deploy` in the CLI with a GitHub repo that has a **Fleek-deploy GitHub Action.**

1. You run the CLI's `site:init` call on a built repository to create the necessary .fleek.json config file.
2. The updated, built, and initialized code is then pushed to GitHub to reflect changes.
3. You will have a previously setup GitHub action that executes the equivalent of the CLI's `site:deploy` call.
4. Then, upon push or your set up trigger, the GitHub Action will deploy your site to Fleek.

[**We already created a Deploy Action in the GitHub Marketplace **](https://github.com/FleekHQ/action-deploy)which you can use as is, or modified to add anything you need/want in your deployment workflow to Fleek.

View the repository above for detailed instructions on how to configure it with your API key.

### Other Environments

Much like the example above, the CLI gives you the possibility of integrating other CI platforms other than GitHub or your local machine.

In a nutshell, this is possible because the CI **enables you to prepare your Fleek site (initialize it)** for deployment. Another important fact to enable other CI environments is that you can **pass your API key as a Environment Variable:**

>     FLEEK_API_KEY

This can be used as a **substitute to the CLI's login flow, overriding the need for it,** which would be a manual-browser flow that can't be carried out automatically by your CI of choice.

So instead, you pass the API as an environment variable, and that way you can execute all commands (site:init // site:deploy) on the command line without any breaking flows that require manual interventions.

## The Fleek GraphQL API ⚙️

And if that wasn't enough, behind our CLI, and now also available as its very own thing, we have a new **GraphQL Fleek API** for our hosting suite of products! With all these tools, your hosting control room will be getting quite the upgrade 😎

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/138828.gif)

This new simple GraphQL API is accessible via [https://api.fleek.co/graphql](https://api.fleek.co/graphql "https://api.fleek.co/graphql")

It exposes features to manage sites/hosting in Fleek, fetch data from them, and trigger new deployments. It requires an **Hosting API Key** to authenticate yourself, which you can now easily get through your account's settings.

### Getting Started With the API

You can see and navigate the entire API's schema to [learn all queries and mutations here](https://docs.fleek.co/fleek-api/schema/). Right now it is an introduction to our hosting suite, and allows things like triggering deployments, retrying previous ones, query sites and site data (status and IPFS hash, for example), and query deployment statuses.

**First things first, you need a Hosting API Key.** To get it, visit your account's settings...

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/settingsapi.gif)

And generate a new key in the Hosting API Key module, you can do several if you want to separate them for different purposes.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/apikey.gif)

And you're good to go! **Authenticating** is just passing the key in the `Authorization` heather request to auth your requests, for example authenticating a curl request...

    curl -H "Authorization: <fleek-api-key===>" \
        -H "Content-Type: application/json" \
        -d '{"query": "{ __typename }"}}' \
        https://api.fleek.co/graphql

Most GraphQL client libraries let you add a header to all your requests, for example in JS with [Apollo Boost](https://www.npmjs.com/package/apollo-boost):

    import ApolloClient from 'apollo-boost';
    
    const fleekApiKey = process.env.FLEEK_API_KEY;
    const client = new ApolloClient({
        uri: 'https://api.fleek.co/graphql',
        fetch: fetch,
        headers: {
            authorization: fleekApiKey
        }
    });

### Query Example: Fetching Site & Publishment Details

You can find more examples on the [API's documentation](https://docs.fleek.co/fleek-api/overview/), this first snippet is an easy way to retrieve details from your published site on Fleek and its deployment.

    query {
        getSiteBySlug(slug: "site-name-here") {
            id
            name
            platform
            publishedDeploy {
                id
                status
                ipfsHash
                log
                completedAt
            }
            team {
                id
                name
            }
        }
    }

## Wrapping Things Up 🗞️

This is just the beginning for these interfaces. So, hop on them and let us know what more things you'd like to see in the CLI/API. Our team will be on top of both projects to add more features and firepower soon, so that integrate Fleek into crazy new workflows and use cases, and platforms 🔥

**On other news,** we are joining **Gitcoin Grants Round 9 Hackathon** with Protocol Labs, Textile, IPFS, Filecoin, and a ton of more amazing Open Web projects!

Fleek's [bounties are live](https://gitcoin.co/issue/protocol/grants/7/100025064), with three open tracks (Innovation, NFTs, Communication), for building Dapps using the [Space SDK](https://github.com/FleekHQ/space-sdk). Up for the challenge? ⚡⚡⚡