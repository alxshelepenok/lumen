---
title: "Why we chose Serverless architecture"
description: "Here are some basics you should know."
date: "2017-01-05T17:03:59.102Z"
timeToRead: 3
categories:
     - Serverless
published: true
canonical_link:
redirect_from:
  - /why-serverless-186de8451a4
---

Cloud computing is entering a new era. We are going to move away from a centralized model to an edge computing model and Serverless technologies will help with that shift. Peter Levine talks about this [here](http://a16z.com/2016/12/16/the-end-of-cloud-computing/). We are already seeing cloud services that enable this. Amazon recently released a service called [Greengrass](https://aws.amazon.com/greengrass/) that brings it’s Serverless computing platform to the edge.

If you’re new to Serverless computing, ignore the name. Yes, there is a server. Developers just don’t need to bother with choosing a server type and configuring it. Serverless is also called Function as a Service (FaaS), which I like better.

#### Pay for what you use. Literally.

Traditional compute models such as VM’s, Bare metal servers and even Containers have processes that run constantly and the user pays for the compute resource even when they are idle.

With FaaS, you are charged for only the amount of time your function runs. Here are some case studies of folks who have managed to cut costs significantly: [here](https://alestic.com/2016/12/aws-invoice-example/) and [here](https://blog.lodr.io/going-serverless-5x-faster-100x-cheaper-2b7db8c37405#.3fwag8gju).

#### Built-in Auto scaling.

Designing for auto scale is very hard. When I was working on [OpenStack Magnum](https://wiki.openstack.org/wiki/Magnum), one of our core goals was to implement auto scale as a feature. We soon realized that auto scaling is so hard, that we dropped it. Do you scale when an application is using too much RAM, too much CPU, or both or something else?

FaaS comes with auto scale built in. Your function is spawned AND destroyed for each request, so scaling is as simple as running a new instance of your function to handle a new request. The platform takes care of it and there’s nothing you need to do. I’m currently testing this behavior in [AWS Lambda](https://aws.amazon.com/lambda/) and will share those results in a new blog post.

#### No-Ops

No permanent infrastructure. Which means, you don’t need to choose a server type, size or operating system. No need to configure and manage your servers. No security patches to be applied. No permanent servers to protect against hackers. No need to mess with cloudinit. Everything is managed for you.

But wait, don’t fire your DevOps team yet. You still need to deploy and monitor your application. You need to choose the right cloud provider. You need to deploy to multiple regions. You need someone to help evaluate and choose the right 3rd party services for your application. This is where DevOps comes in. With years of experience managing applications, your DevOps team has a lot of experience on how to architect your application in the Serverless world. What you’ll get is better DevOps.

_Note: While working on the_ [_CloudLens_](https://www.ixiacom.com/cloudlens) _platform at my previous employer,_ [_Ixia_](https://www.ixiacom.com/)_, I saw this first hand. In late 2017, while a number of my peers at various companies were spending time upgrading their infrastructure to plug security issues related to Meltdown and S_pectre, we didn’t need to spend a minute doing any of that.

#### Microservice architecture.

A function is the unit of scale in a Serverless application. Prior to FaaS, an application (or service) was the smallest unit of scale. To scale, we had to deploy multiple instances of the application. Sure, we can architect an application into micro-services and Dockerize them and all that goodness, but as we all know, an applications architecture does not stay the same over the years. As we add new features, a micro-service gets larger and one day you find yourself deploying a container that is 800 MB in size.

FaaS forces you to create and deploy small functions that stay true to the micro-service architecture you started with.

#### Conclusion

AWS Lambda has improved considerably since its release in 2014. If you are transforming your monolithic application into micro-services based one, consider Serverless and skip containers all together.
