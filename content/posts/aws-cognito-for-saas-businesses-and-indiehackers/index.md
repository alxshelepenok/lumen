---
title: "AWS Cognito for SaaS businesses and IndieHackers"
description: "A quick start guide for IndieHackers."
date: "2019-07-21T05:51:37.293Z"
timeToRead: 3
categories:
     - Cognito
     - AWS
published: true
canonical_link:
redirect_from:
  - /aws-cognito-for-indiehackers-30c4bc50abb1
---

I recently launched a [service](http://dunr.app) to help SaaS businesses in Asia leverage SMS and WhatsApp to automate payment reminders and reduce customer churn. I use [AWS Cognito](https://aws.amazon.com/cognito/) for user registration and authentication.

AWS Cognito has 2 ways to manage users.

-   **User Pool **— _Allows developers to add sign-up and sign-in functionality to web and mobile applications. It serves as your own identity provider and maintains a user directory in your own AWS account._
-   **Identity Pool **— _Allows developers to use a third party identity service, such as facebook and google to add sign-up and sign-in functionality to web and mobile applications._

In this post, I’ll focus on user pools.

---

### Why Cognito?

Cognito is a fully manages service and doesn’t require any hosting or maintenance. User pool was introduced in 2016 and the service and it’s API’s are mature at this point.

Here’s a list of features you get right out of the box with just a bit of configuration.

-   First 50,000 user signups are free and [costs cents](https://aws.amazon.com/cognito/pricing/) per user after that.
-   Option to use a [hosted webpage](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html) for users to register and login. This allows you to add identity management to your website without having to design UI elements and flow for user Sign-up/Sign-In.
-   Support for using an email, phone number or a preferred specified username.
-   Automatically verify email addresses and phone numbers with a verification code.
-   Ability to add Authorization to API Gateway with a few lines of configuration.

Here’s a sample serverless framework file to help you get started: [Github Gist](https://gist.github.com/murali44/b543304957800364f7c66d4fdcfd6293)

---

### Custom Attributes

Cognito allows you to add up to 25 custom attributes to a user record. These don’t include the 17 standard attributes such as a username, email, timezone, address, etc.

This is useful for associating the user with special information such as an admin role, linking a child and parent account for single billing, a third party service id for federation, etc.

_Note: Once added, a custom attribute cannot be changed or deleted._

### Custom Authorizers

Custom authorizers are Lambda functions that are called _before_ your main function to authenticate and/or authorize that the caller may proceed to your core function.

Cognito userpool already provides a default authorizer to confirm if he user is registered and if the username and password match whats on record, so why do we need a custom authorizer?

You would use this when you need to perform custom validations such as the following

-   Checking to make sure the users subscription is still active in a third party billing system.
-   Talking to a licensing server hosted on prem.
-   Any validation that goes beyond just checking to make sure the username and password are correct.

### Cognito Triggers

Userpools triggers allow you to create custom workflows during user registration, authentication and token creation. There are currently [10 triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html). Some common use for triggers are:

-   Generate a custom message for users during email or phone number verification.
-   Migrate a user from one userpool to another.
-   Create custom authorizers.

---

Live Demo: [https://aws-cognito-demo.netlify.app](https://aws-cognito-demo.netlify.app)
