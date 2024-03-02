---
title: "Category: Title goes here"
description: "sub heading."
date: "2018-03-03T20:14:45.186Z"
categories:
     - DynamoDB
     - Replication
     - AWS
published: false # Update to True to publish
canonical_link:
redirect_from:
---

I recently implemented a serverless solution for replicating dynamoDB tables across regions. A number of people have asked me how I did this. I’m going to share the basic concepts here.

Just so you are aware, AWS has published a solution for cross region replication. However, it is not a serverless solution and requires either an EC2 instance or a container for it to work. You can read about it [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.CrossRegionRepl.html).

---

Here are the resources you need for a serverless solution.

-   **DynamoDB stream** configured on the source table.
-   A **second DynamoDB table** in a different region (or in the same region if you want to use this solution to keep an audit trail or transaction history)
-   **IAM role**. The lambda function needs permissions to read from the DynamoDB stream, write to the destination DynamoDB and to CloudWatch logs.
-   **Lambda function**. We’ll create a function that gets triggered by the DynamoDB stream and processes changed to the source table.

---

### DynamoDB stream

![](./asset-1.png)

I’ll use a sample ‘Employee’ table to demonstrate. The table has a unique ID and a Name column. I’ve create the table in the us-west-2 region.

![](./asset-2.png)

Under the ‘Overview’ tab, we’ll hit ‘Manage stream’ and select ‘New and old images’. This option passes in the before and after state of each row in the DynamoDB stream to the lambda function which processes Insert/Update/Delete operations on a row.

![](./asset-3.png)

We’ve now enabled the stream and we have an ARN to use in an IAM role.

### Destination table

![](./asset-4.png)

Next, I created a destination table in the us-east-1 region. Make sure the primary key name and type matches the source table.

### Lambda function

Next we’ll create a lambda function to process events from the DB stream.

First, let’s take a look at what an event from the stream looks like.

```
{
 u 'Records': [{
  u 'eventID': u '99b994xxxx75d4',
  u 'eventVersion': u '1.1',
  u 'dynamodb': {
   u 'OldImage': {
    u 'Id': {
     u 'N': u '1'
    },
    u 'Name': {
     u 'S': u 'Murali'
    }
   },
   u 'SequenceNumber': u '198xxxx840',
   u 'Keys': {
    u 'Id': {
     u 'N': u '1'
    }
   },
   u 'SizeBytes': 39,
   u 'NewImage': {
    u 'Id': {
     u 'N': u '1'
    },
    u 'Name': {
     u 'S': u 'Murali Allada'
    }
   },
   u 'ApproximateCreationDateTime': 1520105160.0,
   u 'StreamViewType': u 'NEW_AND_OLD_IMAGES'
  },
  u 'awsRegion': u 'us-west-2',
  u 'eventName': u 'MODIFY',
  u 'eventSourceARN': u 'arn:aws:dynamodb:us-west-2:9xxxxx4:table/Employee/stream/2018-03-03T18:49:02.807',
  u 'eventSource': u 'aws:dynamodb'
 }]
}
```

The event has 3 important elements. EventName, OldImage and NewImage element. Depending on the operation on the source table, the event could have either one or both of OldImage and NewImage. In the above example, we can see that the EventName is Modify and we have both the old and new image.

The python code below handles these events and writes to the destination table.

```
from __future__ import print_function

import boto3
import json
from boto3.dynamodb.types import TypeDeserializer

serializer = TypeDeserializer()

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('EmployeeReplica')

def lambda_handler(event, context):
    print(event)
    for record in event['Records']:
        if record['eventName'] == 'MODIFY':
            print(deserialize(record['dynamodb']['NewImage']))
            table.put_item(Item=deserialize(record['dynamodb']['NewImage']))
        if record['eventName'] == 'INSERT':
            print(deserialize(record['dynamodb']['NewImage']))
            table.put_item(Item=deserialize(record['dynamodb']['NewImage']))
        if record['eventName'] == 'REMOVE':
            table.delete_item(Key=deserialize(record['dynamodb']['Keys']))
            print(record)
            
    return 'Successfully processed {} records.'.format(len(event['Records']))

def deserialize(data):
    if isinstance(data, list):
       return [deserialize(v) for v in data]

if isinstance(data, dict):
        try: 
            return serializer.deserialize(data)
        except TypeError:
            return { k : deserialize(v) for k, v in data.iteritems() }
    else:
        return data
```

I’ve included a handler method to process an event and a ‘deserialize’ method to strip away the element type info from the event.

### IAM Role

Next we’ll create an IAM role with permissions to access the DynamoDB stream, the destination table and to invoke the lambda function we created above. We’ll also add the ARN’s of the stream, source table, destination table and the lambda function to the role so the permissions are limited to just these resources.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:CreateLogStream"
            ],
            "Resource": [
                "arn:aws:logs:us-east-2:xxx:log-group:/aws/lambda/DynamoReplicator-dev-dynamoReplicator:*"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-2:xxx:log-group:/aws/lambda/DynamoReplicator-dev-dynamoReplicator:*:*"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "logs:CreateLogGroup",
                "lambda:InvokeFunction",
                "dynamodb:DeleteItem",
                "dynamodb:UpdateItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:ListStreams"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-east-2:xxx:table/Employee",
                "arn:aws:dynamodb:us-east-2:xxx:table/Employee/stream/2018-03-07T01:14:01.774",
                "arn:aws:dynamodb:us-east-1:xxx:table/EmployeeReplica"
            ],
            "Effect": "Allow"
        },
        {
            "Action": [
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:DescribeStream",
                "dynamodb:ListStreams"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-east-2:xxx:table/Employee/stream/2018-03-07T01:14:01.774"
            ],
            "Effect": "Allow"
        }
    ]
}
```

#### Hooking it all up

![](./asset-5.png)

Assign the IAM role to the lambda function and add a DynamoDB trigger to the lambda function.

![](./asset-6.png)

The default batch size and starting position should work in most cases. If you are trying to replicate a large existing table, you should first replicate all existing data using a service like data pipes.

![](./asset-7.png)

Add an item to the source table.

![](./asset-8.png)

You should see it in the destination table in near real time.
