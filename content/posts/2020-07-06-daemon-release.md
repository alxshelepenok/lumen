---
template: post
title: 'The Space Daemon: A New Open Source Project for Privacy-focused IPFS Apps'
slug: daemon-release
draft: false
date: 2020-07-06T12:18:31.636+00:00
description: We've just release the Space Daemon, a new open source project to help
  developers create the next great peer-to-peer app. Come learn how you can use it!
category: Release
socialImage: https://fleekblog-team-bucket.storage.fleek.co/daemon-release/space-daemon.jpg
tags:
- release

---
![](https://fleekblog-team-bucket.storage.fleek.co/daemon-release/space-daemon.jpg)

We’re excited to introduce our latest and most exciting decentralized development, the Space Daemon.

The[ Space Daemon](https://github.com/FleekHQ/space-daemon "Space Daemon") packages together [IPFS](https://ipfs.io/ "IPFS"), [Textile](https://textile.io/ "Textile") Threads/Buckets, and Textile Powergate (Filecoin) into one easy to install and JS interface to make it easy to build peer to peer and privacy focused apps.

Installing the [Space Daemon](https://github.com/FleekHQ/space-daemon "Space Daemon") is easy and comes with all the tools packaged together including IPFS and Textile nodes, and and also exposes gRPC methods specific to the features you want for your app including: File Upload (encrypted), File Sharing, Filecoin Markets, and User Controlled Data. You can access same methods using our [JS client](https://github.com/FleekHQ/space-client "Space Client"), so you don't need to worry about gRCP calls.

Space is the next evolution of Cloud, where users can interact with apps fully private, p2p, and control their own data. Big tech has taken advantage of user data for far too long, it's time to let users take back control and privacy of their data. Here are the features the Space Daemon will bring to your application:

* Fully Private file upload via encrypted textile buckets.
* Peer to Peer file sharing selectively with other people and/or within teams.
* Identity solution enabling users to be fully anonymous or have as many identity associations
* Filecoin network interaction for file storage and retrieval market.
* Super easy to use Js library with easy to understand functions for File CRUD, Sharing, Identity, Backups, etc.
* Datastore for applications and application registry to enable user data controlled applications
* Trustless Data backups
* Local file system mounting
* More...

## Getting Started

### Installation

#### Download the daemon

First thing is go the [latest release](https://github.com/FleekHQ/space-daemon/releases/latest) of the daemon and download the binary version for your Operating System:
![Binary versions](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.26.35.png)

#### Run the daemon

Once you downloaded the dameon binary, open a new terminal window and go to the path where you placed the daemon and change its the access permissions by doing:

```bash
chmod 755 space_binary_file
```

![Change permissions](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.32.png)
Then you can run daemon as any other normal binary file:

```bash
./your_binary_file
```

![Running daemon](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.51.png)
If you get a warning window when you try to execute the daemon, please follow this instructions:
Click on cancel:
![Warning window](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.06.png)
Then go to your System Preferences/Security and Privacy and click `Allow Anyway`:
![System PReferences](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.34.png)
then try to execute the daemon again:

```bash
./your_binary_file
```

![Running daemon](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.35.51.png)
this time you will get a new warning window, click `Open`
![New warning window](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.36.51.png)
If everything goes well, you will see the daemon logs indicating that Daemon is ready
![Daemon Ready](https://gpuente105-team-bucket.storage.fleek.co/imgs/Screen%20Shot%202020-07-07%20at%2012.37.06.png)

#### Download the client

If you are using NodeJS, you can install the space client package so you can interact with the daemon using nice and simple javascript methods without worring about gRPC calls.
Space client is built on top of [grpc-web](https://www.npmjs.com/package/grpc-web)
You can install the client on your project as any normal package, using `npm` or `yarn`:

```bash
npm install @fleekhq/space-client
```

or

```bash
yarn add @fleekhq/space-client
```

As space-client is built on top of [grpc-web](https://www.npmjs.com/package/grpc-web), if you want to use the client on server side you'll need to install XMLHttpRequest package:

    yarn add xmlhttprequest
    or
    npm install xmlhttprequest

#### Setup the client

You can import the client as any normal package.
Please have in mind that [space daemon](https://github.com/FleekHQ/space-daemon) is a service that runs on users desktops, that means that you just can connect through your localhost. You can't connect through a dns or try to connect to a [daemon](https://github.com/FleekHQ/space-daemon) running on a different machine.

```js
  import { SpaceClient } from '@fleekhq/space-client';
  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });
  ...
```

If you are running the client on the server-side, you need to declare `XMLHttpRequest` module as global. (this is because client is based on [grpc-web](https://www.npmjs.com/package/grpc-web), which is supposed to be used on client-side).

```js
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const { SpaceClient } = require('@fleekhq/space-client');
  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });
  ...
```

### CRUD Operations

#### Create bucket

    .createBucket({ slug: string })

Creates a new bucket. Returns a Promise that resolves to the new bucket instance

```js
  client
    .createBucket('myNewBucket')
    .then((res) => {
      const bucket = res.getBucket();
      console.log(bucket.getKey());
      console.log(bucket.getName());
      console.log(bucket.getPath());
      console.log(bucket.getCreatedat());
      console.log(bucket.getUpdatedat());
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.createBucket('my-bucket');
    const bucket = res.getBucket();
    console.log(bucket.getName());
    ...
  };
```

#### Upload files/folders

    .addItems({ bucket: string, targetPath: string, sourcePaths: string[] })

Add new items. Returns a readable stream to resolves the new items

```js
  const stream = client.addItems({
    bucket: 'my-bucket',
    targetPath: '/',
    sourcePaths: ['/path-to-my-folder-or-file-to-upload']
  });
    
  stream.on('data', (data) => {
    console.log('data: ', data);
  });
  
  stream.on('error', (error) => {
    console.error('error: ', error);
  });
  stream.on('end', () => {
    console.log('end');
  });
```

#### Create folders

    .createFolder({ path: string, bucket: string })

Creates a new empty folder. Returns a Promise that resolves to the new folder

```js
  client
    .createFolder({ path: '/', bucket: 'my-bucket' })
    .then(() => {
      console.log('folder created in path "/"');
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    await client.createFolder({ path: '/', bucket: 'my-bucket' });
  };
```

#### List a directory

    .listDirectory({ path: string, bucket: string })

Returns a promise that resolves to list of Entry instances representing each folder and files present in the path directory.

```js
  client
    .listDirectory({ path: '/', bucket: 'my-bucket' })
    .then((res) => {
      const entries = res.getEntriesList();
      entries.forEach((entry) => {
        console.log(entry.getPath());
        console.log(entry.getName());
        console.log(entry.getIsdir());
        console.log(entry.getCreated());
        console.log(entry.getUpdated());
        console.log(entry.getIpfshash());
        console.log(entry.getSizeinbytes());
        console.log(entry.getFileextension());
      });
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.listDirectory({ path: '/', bucket: 'my-bucket' });
    const entries = res.getEntriesList();
    entries.forEach((entry) => {
      ...
    });
  };
```

#### List all the bucket directories/files

    .listDirectories({ bucket: string })

Returns a Promise that resolves to list of Entry representing all the folders and files inside the bucket.

```js
  client
    .listDirectories({ bucket: 'my-bucket' })
    .then((res) => {
      const entries = res.getEntriesList();
      entries.forEach((entry) => {
        console.log(entry.getPath());
        console.log(entry.getName());
        console.log(entry.getIsdir());
        console.log(entry.getCreated());
        console.log(entry.getUpdated());
        console.log(entry.getIpfshash());
        console.log(entry.getSizeinbytes());
        console.log(entry.getFileextension());
      });
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.listDirectories({ bucket: 'my-bucket' });
    const entries = res.getEntriesList();
    entries.forEach((entry) => {
      ...
    });
  };
```

#### Open a file

    .openFile({ path: string, bucket: string })

Copies the file referenced by the path arg to a temp folder on your machine and returns a Promise that resolves to the file location

```js
const asyncFunc = async () => {
  const bucket = 'my-bucket';
  const dirRes = await client.listDirectories({
    bucket,
  });
  const entriesList = dirRes.getEntriesList();
  const openFileRes = await client.openFile({
    bucket,
    path: entriesList[0].getPath(),
  });
  const location = openFileRes.getLocation();
  console.log(location); // "/path/to/the/copied/file"
};
```

#### Subscribe to txl events

    .txlSubscribe()

Returns a ReadableStream that notifies when something changed on the bucket (data stream returns the Bucket name).

```js
  const txlStream = client.txlSubscribe();
  txlStream.on('data', (res) => {
    const bucket = res.getBucket();
    console.log(bucket);
  });
```

#### Subscribe to buckets events

    .subscribe()

Returns a ReadableStream that notifies when something changed on the bucket (data stream returns the event type + the entry affected).
Event type can be one of `[ENTRY_ADDED, ENTRY_DELETED, ENTRY_UPDATED]`

```js
  const subscribeStream = client.subscribe();
  subscribeStream.on('data', (res) => {
    const eventType = res.getType();
    const entry = res.getEntry();
    console.log('eventType', eventType.toString());
    console.log('path', entry.getPath());
    console.log('name', entry.getName());
    console.log('isDir', entry.getIsdir());
    console.log('created', entry.getCreated());
    console.log('updated', entry.getUpdated());
    console.log('ipfsHash', entry.getIpfshash());
    console.log('sizeInBytes', entry.getSizeinbytes());
    console.log('fileExtension', entry.getFileextension());
  });
```

### Identity

#### Create username and email

    .createUsernameAndEmail({ username: string, email?: string })

Create a new username with/out email. Returns a Promise that resolves to the username

```js
  client
    .createUsernameAndEmail({ username: 'myusername' })
    .then(() => {
      console.log('username created');
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    await client.createUsernameAndEmail({ username: 'myusername', email: 'my-email@mydomain.com' });
  };
```

#### Get identity by username

    .getIdentityByUsername({ username: string, email?: string })

Get an indentity based on a username. Returns a Promise that resolves if a username already exists

```js
  client
    .getIdentityByUsername({ username: 'myusername' })
    .then((res) => {
      console.log(res.getIdentity());
    })
    .catch(() => {
      console.log('Username doesnt exists.');
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.getIdentityByUsername({ username: 'myusername' });
    
    console.log(res.getIdentity());
  };
```

### Sharing

#### Share a bucket via identity

    .shareBucketViaIdentity({ identityType: 'USERNAME' | 'EMAIL', identityValue: string, bucket: string })

Shares a bucket via identity

```js
  client
    .shareBucketViaIdentity({
      bucket: 'my-bucket-slug',
      identityType: 'USERNAME',
      identityValue: 'user123',
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.shareBucketViaIdentity({
      bucket: 'my-bucket-slug',
      identityType: 'USERNAME',
      identityValue: 'user123',
    });
    
    console.log(res);
  };
```

#### Share a bucket

    .shareBucket({ bucket: string })

Shares a bucket. Returns a promis that resolves to the threadInfo (required to join a bucket)

```js
  client
    .shareBucket({ bucket: 'my-bucket' })
    .then((res) => {
      const threadInfo = res.getThreadinfo();
      console.log('key:', threadInfo.getKey());
      console.log('addresses:', threadInfo.getAddressesList());
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.shareBucket({ bucket: 'my-bucket' });
    const threadInfo = res.getThreadinfo();
    ...
  };
```

#### Join a shared bucket

    .joinBucket({ bucket: string, threadInfo: { key: string, addresses: [string] } })

Joins a shared bucket

```js
  client
    .joinBucket({
      bucket: 'my-bucket',
      threadInfo: {
        key: 'my-key',
        addresses: ['address1', 'address2', 'address3'],
      },
    })
    .then((res) => {
      console.log('result', res.getResult());
    })
    .catch((err) => {
      console.error(err);
    });
  /* Or using Async/Await */
  const asyncFunc = async () => {
    const res = await client.joinBucket({
      bucket: 'my-bucket',
      threadInfo: {
        key: 'my-key',
        addresses: ['address1', 'address2', 'address3'],
      },
    });
    console.log('result', res.getResult());
    ...
  };
```

## Example Desktop App

We've also created a [repository](https://github.com/FleekHQ/space-client-workshop) with an example desktop application to show off the features that can be utilized from the Space Daemon. Its a simple create react app + electron implementation to show [space-daemon](https://github.com/FleekHQ/space-daemon) and [space-client](https://github.com/FleekHQ/space-client) features.

### Run the project:

> You need to install and run [space-daemon](https://github.com/FleekHQ/space-daemon) to run this project

Install project dependencies:

`npm install`

or

`yarn`

Run the project:

`yarn electron:dev`

### ![](https://fleek-team-bucket.storage.fleek.co/spaceDaemonExampleRepo.png)

### Share your creations!

We are excited to see what cool projects you will come up with using the Space Daemon, so share your ideas with us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter").

Happy hacking!

* [Sign up](https://app.fleek.co "Sign Up") to try Fleek
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A "Fleek's Slack")
* Follow us on [Twitter](https://twitter.com/FleekHQ "Fleek's Twitter")
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw "Fleek's Youtube Channel")
* Check out our [Tech Docs](https://docs.fleek.co/ "Fleek Docs")
* Contact us at support@fleek.co