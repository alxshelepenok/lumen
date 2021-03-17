---
template: post
draft: false
title: Hosting Static Webflow Sites on Fleek (No CMS)
slug: hosting-static-webflow-sites-on-fleek
date: 2021-03-17T03:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/WEBFLOW.png
canonical: ''
description: Learn on this guide how to export your sites from Webflow and, with a
  little Python magic, take them live to the Open Web with Fleek.
category: Tutorial
tags:
- Hosting
- Webflow

---
![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/WEBFLOW.png)

[Webflow’s](https://webflow.com/) site builder is an amazing tool for quickly setting up a new site, both at a no-code beginner level and at an advanced hands-on one. But what if you want to build your site from scratch with this tool, and then **host it on the Open Web** on IPFS or the Internet Computer with Fleek?

You can! **This guide is focused on static-sites only,** meaning sites that don’t use Webflow’s CMS/Collection or E-Commerce features. There are some details in Webflow’s export that result in this limitation which we will detail below.

But, as for static sites, nothing that we can’t solve with a GitHub repo and a little Python magic.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/magic.gif)

## Understanding Webflow's Export

Webflow is its very own proprietary framework and is -without a doubt- built to be used in Webflow’s hosting/cms platform mostly.

What we mean by this is that **many of Webflow’s native features** (forms, CMS, etc.) are built-in to the framework and powered by Webflow itself, so when you try to export those to a different platform, they just won’t work.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/export.png)

