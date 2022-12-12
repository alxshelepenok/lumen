---
template: post
draft: false
title: 'Fleek Network: How to get the latest updates for Ursa CLI from the source repository'
slug: fleek-network-how-to-get-the-latest-updates-for-ursa-cli-from-the-source-repository
date: 2022-12-09T13:00:00.000+00:00
socialImage: https://storageapi.fleek.co/fleek-team-bucket/fleek-network-how-update-ursa-cli-from-git-repo.png?202212091140
canonical: ''
description: How to get the latest updates for Ursa CLI from the source repository
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- GIT

---

![](https://storageapi.fleek.co/fleek-team-bucket/fleek-network-how-update-ursa-cli-from-git-repo.png?202212091140)


## Introduction

Fleek Network's Ursa CLI soure-code 🤖 is updated frequently and thus keeping up with changes can be a bit of a chore and specially difficult for users who are trying to have it compiled for the first time, or updating the Ursa CLI binary in their operating systems. While we should have stable releases in the future at the current phase of development, there's a requirement to follow the contributions directly in the repository: checking in and out, the commits you're interested in 🧐.

In this guide, we’ll have a simple look into how to pull changes and update the Ursa CLI binary for Linux, macOS and Windows (WSL): for the linux guides we’ll use Ubuntu as an example. 

## Prerequesites

To follow this guide, you will need:

- Some experience running the command-line interface
- Have Git installed correctly
- Bit of experience with Git version control
- Docker (if you're following that path)

We're also assuming that you have followed our initial [getting started guide](https://blog.fleek.co/posts/fleek-network-getting-started-guide). If you haven't already 😅, read it [here](https://blog.fleek.co/posts/fleek-network-getting-started-guide).

### Table of Contents

- [Pulling the latest changes](#pulling-the-latest-changes)
- [How to rebuild Ursa CLI?](#how-to-rebuild-ursa-cli)
  - [Native build](#native-build)
  - [Docker build](#docker-build)
- [Troubleshooting](#troubleshooting)

***

## Pulling the latest changes

Check the latest contributions pushed to the Ursa CLI [main branch](https://github.com/fleek-network/ursa/commits/main), it'll give you clarity what's been committed into the source-code, how and when. Therefore, find about new features, fixes, improvements, etc.

First, `change directory` to the Ursa directory in your file-system:

```sh
cd <PATH-TO_URSA>
```

Pull the latest commits by:

```sh
git pull origin main
```

Here we're pulling from remote named `origin` and branch `main`. You can check yourself, as follows:

```sh
git remote -v
```

Our output clearly describes what `origin` is tracking.

```sh
origin	git@github.com:fleek-network/ursa.git (fetch)
origin	git@github.com:fleek-network/ursa.git (push)
```

💡 With `git` you can point to any point in the repository history, there might be lots of reason you'd want to check into a certain commit or branch, e.g. if you encounter bugs and need to revert to a previous commit or version. On that being said, we welcome all kinds of contributions, such like reporting bugs. Why not report issues in our repository [here](https://github.com/fleek-network/ursa/issues) to help us improve?

Here's the output we got after the git pull:

```sh
From https://github.com/fleek-network/ursa
 * branch            main       -> FETCH_HEAD
Updating dbafe8f..9dcbf3e
Fast-forward
 .gitignore                            |   1 +
 Dockerfile                            |   3 +-
 Makefile                              |   5 +-
 README.md                             |   1 +
 crates/ursa-index-provider/Cargo.toml |   2 +-
 crates/ursa-network/Cargo.toml        |  20 +++----
 crates/ursa-network/src/behaviour.rs  | 335 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++---------------------------------------------
 crates/ursa-network/src/discovery.rs  |   9 +--
 crates/ursa-rpc-client/Cargo.toml     |   2 +-
 crates/ursa-rpc-server/Cargo.toml     |   4 +-
 crates/ursa-store/Cargo.toml          |   8 +--
 crates/ursa/Cargo.toml                |   2 +-
 12 files changed, 215 insertions(+), 177 deletions(-)
```

When your local version of the repository, is up-to-date with the remote repository, you'd get:

```sh
From https://github.com/fleek-network/ursa
 * branch            main       -> FETCH_HEAD
Already up to date.
```

At this point, you have the latest version of the source-code 👌 and can re-install (rust compile, setup, etc), which overrides the `Ursa CLI` build version you're on.

## How to rebuild Ursa CLI?

After you have successfully pull the latest changes, or checked into a particular commit in history, you're ready to build it!

To kick things out, we're going to discuss the installation process in a host OS. Keep reading to understand how to trigger these for the Docker container runtimes. [Docker notes](#docker-notes).

### Native build

💁‍♀️ We are assuming that your system setup hasn't changed, either Rust toolchain is still installed correctly or if you opted to run via Docker have the Docker application). If you have made changes to your system and need to revisit our getting started guide find it [here]([here](https://blog.fleek.co/posts/fleek-network-getting-started-guide)).

First, `change directory` to the Ursa directory in your file-system:

```sh
cd <PATH-TO_URSA>
```

Start the install process by running the command:

```sh
make install
```

Recall this command from our getting started guide? As you probably guessed, the install process is the way to go. It takes care of everyhing for us by running Rust compiler, etc.

🌈 Here’s the output when successful!


```sh
Finished release [optimized] target(s) in 11m 22s
Installing /root/.cargo/bin/ursa
Installed package `ursa vX.X.X (/temp/ursa/crates/ursa)` (executable `ursa`)
```

> Rust creates the binary and stores it in the Cargo bin directory. On mac and linux, this is located at $HOME/.cargo/bin and on Windows %USERPROFILE%\.cargo\bin. If ursa is not available as a command, it’s very likely that your OS Rust setup is unhealthy, thus as recommended above, revisit the [Getting started guide]([here](https://blog.fleek.co/posts/fleek-network-getting-started-guide)).

### Docker build

If you have opted to Docker 🐬, there are a few things you need to do first. 

Firstly, should know that the Docker image needs to be rebuilt, this because the source-code has 
changed, thus we need to change the Docker image content. 

```sh
docker build -t ursa -f ./Dockerfile .
```

🤖 The output should be similar to:

```sh
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

Second, we'll remove the existing Docker container that we created with the prior version of the source-code. 

🦖 Bear in mind that some users prefer to keep different containers, to jump between versions, etc; that'll be up to the end user to decide how to manage these, but here we're explaining how to remove an existing Docker container that'll be replaced by a new one with the same name.

```sh
docker rm urla-cli
```

⚠️ You might have opted for a different Docker container name. Here, we're using the getting started guide suggested name `ursa-cli`, if you have opted for a different name change the command to the corresponding one. 

Thirdly, we run the `docker run` with any necessary flags, such as exposing ports that from then one can simply do `docker start` and `docker stop`. 

```sh
docker run -p 4069:4069 -p 4070:4070 -p 6009:6009 -p 8070:8070 --name ursa-cli -it ursa
```

😅 We have utility methods for your convinience to run docker easily and not having to remember this long commands, check [Running a node in Docker](https://blog.fleek.co/posts/fleek-network-running-a-node-in-a-docker-container) for more details. Hints:

```sh
make docker-build

make docker-run
```

Learn more about Docker by checking our guide into [Running a node in Docker](https://blog.fleek.co/posts/fleek-network-running-a-node-in-a-docker-container) from our getting started guides.


Great 👌 ! You have successfully reinstalled the Ursa CLI.

## Troubleshooting

### Tried to docker build but says ursa-cli is already in use by a container?

Make sure you read the documentation above, which explains this in more detail and provides you with the commands to mitigate this issue and other considerations as a system administrator, or other similar use-cases when maintaining containers.

```sh
docker: Error response from daemon: Conflict. The container name "/ursa-cli" is already in use by container "a141f50ca75ab000576a07078b7cccab26a669b265de08ca6d6efe3d577406fc". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```

### After upgrading the Ursa CLI, the CLI version is the same?

The Ursa CLI repository has yet to include a proper release system through our CI/CD engine. At time of writing versioning the CLI is done manually, so it's common to persist under a certain version for awhile, e.g.:

```sh
> ursa --version 

ursa 0.1.0
```

We should have this improved shortly!

### When running make install, there are some warning messages, why?

Some of this messages are `warning` messages to help the development team. You can ignore it! IF you do find something interesting, feel free to share your thoughts or report issues in our repository [here](https://github.com/fleek-network/ursa/issues) to help us improve.

Here's an example of some output showing some warning messages:

```sh
warning: fields `peer_id` and `addresses` are never read
  --> crates/ursa-network/src/discovery.rs:36:5
   |
35 | pub struct PeerInfo {
   |            -------- fields in this struct
36 |     peer_id: PeerId,
   |     ^^^^^^^
37 |     addresses: Vec<Multiaddr>,
   |     ^^^^^^^^^

warning: field `event_receiver` is never read
   --> crates/ursa-network/src/service.rs:151:5
```

If you read the error message, you'll see that is hinting the developer about what to do!

### After pulling the latest changes, make install throws an error. What should I do?

When a developer puts a new contribution into the [source-code](https://github.com/fleek-network/ursa/), this might have included new package dependencies, or dependencies which rely on libraries that you have not yet installed. This is quite normal 😅 but we understand the pain, therefore should provide stable versions in the near future. Since you are building these yourself and keeping up with the daily development, is not as trivial!

For example, on the commit [57473fd7](https://github.com/fleek-network/ursa/commit/57473fd7a329bce130d5efdbf0f604c20df5a31e) of the repository main branch `Upgrade to libp2p v0.50`, the `protobuf-compiler` is introduced among other tweaks or changes.

After you pull the remote changes to your local repository and run the `make install` command, you'd get an error similar to:

```sh
error: failed to run custom build command for `libp2p-core v0.38.0`

Caused by:
  process didn't exit successfully: `/Users/punkbit/www/fleek/ursa/target/release/build/libp2p-core-51edaceeae6020e3/build-script-build` (exit status: 101)
  --- stderr
  thread 'main' panicked at 'Could not find `protoc` installation and this build crate cannot proceed without
      this knowledge. If `protoc` is installed and this crate had trouble finding
      it, you can set the `PROTOC` environment variable with the specific path to your
      installed `protoc` binary.You could try running `brew install protobuf` or downloading it from https://github.com/protocolbuffers/protobuf/releases

  For more information: https://docs.rs/prost-build/#sourcing-protoc
  ', /Users/punkbit/.cargo/registry/src/github.com-1ecc6299db9ec823/prost-build-0.11.3/src/lib.rs:1296:10
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
warning: build failed, waiting for other jobs to finish...
error: failed to run custom build command for `libp2p-gossipsub v0.43.0`
```

The reason why this happens is that the `Upgrade to libp2p v0.50` introduces changes which requires you to add a new library to your operating system, called `protobuf-compiler`.
The documentation is updated to reflect this, but there are times that the documentation takes a bit of time to reflect the changes we get frequently in the source repository. In other hand, a quick check in the commit message would hint you what to do, or what to add! For example, here it'd be solved by running the command in macOS:

```sh
brew install protobuf
```

You'd of course check the documentation updates to find what to do for your operating system. Although, if you have a troubleshooter mentality you'd go a very long way with the answers you'd find by a simple web search with the error message as keywords.

## Final Thoughts

The Fleek Network's Ursa CLI is in constant development 👷🏻‍♀️, there are frequently changes that can introduce features, fixes, performance improvments, but also breaking changes that in some cases require you to add, include new libraries or packages in your operating-system.

In the current phase of development, a proper software release cycle for the updates is still in development, thus we pick changes from the source repository to build our Ursa CLI application 🦖.

We have looked into how to pull the changes via Git, discussed that contributions can introduce new requirements to the host operating system that leads to updates or changes in the documentation - mentioning how hard it is to keep in synch 😱. Thus, explained how to look into the contribution to understand the nature of the change and get hints about new requirements. Where also hinting about future processes that are in development, that will help us provide stable versions to the end-users.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!