---
template: post
title: 'The Space Daemon: A New Open Source Project for Privacy-focused IPFS Apps'
slug: new-client
draft: true
date: 2020-07-06T12:18:31.636Z
description: >-
  We've just release the Space Daemon, a new open source project for all developers to use in their projects. Come learn how you can use it for you app!
category: Release
socialImage: https://fleekblog-team-bucket.storage.fleek.co/new-feature-pr-deploys/newFeaturePrPreviews/DeployPreview.png
tags:
  - release
---

![](https://fleekblog-team-bucket.storage.fleek.co/new-feature-pr-deploys/newFeaturePrPreviews/DeployPreview.png)

We've just release the space daemon, a new open source project which will help developers create privacy-focused apps on IPFS.

The Space Daemon can upload and read encrypted files on IPFS. These files can then be shared in a secure manner.

A simple-to-use client provides an API to interact with the daemon in Javascript projects, such as Node or Electron apps.

Whether it is for a hackathon, a personal project or the next big thing, the Space Daemon makes possible a wide array of privacy-focused IPFS apps.

### Getting Started

The daemon comes in two parts. The first is the Space Daemon itself, which is written in go. The daemon can be downloaded from the release page for Windows, Mac and Linux.

https://github.com/FleekHQ/space-poc/releases

The second part is the Space Client, which provides the API through which Javascript applications can interact with the Daemon. The daemon must be running in order to use the client.

```
  import { SpaceClient } from '@fleekhq/space-client';

  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });
```

For more information on how to use the Space Client, please refer to the README in the Github repo. You will find an example for every method in the API.

https://github.com/FleekHQ/space-client

Also, the repo contains examples for reference in the `example` folder.

https://github.com/FleekHQ/space-client/blob/develop/example

### Share your creations!

We are excited to see what cool projects you will come up with using the Space Daemon, so share your ideas with us on Twitter.

Good hacking!

* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co 
