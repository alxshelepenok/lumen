---
template: post
title: How to Deploy a GatsbyJS site onto IPFS on Fleek
slug: Gatsby-Fleek
draft: false
date: 2020-03-19T04:02:37.816+00:00
description: Gatsby allows for the creation of static sites in a simple, straightforward
  manner. In this tutorial, we will show you how to create a Gatsby project and deploy
  it to IPFS thanks to Fleek.
category: Guide
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/GatsbySocialimage.png
tags:
- Tutorial
- Guide
- Gatsby

---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/GatsbySocialimage.png)

Gatsby allows for the creation of static sites in a simple, straightforward manner. In this tutorial, we will show you how to create a Gatsby project and deploy it to IPFS thanks to Fleek.

## Creating a Gatsby Project

Let’s start by installing the Gatsby CLI.

`npm i -g gatsby-cli`

Now we can create a Gatsby project.

`Gatsby new name_of_project`

This will create a new sample gatsby project which can be modified according to your needs. You can run `npm run develop` to see the page in the browser by going to http://localhost:8000.

For now, let’s make some changes to the basic starter site.

![](./media/gatsby1.png)

Beautiful!

## Deploying Through Fleek

We must create a GitHub repository to store our site so Fleek can pick it up. For this tutorial, we will use the following repo:  https://github.com/SamueleA/gatsby-fleek

Now, we must log to Fleek and add a new site.

![](./media/gatsby2.png)

We select the GitHub repo containing the Gatsby project.

![](./media/gatsby3.png)

Fleek will determine which build settings to use. It has automatically detected the Gatsby framework and filled the docker image with `fleek/gatsby`. This image has Gatsby installed with the latest node.js version. However, my gatsby app requires node 11, therefore I changed the docker image to `fleek/gatsby:node-11`.

Click on “DEPLOY SITE” to proceed to the next step.

![](./media/gatsby4.png)

You will be redirected to the site’s page. We must now wait for the site to be built and deployed.

![](./media/gatsby5.png)

Once the deployment is over the site can be accessed and shared. For this tutorial, the site can be seen here: [https://aged-paper-1829.on.fleek.co/](https://aged-paper-1829.on.fleek.co/)

![](./media/gatsby6.png)

Note: You might run into pathing issues if you try to view the site through an IPFS gateway which has the IPFS hash in the url path. EG: ipfs.io/ipfs/qm...   
The simple solution for this is to use a [Gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-ipfs/ "Gatsby plugin").

## Explore more

… and that’s it! Deploying a Gatsby site to Fleek is quick and easy.

As mentioned previously, Gatsby is very useful, among other things, for blog creation. In the documentation section at the bottom of this post, we have left some links to learn more about this aspect and what other features Gatsby has to offer.

Once you are done, come back to Fleek to share your work!

### Documentation

* [Gatsby video tutorial](https://www.youtube.com/watch?v=8t0vNu2fCCM)
* [Gatsby docs](https://www.gatsbyjs.org/docs/)
* [Fleek docs](https://docs.fleek.co/)