Ok it might not actually be that tragic. But there are a couple hurdles to jump here. First off, **Webflow’s CMS content** is not exactly supported as a static export. When you export a site from Webflow [(here’s how to do it)](https://university.webflow.com/lesson/code-export) you will receive a payload with your site’s HTML, JS, CSS, and assets.

**What’s not included on export?** Collection, or CMS content, Ecommerce functionalities, Webflow’s forms, site search, and Webflow-native captchas. Those are all Webflow-native features that require you to host/build your site on their platform.

Secondly, if you were to host a site directly after export **you would get .html** urls on your final site. Not ideal, and a quick fix we’ll address later, together with **CSS/style** breaks that come after.

### The Alternative for Webflow CMS Sites

Have a Webflow site using the CMS and want to still give it a try? CMS/Collection content (like your blog articles) **can be exported separately** but in .csv format, which does not automatically translate to something buildable or digestible by common frameworks.

**For users who want to use Webflow’s CMS/Collection features,** we recommend you look at [**Udesly’s adapter**](https://www.udesly.com/) tool, which can process the .csv files and convert your templates into Fleek-friendly ones, like Wordpress.

You can then follow your traditional guide on how to deploy [Wordpress on Fleek](https://blog.fleek.co/posts/wordpress+fleek). But, we do want to point out that it’s not the most convenient or time efficient flow (especially if you post articles often!) and the reason why this guide focuses on non-cms static sites.

## Hosting a Static Webflow Site on Fleek

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/webflow.png)

Let’s get started. What will we be doing, in a nutshell? You will export your site from Webflow, create/fork a GitHub repository with a Python script that will transform your site on build to be Fleek-ready, and connect that repository to Fleek to push it live!

First things first, you must have a [Webflow ](https://webflow.com/)website/project ready to go on your website. We’ll use [Space](http://space.storage/) as an example for this guide (built on Webflow!).

### First, Export Your Site From Webflow

Hop into your site’s editor, **and click on the Export Code button** on the top right of the editor. A window will begin to prepare your zip with your static site’s HTML, CSS, JS, and assets for downloading.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/export.gif)

Once downloaded, extract the package in a folder to keep things tidy and orderly, and you will now have an exported set of assets that looks a little something like this:

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/folder.png)

Here you have **a CSS folder** containing Webflow’s exported CSS styles, an **images folder** with all assets used when building the site, a **JS folder** with all the JavaScript you used in Webflow, and **individual static HTMLs** for all the pages of your sites, as well as an index for the homepage.

Make sure you clean up any unused pages (like blog templates) from your folder/export to ensure your repository looks as clean as possible and you cut off any unnecessary weight.

### Second, Create a Repo With the Python Script

Looking good? If you were to host this directly on Fleek, you would get **yourpage.html urls for all pages** but the homepage; something that we will fix beforehand by preparing a **repository with a simple Python script** that handles all the work we need to host this on Fleek with clean urls and properly referenced stylesheets/assets.

Don’t worry, we already have a [**repository that you can fork,**](https://github.com/FleekHQ/webflow-example) **with Space’s Webflow site as an example, and the configurable Python script.**

That way you just need to fork, replace the sample site with yours, and configure the script which will handle all the work, taking your Webflow exported site, and transform it into a Fleek-ready one during build.

**Visit the** [**GitHub repo**](https://github.com/FleekHQ/webflow-example) **here and fork it!** You will see that it has the following files, and a set of instructions:

1. A source (src) folder.
2. A fleek.json file
3. A build.py script
4. A config.json file

### Third, Copy Your Webflow Files into the SRC Folder

The **SRC** folder is the directory where you will place your site’s exported files after extracting the ZIP. They go **as is** no modification needed. See the current Space files in the folder as a reference.

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/repo.png)

### Fourth, Configure the Python Script for Your Site

The **fleek.json file** includes a set of instructions for the Fleek platform; while the **build.py is the script** **itself** that will make all the work of reorganizing your site’s folder structure and transforming the Webflow content to properly reference CSS/Assets/JS in their new Fleek-ready structure.

Those don’t require tweaking and are ready to go. **You only need to configure the config.json file,** which has the instructions for the Python script to carry out the proper transforms to your site’s directory architecture and links.

The script transforms Webflow’s folder structure (all pages share the same directory) into a new one where each page has its own subfolder for its html file, while the homepage’s index.html resides at root. A similar arrangement to what you can see in [Fleek’s static site](https://github.com/FleekHQ/fleek-home/tree/master/Public).

The [script](https://github.com/FleekHQ/space-webflow-homepage/blob/master/config.json) does four main tasks, let’s see them step by step and review what you need to configure on each step for your site:

**1) Set the project’s source path, build path, and root file name.**

Here you don’t need to modify anything, as it is universal to all Webflow exported sites.

    {
      "project": {
        "src_path": "src",
        "build_path": "dist",
        "root_file_name": "index.html"
      },

**2) Enter link replacements for each page’s new subdirectory.**

Then, the script will carry out link replacements for **each of your website’s pages.** In this step, you specify the page’s old old directory format (no subfolders), and replaces it with the new format (subfolders).

**You need to set up instructions for each page**. You can see that there’s a separate entry under “link_replacements” for each page on the Space site, including the index (homepage).

For each of your pages, you need to specify the target old directory format to be replaced (no subfolder, just page.html) `"target": "\\"**yourpage**.html\\""` and tell the script to replace it with the new format (subfolder): `"replace_by": "\\"/yourpage\\""`.

    "links_replacements": [
        {
          "target": "\"developers.html\"",
          "replace_by": "\"/developers\""
        },

**3) Set up file link replacements for CSS/JS/Assets**

Next, the script takes all link references to your CSS/JS/Images folders and reworks them to the new structure, **this part of the script you don’t need to touch as it is a universal format for all Webflow exports.**

     "file_links_replacement": [
        {
          "target": "\"css/",
          "replace_by": "\"../css/"
        },
        {
          "target": "images/",
          "replace_by": "../images/"
        },
        {
          "target": "\"js/",
          "replace_by": "\"../js/"
        }
      ],

**4) Transform each page and create the new directory.**

The final piece of the script takes all past work and applies it to each of your pages, where you state if they are to be moved to a subfolder, have their links and have their file links replaced (css/js/images).

     "transforms": [
        {
          "name": "developers",
          "filepath": "developers.html",
          "move_to_subfolder": true,
          "apply_links_replacements": true,
          "apply_file_links_replacements": true
        },

You will need to set entries **for all your Webflow’s pages,** using the appropriate name and filepath. For **all pages that are not the homepage** you must set all booleans, including move to subfolder**, to true**.

For your Homepage’s html (index.html) you only have to change that setting **(move to subfolder) to false**. Other settings in the config remain the same.

        {
          "name": "index",
          "filepath": "index.html",
          "move_to_subfolder": false,
          "apply_links_replacements": true,
          "apply_file_links_replacements": false
        },

### Finally, Link the Repo to Fleek, and Push it Live!

Once your config.json file is set, you can go back to [Fleek ](http://fleek.co/)and follow the usual flow for hosting a website on [IPFS ](https://docs.fleek.co/hosting/overview/)or the [Internet Computer](https://docs.fleek.co/internet-computer-hosting/overview/).

1. Link Your GitHub
2. Select Your Webflow repository
3. Enter build Settings
4. Deploy!

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/host.gif)

**What build settings do you need?**

For this custom deployment we’re making with Webflow we need to input a **docker image** with the valid Python version used for the script (currently python:3.8-alpine), the **build command** that executes the Python script during build (python build.py) and the **publish directory** we set (dist).

![](https://storageapi.fleek.co/fleek-team-bucket/Blog%20Inline/build%20settings.png)

Hit deploy, and the script you configured in your repo will work its magic on the Webflow export in the src folder. You can see in the logs as each page is transformed (and see if you missed configuring any of them).

![](https://storageapi.fleek.co/fleek-team-bucket/Blog Inline/logs.png)

Once completed, you’ll be live with your static Webflow site on Fleek! 🎉

## Future Deployments

Once you set up the script, it’s good to go and won’t need changes unless you add new pages. For future updates, your deployment flow will be:

1. Make changes on Webflow
2. Re-export your site’s ZIP
3. Extract the ZIP
4. Replace the content in the repo’s SRC directory with the new one
5. Push changes to the repository.

Fleek will automatically detect the new push and re-run the script on your site, and rebuild it in a couple seconds.

**The only moment where you would need to reconfigure the script** is if you add new pages to your Webflow website, which you would need to specify in the “Link Replacements” and “Transform” sections of the config.json for the script. Else they won’t be processed and will be ignored on the build.

If you have issues with the build, need a hand to adapt your site to the script, or see a cool way to improve this workflow, remember that you can always hop in on our Community Slack below and the team we’ll give you a helping hand and hear out all ideas 🔥🔥

* [Sign up](https://app.fleek.co/) to try Fleek
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Subscribe to our [Youtube channel](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co