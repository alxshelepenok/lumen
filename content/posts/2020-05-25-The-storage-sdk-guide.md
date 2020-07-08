---
template: post
title: The Fleek Storage SDK Cookbook
slug: fleek-storage-sdk-guide
draft: false
date: 2020-05-25T04:02:37.816Z
description: >-
    Learn how to use the storage SDK to store files in IPFS.
category: "Tutorial"
socialImage: /SDKGuideCover.png
tags:
  - Tutorial
  - SDK
---

![](./media/SDKGuideCover.png)


Fleek Storage makes it easy to upload files to IPFS and distribute them on modern websites. To that end, we have made an awesome [web app](https://app.fleek.co) that allows users to store and access their files in a simple and visual manner.

In some cases, however, a programmatic approach is preferable to manually interacting with a UI. That's why we have created the [Fleek Storage SDK](https://docs.fleek.co/storage/storage-aws-s3-integration), an API that will grant you greater flexibility in using our Fleek Storage product.

This post will help you with common commands for the Storage SDK, so you'll be up and running in no time.

# The Fleek Storage SDK Cookbook: The most common commands
![](https://samuelea-team-bucket.storage.fleek.co/homer-cooking.gif)
*The gif above was uploaded and is being shared through Fleek Storage. You can use Fleek Storage to serve web assets for YOUR site!*

Below are some common commands for the Fleek Storage SDK. They are only a small portion of possible commands. A more comprehensive list can be found in the [AWS S3 SDK documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html).

That being said, the commands we will share in this article should be sufficient for common use cases such as:

* Uploading a file
* Getting the IPFS hash of a file
* Creating a shareable public URL of assets for use in websites

## Fetching your credentials with the Fleek CLI
Usage of the Fleek Storage SDK requires an api key and secret.
Luckily, we've created a Fleek CLI that will allow you to get those values easily.

First, install the Fleek CLI.

```
npm install -g @fleekhq/fleek-cli
```

Then, log in to fleek. 

```
fleek login
```

A browser window will open with a login prompt. If you are already logged in, the window will close automatically.

After a successfull login, you will be able to fetch your key and secret with the command below:

```
fleek whoami
```

Copy those values somewhere safe!

## Installing the AWS SDK package
The `aws-sdk` npm package must be installed to interact with Fleek Storage.

```
npm install --save aws-sdk
```

## Setting up the S3 client
We will now set up an S3 client using our credentials. This client will be used for all other AWS S3 commands.

```
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: '[[apiKey]]',
    secretAccessKey: '[[apiSecret]]',
    endpoint: 'https://storageapi.fleek.co',
    region: 'us-east-1',
    s3ForcePathStyle: true
 });
```

Replace the fields `apiKey` and `apiSecret` with the credentials fetched with `fleek whoami` in the previous section.

## Fetching your buckets
The bucket contains all your files and must be specified when either fetching or uploading files. Every Fleek account comes with one bucket by default.

```
s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error when listing buckets", err);
    } else {
      console.log("Success when listing buckets", data);
    }
 });

```

Make sure to save the name of the bucket somewhere for use with other commands.

## Listing Files in a Bucket
You can list the files in your bucket. This is particularly useful for getting a list of file keys and generating public URLs.

```
const params = {
     Bucket: "my-bucket",
     MaxKeys: 20
  };
s3.listObjectsV2(params, function (err, data) {
     if (err) {
        console.log("Error when listing objects", err);
     } else {
        console.log("Success when listing objects", data);
     }
 });
```

An example of a typical response is provided below.

```
 { IsTruncated: false,
  Contents:
   [ { Key: 'homer-cooking.gif',
       LastModified: 2020-05-21T19:07:54.956Z,
       ETag: '"-1"',
       Size: 2078126,
       StorageClass: 'STANDARD',
       Owner: [Object] } ],
  Name: 'samuelea-team-bucket',
  Prefix: '',
  Delimiter: '',
  MaxKeys: 20,
  CommonPrefixes: [],
  KeyCount: 1 }
```
Each file in Fleek Storage can be identified through the `Name` of the bucket that contains it and the file's unique `Key`.

## Get the URL of a file
Fleek provides a public URL that you can use for your website. For example, if you upload images or icons, you can use the URL to display them in your site.

This public URL can easily be found in the web app, but you can also generate it with the bucket's `Name` and the file's `Key`.

```
const url = `https://${bucket}.storage.fleek.co/${key}`
```

For example, here's the URL for the gif shown above:
```
https://samuelea-team-bucket.storage.fleek.co/homer-cooking.gif
```

`samuelea-team-bucket` is the bucket.
`homer-cooking.gif` is the file's key.

## Uploading Files
Files can be uploaded through the web UI. Alternatively, they can be uploaded programatically depending on the use case.

Here's how to do it:

```
  const params = {
    Bucket: 'my-team-bucket',
    Key: 'myFolder/myPicture',
    ContentType: 'image/png',
    Body: myPictureFile,
    ACL: 'public-read',
  };
  const request = s3.putObject(params);
  request.send();
```

If you were to look at the file above in the Fleek web app, you would find the file `myPicture` under a folder named `myFolder`. You can put files in folders to better organize your assets by providing a path separated with slashes `/`.

## Getting the IPFS Hash
All files on Fleek Storage are uploaded to IPFS, which means they are identified with a unique IPFS hash. Fleek will expose the IPFS hash through the http headers when using the `putObject` command to upload files.

```
  const request = s3.putObject(params);
  request.on('httpHeaders', (statusCode, headers) => {
    const ipfsHash = headers['x-fleek-ipfs-hash'];
    // Do stuff with ifps hash....
    const ipfsHashV0 = headers['x-fleek-ipfs-hash-v0'];
    // Do stuff with the short v0 ipfs hash... (appropriate for storing on blockchains)
  }).send();

```

We recommend getting the hash from the `x-fleek-ipfs-hash` header, which will return a base32, v1 IPFS hash.

For use cases in which the IPFS hash must be store on a blockchain such as Ethereum, Fleek also exposes the shorter v0 IPFS hash through `x-fleek-ipfs-hash-v0`.

The hash is also available from the web app by clicking on `Verify on IPFS`.

For example, here's the hash for the gif used as example: `bafybeieosa4izdyojswkzddssuekz47ly7suwb4spiniv33e5ht5kbz5vu`.
And it can be accessed through an IPFS gateway: <https://gateway.temporal.cloud/ipfs/bafybeieosa4izdyojswkzddssuekz47ly7suwb4spiniv33e5ht5kbz5vu>

# Existing AWS S3 SDK projects
Since our SDK conforms to the AWS S3 SDK interface, projects that are already based on the AWS S3 SDK will be able to integrate Fleek Storage without any friction. The only requirement is to set up the s3 client with the Fleek credentials as shown previously in this blog post.

# Suggestion Box
You are now a master of the Fleek Storage SDK. We cannot wait to see what you will make with it!

If you have questions or suggestions concerning our SDK, do not hesitate to contact us on our [Slack Channel](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A).


* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) the #community slack channel
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) our Tech Docs
* Contact us at support@fleek.co 
