---
template: post
draft: false
title: 'Fleek Network: Node Health Check guide'
slug: fleek-network-node-health-check-guide
date: 2023-01-04T23:00:00Z
canonical: ''
socialImage: https://storageapi.fleek.one/fleek-team-bucket/fleek-network-node-health-check-guide.png?202301041235
description: The purpose of the guide is to provide basic information about the node resource by explaining the host, port numbers, logs during runtime, etc for the Fleek Network.
category: Tutorial
tags:
- DCDN
- Guide
- Getting Started
- Fleek Network
- health checks

---

![](https://storageapi.fleek.one/fleek-team-bucket/fleek-network-node-health-check-guide.png?202301041235)

## Introduction

In Software development, a health check means checking the health status of a resource to determine whether the resource is operating correctly.

The purpose of the guide is to provide basic information about the node resource by explaining the host, port numbers, logs during runtime, etc for Fleek Network.

You should have followed our [getting started guide](#fleek-network-getting-started-guide) and have the Ursa CLI installed in the machine terminal you're accessing to follow along.

We'll give you a basic introduction to the topic, but you should also appreciate the fact that development is ongoing, and other factors, such as the introduction of features that may cause malfunction of a node beyond what a simple health check can hint about the network.

For any unexpected behavior, we appreciate the contribution of the community by any means which includes reporting to our [Discord](https://discord.gg/fleekxyz), opening a [PR](https://github.com/fleek-network), reporting issues in our [Github repository](https://github.com/fleek-network/ursa/issues), etc.

## Topics
  - [What's a node health check?](#whats-a-node-health-check)
  - [Resource monitoring](#resource-monitoring)
    - [Log messages](#log-messages)
    - [Processes](#processes)
    - [Host](#host)
    - [Ports](#ports)
  - [How to do a check-up?](#how-to-do-a-check-up)
  - [Conclusion](#conclusion)

## What's a node health check?

A Node health check is exactly what it sounds like, a way of checking the health status of a Fleek Network node!

A Node operator can do a health check (as it's common among system operators worth their title) to get feedback and see if the resource is working! It's a good practice for a Node operator to do it frequently, as otherwise there'd be no way of knowing whether or not the Node is running. For example, some advanced operators automate this process by using cronjobs and getting reports via email, etc.

Health checks are valuable and a must for all the Node operators, as they are incentivized to participate in the network by making their resources available which the reward mechanism evaluates.

Rewards are only a given for good behavior and thus an unhealthy Node, or bad management can cause disappointment. A decentralized and permissionless network, which is beyond anyone's control (us included) requires some education by the users.

A system can be highly customizable and understanding some basics can help you achieve success as a node operator, resource health checking is important! There are many reasons why'd want to learn how to operate, such as the "how to do node health checks" we instruct here.

Fleek Network depends on the Node operator's success, thus we try to keep things simple and try to motivate you to learn for the network's overall health! That's what a Node health check is about, your contribution!

## Resource monitoring

The Fleek Network Node is initialized by running the `Ursa CLI` which creates a process in the operating system, this process responds to requests over an inter-communication mechanism we denominate as the Fleek Network - Fleek's DCDN (Decentralized Content Delivery Network). 

We can call the Fleek Network Node a service, meaning that the Node is a sort of application that runs as a service on a server, or in the practical sense, the `Ursa CLI` initializes a Node as a client version used to access the main service provider, the Fleek Network, composed by any number of these Nodes!

As Fleek Network is used by getting and serving content, the Node responds as a resource in the system, thus providing a certain level of detail to the end-user, for our guide use case, the Node operator. Running Nodes write to the stdout (standard output stream) well-defined log messages, some more human-friendly than others.

[Log messages](#log-messages) are well formatted, with an identifier describing the type: Warning, Error, etc.

As `Ursa CLI` is in constant development, at the current development stage the output from the Node should be super verbose.

This is to help the development team get feedback. You might see `logs` of the types: Debug, Trace, etc; which for a non-developer human, can cause the feeling of reading the most dreadful poetry in literature, as it'd only spark joy to help troubleshoot or make development decisions. As in any book title and book content, feel free to ignore it but don't judge the book by its cover!

### Processes

We recommend running the Stack (for docker-compose users), which provides a proxy, HTTPS, monitoring and analytics capability to your server that is running the Node. You can find instructions on how to run the `Stack` [here](#fleek-network-running-a-node-in-a-docker-container)!

💡 The `Ursa` Node can run on its own without any of the dependencies suggested in the `Stack`, but we'll use the `Stack` to describe a common use-case scenario or some of the common practices you'd find among Node operator and system administrators setups. You can customize and monitor `Ursa` Node on your own, if you prefer, you can then skip to [ports](#ports).

The Stack has the following services:
  - Node - we call `Ursa` the living process that we refer to as Node, this is started via the `Ursa CLI` (`ports 4069, 6009, 8070`)
  - Reverse proxy - we use `NGINX` as a reverse proxy for `Ursa` Node service where we have configured the public port 80, SSL certification, a server name, etc. The port 80 maps to the `4069` internally, as to provide a secure connection over HTTP
  - Process monitoring - a monitoring system for real-time metrics with a web client (`port 9090`) that exposes metrics of the reverse proxy (`port 9113`) and the actual Node metrics (`port 4069`)
  - Metric visualization - for visualizing metrics, logs, and traces collected from the `Ursa` Node we have Grafana (`port 3000`)

The `Stack` is our recommendation but we only provide support for `Ursa CLI`. Thus, support for `Grafana`, `Prometheus` or `Nginx` is on the operator side.

### Log messages

Log messages are well formatted and have an associated type, as described in the [processes](#processes).

- ERROR - The `error` designates very serious errors.
- WARN - The `warning` designates hazardous situations.
- INFO - The `info` designates useful information.
- DEBUG - The `debug` designates lower-priority information.
- TRACE - The `trace` designates very low-priority, often extremely verbose, information.

Depending on development time, some Log message types might be present in your output that offer very low-priority information but that can be of good use for the development team, e.g. the `debug` and `trace` are good examples. 

🙏 We understand this can be quite intimidating at the time, but expect to reduce the verbosity of the output as soon as possible!

Here's an example, yours might differ a bit:

```sh
2022-11-23T20:23:09.440690Z  INFO ursa_rpc_client: Using JSON-RPC v2 HTTP URL: <http://0.0.0.0:4069/rpc/v0>
2022-11-23T20:23:09.441011Z  INFO surf::middleware::logger::native: sending request
2022-11-23T20:23:09.451132Z  INFO surf::middleware::logger::native: request completed
2022-11-23T20:23:09.451216Z  INFO ursa::ursa::rpc_commands: Put car file done: "bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei"
ursa_1           | DEBUG libp2p_gossipsub::behaviour Starting heartbeat
ursa_1           | DEBUG libp2p_gossipsub::behaviour HEARTBEAT: Mesh low. Topic: /ursa/global Contains: 0 needs: 4
ursa_1           | DEBUG libp2p_gossipsub::behaviour RANDOM PEERS: Got 0 peers
ursa_1           | TRACE hyper::proto::h1::encode sized write, len = 17809
ursa_1           | TRACE hyper::proto::h1::io buffer.queue, self.len=120, buf.len=17809
```

Where also,

```sh
nginx_1          | 172.19.0.3 - - [06/Jan/2023:18:29:38 +0000] "GET /stub_status HTTP/1.1" 200 99 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:18:29:43 +0000] "GET /stub_status HTTP/1.1" 200 99 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:18:29:48 +0000] "GET /stub_status HTTP/1.1" 200 99 "-" "Go-http-client/1.1" "-"
grafana_1        | logger=cleanup t=2023-01-06T18:29:51.663801631Z level=info msg="Completed cleanup jobs" duration=16.523158ms
nginx_1          | 172.19.0.3 - - [06/Jan/2023:18:29:53 +0000] "GET /stub_status HTTP/1.1" 200 99 "-" "Go-http-client/1.1" "-"
```

### Host

When Ursa Node is initialized, the address which is bound to is the `0.0.0.0`, meaning that the service is listening to all the host-configured network interfaces, such as `127.0.0.1`.

Any traffic sent to an addressable interface that hits the correct endpoint or port number should have a response by the Node. Of course, bear in mind that your system should not have any form of firewall or blockers configured!

### Ports

A Fleek Network Node, or the process we refer to as Node has bound to `0.0.0.0` and has a port exposed to the host, port 6009 and in the Stack's network, port 4069.

Below, we explain what these are used for:

- Port `4069` (TCP), used for HTTP RPC, RPC, REST and metrics
- Port `6009` (TCP/UDP), used by the P2P protocol running in the network

💡 To communicate, the Node uses TCP and UDP (retransmission of lost data packets is only possible with TCP, for example, when we download a file from the internet through our browsers we expect a complete file, no bits should be missing, TCP ensures that the data is received correctly, data is not missing and is in order).

As described in the [processes](#processes), the ports should be available in the host for other services to operate! Make sure you don't have blockers, such as Firewall, or forget to expose them in Docker or on your custom setup! Open up your firewall, and if needed do a port-forward if docker doesn't do that for you.

⚠️ Remember, the Node won't be able to respond if the ports are blocked. This might be quite difficult to troubleshoot, so make sure you have control over your system permissions to guarantee a successful node operation.

## How to do a check-up?

You should have completed the topics above to understand what and why the endpoints are available. We expect you to know, that the system should not have a firewall or any blockers on the required ports in either Docker or other custom setups. If you ignore this, your Node will malfunction and cause disappointment. Fleek Network is decentralized and permissionless, it's your responsibility to fully understand the basics, at the very least, to have a Node running successfully! The guides are your friends!

We're going to use [cURL](https://curl.se/), make sure that you have it installed otherwise install it in your operating system.

In any case, you should have the Node running to be able to follow the steps. We'll use the Docker Container version but if you have a custom setup in a server or host you'll be able to follow.

For the ones who followed the [getting started guide](#fleek-network-getting-started-guide), the following request should be familiar.

We execute a `cURL` request with the `--head` or `-I` flag to show the document info only, in our case the headers of our HTTP response.

```sh
curl 127.0.0.1/ping
```

The response should be:

```sh
pong
```

You can also check the headers of the response:

```sh
curl -I 127.0.0.1/ping
```

Which response is:

```sh
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Fri, 06 Jan 2023 20:07:16 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 4
Connection: keep-alive
content-type: application/vnd.ipld.raw
content-type: application/vnd.ipld.car
content-type: application/octet-stream
cache-control: public,max-age=31536000,immutable
X-Proxy-Cache: HIT
```

We can do the same for other ports, and you'll notice different responses where for port `6009`, get an empty reply from the server because it works over a different protocol which is not HTTP/S, as described [above](#ports):

```sh
curl: (52) Empty reply from server
```

⚠️ A curl (52) usually means *something* accepted the TCP connection but just closed it. For our use case, we can take this as something running in port `6009`. Although, there are more appropriate ways to check this in particular. In comparison, the port `4069` is used for HTTP RPC, REST, and metrics, which operate via HTTP, as such a Http Header is expected but not for `6009`.

You can determine failure when you make a `cURL` request which fails:

```sh
curl: (7) Failed to connect to 127.0.0.1 port 80: Connection refused
curl: (7) Failed to connect to 127.0.0.1 port 6009: Connection refused
```

If you're running the `Stack` (docker-compose), then a service like `Prometheus` (`port 9090`) or `Grafana` (`port 3000`) could also be checked!

As an example, since `Prometheus` provides a dashboard you can expect some HTML in the response:

```sh
curl -I 127.0.0.1:9090
```

Response is:

```sh
HTTP/1.1 405 Method Not Allowed
Allow: GET, OPTIONS
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 04 Jan 2023 19:28:04 GMT
Content-Length: 19
```

💡 You can open `http://localhost:9090` to access the `Prometheus` dashboard, and if you'd like to open it from any location outside your network, you need a bit of work in the server set up, the same for any of the endpoints or ports described in this guide. Checking the `Stack` (docker-compose) can give you an idea of how that'd look in terms of configuration or where to find the configuration file of those services, for example, the [full-node](https://github.com/fleek-network/ursa/blob/cd6fb3d21ce647dc3f06ee9128ba2a4164623ee5/docker/full-node/docker-compose.yml) can be used as a reference.

## Conclusion

We started by going through [What a node Health Check](#whats-a-node-health-check) means and looked into [Resource monitoring](#resource-monitoring) and the parts the resource provides, such as [Log messages](#log-messages), [Processes](#processes), [Host](#host), [Ports](#ports), with some warnings along the way about firewalls.

To complete this, we demonstrated how to use `cURL` to do a simple health check to verify if the endpoints or ports are in use by expecting particular responses. We found out about at least one different request which is closed immediately, as it's not an HTTP/S request and provided some hints or some thoughts on how to leverage this information.

Finally, we hinted that exposing services externally requires a bit more setup, and the Docker compose file can be used as a reference to get you started.

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!