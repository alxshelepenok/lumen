---
template: post
title: Overview of Fleek's Docker Hub Repository
slug: overview-fleek-docker-hub-repo
draft: false
date: 2020-04-04T04:02:37.816+00:00
description: A walkthrough of Fleek's Docker Hub repository. You will see Fleek's
  official images which we encourage you to use for your site.
category: Tutorial
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/docker-hub-overview.png
tags:
- Docker
- Resource

---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/docker-hub-overview.png)

Fleek has an official Docker Hub repo! We store all our official Docker Images there. In this post, we'll introduce you to its content so you can use it to create the best site ever.

## What is Docker Hub

Docker Hub is like Github, but for Docker Images. When you deploy a site through Fleek and are filling the build settings, the docker images field corresponds to a docker image resting in Docker Hub.

![](./media/Docker-hub-overview/1-build-settings.png)

## Our Repositories

![](./media/Docker-hub-overview/2-list-of-repos.png)

Fleek's repositories can be found [here](https://hub.docker.com/orgs/fleek/repositories). You will find images for all the frameworks we are officially supporting such as Gatsby, Hugo, etc...

When creating a site, you can specify one of those images by filling the docker image field in the build settings to the corresponding image. For instance, to use the Gatsby docker image enter `fleek/gatsby`.

## Specifying the Node version

![](./media/Docker-hub-overview/3-gatsby-builds.png)

Many frameworks rely on a specific Node.js version, otherwise, the build fails. By default, our docker images will use the latest Node.js version available.

You can specify a specific Node version through the Docker tag. For example, look at the [repository for Gatsby](https://hub.docker.com/repository/docker/fleek/gatsby).

As you can see in the tags section, many node versions are available. For example, if we need Gatsby and Node 10, we would use the image `fleek/gatsby:node-10`.

## The images' Cource Code

If you wish to consult the Dockerfile from which those images are built, you can consult the Github repository with all the Dockerfiles from which the images built.

[https://github.com/FleekHQ/site-builder-docker-images](https://github.com/FleekHQ/site-builder-docker-images)

## Farewell!

We hope you enjoyed this tour through Fleek's Docker Hub! If you feel we are missing docker images or have suggestions, do not hesitate to contact us!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://slack.fleek.co/) our Community Chat
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) out our Tech Docs
* Contact us at support@fleek.co