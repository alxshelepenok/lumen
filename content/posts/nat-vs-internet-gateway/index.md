---
title: "NAT vs Internet Gateway"
description: "What's the difference?"
date: "2020-04-29T21:20:00.000Z"
categories:
     - NAT
     - Internet Gateway
     - VPC
     - AWS
published: true # Update to True to publish
canonical_link: https://www.blog.muraliallada.com/NAT-vs-Internet-Gateway/
redirect_from:
---

Attaching an Internet Gateway to a VPC allows instances with public IPs to access the internet.

Attaching a NAT allows instances with no public IPs to access the internet.

This is the most important thing to keep in mind while choosing between an Internet Gateway and a NAT.