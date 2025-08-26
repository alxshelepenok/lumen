---
title: Load and Execute for the SharePoint Client Object Model
date: "2013-02-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/load-and-execute-for-the-sharepoint-20102013-client-object-model"
category: "programming"
tags:
  - "sharepoint"
  - "csom"
description: "Save on line of code in CSOM"
socialImage: "./image.jpg"
---

Since I am very lazy programmer I always think about shortening things a little bit.

Instead of writing...

```csharp
Microsoft.SharePoint.Client.Web appWeb = siteContext.Web;
siteContext.Load(appWeb);
siteContext.ExecuteQuery();
```

... its worth having a look on the signature of the ```Load``` method:

```csharp
public void Load<T>(T clientObject, params Expression<Func<T, object>>[] retrievals) where T : ClientObject;
```

It turns out that I can save one line of code every time by declaring an extension method like...

```csharp
public static void LoadAndExecute<T>(
  this Microsoft.SharePoint.Client.ClientContext me,
  T clientObject,
  params System.Linq.Expressions.Expression<Func<T, object>>[] retrievals) 
         where T : Microsoft.SharePoint.Client.ClientObject
  {
    me.Load(clientObject, retrievals);
    me.ExecuteQuery();
  }
```

which simplifies the above code to:

```csharp
Microsoft.SharePoint.Client.Web appWeb = siteContext.Web;
siteContext.LoadAndExecute(appWeb);
```

One line saved...