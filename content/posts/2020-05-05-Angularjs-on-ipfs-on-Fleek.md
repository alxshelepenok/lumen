---
template: post
title: AngularJS on IPFS on Fleek
slug: angularjs-on-ipfs-on-fleek
draft: false
date: 2020-05-05T04:02:37.816Z
description: >-
  Get started with deploying your AngularJS app on IPFS on Fleek
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/angular.png
tags:
  - general
  - angularjs
  - ipfs
  - getting started
---

![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/angular.png)


Get your AngularJS app sailing on IPFS. In this short tutorial, we will learn how to create an Angular app and deploy it on Fleek so it can be shared on the decentralized web.

```
# Table of Contents
- Install Angular CLI
- Creating an Angular Project
- Push to GitHub and Linking Fleek
- Congratulations
```

# Install Angular CLI

Before anything else, let's install the `angular-cli` using the command below. This command installs the `angular-cli` globally on your system.

```
npm install -g @angular/cli
```

## Creating an Angular Project

Next, let's create an angular project using the command below.

```
ng new your-app-name
```

This command will bootstrap a complete AngularJS app for you. You will also be prompted if you would like to add Angular routing, that should be a yes and also the kind of css style you would like to use. For example, CSS, SCSS, LESS, and the likes. You can see a picture of my process below:

![](images/angular/terminal.png)

The next step is to enter into the directory of the app you are working on.

```
cd your-app-name
```

Start your angular project.

```
ng serve --open
```

The Angular project will start and open right away in your browser once the preview on `http://localhost:4200/` is ready.


![](images/angular/1.png)

# Push to GitHub and Linking Fleek

The first step is to push the Angular app to Github which will allow Fleek to gain access to your project for the deployment.

In our case, I've pushed my project to this repo: https://github.com/Developerayo/angularjs-on-ipfs-on-fleek.

Now, we must log to fleek and create a new site and find the repo you created.

![](images/angular/2.png)

Luckily for us, Fleek has automatically detected our Angular project and filled the build settings with the right information, but we must also specifiy the publish directory, which should be set to `dist/your-app-name.com`. Then, click on `Deploy Site`. 

Let's wait a bit for the site to deploy. This should take no longer than a few minutes.

Upon deployment, Fleek will automatically assign a default URL to the site. 
Here is mine: https://calm-shape-3413.on.fleek.co

![](images/angular/3.png)

## Congratulations!

Congrats! You've just joined the web3 family by deploying an Angular app to IPFS with Fleek.

We love to see what our users come up with. Do not hesitate to share your work with us by tweeting about your deployed site!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) our Community Chat
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) out our Tech Docs
* Contact us at support@fleek.co 

