---
template: post
title: 'Release Update: Fleek Storage Js'
slug: release-update-fleek-storage-js
draft: false
date: 2020-06-18T12:18:31.636Z
description: >-
  We have just released Fleek Storage Js to make pinning files to IPFS a breeze. Come take a look!
category: Release
socialImage: ./media/fleekStorageRelease/fleek-storage-update.png
tags:
  - Release
---
![](/fleekStorageRelease/fleek-storage-update.png)

We've just released [Fleek Storage Js](https://docs.fleek.co/FleekStorageJs), a new SDK that makes uploading and pinning files to IPFS a breeze!

### Install now!

Fleek Storage Js can be installed as an [npm package](https://www.npmjs.com/package/@fleekhq/fleek-storage-js).


```
npm install @fleekhq/fleek-storage-js

```

### Simple Methods
You can use simple methods like `upload` and `get` to pin and fetch your files from IPFS. You can ask for the public url, the ipfs hash, the key, or the file itself.

### Download files from Fleek's IFPS gateway
Did you know Fleek had its own [IPFS gateway](https://docs.fleek.co/Welcome/IPFSGateway)?

Simply substitute the IPFS hash in the url below to use it.
`https://ipfs.fleek.co/ipfs/<HASH>`

Also, Fleek Storage Js provides a [utility method](https://docs.fleek.co/FleekStorageJs/getFileFromHash) to download any file on IPFS through our gateway, no account needed!

### Learn more in our docs!

Read more about Fleek Storage Js and Fleek Storage in our [docs](https://docs.fleek.co/FleekStorageJs).

We've made a special effort to document clearly each method of Fleek Storage Js to make its integration as straightforward as possible.

## Thanks for Reading

We're excited to keep pushing out new releases and there's plenty more where that came from. Stay posted!

* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co 
