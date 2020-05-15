---
template: post
title: "Fleek Storage SDK: Store NFT Assets in IPFS!"
slug: fleek-storage-nft
draft: true
date: 2020-05-15T04:02:37.816Z
description: >-
    Fleek Storage solves a fundamental problem with many NFTs today by storing assets to IPFS instead of a centralized server.
category: "General"
socialImage: /CanDeployCover.png
tags:
  - General
---

Our new Fleek Storage product, which stores web assets on IPFS through a simple drag-and-drop interface, has been met with awesome positive feedback!

But did you know about our SDK that can upload files programatically for the Web? One of its many use cases is for storing NFT (Non Fungible Token) assets.

In the next few minutes, we will learn about the Fleek Storage SDK through NFT assets storage.

# The Problem With Many NFTs Today
![](media/storageSdkNft/nft-central-server.jpg)

NFTs stand for Non Fungible Tokens and they often serve to confer ownership of digital art to users, among other things. The tokens can be transferred in a decentralized way through the ERC-721 interface. On-chain metadata tracks additional information such as name, description or even, as it is the case with digital art, *an url to an image*.

And there lies the issue.

Immortalizing digital assets in decentralized NFTs yet saving a link to those assets through a url that links to a centralized server is contradictory and self-defeating.

This problem is described further in this [wonderful talk from Pinata](https://www.youtube.com/watch?v=6b8OANmw2kM).

The solution? Save the assets in IPFS and identify them through the IPFS hash, also called CID.

The hash ensures the identifier never changes, and the hosting on IPFS ensures file storage is censorship-resistant and aligned with the values which gave birth to NFTs in the first place.

How does it look in practice? Let's look at a demo of what Fleek Storage can do.

# Demo App: The Crypto Museum
The Crypto Museum is a dapp that is fully decentralized. It is hosted on IPFS thanks to our Fleek Sites product, but more importantly it uses the Fleek Storage SDK to allow users to upload a copy of their digital art to IPFS.

Take a look at [the demo](https://crypto-museum.on.fleek.co) yourself!

The Dapp runs on the Ropsten test network so you will need [Metamask](https://metamask.io/) and some [free Ropsten Ether](https://faucet.ropsten.be/). If you need some artwork to upload, look at this [random artwork generator](http://www.random-art.org/online/).

![](media/storageSdkNft/crypto-museum.png)
*The ERC-721 assets uploaded to the Crypto Museum are stored in IPFS and identified through an immutable IPFS hash*

Let's take a quick look at what is happening under the hood.

When the user clicks on the `Create NFT` button, the file is uploaded to Fleek Storage thanks to our SDK. Fleek then returns the IPFS hash, or CID, which is used to mint a new token with the CID in the token's metadata.

This data, including registry of ownership and CID, rests on the Ethereum blockchain.

Right now, the Crypto Museum saves a url to an IPFS gateway using the CID as metadata. Alternatively, we could have saved the *CID only* and then the frontend could have interpreted this CID however it wanted, either by running an IPFS node or concatenating the CID to an IFPS gateway url.

The *Collection* section of the dapp searches for all the tokens belonging to the user, then reads the metadata containing the IPFS hash and displays the artworks.

## Fixing NFTs Moving Forward

A good solution for NFTs moving forward would be to store both a URL to an IPFS gateway using the CID and the CID itself as separate pieces of metadata. The URL would allow for a smooth transition to a decentralized CID-only ecosystem, while the practice of storing a CID only becomes more widespread.

# How To Easily Upload Files To IPFS With The Fleek Storage SDK
![](media/storageSdkNft/nft-winnie.jpg)

The Fleek Storage SDK provides an Amazon S3-like interface with which to interact with files on IPFS.

Let's see how it work programmatically in the Crypto Museum dapp.

```
  // We initialize the S3 client
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: <access-key-id>,
    secretAccessKey: <secret-access-key>,
    endpoint: 'https://storageapi.fleek.co',
    region: 'us-east-1',
    s3ForcePathStyle: true
  });

  // We defined the params
  // including the bucket which can be created either
  // programatically or on the Fleek Web app
  const params = {
    Bucket: bucket,
    Key: `nft/${newTokenId}-${timestamp}`,
    ContentType: artwork.type,
    // Body contains the uploaded file
    Body: artwork,
    ACL: 'public-read',
  };

  const request = s3.putObject(params);

  request.on('httpHeaders', (statusCode, headers) => {
    const ipfsHash = headers['x-fleek-ipfs-hash'];
    // Do stuff with the IPFS hash. E.G.: Create an Ethereum Transaction...
  }).send();
```

The code above is copy-pasted from the Crypto Museum code. It's that simple.

The docs for [aws s3 sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html) and [fleek storage](https://docs.fleek.co/Storage/CLI_SDK) give more information on how to use the SDK.

# Let's Fix NFTs!
Fleek Storage is an amazing solution to store assets in IPFS. It fixes a lingering problem with Non Fungible Tokens by identifying the files they represent through IPFS hashes.

It's to make NFTs better thanks to IPFS!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) the #community slack channel
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) our Tech Docs
* Contact us at support@fleek.co 
