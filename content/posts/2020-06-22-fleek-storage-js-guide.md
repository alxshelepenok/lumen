---
template: post
title: Easily pin to IPFS with Fleek Storage Js! - A short guide
slug: guide-to-fleek-storage-js
draft: false
date: 2020-06-22T12:18:31.636+00:00
description: It's now easier than ever to upload and pin files to IPFS thanks to Fleek
  Storage Js. Come learn how!
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek_storage_js_thumbnail.png
tags:
- Tutorial
- Guide
- Storage

---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/fleek_storage_js_thumbnail.png)

It's now easier than ever to upload and pin files to IPFS thanks to Fleek Storage Js.

Fleek Storage Js allows developers to easily create apps that integrate with IPFS.

In this short guide, we will get you up and running with Fleek Storage Js so you can create the next awesome dapp.

We will cover the two most important actions: uploading a file and getting a file.

### Prerequisites

Fleek Storage Js can be installed as an [npm package](https://www.npmjs.com/package/@fleekhq/fleek-storage-js).

    npm install @fleekhq/fleek-storage-js
    

or with yarn...

    yarn add @fleekhq/fleek-storage-js
    

Then import the package in your code.

    const fleek = require('@fleekhq/fleek-storage-js');   

or...

    import fleek from '@fleekhq/fleek-storage-js';   

Using Fleek Storage Js necessitates an api key. A key can easily be generated on the web app [https://app.fleek.co](https://app.fleek.co) in the [user settings](https://app.fleek.co/#/settings/general/profile).

![](/fleekStorageJs/userSettings.png)

Clicking on `Create New Api Key` will produce a new api key and api secret. Make sure to copy the api Secret, since it will only be shown once.

![](/fleekStorageJs/apiKeys.png)

By default, every Fleek account comes with a bucket in which uploaded files go to. You do not have to specify a bucket when using Fleek Storage Js, because the SDK will use your default bucket if none is specified.

Fleek Storage Js provides the `listBuckets` method in case you wish to list all the buckets associated with your Fleek account.

### fleek.upload: Upload and pin a file!

The `upload` method can be used to upload individual files on IPFS.

      const input = {
        apiKey: '123',
        apiSecret: 'abc',
        key: `my-folder/my-file-name`,
        data: myFile,
      };
    
      const result = await fleek.upload(input);
    

The method returns a promise. It requires the api key, api secret and the file's data.
If using node, `fs.readFile` can be used to get a file's data from the computer.

The method needs a `key`, which is the identifier that you give to the file.

Files uploaded through `upload` will also appear in the [Fleek Storage web app](https://docs.fleek.co/storage/storage-app).

The file's `key` can be in the format of a path, such as in the example above. In that case, the web app will display the file as part of a folder structure.

What does the returned data of the method looks like? Let's take a look!

    { hash:
       'bafybeienymabwnsk5ktoylx6s3g3gitv7ppedumqyxtxsnrk3dhoeztnm4',
      hashV0: 'QmXt2euF7yLwbJBvLj518mtuJfbkzgtXDTdW2ZNbUyTqvv',
      key: 'my-file-name',
      bucket: 'my-bucket',
      publicUrl:
       'https://my-bucket.storage.fleek.co/my-file-name' }
    

The promise returns the v1 IPFS hash (`hash` field) and the v0 IPFS hash (`hashV0` field). The v0 IPFS hash is shorter and is therefore suited for writing on blockchains such as Ethereum, where data storage is costly. In all other cases, however, the v1 hash is preferred.

We also return the key and the name of the bucket containing the file. Finally, the field `publicUrl` corresponds to the url provided by Fleek to serve the file from a super fast CDN.

### fleek.get: Fetch a file!

The `get` method is for fetching either data related to a file, such as the key, hash or public url, or the content of the file itself.

      const input = {
        apiKey: '123',
        apiSecret: 'abc',
        key: `my-folder/my-file-name`,
        getOptions: ['hash', 'data', 'publicUrl', 'key']
      };
    
      const result = await fleek.get(input);
    

The method will return an object whose fields will correspond to the values specified in the `getOptions` field.
The possible values for the getOptions array are `data`, `bucket`, `hash`, `key` and `publicUrl`.

### fleek.listFiles: Show all files!

Finally, there are cases when you might want to list all the files in a bucket and get their `publicUrl`, `hash` or `key`.

In that case, `listFiles` is appropriate. It works exactly the same as `get`, except it returns an array.

## More resources

Here's a [Github repo](https://github.com/SamueleA/fleek-storage-js-examples) that shows an example of usage for each Fleek Storage Js method.

Additionally, the [Fleek Storage Js](https://docs.fleek.co/storage/fleek-storage-js) docs contains an exhaustive account of the inputs for each method.

## Time to create!

Now that you know how to use Fleek Storage Js, you can easily upload and pin files to IPFS.

You can now unleash your creative powers on the decentralized web.

Share your awesome creations with us on Twitter!

* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co