---
template: post
title: What Can Be Deploy on Fleek
slug: what-you-can-deploy-on-fleek
draft: true
date: 2020-05-11T04:02:37.816Z
description: >-
    What kind of app can be deployed on Fleek? Static sites? Dynamic sites? Learn if Fleek is a good fit for your project!
category: "General"
socialImage: /StorageReleaseCover.png
tags:
  - General
---
<!-- 
Should be same image as the thumbnail image
![](./media/StorageReleaseCover.png)
-->

What kind of app can be deployed on Fleek? Can you deploy static sites? What about dynamic sites? Maybe you are wondering if Fleek would be a good fit for your project.

Then you are at the right place! In the next few minutes, we'll discuss what types of site you can deploy with Fleek.

Oh, and we'll even showcase some examples to inspire you!

# Static vs Dynamic
You can deploy either a static or a dynamic website on Fleek.

But what's the difference between the two?

Static websites are read-only. A good example that would be a portfolio site or a statically-generated blog like the one you are reading right now.

Dynamic sites, on the other hand, are both read and write. Generally, such sites fetch information from a database to populate its content. Think of the likes of Twitter and Facebook where you login and the app displays posts or tweets that are unique to your account.

But if you host a dynamic site you might wonder...

# Dynamic Sites: What about my Backend?

![](./media/WhatCanBeBuildOnFleek/FEvsBE.jpg)

Fleek only hosts your files on IPFS, thus it's very appropriate for frontends of all kinds. In many cases, however, the frontend needs to talk to a backend server.

If that is the case, you must maintain *your own server*. In other words, we handle the frontend, you handle the backend.

It also means that we do not support server-side rendering...because that would require a server!

# But what about SPAs?
SPAs, short for Single Page Applications, are a great fit for Fleek. Files such as Javascript bundles, CSS files and static assets can all rest on IPFS.

SPAs can be either static or dynamic, if they talk to a backend. Either way Fleek can handle it.

Also, it is worth noting that since we support npm packages, we support any bundler such as webpack, parcel, etc...

# What about [INSERT EXOTIC FRAMEWORK HERE] ?
![](frameworks-everywhere.jpg)

Frontend development is notorious for its enormous arsenal of frameworks of all kind, from popular to obscure. Don't believe me? Here's a [list of over 100 javascript frameworks](https://cssauthor.com/javascript-frameworks/)...

Fleek auto-detects certain frameworks and automatically applies the correct build settings for you. We will find the correct docker image from our [dockerhub organization](https://hub.docker.com/orgs/fleek) depending on the detected framework.

![](./media/WhatCanBeBuildOnFleek/autodetectFramework.png)
*Some of the frameworks autodetected by Fleek*

That being said, we support many more frameworks than that. *Any* framework which is a dependency as an npm package will be supported since we apply a node-based docker image by default when none is selected.

In addition, if you are using a framework which is neither officially supported by Fleek nor an npm dependency, there is always the possibility of creating your own docker image to house you app.

# Real-World Examples Right in Front of Your Eyes
![](./media/WhatCanBeBuildOnFleek/frontend-fleek-app.png)
*Our own frontend app is an excellent example of the type of enterprise-level product you can deploy on Fleek*

Did you know the [Fleek patform was deployed on Fleek](https://blog.fleek.co/posts/Fleek-On-Fleek)?

This includes this very [blog](https://blog.fleek.co/) you are reading right now, our [docs](https://docs.fleek.co/) and our [homepage](https://fleek.co/).
So if you have a static site such as a homepage, blog or documentation, you can deploy it on Fleek just like us!

Do you want to deploy a dynamic site in the form of a complex frontend application? You can also do it on Fleek, just like we are doing with our own [app](https://app.fleek.co/).

# Your Turn to Build!

As you can see, we support a wide range of sites. The limit is your creativity!

Just bring us your app and we take care of the rest!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) the #community slack channel
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) our Tech Docs
* Contact us at support@fleek.co 