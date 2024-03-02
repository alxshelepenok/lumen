---

title: "A simple AWS resource naming strategy"
description: "How to name resources when sharing an AWS account"
date: "2020-07-04T14:38:00.000Z"
categories:
- AWS
- Serverless
published: true
canonical_link: https://www.blog.muraliallada.com/aws-resource-naming/
redirect_from:
---

I've found the best way to name AWS resources is to use the following convention.

```{stage-name}-{stack-name}-{resource-name}```

This approach tells us 3 things just by looking at the resource name.

1. Who deployed the resources.
2. The cloudformation stack the resource belongs to.
3. Finally, the resource name itself.

![AWS Resource naming](./images/AWSResourceNaming2.png)

#### How do you do this with the Serverless Framework?

```
service: Billing
Description: The billing service.

custom:
  stage: ${opt:stage, self:provider.stage}
  resourcePrefix: ${self:custom.stage}-${self:service.name}

provider:
  stage: dev

functions:
  ProcessPaymentNotification:
    name: ${self:custom.resourcePrefix}-ProcessPaymentNotification

resources:
	Resources:
  		PaymentsTable:
    		Type: AWS::DynamoDB::Table
    		Properties:
      		TableName: ${self:custom.resourcePrefix}-Payments
```

#### Why not use Tags?

This naming convention is not a replacement for Tags. Tags are useful in many other ways.

It helps small teams that are sharing an AWS account identify and search resources easily. Creating separate AWS accounts, setting up federated billing and using AWS Control Tower can be a complicated solution for small teams. Many team's end up using a single account for this reason. This naming convention is useful in such cases.