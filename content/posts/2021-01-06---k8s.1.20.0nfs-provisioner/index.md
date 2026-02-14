---
title: Kubernetes Version 1.20.0 breaks nfs provisioner
date: "2021-01-06T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/k8s-1.20-breaks-nfs-client-provisioner"
category: "kubernetes"
tags:
  - "kubernetes"
  - "deployment"
  - "storage"
  - "rpi"
description: "K3S version 1.20.0 breaks the nfs-subdir-external-provisioner with `unexpected error getting claim reference: selfLink was empty, can't make reference`"
socialImage: "./image.jpg"
---

Kubernetes version 1.20.0 breaks the nfs-subdir-external-provisioner.

The PersistentVolumeClaim stays in status "Pending":

```bash
$ k get pvc
NAME         STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS          AGE
test-claim   Pending                                      managed-nfs-storage   10h
```
The pod logs of client provisioner contains:

> unexpected error getting claim reference: selfLink was empty, can't make reference

```bash
$ kubectl logs nfs-client-provisioner
E0106 06:18:07.328905       1 controller.go:1004] provision "default/test-claim" class "managed-nfs-storage": unexpected error getting claim reference: selfLink was empty, can't make reference
```

```bash
unexpected error getting claim reference: selfLink was empty, can't make reference
```

The deprecation of selfLinks in Kubernetes 1.20.0 is responsible for this.

As noted by [nealman13](https://github.com/nealman13) in his [github comment](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner/issues/25#issuecomment-742616668) setting the feature gate `RemoveSelfLink` to `false` is a workaround for this problem.

But Rancher K3S doesn't come with a `kube-apiserver.yaml` file. But feature gates can be passed as commandline arguments directly to the service.

For a fresh install of K3S the following commandline can be used:

```bash
$ curl -sfL https://get.k3s.io | sh -s - --kube-apiserver-arg "feature-gates=RemoveSelfLink=false"
```

An existing installation can be adjusted by changing the service directly:

```bash
$ nano /etc/systemd/system/k3s.service
... 
ExecStart=/usr/local/bin/k3s \
    server \
        '--kube-apiserver-arg' \
        'feature-gates=RemoveSelfLink=false' \
...
```
