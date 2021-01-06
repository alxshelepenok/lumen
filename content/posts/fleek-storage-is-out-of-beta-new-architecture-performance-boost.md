---
template: post
draft: true
title: 'Fleek Storage is out of Beta: New Architecture & Performance Boost ⚡'
slug: fleek-storage-is-out-of-beta-v2-release
date: 2021-01-06T03:00:00Z
socialImage: https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek-Storage-V2.jpg
canonical: https://blog.fleek.co/posts/fleek-storage-is-out-of-beta-v2-release
description: The V2 of our Fleek Storage product is out, and it is packing a major
  performance boost, as well as architecture changes that enable high-availability
  and robustness.⚡
category: Release
tags:
- IPFS
- Storage

---
![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek-Storage-V2.jpg)

New release incoming! The V2 of our Fleek [**Storage**](https://fleek.co/storage/) product is out, which officially takes it out of Beta. This architecture overhaul comes with a major performance boost ⚡

Fleek Storage lets you easily and performantly store files on IPFS via our SDK (AWS S3 compatible) and UI or the AWS CLI interface. With this update, we set the baseline architecture needed to make this Storage service highly available and robust for everyone!

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek Storage Diagram.jpg)  
What has changed? In a TL;DR fashion, we migrated our Storage architecture to a new one that uses a stateless, replicable, and load balanced MinIO instance & IPFS node clusters in a high-availability setup with load auto-scaling. It looks a little something like the image above.

## Fast, Faster, Fastest!

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Storage V2 Speed.gif)

Our goal behind V2 is to provide a Storage service that’s able to handle hundreds of requests per minute, with faster speeds than V1’s, so that anyone interested in interacting with it will be able to move **high volumes of data to IPFS efficiently** **using Fleek**.

The main point of constriction in V1 was that, whenever a file was uploaded to IPFS and the IPFS hash was modified as files were linked to that bucket/hash, the process was done in a synchronized manner, meaning that for each file we had to lock the bucket and wait for each file to be uploaded and linked on IPFS before moving on to the next one.

Now, on V2, this process is done **in an** **asynchronous way**, dramatically improving performance, and also using DynamoDB to store metadata needed to provide a quick way of browsing uploaded files as they are asynchronously linked on IPFS.

Async IPFS linking also enables **parallel uploads**, since buckets are not locked. This comes as a tremendous efficiency benefit when it comes to high-volume file uploads.

In tests, we saw a clear improvement in performance. For small files, we went from a 1.5s upload on V1 to **less than 100ms** in V2.

What about bigger uploads? On the current build and with a bigger load test, we uploaded 18000 files in 34 minutes (\~100ms per file), and **using parallel upload** we achieved a total time of **around 10 minutes**.

That’s at least **15x times faster** than V1, a number that can grow even further, especially when it comes to high-volume uploads.

## Reliability and Stability to Build Upon

![](https://fleek-team-bucket.storage.fleek.co/Blog Inline/Fleek Storage Base.gif)

Finally, we also had stability and reliability in mind when revisiting the Storage product architecture. The new architecture setup for Storage V2 is replicated, and has auto-scalability when it comes to load handling.

As users grow their storage operations inside of Fleek, and as we enable a high-volume enabled platform, we want to ensure trust in our infrastructure is nothing but total.

This is also the reason why there are different points of access to your IPFS bucket structure (S3 API or IPFS bucket link), further peeling off layers of risks in case of outage.

With these updates we’re confident that Fleek’s Storage core is robust and solid, and **ready to graduate from its Beta state**.

We’ve set a solid base layer to grow Fleek Storage in functionality and use cases without limitation to what can be achieved! We’re excited to see **what new opportunities these changes enable**, and want to hear more and more about what you want to achieve with blazing fast IPFS storage.

Now it’s time for you to take Fleek Storage for a new test run! Give this new architecture a go, and let us know what you think about it. We’re always grateful for your feedback, and happy to build and revisit things with it.

This won’t be the last Storage-related thing you’ll hear from us in the near future, so expect new announcements soon!

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co