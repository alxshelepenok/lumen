---
title: "Lambda duplicate invocations"
description: "How to handle duplicate Lambda invocations."
date: "2020-07-20"
categories:
- AWS
- Serverless
- AWS Lambda
published: true
canonical_link: https://www.blog.muraliallada.com/lambda-duplicate-invocations/
redirect_from:
---

Async event sources that trigger a Lambda function guarantee it's execution **_at least once_**. Not, exactly once, but **_at least once_**. Considering that all Serverless application's need to leverage an Async service (eg. SNS, CloudWatch events, etc) in some form, this is a big deal. Developers have sometimes seen duplicate invocations as late as [10 minutes](https://stackoverflow.com/questions/43786225/s3-lambda-trigger-double-invocation-after-exactly-10-minutes) after the initial event.

I talk to a lot of first time Lambda users who are completely unaware of this.

Not designing your Lambda to handle duplicate invocations, could lead to disastrous consequences and mysterious behavior that will keep you scratching your head.

#### How to identify a duplicate invocation?

Most Async sources include an unique identifier in the event

- API Gateway: requestContext.requestId
- CloudWatch Event: id
- Kinesis: Records[].eventID
- SNS: Records[].Sns.MessageId
- SQS: Records[].messageId

Before processing an event, a Lambda function needs to check if an event with this ID was received earlier.

#### How should you track the request id's?

DynamoDB is the perfect service for keeping track of these unique id's and rejecting duplicate events.
- A look up does not add a lot of latency to the Lambda. Typical latencies are in the range 10ms or lower.
- The time-to-live feature auto deletes records after a set time.
- DynamoDB is cheap to use. It could even be free depending upon how much you use DynamoDB.

#### What does the implementation look like?

- Use a DynamoDB table with a primary key made up of the Lambda/operation name + the request identifier

    Example: ```RenewSubscription#1234-4567-xxxx-9876```

- Configure the table with a TTL attribute. You'll use this attribute to set a time in the future when the Item will be deleted, based on the event source (Ex: Message retentions period for SQS or 15 minutes for API Gateway).

- The lambda will check the DynamoDB table for duplicates and discards the event if one is found.

For an example of this implementation see: [https://github.com/murali44/lambda-duplicate-invocation-handler](https://github.com/murali44/lambda-duplicate-invocation-handler)
