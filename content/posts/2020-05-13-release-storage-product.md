---
template: post
title: Introducing Fleek Storage
slug: Fleek-Storage-Release
draft: false
date: 2020-05-13T04:02:37.816+00:00
description: We're excited to release Fleek Storage! Storing files on IPFS is easier
  and more performant than ever. We've leveraged an already popular S3 interface to
  interact with IPFS via our easy to use application, CLI, and SDK. The Storage solution
  comes with a built-in CDN, File Compression, and image resizing to achieve upmost
  performance.
category: Announcement
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/StorageReleaseCover.png
tags:
- Announcement
- Product Release

---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/StorageReleaseCover.png)

We're excited to release Fleek Storage! Storing files on IPFS is easier and more performant than ever. We've leveraged an already popular S3 interface to interact with IPFS via our easy to use application, CLI, and SDK. The Storage solution comes with a built-in CDN, File Compression, and image resizing to achieve upmost performance.

# Fleek Storage App

The Fleek app now has a Storage page. If you're already a Fleek user you'll see the new Storage page appear on the left-hand navigation menu of your screen. You can now upload, browse, and manage all your files through the app interface. All files uploaded are published to IPFS and published to DNS, with a CDN and File Compression. You can view and reference the files through the Fleek Storage URL, and can view directly on the IPFS gateway. Since our approach has been to leverage an S3 interface any S3 compatible CLI and SDK will work with Fleek. [Take a look](https://docs.fleek.co/storage/storage-app) at our updated tech docs to learn more about using Storage in-app.

![](media/FleekStorageFinal.gif)

# Fleek Programmable Interfaces

We've release the Fleek CLI, [here's the link](https://www.npmjs.com/package/@fleekhq/fleek-cli) to the npm package manager. To start, the Fleek CLI is to log in and create API keys. Since our interface is S3 compatible, you can use the S3 CLI and APIs to interact with your Fleek storage buckets. The AWS CLI and SDK work with any language that your app is built with, such as JavaScript, Go, C++, Python and Ruby. [Take a look](https://docs.fleek.co/storage/storage-aws-s3-integration) at our docs for getting set up with the CLI and integrating storage directly in your app.

# IPFS Pinning Summit

Last week at the IPFS Pinning Summit our co-founder, Brett Shear, gave a walkthrough of Fleek products including a live demo of the newly released Fleek Storage product. Check it out [here](https://www.youtube.com/watch?v=Ojtt5NGPxb8&feature=youtu.be)!

# Stay Tuned!

Thank you for reading our release updates. Sign up or sign back in and check out the updates for yourself!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://slack.fleek.co/) the #community slack channel
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) our Tech Docs
* Contact us at support@fleek.co