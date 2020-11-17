---
template: post
title: A People’s Guide to IPFS
slug: Guide-IPFS
draft: false
date: 2020-03-24T04:02:37.816Z
description: >-
  IPFS presents itself as a radical innovation whose aim is to reshape the entire web as we know it into a system that is more secure, efficient, and reliable.
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/IPFS.png
tags:
  - Guide
  - IPFS
---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/IPFS.png)

“You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.”
― Buckminster Fuller

IPFS presents itself as a radical innovation whose aim is to reshape the entire web as we know it into a system that is more secure, efficient, and reliable. This is not science fiction. IPFS is in active development and companies are already using it to solve real-world problems, including [Netflix](https://www.youtube.com/watch?v=wNfk05D887M). It is only a matter of time before IPFS gains wide adoption.

But what is IPFS exactly and why should we care? In this article, we’ll straightforwardly answer this question. We will see the problems inherent with the web’s current architecture and discuss how IPFS addresses those issues.

## The Internet Trilogy: Return of the Web

You might have heard the term Web3 thrown around in association with IPFS. It means web3 as in the third version of the web. But this begs the question: What are Web1 and Web2 and what does IPFS bring to the table?

Web1 corresponds to a simple static web page. Think of a simple company page with a description of the products and services and some contact information whose functionality is limited to fetching a web page and displaying information. Web2, on the other hand, describes a more sophisticated client-server architecture powering many of our modern web applications, in which content constantly updates and changes dynamically. Think twitter, Facebook, and other apps in which users can create accounts and post content.

Both Web1 and Web2 both work on HTTP. HTTP is the method of communication of the current internet. Most web browsers communicate through HTTP and it is the reason why web addresses are often prefixed with HTTP://. This method of communication (also called a protocol) requires a client to request data to a server. For instance, let’s say you wish to connect to Facebook. The client, your web browser, will ask the server, facebook’s servers, for a copy of the Facebook web application. The server will then respond with the data. Similarly, fetching posts and images is done through a series of requests and responses.

![](./media/intro/intro1.jpg)

However, this method comes with its own set of problems. First of all, it is **inefficient**. Requests have to be made to servers in remote locations which adds latency to requests. If we decide to exit the application and log in again, we will have to refetch the same files again even though we might still have them. The infrastructure to operate servers for millions of users is expensive and the costs keep increasing as the internet becomes data-hungrier through high-resolution images and videos, the proliferation of internet-connected devices, and the everyday usage of the internet. Suddenly, a high influx of users can overload the system with high-throughput and send the whole thing crashing due to lack of bandwidth.

Simply put, the internet is becoming a victim of its success and needs to be redesigned to allow it to sustain further growth.

Second, the system is **unsecure**. How do we know the data we asked for has not been tampered with? How do we know a hacker has not compromised facebook’s server or even intercepted our requests? With current web2 systems, it is impossible to interact with the web without making dangerous assumptions regarding the trustworthiness of its actors.

Furthermore, our data might become inaccessible if some catastrophic incident ever occurred to the server.

Finally, Web2 applications are susceptible to **censorship**. Whoever controls the server, controls the data. This becomes an increasing cause of concern as our lives become intrinsically connected to the internet in the areas of information, business, and even our social lives. Companies, governments, and agencies can control which data people have access to, and thus, who is allowed to live digitally on the web.

IPFS addresses all of the aforementioned problems and is the Web3 that will allow the internet to grow further.

## What makes IPFS different?

IPFS consists of an amalgamation of innovations in areas such as cryptography and distributed technology, attempting to be a replacement of the HTTP protocol and a departure from the client-server architecture described above.

Unlike HTTP, IPFS uses a DHT(distributed hash table) to fetch its data through a **peer-to-peer network**. This works a bit like BitTorrent, a popular file-sharing protocol. For IPFS, the protocol is called BitSwap. Files are cut in many chunks and organized in a special structure called a Merkle dag which allows each piece to be securely shared in a network peer. Just like in BitTorrent, the data is still available if a peer goes down. This removes the problem of having a single central server doing all the processing and the risks of that one server going down, which, in turn, creates a more robust internet infrastructure. And with reliance on a network of peers rather than a central server, the data is censorship-resistant since removing the data would require removing the data from every single peer possessing that data, which is infeasible.

![](./media/intro/intro2.jpg)

Another innovation lies in the use of **content addressing** vs location addressing. The difference is subtle, but the consequences profound. HTTP works through location addressing. The addresses you type in the browser are converted to an IP address which locates the server possessing the file. Location addressing simply fetches a certain file at a certain location and there is no guarantee that the file has not been tampered with.

Content addressing, on the other hand, identifies files through a unique identifier, called CID. The CID contains the unique fingerprint of the file produced through cryptographic hashing, which are mathematical functions behind much of today’s encrypted systems. In other words, once the user receives the file, he can run it through a series of calculations and verify that it matches the CID he requested. If both the computed CID and the requested CID match, we know there is nothing to worry about regarding data integrity.

Also, since we are searching for the content of a file, rather than its location, the file can be served from any peers, even those nearby. Imagine being served a file by a neighbor a few hundred meters away instead of a server in another country. Isn’t it considerably faster that way?

The combination of the peer to peer network and content addressing solves the three problems highlighted above with Web1 and Web2 architectures and allows the internet to be **efficient, secure, and censorship-resistant**.

## Wait! There’s more!

We have but scratched the surface of the technology and innovation behind IPFS. It is already a vibrant ecosystem bustling with interesting ideas and projects. However, the summary above should give you a good understanding of why IPFS is needed, why it will radically change the way the Internet operates, and why it is generating so much interest.

## Connect with Fleek team
* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ) 
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co 