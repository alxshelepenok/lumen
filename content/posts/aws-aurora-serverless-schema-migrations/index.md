---

title: "Aurora Serverless: Schema migrations."
description: "How to run migrations at deployment time."
date: "2020-05-08T17:53:45.186Z"
categories:
- RDS
- Aurora Serverless
- AWS
published: true
canonical_link: https://www.blog.muraliallada.com/aws-aurora-serverless-schema-migrations/
redirect_from:
---


Q: How do you run schema migrations in a serverless environment on AWS?

A: Use Cloudformation custom resources.

Cloudformation custom resources allow you to trigger a Lambda function at stack deployment time. For a primer on custom resources, check out this [blog](https://www.alexdebrie.com/posts/cloudformation-custom-resources/) by Alex Debrie.

Here's what you need

- A Lambda function to run the schema migration scripts against the RDS database.
- A Cloudformation custom resource to trigger the Lambda function at deployment time.

Because the schema migration is executed in a lambda function, you can use all the exiting ORM libraries you are familiar with, such as SQLAlchemy and Alembic for Python.

Check out this repo for a working example: https://github.com/murali44/RDS-Aurora-Serverless