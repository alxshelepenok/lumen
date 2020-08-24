---
template: post
draft: false
title: 'HackFS: Showcasing Fleek Prize Winners'
slug: HackFS-winners
date: 2020-08-24T04:00:00Z
socialimage: https://fleek-team-bucket.storage.fleek.co/fleekhackfswinners.jpeg
description: Thank you to Protocol Labs and ETH Global, the month of July - August
  2020 has been really exciting to watch developer teams build a bunch of awesome
  projects in the IPFS and Filecoin Ecosystem.
category: Announcement
tags:
- Hackathon

---
Thank you to Protocol Labs and ETH Global, the month of July - August 2020 has been really exciting to watch developer teams build a bunch of awesome projects in the IPFS and Filecoin Ecosystem.

The Fleek team was fortunate to be a Presenter Sponsor, giving an opening talk, workshops, office hours, etc. to the developer teams in HackFS, and had nearly 80 teams out of the 134 teams build on at least one or more Fleek product (Fleek Hosting, Fleek Storage, or Fleek's Space Daemon).

We wanted to take a moment and showcase some of the Fleek prize winners and share some of our thoughts on why they were special. We won't go over all the prize winners in detail, but here are all the Fleek winners:

* Best Use of **Fleek Space Daemon**: [Shop FS](https://hack.ethglobal.co/showcase/shop-fs-recSnBFT0TY7XgYNK)
* Best Use of **Fleek Hosting**: [BlockSig](https://hack.ethglobal.co/showcase/blocksig-recT3kpIaPtPKNek2), [Pyr](https://hack.ethglobal.co/showcase/pyr-rec9LKk3ZGMW6qrOa), [Web3API](https://hack.ethglobal.co/showcase/web3api-recItC5qPwuQmLqug), [IPFS-FPS](https://hack.ethglobal.co/showcase/ipfs-fps-rec1OcC5wSjdp1LEp), [Cadbury](https://hack.ethglobal.co/showcase/cadbury-reckhMFHOxGqXC8DY), [WFIL](https://hack.ethglobal.co/showcase/wfil-recCwbCnY2rnipjcR), [Parcel](https://hack.ethglobal.co/showcase/parcel-recMzBP7HUVYDYQIR),  [Public Annotation Network](https://hack.ethglobal.co/showcase/public-annotation-network-recnKxnp9epAR1fOF), [Sailplane](https://hack.ethglobal.co/showcase/sailplane-web-recoJM0CPadSrw9yj), [Pnlp.network](https://hack.ethglobal.co/showcase/pnlp-i-e-pulp-recmjUDBoPH8faOCC)
* Best Use of **Fleek Storage**: [BlockSig](https://hack.ethglobal.co/showcase/blocksig-recT3kpIaPtPKNek2), [Azureus](https://hack.ethglobal.co/showcase/azureus-recTkk0jGPXRrwg6Z), [Mobility Marketplace](https://hack.ethglobal.co/showcase/mobility-marketplace-rectlFaxjBi0m2S5j), [WatchdogDAO](https://hack.ethglobal.co/showcase/watchdog-dao-rec1ds7btRqO0ZhE3), [Browser Streaming](https://hack.ethglobal.co/showcase/browser-streaming-recBbvY9FuBJYI99c), [Access Denied](https://hack.ethglobal.co/showcase/access-denied-rec4tYQAw3m287S4o), [Dtok](https://hack.ethglobal.co/showcase/dtok-recqD1ftybrCndTYv), [IPFS Deploy for Java](https://hack.ethglobal.co/showcase/ipfs-deploy-for-java-recy6OKUfckknpvas), [Fractal](https://hack.ethglobal.co/showcase/fractal-rec9Pwf9Wu59jLEI7), [Eat Out Coin](https://hack.ethglobal.co/showcase/eat-out-coin-rec29E37C5glphmeI)

![](https://fleek-team-bucket.storage.fleek.co/fleekhackfswinners.jpeg)

## Showcase

#### Shop FS

The [Shop FS](https://hack.ethglobal.co/showcase/shop-fs-recSnBFT0TY7XgYNK) team created a web app for encrypted file storage and an array of options to buy and sell decentralized content using Fleek Space Daemon. Not only did they show how IPFS and encryption tools can provide a fully private and peer-to-peer storage solution for end users, they also provided a way for users to list encrypted files on Ethereum for sale and created novel sharing mechanisms for the buyer to gain access to the encrypted file once their purchase is confirmed. All in a very private user experience. This confirms some of our expectations that developers will build web2 equivalents (sorta like dropbox + marketplace) that bring the privacy and peer to peer features to it.

**How was Shop FS made:**

"...with the introduction of a Fleek's Space Daemon which stores files in private encrypted form in buckets & a Node-Red Monitoring Service that overlooks all events happening on the contract through Graph and after verification of signatures from both sellers & buyers we ensure the buyer has private access to the file."

#### BlockSig

The [BlockSig](https://hack.ethglobal.co/showcase/blocksig-recT3kpIaPtPKNek2) team built a fully private and encrypted notary service, like DocuSign, with all the documents to be notarized getting uploaded fully encrypted via the Space Daemon and Ethereum based tokens for signing authorization of the encrypted IPFS stored documents before sharing the encrypted files directly with the other users peer-to-peer. This is another great example of how the Space Daemon can be used to build privacy first and peer-to-peer web 2 equivalents, in this case like DocuSign.

**How BlockSig was made:**

They actually used all 3 Fleek products together, "...Fleek for Hosting \[our web apps front end\] & Storage, and the Space Daemon (which includes Textile buckets) to store encrypted files". And their explanation of interacting with Ethereum for tracking notary, "Once all signatures proofs have propagated on chain, the smart contract fires a "notarization request". The email oracle now generated a new token and sends to notary for signing." shows the endless use cases for building apps that utilize IPFS/Filecoin and Ethereum.

#### IPFS-FPS

The [IPFS-FPS](https://hack.ethglobal.co/showcase/ipfs-fps-rec1OcC5wSjdp1LEp) team created a fun and interacted first person shooter game combining web2 Unity tools with IPFS and Filecoin, where the mission of the game is to collect all the Filecoins while the app files are all referenced via IPFS. The gaming web application is hosted by Fleek Hosting.

Since the creation of the Fleek Hosting product we've used it to host our own sites and apps, and we love to see showcases of teams using it to build complex, even web2 based applications, that can leverage IPFS hosting.

**How IPFS-FPS was made:**

"Unity: Install Unity to create and export your game for IPFS. Github: Upload your game onto Github for continuous deployment. This will set up Fleek. Fleek: Fleek gets content from Github and publishes it on IPFS. Any updates to Github will automatically republish."

### Conclusion

Thank you to all the developers and participants of HackFS, especially those that leveraged the Fleek product suite. We had a ton of fun and helpful feedback from working hard with you all each day throughout the hackathon. We loved seeing web2 equivalents like Dropbox and DocuSign, have alternatives built where users can control their own data and trust the privacy while interacting with each other peer-to-peer using the Fleek Space Daemon. And to see the uptick in the Fleek Hosting and Storage products during the hackathon with nearly 80 teams building on them was amazing. The result was a bunch of awesome IPFS, Filecoin, Textile, and Ethereum based DApps. The cross-collaboration in the web3 ecosystem is unbelievable and this hackathon shows that developers want to plug and play several web3 protocols for different use cases. Congrats to all the prize winners! Look forward to seeing you move forward in your projects at both [Apollo](https://gitcoin.co/blog/apollo/) and the [Filecoin Launchpad](https://consensys.net/blog/press-release/filecoin-launchpad-accelerator-powered-by-tachyon/?utm_medium=email&_hsmi=92848280&_hsenc=p2ANqtz-_yPBeBqoeFLXlvXNJuDgEr73_DgeIo0-8FprDKMIDUdMK2TUFAi4L5dk8OROBzHA_2GJddl3qx6sYf_iArQcorulBLHQ&utm_content=92848280&utm_source=hs_email).

Happy hacking!

\- Fleek Team

* [Sign up](https://app.fleek.co "Sign Up") to try Fleek
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A "Fleek's Slack")
* Follow us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter")
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw "Fleek's Youtube Channel")
* Check out our [Tech Docs](https://docs.fleek.co/ "Fleek Docs")
* Contact us at support@fleek.co