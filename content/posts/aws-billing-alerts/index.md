---
title: "Monitor your AWS bill with alerts."
description: "Create AWS billing alerts with the Serverless framework."
date: "2020-01-24T05:51:37.293Z"
timeToRead: 3
categories:
     - Billing
     - AWS
     - Budget
     - Alerts
published: true
canonical_link:
redirect_from:
---

I've worked with a number of clients using AWS and I'm always surprised by the number of companies that don't have billing alerts enabled. One of the first things you want to do when you start using an AWS account, is create billing alerts.

AWS lets you plan service usage and costs, and get alerts when you cross a threshold (percentage) of a configured budget.

You can configure a budget manually by navigating to `My Billing Dashboard` > `Budgets`, or use a CloudFormation template such as the one below.

```
resources:
  Description: "Set billing/budget alerts for the AWS account."
  Resources:
    MonthlyBudget:
      Type: "AWS::Budgets::Budget"
      Properties:
        Budget:
          BudgetName: Monthly
          BudgetType: COST
          TimeUnit: MONTHLY
          BudgetLimit:
            Amount: 100
            Unit: USD
        NotificationsWithSubscribers:
          - Notification:
              NotificationType: ACTUAL
              ComparisonOperator: GREATER_THAN
              Threshold: 80 # 1st alert sent when % of Monthly total is spent.
            Subscribers:
              - SubscriptionType: EMAIL
                Address: email@example.com
          - Notification:
              NotificationType: ACTUAL
              ComparisonOperator: GREATER_THAN
              Threshold: 95 # 2nd alert sent when % of Monthly total is spent.
            Subscribers:
            - SubscriptionType: EMAIL
              Address: email@example.com
```

Here's a link to a Serverless framework project to do the same.

[https://github.com/murali44/AWSAccountBillingAlerts](https://github.com/murali44/AWSAccountBillingAlerts)

The first 2 budgets are free. Any budget beyond that costs $7.30 per year. See [here](https://aws.amazon.com/aws-cost-management/pricing/) for details.