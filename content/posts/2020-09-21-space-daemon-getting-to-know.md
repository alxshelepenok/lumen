---
template: post
title: Getting To Know the Space Daemon
slug: space-daemon-getting-to-know
draft: false
date: 2020-09-21T12:18:31.636+00:00
description: Get ready for some one-on-one time with the Space Daemon. Learn what
  it does and how you can leverage it for your projects!
category: General
socialImage: https://fleek-team-bucket.storage.fleek.co/DWebStack%20(1).png
tags:
- Space Daemon

---
![](https://fleek-team-bucket.storage.fleek.co/DWebStack%20(1).png)

The Space Daemon is our latest open source project aimed at developers wanting to build the next great app by leveraging encrypted file storage on IPFS.

In the next few minutes, we will discuss the Space Daemon, what it is, what it does and how to make use of it.

### Why the Space Daemon was created

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-getting-started/and-its-gone.jpg)

Necessity is the mother of invention, and at Fleek we've identified an area of the modern internet necessitating a new invention.

As a case study, let's discuss Twitter. Recently, many high-profile Twitter accounts from the likes of Barack Obama, Joe Biden, Jeff Bezos, Elon Musk and many more got [badly hacked](https://www.bbc.com/news/technology-53445090). The hack exposed the frailty of modern security practices. Furthermore, it highlighted how vulnerable users are to centralised big tech control.

The takeway from this Twitter debacle is that privacy and security practices must go back to the drawing board.

And the solution we've come up with is a combination of peer-to-peer, encryption and user ownership of data.

### Private privacy and secure security

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-getting-started/little-privacy.jpg)

Encryption is like underwear for data. It safeguards privacy by preventing those for whom it's not their business to take a little peek.

However, there's an important distinction between the encryption schemes of the Space Daemon and those of tech companies like Twitter.

For example, Twitter encrypts the content of the databases containing private DMs (which people suspect were leaked in the hack) as they should be. But who controls the keys to decrypt the data? It is Twitter. This gives the company and/or hackers access your data.

That is why we've decided that the Space Daemon would give power back to the users. Files uploaded using the Space Daemon are encrypted, not in a remote server but locally on the user's machines. The keys are kept in the possession of the user himself. No one can access user data, except the user.

Such an encryption scheme greatly enhances user privacy and security. It would have prevented the hack that Twitter experienced.

Furthermore, the Space Daemon is built on IPFS, a peer-to-peer, content-addressed protocol for transferring files. What does it mean for users? It means IPFS has no central point of failure and, as such, it cannot be censored.

Additionally, new technologies like Filecoin will allow data to be backed up in a decentralised manner, thus pushing the robustness of the system even further.

### Space Daemon or Space Desktop app?

What is the difference between the [Space app](https://blog.space.storage/posts/Introducing-Space) and the Space Daemon?

The Space Desktop app is an encrypted file storage platform competing with the likes of Dropbox and Google Drive that we are developing at Fleek. It will be open source so users can verify themselves that no weird shenanigan is going on with their data.

[The Space Daemon](https://github.com/FleekHQ/space-daemon), on the other hand, is the backbone of the Space Desktop app. It handles the brunt of the work by handling encryption, peer-to-peer functionality and other tasks.

That being said, we've built the Space Daemon not just for the Space Desktop app, but for ALL developers of privacy-focused apps.

### It's easy to develop for!

![](https://fleekblog-team-bucket.storage.fleek.co/space-daemon-getting-started/heigh-ho.jpg)

We've made it easy to develop on top of the Space Daemon through thorough documentation, a simple-to-use client and plenty of educational content.

So whether you want to build the next great app or just want to experiment for fun, you will experience minimal friction with the Space Daemon.

Also, since we've open sourced the Daemon itself, any developer can add new features, whether it is support for a new web3 protocol, integrating an Ethereum node to the Daemon, or extending the client's methods.

It can all be added and we will be happy to include your pull requests in the official release of the Space Daemon.

### How does Space fit in the Dweb stack?

![](https://fleek-team-bucket.storage.fleek.co/DWebStack%20(1).png)

The Space Daemon aggregates all the different web3 protocols that provide all the functionality you'd need to build a privacy focused, peer 2 peer, and decentralized application. Your application can easily take advantage of the Space Deamon using the Space Js Client without having to worry about the direct interfaces to each protocol underneath. The Space team has the Space Daemon installed in our desktop app to provide the bleeding edge dweb stack - IPFS, Filecoin, Textile, Ceramic, Handshake; Its all been integrated via the Space Js Client. And its all open source!

The protocols integrated are all to bring different functionality to the application layer. For instance, Filecoin has brought the Space app Backup File storage, Textile provides local encryption and IPFS databases, IPFS brings the peer to peer data layer, Ceramic provides decentralized identity, and Hanshake integrates a decentralized naming and domain system. Of course, many dweb applications build on Ethereum so its a natural fit that Ethereum will be added, and more protocols will continue to be integrated. 

The Space team is building completely on this stack and so can you. You can build privacy focused, p2p, and decentralized applications that tie together the entire dweb ecosystem via an easy to install Space Daemon and easy to build on Space Js Client. And it's all plug and play, so you can use whichever protocols make sense to build on for your app. Considering its all open source, if there are more protocols you need to integrate to get more functionality in your app you can too! And we're happy to help.

### I want to build! Now what?

First, you need an idea. Good thing that there's ton of potential products to be built with the Space Daemon!

Basically, any product existing today in the web2 realm could make use of a web3 makeover supported by the Space Daemon. Apps like Google docs, Gmail, Github, Reddit, Youtube, Photo Album apps and more are all prime examples.

Of course, the DWeb field being such a melting pot of innovation, we're also expecting products no one has even thought about yet.

Second, you will need resources to get you started.
As such, the [Space Daemon documentation](https://docs.fleek.co/space-daemon/getting-started/) provides a great introduction, including how to setup and an exhaustive list of all the methods available through the Space Client.

Additionally, we also have a [Space Daemon playlist](https://www.youtube.com/playlist?list=PL3v9ZaTBrN9F8V5AjUTJm2jhKM24abPbk) of video tutorials on the Fleek Youtube Channel.

And finally, we have an [educational example of an electron app](https://github.com/FleekHQ/space-client-workshop) integrating the Space Daemon and showcasing basic functionality that you can study.

### Share your creations!

We are excited to see what cool projects you will come up with using the Space Daemon, so share your ideas with us on [Twitter](https://twitter.com/spacestorage).

Happy hacking!

* Sign up for [Space Beta](https://space.storage)
* Follow us on [Twitter](https://twitter.com/spacestorage)
* Reach out at hi@space.storage
* Check out our [Tech Docs](https://docs.fleek.co/space-daemon/overview/)
* Spread the word