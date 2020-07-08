---
template: post
title: Release Updates - UI Rebrand, Teams, Zero Config Deployments, Framework Auto-detection, and more!
slug: Fleek-Release-Update-UI-Rebrand
draft: false
date: 2020-04-03T04:02:37.816Z
description: >-
  We underwent a full platform rebranding to Fleek! We've also released a bunch of exciting features, enhancements, and bug fixes that we will deep dive into this release update.
category: Announcement
socialImage: ./Release-Update-UI-rebrand.png
tags:
  - Announcement
  - Release Update
---

![](./Release-Update-UI-rebrand.png)

We underwent a full platform rebranding to Fleek! We've also released a bunch of exciting features, enhancements, and bug fixes that we will deep dive into this release update. Our team is very excited to share the latest:

## Features

### User Interface Rebrand
The entire interface has been restyled with a lighter look and feel, enhanced gradients, and a modernized color scheme. And the new Fleek logo is in!

![](./media/Rebrand-release/UserInterfaceRebrand.png)

### Teams
You can now collaborate, share, and ship with the rest of your team. Invite all your team members for access to the seamless deployment and DNS management experience. Manage your team members' invitations and access controls on the Members page. Teams are automatically created on the Pro Plan.

![](./media/Rebrand-release/Teams.png)

### Zero Config Deployment

Using a .fleek.json configuration file, placed at the root of a git repository, you can provide options that change the default build behavior and overrides settings in the User Interface. [Take a look](https://docs.fleek.co/hosting/build-configurations) at our tech docs .fleek.json config file section for an example and more details how to use it.

![](./media/Rebrand-release/DeploymentConfigFile.png)

### Framework Auto-detection 

Fleek reads your package.json, Fleek configuration file, or other deployment services config files (ex. Netlify's toml) to auto-fill your build settings for deployments. We detect the framework you're using auto-select the correct build settings you should use to deploy, whether its Gatsby, Hugo, Nextjs, etc. Of course, it's still completely customizable and you can even bring your own docker file. We've made your deployment experience as seamless as it can possibly be.

![](./media/Rebrand-release/frameworkDropdown.png)
![](./media/Rebrand-release/GatsbyPrefilledSettings.png)


## Enhancements

### Deployment Error Logs
We've made our error logs the best and most descriptive in the game. Now know exactly what went wrong when your deployment fails. 

![](./media/Rebrand-release/errorLogs.jpg)

### Deployment Speeds
We cut off build time from future deployments by caching docker images that have been used before from previous deployments.

## Bugs

### Auto-deployment Subscription
When you deploy to your git provider, your list of deploys in the Fleek UI will update immediately and without touching a button. We wanted to make sure the auto-deployments are fast and smooth experience.

### Validate Environment Variables
We're now ensuring that before you deploy if your environment variables are going to cause a deployment issue we show you the error message before you even try so you don't waste your time.

### Deployment Logs Loading 
We fixed up the UI and Log subscription to pull in the logs nice and smooth. You may have noticed before that the deployment logs container that displays the logs might glitch up and down a bit with fast incoming logs. Fixed!

## See the Updates Yourself

Thanks for reading our release updates. Now come [sign in](https://app.fleek.co) and check them out for yourself. We're already working on the next release to come!

* [Sign up](https://app.fleek.co) to try for yourself
* [Join](https://join.slack.com/t/fleek-public/shared_invite/zt-bxna7y1d-PbVdut4rgHt5jM6Zjg9g9A) our Community Chat
* [Follow](https://twitter.com/FleekHQ) us on Twitter
* [Read](https://docs.fleek.co/) out our Tech Docs
* Contact us at support@fleek.co 


