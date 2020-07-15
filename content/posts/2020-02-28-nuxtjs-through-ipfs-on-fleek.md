---
template: post
title: Deploying NuxtJS through IPFS on Fleek
slug: Deploying-nuxtJS-through-IPFS-on-Fleek
draft: false
date: 2020-04-28T04:02:37.816+00:00
description: Get started with deploying your NuxtJS site through IPFS on Fleek
category: getting started
socialImage: "./media/nuxtjs/main.png"
tags:
- general
- nuxtjs
- ipfs
- getting started

---
![](images/nuxtjs/main.png)

In this article, we will show you how to deploy your site built on NuxtJS and deploying using IPFS on Fleek

    # Table of Contents
    - What is Fleek
    - What is IPFS
    - Starting a NuxtJS Project
    - File Structure Content
    - Deploying to IPFS on Fleek
    - Switching name or adding a domain on Fleek
    - Closing Thoughts
    - Resources

# What is Fleek

Fleek is everything you need to build fast, modern sites & apps on IPFS. All in one seamless workflow, From local development to global deployment, Your site will not only run on IPFS, but it’s also supplemented with a global, enterprise-grade CDN, allowing for speed, scale, and performance that is superior to normal hosting.

# What is IPFS

[IPFS](https://ipfs.io) stands for `InterPlanetary File System`, The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

# Starting a NuxtJS Project

The first step is to create a nuxt app wrapped around create-nuxt-app, the name of my directory is `deploy-nuxtjs-using-ipfs-on-fleek` yours can be named whatever you like.

    $ npx create-nuxt-app deploy-nuxtjs-using-ipfs-on-fleek
    

Once that is done you now have your repo created, all that is left is to enter into the directory using the company below

    cd deploy-nuxtjs-using-ipfs-on-fleek

run the command below to start the development server which would create a server on `http://localhost:3000/`

    yarn dev

Once that is running you would see a preview that similar to the below

![](images/nuxtjs/nuxt-main.png)

# File Structure Content

## Assets

The `assets` directory is made for assets in relations to design/style, for this project we are running on tailwind CSS, so in our assets/css we have `tailwind.css`

```css
/* purgecss start ignore */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
/* purgecss end ignore */
@import 'tailwindcss/utilities';
```

## Pages

The `pages` directory is made up of your actual project View's and Routes, nuxt would look for files ending with a `.vue` extension and build your applications from that, in this article we have just a single file named `index.vue`

```vue
<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">NuxtJS & <a href="https://fleek.co">Fleek.co</a></h1>
      <h2 class="subtitle">
        Deploying NuxtJS using IPFS on Fleek
      </h2>
      <div class="links">
        <a href="https://fleek.co" target="_blank" class="button--grey">
          Fleek </a
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo,
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
```

To learn more about Nuxt.js code directory click [Here](https://nuxtjs.org/guide/directory-structure/)

# Deploying to IPFS on Fleek

Deploying to IPFS has never been this easy thanks to Fleek, first, visit [fleek.co](https://fleek.co) and signup.login using your GitHub account, once set up you should see your dashboard similar to the below

![](images/nuxtjs/fleek-dash.png)

Once that's done click on `Add New Site` that should take you to a new page like the below

![](images/nuxtjs/connect.png)

Immediately after connection search for the name of the repo over GitHub using the search feature by the right-hand side of the screen and click the repo that was listed, similar to the below

![](images/nuxtjs/search.png)

It is worth noting at this point that Nuxt supports SSR (server-side rendering). We _do not_ want to run our site on SSR because our files are simply hosted on IPFS and there is no server running in this scenario. Therefore, we must make sure that the site is exported as a _static_ site.

The next step is the deploy settings page, the framework/language is automatically selected by Fleek, once you have gotten to this screen click `Deploy Site`

![](images/nuxtjs/deploy.png)

While your app deploys, you can watch the deployment using the `Fleek Deploy Log`, it should take less than a minute to complete deployment

![](images/nuxtjs/log.png)

Yes! our app has deployed, scroll to the very top and you would find a link, clicking that link takes you to your deployed site

![](images/nuxtjs/link.png)

# Switching name or adding a domain on Fleek

Usually, when you deploy a new site on Fleek, you have a very funny looking domain name for example `https://crimson-lab-6839.on.fleek.co/`, you can change that by going under settings then clicking `Change Site Name`, then put in your preferred domain.

![](images/nuxtjs/setting.png)

# Closing Thoughts

…and that’s it! Deploying a NuxtJS site to Fleek is quick and very easy, Fleek is looking to change how deployment works on IPFS improving everything.

# Resources

* [GitHub Repo](https://github.com/Developerayo/deploy-nuxtjs-using-ipfs-on-fleek)
* [Deployed Site](https://deploy-nuxtjs-using-ipfs-on-fleek.on.fleek.co/)
* [NuxtJS Guide](https://nuxtjs.org/guide/)