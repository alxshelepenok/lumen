---
template: post
title: Getting Started on Fleek
slug: getting-started
draft: false
date: 2020-02-17T19:22:21.659+00:00
description: Get started deploying your first site on IPFS on Fleek
category: getting started
socialImage: https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/getting-started.png
tags:
- general
- getting started
- fleek

---
![](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/getting-started.png)

So you're ready to get started on Fleek? Well, let's get right into it. In this guide, we will walk through deploying a website to IPFS using Fleek. This guide is most helpful if you are already signed up for Fleek. If you haven’t already signed up you can [request early access](https://terminalbeta.typeform.com/to/kionHH).

Let’s get started by signing up for Fleek and deploying a website:

### 1. Add New Site

![Add New Site](./media/Add New Site.png "Add New Site")

### 2. Connect with GitHub

![Connect with GitHub](./media/Connect with GitHub.png "Connect with GitHub")

### 3. **Select the GitHub account where you want to install Fleek**

#### **(Where the repository for the website or application you plan to deploy is located)**

![Install Terminal](./media/Install Terminal.png "Install Terminal")

### 4. **Pick the repository you want to deploy**

![Repository to Deploy](./media/Choose Repo2.png "Repository to Deploy")

### **5**. **Fill in your build command and publish directory as described in your package.json**

#### (We will auto-populate the build command and directory if we find it)

![Unfilled Build Settings](./media/Deploy Settings.png "Unfilled Build Settings")

### **6**. **Deploy your Site!**

![Deploy Site](./media/Deploy Settings Click.png "Deploy Site")

While your site is deploying you’re redirected to monitor its progress with detailed logs during each step of the deployment.

![Deploy Progress](./media/Deploy In Progress2.png "Deploy Progress")

Once the site is deployed successfully, the site will be uploaded to IPFS and the IPFS hash will be mapped to a Fleek subdomain. You can click on the Fleek subdomain to preview your live site on IPFS!

![Success](./media/Deploy Complete.png "Success")

Now that you have deployed a performant website on IPFS, let's add or buy a domain to your site. There are three ways to add a domain to your site: You can add a subdomain, add a root domain, or purchase a new domain.

## Adding a Subdomain

### 1. **Click “Add or Buy Custom Domain” on the overview tab in the getting started, or go to the settings tab and navigate to the domain management section using the left navigation**

![Add 1](./media/Add Domain 1.png "Add 1")

![Add2](./media/Add Domain 1 Alt.png "Add2")

### **2. Type in your subdomain that is managed in an external DNS provider and click “Verify”**

![Verify](./media/Pick Domain Click.png "Verify")

### **3. Click “Yes, Add Domain” to verify this domain is owned by you**

![Yes](./media/Pick Domain Click Add.png "Yes")

### 4. Click on “Check DNS Configuration” next to your subdomain to see the instructions to add the CNAME record to your domain in your DNS provider.

![Check DNS](./media/Check DNS.png "Check DNS")

### 5. **Follow the instructions to add the CNAME record to your DNS provider. Once you’ve created a record in your DNS provider, click “Verify DNS Configuration” to check the propagation of the DNS to your site. If it fails please wait a few more minutes for the DNS to finish propagating and try again.**

![Verify DNS Config](./media/Verify DNS.png "Verify DNS Config")

### 6. **Your site has successfully propagated and received a free SSL certificate from Let’s Encrypt. You can see details about the SSL certificate below in your domain management settings.**

![Encrypted](./media/Cert.png "Encrypted")

## Adding a root domain

### 1. **Click “Add or Buy Custom Domain” on the overview tab in the getting started, or go to the settings tab and navigate to the domain management section using the left navigation**

![Add 1](./media/add domain1.png "Add 1")

![Add2](./media/add domain2.png "Add2")

### **2. Type in your root domain that is managed in an external DNS provider and click “Verify”**

![Verify](./media/Verify.png "Verify")

### **3. Click “Yes, Add Domain” to verify this domain is owned by you**

![Yes](./media/yes.png "Yes")

### 4. **The root domain and an additional www. Subdomain, to redirect to the root domain, will be added to your domain management settings. Click on “Check DNS Configuration” next to the root domain to see the instructions to add the A record to your domain in your DNS provider for the root domain. For the www. Subdomain configuration, follow step 4 through step 6 to get set up**

![Check DNS](./media/check dns.png "Check DNS")

### 5. **Follow the instructions to add the A record to your DNS provider. Once you’ve created a record in your DNS provider, click “Verify DNS Configuration” to check the propagation of the DNS to your site. If it fails please wait a few more minutes for the DNS to finish propagating and try again**

![Verify DNS Config](./media/dns.png "Verify DNS Config")

![Verify DNS Config 2](./media/dns2.png "Verify DNS Config 2")

### 6. **Your site has successfully propagated and received a free SSL certificate from Let’s Encrypt. You can see details about the SSL certificate below in your domain management settings.**

![Encrypted](./media/certroot.png "Encrypted")

* [Sign up](https://app.fleek.co) to try yourself
* Join our [Community Chat](https://slack.fleek.co/)
* Follow us on [Twitter](https://twitter.com/FleekHQ)
* Check out our [Tech Docs](https://docs.fleek.co/)
* Contact us at support@fleek.co