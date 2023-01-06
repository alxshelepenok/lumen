---
template: post
draft: false
title: 'Fleek Network: Running a node in a Docker container'
slug: fleek-network-running-a-node-in-a-docker-container
date: 2022-12-05T23:00:00Z
canonical: ''
socialImage: https://storageapi.fleek.co/fleek-team-bucket/fleek-network-docker-setup-overview.png?202212071243
description: A guide on how to run Fleek Network's node in a docker container
category: Tutorial
tags:
- DCDN
- Guide
- Getting Started
- Fleek Network
- Docker

---

![](https://storageapi.fleek.co/fleek-team-bucket/fleek-network-docker-setup-overview.png?202212071243)

## Introduction

Our [Docker](https://www.docker.com/) [image](https://docs.docker.com/engine/reference/commandline/images/) provides all the requirements to have Fleek Network running quickly 🌈 and the following guide will provide you a quick reference to get you started with Docker 🔥! 

**TL;DR** If you have Docker experience then you'll find ours [for the impatient](#for-the-impatient) more satisfying!

Alternatively, if you need a deep dive into Docker, check the official getting started [here](https://docs.docker.com/get-started/).

## Topics
  - [For the impatient](#for-the-impatient)
  - [Setup](#docker-setup)
    - [Install Docker desktop](#install-docker-desktop)
    - [Recommended settings](#recommended-settings)
  - [Image](#image)
    - [Build the Docker image](#build-the-docker-image)
  - [Container](#container)
    - [Run the container from the official nightly image](#run-the-container-from-the-official-nightly-image)
    - [Run the Docker container](#run-the-docker-container)
    - [Ursa healthcheck](#ursa-healthcheck)
  - [Utility commands](#utility-commands)
    - [Restart the Docker container](#restart-the-docker-container)
    - [Delete the Docker container](#delete-the-docker-container)
    - [Execute Ursa CLI commands in the container](#execute-ursa-cli-commands-in-the-container)
    - [Execute Bash Shell in the container](#execute-bash-shell-in-the-container)
  - [Run the container from the recommended stack](#run-the-container-from-the-recommended-stack)
    - [Running a stack with Docker compose](#running-a-stack-with-docker-compose)
    - [Disabling SSL for testing](#disabling-ssl-for-testing)
  - [Conclusion](#conclusion)

As Fleek Network's repositories are in constant development and change, you should consider that the following guide was [checked in](https://git-scm.com/docs/git-checkout) to commit `180585c`. While we try our best to update documentation and guides during development, there might be breaking changes that might take some time to reflect in our docs. To avoid disappointment, feel free to check into commit `180585c` or contribute by getting in touch with us, or sending a PR in the relevant context 🙏.

### For the impatient 😤

For the one's interested in running the node as quickly as possible, there are a few options, among those we pick two you might find handy:

- A Docker compose Stack, which is an opinionated stack that provides a reverse proxy service for the Node (Proxied internal `4069` to external ports `80` and `443`), a service to enable HTTPS on your server, services for monitoring and analytics, etc. You can run a stack quickly by following the instructions in [run the container from the recommended stack](#run-the-container-from-the-recommended-stack).

- Building a Docker image requires some effort and some of our users might find it easier to pull our nightly image for quick access to Ursa, which does not require them to build from source. For that reason, we provide you with a quick demonstration of how to pull the image and run the Docker container quickly! Check the [run the container from the official nightly image](#run-the-container-from-the-official-nightly-image)

At some point in time you will have to look at the how things work and figure out what abstractions did wrong. For some advanced users that are used to it is not a big deal, but for everyone else that might cause quite a lot of hassle! Therefore, challenge yourself to learn the basics instead of executing commands you are yet to understand, this guide is your friend!

## Setup

### Requirements

To follow the guide successfully, a good amount of memory and disk space is necessary to run Docker. The main reason for our use-case is that your host machine requires a generous amount of memory and disk space, for the containers.

Here's a quick look into the resources used during runtime (very quiet usage 😴 at time of writing):

| Name        | CPU %       | Memory usage / Limit  | Mem %          |
| ----------- | ----------- | -----------           | -----------    |
| ursa-cli    | 1.06%       | 49.7MiB / 7.775GiB    | 0.62%          |

In the example, for this guide, we have 8 GB spare memory and 20 GB spare disk space that we'll set up Docker to run our node! You'll find more about that later in the [recommended settings](#recommended-settings) section.

### Install Docker desktop

The simplest way to run docker is to visit the [https://www.docker.com/](https://www.docker.com/), download and install Docker Desktop.

💡 Some users might prefer to look into the Docker daemon (dockerd), in that case, check the [docs](https://docs.docker.com), as we're trying to keep it simple here!

Once Docker desktop is installed, you should start or open the application in your operating system! 

Also, you'll be able to run it via the CLI, as such:

```sh
docker -v
```
```
Docker version 20.10.6, build 370c289
```

Let's do the same for `docker-compose`

```sh
docker-compose -v
```

```sh
docker-compose version 1.29.1, build c34c88b2
```

💡 Versions might differ a bit from the time of writing.

The following command's output will indicate if Docker's working correctly:

```sh
docker run hello-world
```

```sh
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:faa03e786c97f07ef34423fccceeec2398ec8a5759259f94d99078f264e9d7af
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Run all the commands above in your terminal, to confirm everything's working before proceeding to the next steps, please! 👍 

### Recommended settings

As mentioned in the [requirements](#requirements) you'll need enough disk space and memory to run containers successfully.

As an example, during build time, the minimum memory required is about 8 GB! If you do not have enough memory configured in the Docker preferences, you might encounter errors, such as:

```sh
#13 139.1    Compiling actix-web v4.2.1
#13 143.4    Compiling jsonrpc-v2 v0.11.0
#13 183.5 The following warnings were emitted during compilation:
#13 183.5 
#13 183.5 warning: c++: fatal error: Killed signal terminated program cc1plus
#13 183.5 warning: compilation terminated.
#13 183.5 
#13 183.5 error: failed to run custom build command for `librocksdb-sys v0.8.0+7.4.4`
#13 183.5 
#13 183.5 Caused by:
#13 183.6   process didn't exit successfully: `/usr/src/app/target/release/build/librocksdb-sys-c0aabb249f648650/build-script-build` (exit status: 1)
#13 183.6   --- stdout
#13 183.6   cargo:rerun-if-changed=rocksdb/
#13 183.6   TARGET = Some("x86_64-unknown-linux-gnu")
#13 183.6   OPT_LEVEL = Some("z")
#13 183.6   HOST = Some("x86_64-unknown-linux-gnu")
#13 183.6   cargo:rerun-if-env-changed=CXX_x86_64-unknown-linux-gnu
```

If you are running Docker desktop application, open the dashboard settings and in the "resources" change the memory to the recommended size 8 GB. If you need instructions to locate the settings page, visit the Docker official documentation, here's an example for [Linux](https://docs.docker.com/desktop/settings/linux) and [MacOS](https://docs.docker.com/desktop/settings/macos).

Make sure that you have configured Docker desktop with the [recommended settings](#recommended-settings), before proceeding any further!

## Image

A Docker image is a read-only template with instructions for creating a Docker container, like a template. Docker images also act as a the starting point when using Docker. 

The starting point for our use-case is a Dockerfile, where all those "template instructions" are declared.

Here's how our [Dockerfile](https://github.com/fleek-network/ursa/blob/22de01ecb4be347e2b76f17e4e40e4fd9956e69b/Dockerfile) looks like.

### Build the Docker image

We are assuming 😅 that you've followed our [Fleek Network: Getting started guide](https://blog.fleek.co/posts/fleek-network-getting-started-guide) and have successfully cloned the `ursa` repository. If you haven't give it a go, before you proceed!

The reason is that the image builder requires the source files as the input file to have information to build a container, as mentoned [earlier](#image). 

The [Dockerfile](https://github.com/fleek-network/ursa/blob/22de01ecb4be347e2b76f17e4e40e4fd9956e69b/Dockerfile) is located in the Ursa repository (at time of writing), [here](https://github.com/fleek-network/ursa/blob/22de01ecb4be347e2b76f17e4e40e4fd9956e69b/Dockerfile).

If you have cloned the project correctly, you should `change directory` to the project root directory.

```sh
cd <PATH-TO-URSA-DIRECTORY>
```

Example, ours is located at `/Users/fleek/ursa`:

```sh
cd /Users/fleek/ursa
```

At time of writing, this is how the project root looks like (e.g. use the [ls](https://en.wikipedia.org/wiki/Ls) to see the list):

```sh
.
├── Cargo.toml
├── Dockerfile
├── Makefile
├── README.md
├── crates
├── infra
├── rust-toolchain.toml
└── specs
```

> Double-check that your work directory is in the project root. You'll build the Docker image based in the [Dockerfile](https://github.com/fleek-network/ursa/blob/32928e78afa0bbed8241ddc4d7e2456752456fd6/Dockerfile).

When ready, run the Docker build command:

```sh
docker build -t ursa -f ./Dockerfile .
```

The build process takes awhile and you have to wait for completion. 

🤖 The output should be similar to:

```
[+] Building 16.1s (8/16)                                                                                                                           
 => [internal] load build context                                                                                                              0.2s
 => => transferring context: 12.95MB                                                                                                           0.2s
 => [builder 1/6] FROM docker.io/library/rust:latest@sha256:6d44ed87fe759752c89d1f68596f84a23493d3d3395ed843d3a1c104866e5d9e                  13.5s
 => => resolve docker.io/library/rust:latest@sha256:6d44ed87fe759752c89d1f68596f84a23493d3d3395ed843d3a1c104866e5d9e                           0.0s
 => => sha256:6d44ed87fe759752c89d1f68596f84a23493d3d3395ed843d3a1c104866e5d9e 988B / 988B                                                     0.0s
 => => sha256:6c20d87766142d058f3e21874fe1db426c49ce3e1575c8c300fdc27d06db92a9 1.59kB / 1.59kB                                                 0.0s
 => => sha256:c85a0be79bfba309d1f05dc40b447aa82b604593531fed1e7e12e4bef63483a5 10.88MB / 10.88MB                                              10.1s
 => => sha256:c7bf205db148c9f9202dbece143e86487c678d108c3936897cfd9bcd7915dd3c 6.42kB / 6.42kB                                                 0.0s
 ```

⚠️ The Docker image is only required to be built once and/or, when changes are pulled from the remote repository, or versions you might be interested in! Otherwise, you're not required to build it everytime to run the node. If you'd like to learn how to update the Ursa CLI, find our guide [here](#fleek-network-how-to-get-the-latest-updates-for-ursa-cli-from-the-source-repository).

> Bear in mind that if you don't update your build often, you won't have the latest changes, which happen frequently with all the ongoing development! This is quite important to understand, as it causes confusion to some users. The Ursa application at time of writing does not update automatically.

## Container

A container is what's originated from the image we discussed [earlier](#image), it is a runnable instance of an image! We can create, start, stop, move, or delete a container using the Docker API or CLI.

Following up, we'll learn how to run the Docker container that includes our `ursa` program, built from our source [Dockerfile](https://github.com/fleek-network/ursa/blob/32928e78afa0bbed8241ddc4d7e2456752456fd6/Dockerfile).

📢 We've been referencing the Dockerfile to a particular commit hash in our repository, to secure the pointer to it, but you are free to check any commit message, including the latest version of our main branch! This is explained in our guide to help you update the Ursa CLI source and binary [here](#fleek-network-how-to-get-the-latest-updates-for-ursa-cli-from-the-source-repository).

### Run the container from the official nightly image

<!-- 
Building a Docker image requires some effort and some of our users might find easier to pull our nightly image for quick access to Ursa, which does not require them to build from source.

For that reason, we provide you a quick demonstration on how to pull the image and run the Docker container quickly! If you need more detailed information, then you'll be happier to follow the [run the Docker container](#run-the-docker-container). -->

The Fleek Network Ursa image is built nightly, and some of our users might find handy to pull it instead of building it for quick access to a running node!

> The official [fleek-network/ursa:nightly](https://github.com/fleek-network/ursa/pkgs/container/ursa) image is currently hosted in Github's container registry and updated every night, you can `docker pull` the image and run it locally. Beware that the version is built at a particular time of the day, so if you are looking for a custom image then you're better off learning how to build one yourself. The extended guide provides you all the information you need, but we also have a guide on how to update images that you may be interested in reading [here](https://blog.fleek.co/posts/

Firstly, start by running the `docker pull`, as follows:

```sh
docker pull ghcr.io/fleek-network/ursa:nightly
```

⚠️ Important: The Github container registry is private, you need a Github account and private token to login via the CLI to be able to pull, find the instructions [here](https://ghcr.io/).

Once the Docker image is downloaded completely, you can run a container based on the image:

```sh
docker run -p 4069:4069 -p 6009:6009 -v $HOME/.ursa/:/root/.ursa/:rw --name ursa-cli -it ghcr.io/fleek-network/ursa:nightly
```

Notice that the command arguments we pass are for the flag's `-p` for port numbers, `-v` to bind mount a location in your host to a container path (useful to persist your ursa configuration files, e.g. keystore), `--name` to make it easier to identify, `-it` to make it interactive (e.g. presents output to the terminal), and the image name we pulled earlier (ghcr.io/fleek-network/ursa:nightly), if you hadn't pulled and not found, docker would pull it for you.

You can then do a quick healthcheck as described [here](#ursa-healthcheck).

For more detailed information, such as the commands explained, port numbers, output example, etc, read the [run the Docker container](#run-the-docker-container).

### Run the Docker container

Once the Docker image is ready ✅, you can run it by providing a container and image name!

Since we want to interact with the process `ursa`, we'll run in interactive mode by using the flags `-it`.

```sh
docker run -p 4069:4069 -p 6009:6009 -v $HOME/.ursa/:/root/.ursa/:rw --name ursa-cli -it ursa
```

We are providing a custom name of our liking (ursa-cli) for the container and the image name we have built previously (ursa). Also, we do a bind mount to mount a file or directory on the host machine into a container, as an example, this is useful to persist the configuration for the identity. Find more on managing the identity [here](#fleek-network-managing-the-key-store).

```sh
docker run [-p <HOST-PORT>:<CONTAINER-PORT>] --name <CONTAINER-NAME> -v <HOST-PATH>:<CONTAINER-PATH> -it <IMAGE>
```

> 💡 We understand these commands might be hard to remember and provide some utility commands for your convenience. Although, if you need naming, port customisation, then you can stick with the knowledge you've acquired, or use this document as a reference. The utility commands require [make](https://www.gnu.org/software/make/manual/make.html), most operating systems have it installed by default, otherwise you can use a web search engine to find instructions on how to install it in your operating system.

The utility commands are the `docker-build` and `docker-run`.

Respectively, execute `docker-build` to build the Docker image:

```sh
make docker-build
```

Execute the `docker-run` to run the Docker container based on the built image:

```sh
make docker-run
```

⚠️ At the time of writing the `make docker-run` does not persist the Ursa configuration ([options, key store, identity](#fleek-network-managing-the-key-store), etc), you'd be better off executing the actual `docker run` command without the sugar coating for better control and sanity check! This happens because the `-v <HOST-PATH>:<CONTAINER-PATH>` bind mount is missing in the makefile declaration `make docker-run`, this can change at any time so be wary of commands that create unnecessary abstractions! On the other hand, you might find it useful to use our [proposed stack](#running-a-stack-with-docker-compose) which has the appropriate binding mounts for you.

💡 Remember, the utility commands will use default naming and port numbers. Use the original Docker commands for better control or customization.

If all goes well, the output should be similar to:

```sh
2022-12-05T17:06:25.943684Z  INFO ursa: UrsaConfig: UrsaConfig { mdns: false, relay_server: true, autonat: true, relay_client: true, swarm_addr: "/ip4/0.0.0.0/tcp/6009", bootstrap_nodes: ["/ip4/159.223.211.234/tcp/6009/p2p/12D3KooWDji7xMLia6GAsyr4oiEFD2dd3zSryqNhfxU3Grzs1r9p", "/ip4/146.190.232.131/tcp/6009/p2p/12D3KooWGw8vCj9XayJDMXUiox6pCUFm7oVuWkDJeE2H9SDQVEcM"], database_path: Some("ursa_db"), identity: "default", keystore_path: "/root/.config/ursa/keystore" }
2022-12-05T17:06:25.944223Z ERROR ursa::ursa::identity: Failed to load identity `No such file or directory (os error 2)`
2022-12-05T17:06:25.946079Z  INFO ursa::ursa::identity: Created identity `default` (12D3KooWRis5Gn8TrKNyvx5iizTMKqVyJehw2KRSRAR79FMnxLqQ)
2022-12-05T17:06:25.946119Z  INFO ursa: Using ursa_db as database path
2022-12-05T17:06:25.974520Z  INFO ursa_network::discovery: Bootstrapping with [(PeerId("12D3KooWDji7xMLia6GAsyr4oiEFD2dd3zSryqNhfxU3Grzs1r9p"), "/ip4/159.223.211.234/tcp/6009"), (PeerId("12D3KooWGw8vCj9XayJDMXUiox6pCUFm7oVuWkDJeE2H9SDQVEcM"), "/ip4/146.190.232.131/tcp/6009")]
2022-12-05T17:06:25.975579Z  INFO ursa_rpc_server::server: Server (Rpc and http) starting up
2022-12-05T17:06:25.975618Z  INFO ursa_index_provider::provider: index provider starting up
2022-12-05T17:06:25.975632Z  INFO ursa_rpc_server::server: listening on 0.0.0.0:4069
2022-12-05T17:06:25.975806Z  INFO ursa_index_provider::provider: index provider listening on: 0.0.0.0:8070
2022-12-05T17:06:25.975553Z  INFO ursa_network::service: Node starting up with peerId PeerId("12D3KooWRis5Gn8TrKNyvx5iizTMKqVyJehw2KRSRAR79FMnxLqQ")
2022-12-05T17:06:25.975885Z  INFO ursa_metrics::metrics: listening on 0.0.0.0:4070
```

Or, you might find familiar,

```sh
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:17 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:22 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:27 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:32 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:37 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:42 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:47 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:52 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:08:57 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:02 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:07 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:12 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:17 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:22 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
nginx_1          | 172.19.0.3 - - [06/Jan/2023:19:09:27 +0000] "GET /stub_status HTTP/1.1" 200 100 "-" "Go-http-client/1.1" "-"
```

A few points to notice are the listener port number and hostname 👀. As described in the [Run the Docker container](#run-the-docker-container), the container listener port number is exposed to your host's port number.

### Ursa healthcheck

Here's an example of a curl request for the http headers, as a quick healthcheck.

```sh
curl -I 127.0.0.1:4069
```

The output displays some http headers:

```sh
HTTP/1.1 405 Method Not Allowed
content-length: 0
date: Tue, 06 Dec 2022 17:09:16 GMT
```

For users who need high customisation 😎, the Docker port binding is an important concept to understand when working with containers 🧐. For example, we can extend the previous `p` by providing.

```sh
-p <HOST-ADDRESS>:<CONTAINER-PORT>:<HOST-PORT>
```

Following up 👇, we'll look into how to control Ursa via the container's processes, to help you understand a bit more of Ursa. This can be useful, if you want to follow some of ursa subcommands explained in the [Fleek Network: Getting started guide](https://blog.fleek.co/posts/fleek-network-getting-started-guide), or if you need to interact with the process in the container:

- [Stop the Docker container](#stop-the-docker-container)
- [Restart the Docker container](#restart-the-docker-container)
- [Delete the Docker container](#delete-the-docker-container)
- [Execute bash shell in the container](#execute-bash-shell-in-the-container)
- [Stop the Docker container](#stop-the-docker-container)

If you are not interested in this level of control and detail 😹, or rather check these later, you can skip to [running a stack with Docker compose](#running-a-stack-with-docker-compose), the simplest and opinionated way to start Ursa along other services to help you monitor, etc.

## Utility commands

### Stop the Docker container

After you're done with the process ⏳, the Docker container can be stopped by:

```sh
docker stop <CONTAINER-NAME>
```

In our case, we'd like to stop `ursa-cli`:

```sh
docker stop ursa-cli
```

### Restart the Docker container

After the initial run of the project Dockerfile image, we can restart it by the container name:

```sh
docker start <CONTAINER-NAME>
```

Our container name is `ursa-cli`, so we do:

```sh
docker start ursa-cli
```

We haven't set any of the host or port number bindings, that information is part of the metadata of a container, which is immutable, it's persistant.

### Delete the Docker container

The Docker container can be removed by:

```sh
docker rm <CONTAINER-NAME>
```

For what matters to us, we'd like to delete `ursa-cli`:

```sh
docker rm ursa-cli
```

When we delete a container, it's no longer available and thus we'd have to [Docker run](#run-the-docker-container) 👷.

### Execute Ursa CLI commands in the container

```sh
docker exec -it <CONTAINER-NAME> <FILEPATH> <ARGS>
```

For example, we'll interact with the container named `ursa-cli` and execute `ursa` which is located in the `/usr/local/bin`, with the flag `version` to get the version number of the `ursa cli` we are running.

```sh
docker exec -it ursa-cli ursa --version
```

If successful, you'll get the version number (beware that version might differ from time of writing, as Ursa is in constant development).

```sh
ursa 0.1.0
```

### Execute bash shell in the container

Start the bash shell in the container:

```sh
docker exec -it <CONTAINER-NAME> bash
```

As we have `ursa-cli` for our container name example, do:

```sh
docker exec -it ursa-cli bash
```

👩‍💻 Here, we're just looking into how to execute a process in the container where host and port binding is still relevant and required to be applied if you haven't, otherwise your host will not have the correct bindings. Bear in mind that Docker executes a process in the container, not your host!

For example, we could then check the `help` flag.

```sh
ursa --help
```

```sh
CLI options

USAGE:
    ursa [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -r, --rpc        Allow rpc to be active or not (default = true)
    -V, --version    Prints version information

OPTIONS:
    -c, --config <config>                  A toml file containing relevant configurations
    -d, --database-path <database-path>    Database path where store data
    -i, --identity <identity>              Identity name. If not provided, a default identity will be created and reused
                                           automatically
    -k, --keystore-path <keystore-path>    Path to the keystore directory. Defaults to ~/.config/ursa/keystore
    -r, --rpc-port <rpc-port>              Port used for JSON-RPC communication

SUBCOMMANDS:
    help    Prints this message or the help of the given subcommand(s)
    rpc     run rpc commands from cli
```

💡 At time of writing the Docker build places the ursa binary in the pathname `/usr/local/bin`, making `ursa` globally executable. On previous Dockerfile versions it was located in `/`, we had to execute it with the absolute path `/ursa --help`. Pull the latest from the repository and build if you are finding you have to use the deprecated method. In any case, either running on Docker or a Host machine, make sure the directory location where the `ursa` binary is stored is declared in the system's PATH environment variable.

Executing the bash shell in the container is not mandatory and what we shared here is to demonstrate how to interact with the `ursa` process for the users that don't have it on their local machines and/or are interested in checking subcommands, learning, following tutorials, etc in the same way someone who have it installed in their operating system would.

## Run the container from the recommended stack

Stack is a way to describe a list of services (applications), we'll have running in our network and Docker Compose is a tool for defining and running multi-container Docker applications (services).

We'll find out how to run an opinionated stack to help us run Fleek Network, with monitoring, etc.

Also, by using Docker compose it'll be easier to persist the configuration files (config.toml, identity, etc). Therefore, this is the recommended way to run a node in a docker container.

### Running a stack with Docker compose

We have defined a Stack 🕸 that can be useful for running and monitoring; At time of writing, this is declared in a docker-compose file located [here](https://github.com/fleek-network/ursa/blob/cfbbe6208dc6a33d28b43c6e6820ab76c2905353/infra/ursa/docker-compose.yml).

There you'll find specified all the configuration options, such as the ones we've discussed in the previous topics about the host, port bindings, bind mount, etc. You don't have to constantly verify if specified all the correct options when running the Docker containers. Plus, we have these setup for you [grafana](https://grafana.com/), [prometheus](https://prometheus.io/docs/introduction/overview/), [certbot](https://certbot.eff.org/) and [nginx](https://www.nginx.com/). 

Also, the docker compose file can be customized to your preference, Docker will detect any changes recreating the container if and when necessary.

For this guide 📒, we'll look into how to start and stop the stack only!

Before proceeding, make sure you have the image ready! If you haven't already a quick utility method is available as the following command:

```sh
make compose-build
```

💡 If you have compose-build previously, you'll find that some services will be skipped, such as for the ones which we have set as imagens and don't have to build.

```sh
certbot uses an image, skipping
nginx uses an image, skipping
nginxexporter uses an image, skipping
prometheus uses an image, skipping
grafana uses an image, skipping
```

💡 The `ursa` Docker image should be built every time you want to pull and use an update, learn how by following the guide [here](#fleek-network-how-to-get-the-latest-updates-for-ursa-cli-from-the-source-repository).

In the project root, execute the docker-compose command by providing the `docker-compose.yml` configuration file and the subcommand up.

```sh
docker-compose -f <DOCKER-COMPOSE-FILEPATH> <up | down>
```

For our use-case, here's how it'll look like:

```sh
docker-compose -f docker/full-node/docker-compose.yml up
```

Where for stopping, you have option `down`:

```sh
docker-compose -f docker/full-node/docker-compose.yml down
```

Also, we provide the following utility commands for your convenience.

A command to execute the docker compose up:

```sh
make compose-up
```

Also, to execute the docker compose down:

```sh
make compose-down
```

Here, we have an opinionated stack that you can use as a base for your system, or as a reference, for your research and learning. This means you aren't obligated to use Grafana or Prometheus. Ursa works without any dependency!

💡 Learn more about [docker compose](https://docs.docker.com/compose/) by checking the documentation [here](https://docs.docker.com/compose/).


If you'd like to use some of the points available in the guide, such as to [execute bash shell in the container](#execute-bash-shell-in-the-container), you need to ensure that the [Docker compose file](https://github.com/fleek-network/ursa/blob/cfbbe6208dc6a33d28b43c6e6820ab76c2905353/infra/ursa/docker-compose.yml) have set the `container_name` to the name of your preference for our examples we chose `ursa-cli`.

```sh
  ursa:
    container_name: ursa-cli
    ...
```

At time of writing, you'll find that the output presents errors. The setup we have is based on our staging server use-case, which can be used as an example for yours.

```sh
nginx_1          | 2023/01/06 13:38:44 [emerg] 10#10: open() "/etc/letsencrypt/options-ssl-nginx.conf" failed (2: No such file or directory) in /etc/nginx/conf.d/app.conf:52
nginxexporter_1  | time="2023-01-06T13:48:07Z" level=error msg="Error scraping nginx: Error scraping nginx: Get http://nginx:80/stub_status: dial tcp: lookup nginx on 127.0.0.11:53: no such host" source="nginx_exporter.go:171"
```

To mitigate this issue, you'll have to run a script from the directory `docker/full-node` of the Ursa project.

Start by changing the directory to:

```sh
cd ./docker/full-node
```

The command you'll be running needs to be prefixed by a list of custom domain names

```sh
DOMAINS="<YOUR-CUSTOM-DOMAIN-NAME-1> <YOUR-CUSTOM-DOMAIN-NAME-2>" ./init-letsencrypt.sh
```

Here's a practical example,

```sh
DOMAINS="my-fleek-network-node.dev www.my-fleek-network-node.dev" ./init-letsencrypt.sh
```

If you haven't set up the domain correctly, you'd get

```sh
Certbot failed to authenticate some domains (authenticator: webroot). The Certificate Authority reported these problems:
  Domain: my-fleek-network-node.dev
  Type:   unauthorized
  Detail: 2001:4860:4802:32::15: Invalid response from https://www.foobar.dev/.well-known/acme-challenge/3UrSvBmgSNsymLKA20wGKJfxQq_utTKlsTLxltTGNQ4: 403

Hint: The Certificate Authority failed to download the temporary challenge files created by Certbot. Ensure that the listed domains serve their content from the provided --webroot-path/-w and that files created there can be downloaded from the internet.
```

 💡 We'll provide a guide with instructions about how to set up the custom domains.

### Disabling SSL for testing

⚠️ A secure connection is mandatory, the following instructions are available for testing purposes only!

As many of you might not have a custom domain and are just looking around to see what Fleek Network is about, a way around would be to disable SSL for testing, which means that the communication is none secure.

Open and edit the file `docker/full-node/data/nginx/app.conf` and make the content the following:

```sh
proxy_cache_path /cache keys_zone=nodecache:100m levels=1:2 inactive=31536000s max_size=10g use_temp_path=off;

server {
    listen 80;
    listen [::]:80;
    server_name node.ursa.earth www.node.ursa.earth;

    location /stub_status {
      stub_status;
    }

    proxy_redirect          off;
    client_max_body_size    10m;
    client_body_buffer_size 128k;
    proxy_connect_timeout   90;
    proxy_send_timeout      90;
    proxy_read_timeout      90;
    proxy_buffers           32 128k;

    location / {
      add_header content-type  application/vnd.ipld.raw;
      add_header content-type  application/vnd.ipld.car;
      add_header content-type  application/octet-stream;
      add_header cache-control public,max-age=31536000,immutable;

      proxy_cache nodecache;
      proxy_cache_valid 200 31536000s;
      add_header X-Proxy-Cache $upstream_cache_status;
      proxy_cache_methods GET HEAD POST;
      proxy_cache_key "$request_uri|$request_body";
      client_max_body_size 1G;

      proxy_pass http://ursa:4069;
    }
}
```

## Conclusion

Containers are a way to have a self-contained environment that includes all necessary dependencies, libraries, software, etc, required to run an application 🍰.

Fleek Network's Ursa is developed with [Rust](https://www.rust-lang.org/), a general-purpose programming language, that requires several dependencies and libraries to compile the project. Some of these libraries are not installed by default 🤖 and require some troubleshooting for the end user. [Docker](https://www.docker.com/) provides us with containers, self-containing all the required libraries for the purpose of running Ursa, our application.

We guided you through the initial installation steps, and how to build a [Docker](https://www.docker.com/) image, which then's used to Docker run a container. Plus, provided lower-level commands, to help you understand other present or advanced use-cases, and also at higher level, offerring simple utility methods.

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!