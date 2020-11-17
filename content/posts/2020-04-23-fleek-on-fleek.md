---
template: post
title: Fleek is on Fleek - How the Fleek Platform is Deployed on the Fleek Platform
slug: Fleek-On-Fleek
draft: false
date: 2020-04-23T04:02:37.816Z
description: >-
    Did you know the ENTIRE Fleek platform is deployed using the Fleek platform?
category: "General"
socialImage: ./media/FleekOnFleek/socialImage.png
tags:
  - General
  - Informational
---

![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-on-fleek.png)



Did you know the ENTIRE Fleek platform is deployed using the Fleek platform? Yes, we are actually using Fleek on a daily basis to deploy our platform on IPFS. We are our own alpha testers, beta testers and users.

Let's see what that entails, and how you can do the same!


# Our Whole Deployment Flow Uses Fleek

![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek-on-fleek.png)


We integrate Fleek in our deployment flow in order to push new deploys on IPFS. Those deployments are done *automatically*.

In effect, Fleek supports automated deployments by watching the corresponding Github repo and branch. In our case, we have private repos for the app and public repos for the blog, docs and the main page (see [Fleek's github repos](https://github.com/FleekHQ)).


That means anytime we make a new blog post, fix a bug, make a new feature, update our docs, etc... the Fleek platform takes care of the deployment for us.

# The Proof is in the Hash

![](./media/FleekOnFleek/meme2.jpg)

When we say our ENTIRE platform, we do mean the entire platform, and our platform is subdivided in four major components.

1. The Fleek main page: <https://fleek.co>
2. The Fleek documentation: <https://docs.fleek.co>
3. The Fleek blog: <https://blog.fleek.co>
4. The Fleek app: <https://app.fleek.co>

All four components are on IPFS and are deployed automatically.

Of course, since Fleek uses IPFS, that sweet, sweet IPFS hash changes everytime a new deployment occurs. That is is why we use [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) to have an immutable link to our mutable content.

Below are the IPNS links of Fleek's fours components, which also showcases our support for the [DNS Link](https://dnslink.io/), a feature which maps IPNS to a traditional DNS domain.

1. The Fleek main page: <https://ipfs.io/ipns/fleek.co>
2. The Fleek documentation: <https://ipfs.io/ipns/docs.fleek.co>
3. The Fleek blog: <https://ipfs.io/ipns/blog.fleek.co>
4. The Fleek app: <https://ipfs.io/ipns/app.fleek.co>

# You can Deploy your Site too!

You can look at our platform to see the range of sites that can be deployed on Fleek: from beautiful landing pages, to informative blogs, practical docs and even complex commercial applications such our Fleek app.

In the end, Fleek does this through a Fleek account which is the same type of account that our users can create.

In other words, if we did it, you can do it too!

So don't hesitate to use Fleek to deploy your next project and, of course, share your creations with us on [twitter](https://twitter.com/FleekHQ)!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) our Community Chat
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) out our Tech Docs
* Contact us at support@fleek.co 
