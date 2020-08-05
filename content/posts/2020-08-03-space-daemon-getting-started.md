---
template: post
title: 'Getting Started with the Space Daemon'
slug: space-daemon-getting-started
draft: true
date: 2020-08-03T12:18:31.636+00:00
description: Want to create the next great app using the Space Daemon? This guide will get you started! 
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/SpaceDaemon.png
tags:
- tutorial

---
![](https://fleek-team-bucket.storage.fleek.co/SpaceDaemon.png)

The Space Daemon, our latest open source project, unlocks a new range of possibilities for privacy-focused apps. The Space Daemon saves encrypted files to IPFS and takes care of key management, thus empowering users with true data ownership.

Maybe you wish to create the next great privacy-focused peer-to-peer app, but don't know where to start with the Space Daemon. If that is the case, this guide is for you!

In the next few minutes, we will cover the subject of setup, installation and get an overview of a few basic commands.

### Setup
To use the Space Daemon in an app we will need two things.

First, we need to have the Space Daemon running. Second, we must install the Space Client in our app so we can use it to interact with the Space Daemon.

#### Downloading the Daemon
First of all, grab the [latest release](https://github.com/FleekHQ/space-daemon/releases) of the Daemon.
The daemon is an executable available for Windows, Mac and Linux, so you can take the version corresponding to your system and cpu architecture (32 or 64 bits).

Then, simply run the daemon as an executable.

#### Installing the Client
The Space Client allows you to interact with the Space Daemon and it is available as an [npm package](https://www.npmjs.com/package/@fleekhq/space-client).

In order to install, run the following command:

```
npm install @fleekhq/space-client
```

or with yarn

```
yarn add @fleekhq/space-client
```

The Space Client package is now in your app.

#### Create an Instance of the Client
In order to call the methods offered by the Space Client, we must first declare a new instance of the Client and tell it how to connect to the Space Daemon.

By default, the Space Daemon runs on localhost, port 9998.

The code below will generate the client based on the default port.

```
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });
```

### Basic Commands
The most basic function of the Space Daemon is to privately upload files to IPFS by encrypting them on the local machine.

Below are a few of the Client methods related to this task.

#### Creating a Bucket
Buckets store all the files and folders created by the Daemon. Therefore, we must create one before proceeding any further.

The `createBucket` method receives a `slug` input which corresponds to the name to give to the bucket.

```
  try {
    console.log('creating bucket...');
    const res = await client.createBucket({ slug: bucket });
    const bucketObj = res.getBucket();

    console.log(getBucketObject(bucketObj));
  } catch (error) {
    console.error(error);
  }
```

The bucket name is an important value to keep track of since it is used as input for other methods.

#### Creating a Folder
Files withing a bucket are organized in a unix-like file system and folders can be created to better organize our files.

The `createFolder` method takes the name of the bucket alongside the path as input for the folder in the following format: `/path/to/my/folder`.

```
  try {
    console.log('creating folder...');
    await client.createFolder({ bucket, path });
    console.log('folder created!');
  } catch (error) {
    console.error(error);
  }
```

#### Uploading a File
The `addItems` method is used for file upload. It takes the name of the bucket as input, the `targetPath` which is the path in which the files should be copied within the bucket and an array of `sourcePaths` which are the paths of the files to be copied from the local machine.

```
  const uploadStream = client.addItems({
    bucket,
    targetPath,
    sourcePaths: [ path ],
  })

  uploadStream.on('data', (data) => {
    const itemResult = data.getResult();

    console.log(itemResult.getSourcepath());
  });

```

#### Opening a File
The `openFile` method takes the name of a bucket and the path of a file in the bucket as input. It creates a temporary decrypted copy of a file in the local machine and prints out the path to this file so it can be accessed.

```
  try {
    const res = await client.openFile({ bucket, path });
    console.log(res.getLocation());
  } catch (error) {
    console.error(error);
  }
```

#### Listing the Content of a Folder

The `listDirectory` method lists the content of a folder and takes the name of the bucket and the path to the folder as input.

```
    try {
      console.log('fetchig directory...');
      const res = await client.listDirectory({ bucket, path });

      const entryList = res.getEntriesList();
      const entries = entryList.map((entry) => getEntryObject(entry));

      console.log(entries);
    } catch (error) {
      console.error(error);
    }
```


### Share your creations!

We are excited to see what cool projects you will come up with using the Space Daemon, so share your ideas with us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter").

Happy hacking!

* [Sign up](https://app.fleek.co "Sign Up") to try Fleek
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A "Fleek's Slack")
* Follow us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter")
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw "Fleek's Youtube Channel")
* Check out our [Tech Docs](https://docs.fleek.co/ "Fleek Docs")
* Contact us at support@fleek.co