---
template: post
title: How to deploy a Next.js app onto IPFS using Fleek
slug: fleek-nextJS
draft: false
date: 2020-03-12T14:06:38.733Z
description: >-
  We’ll create a Next.js app and deploy it on Fleek. This whole process
  It should take 10 minutes.
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Next.png
tags:
  - Tutorial
  - Guide
---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Next.png)

## Overview

We’ll create a Next.js app and deploy it on Fleek. This whole process should take 10 minutes.

Tools:

* Fleek account
* GitHub account
* node.js/npm

### Step 1: Set Up a Repo on Github

Create an empty repository and clone it.

![](./media/nextjs/CreateRepo.png)

Create a Next.js app using:

`$ mkdir nextjs && cd nextjs` `$ npm init --y'
'$ npm install next react react-dom`

![](./media/nextjs/CreateNextjsapp.png)

Open `package.json` and add in the following scripts

```
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "export": "next export"  
}
```

![](./media/nextjs/Openpackagejson.png)

Create a `next.config.js` file in the root directory

```
module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
};
```

![](./media/nextjs/createNextConfigJS.png)

Let’s create some pages: Create a folder called pages Inside pages, create `index.js`

```
// index.js
import Link from "next/link";

export default function Index() {
  return (
    <div>
      <h1> Index </h1>
      <Link href="/about">
        <a> About </a>
      </Link>
    </div>
  );
}
```

and `about.js`

```
// about.js
export default function About() {
  return (
    <div>
      <h1> About </h1>
    </div>
  );
}
```

It should look something like this

![](./media/nextjs/indexJSAboutJS.png)

To test, run `npm run dev` and visit localhost:3000

![](./media/nextjs/localhost3000.png)

git add, commit, push

![](./media/nextjs/gitcommit.png)

### Step 2: Set Up Fleek

Sign into https://app.fleek.co/

Sign in with Github

![](./media/nextjs/signin.png)

Add New Site

![](./media/nextjs/addsite.png)

Connect with Github.

![](./media/nextjs/connectGithub.png)

Pick your Next.js repository.

![](./media/nextjs/picknextjsrepo.png)

To create a new site:

Build command: `npm install && npm run build && npm run export`

docker image: `fleek/next-js`

Publish directory: `out`

Of course, fleek will autodetect next-js and enter those configurations automatically. :P

It's worth noting that the docker image `fleek/next-js` runs the most recent version of node.js by default, which, by the time of this writing, is version 13.

If you need to use another node version, you can do so via the docker tag.
EG: For node 10, use `fleek/next-js:node-10`

Deploy Site

![](./media/nextjs/deploySite.png)

Once complete, view your website.

![](./media/nextjs/viewSite.png)

You can view the website using the provided domain name.

`https://<your-domain>.on.fleek.co`

Or verify with the CID.

`https://ipfs.io/ipfs/<CID>`

![](./media/nextjs/verifyCID.png)

### Step 3: Updates

Fleek will automatically redeploy your website whenever you make changes to GitHub. Make sure to provide the domain name will remain the same and will point to the new CID. This enables you to build fast modern websites hosted on IPFS.

* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A)
* Follow us on [Twitter](https://twitter.com/FleekHQ) 
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co 
