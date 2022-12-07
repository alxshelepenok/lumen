---
template: post
draft: false
title: 'Fleek Network: How to install Rust and the dependencies for Ursa CLI'
slug: fleek-network-how-to-install-rust-and-the-dependencies-for-ursa-cli
date: 2022-12-06T23:00:00Z
canonical: ''
socialImage: https://storageapi.fleek.co/fleek-team-bucket/fleek-network-install-rust-and-deps.png?202212071243
description: A Rust installation walkthrough to help compile and run Ursa CLI
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- Rust dependencies

---

![](https://storageapi.fleek.co/fleek-team-bucket/fleek-network-install-rust-and-deps.png?202212071243)

## Introduction

The following guide 🎓 will walk through the Rust and dependencies installation process for Linux, macOS and Windows WSL: for the linux guides we'll use Ubuntu as an example. If you're on windows, we recommend to setup [Windows Subsystem Linux](https://learn.microsoft.com/en-us/windows/wsl/install) or [Ubuntu tutorial](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) and pick a popular distro like Ubuntu. The WSL will let you use Linux applications, utilities and bash command tools you'll find in the tutorial.

## Prerequisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

You're required to have some experience with the command-line interface 😿 and have Git installed; Also, you should be happy to troubleshoot, since versions might differ from time of writing and reading. Most times, a simple web search provides the best answers 🙏!

If you don't have Git installed, learn more about it and instructions by reading the [Git documentation](https://git-scm.com/book/en/v2).

## Content

- [Install Rust with Rustup tool](#install-rust-with-rustup-tool)
- [Ursa installer rust dependencies](#ursa-installer-rust-dependencies)
- [Dependencies by operating system](#dependencies-by-operating-system)
  - [MacOS](#macos-dependencies)
  - [Linux Ubuntu](#linux-ubuntu-dependencies)
  - [Windows Subsystem Linux](#linux-ubuntu-dependencies)
- [Installing Ursa CLI](#installing-ursa-cli)
- [Troubleshooting](#troubleshooting)
- [Summary](#summary)

## Install Rust with Rustup tool

Visit the [Rust website](https://www.rust-lang.org/) getting started guide, to find, copy and run the [Rustup tool](https://rustup.rs/) for installation and version management.

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

> [curl](https://curl.se/) is an application that is generally available in most OS, if missing install it. Find more [here](https://curl.se/).

Alternatively, if you have installed Rust in the past, you may want to update it 👌.

```sh
rustup update
```

During the installation process, if asked about preferences, select the default option!

```sh
You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
```

> Once complete 👍, you'll have to restart your current shell or reload the "PATH" environment variable to include Cargo's bin directory `$HOME/.cargo/bin`. This is required to let you use "cargo" command globally.

To configure your current shell, run:

```sh
source "$HOME/.cargo/env"
```

From then on, the latest version of Cargo (Rust's build and package manager tool) should be installed. Learn more about Cargo, [here](https://doc.rust-lang.org/cargo/index.html).

Check the `version` to confirm's working correctly:

```sh
cargo --version
```

Here's the output we got (beware that our version might differ to yours, it's expected 😅).

```sh
cargo 1.65.0 (4bc8f24d3 2022-10-20)
```

## Ursa installer rust dependencies

Rustup subcommands deal with [toolchains](https://rust-lang.github.io/rustup/concepts/toolchains.html), a collection of programs required to compile a Rust application.

```sh
rustup toolchain list
```

For example, on Linux Ubuntu we generally have it set to the default:

```sh
stable-x86_64-unknown-linux-gnu (default)
```

While on macOS:

```sh
stable-x86_64-apple-darwin (default)
```

Make sure you have Rustup is set to the desired toolchain as default, if required 💁‍♀️!

```sh
rustup default <TOOLCHAIN-LIST-NAME>
```

> Rust compillation are long and compiler caching can help speed things up immensively. The Ursa CLI project can use to reduce the perceived compilation times down.

[Sccache](https://docs.rs/crate/sccache/latest
) is a ccache-like compiler caching tool. It is used as a compiler wrapper and avoids compilation when possible. This is optional, but recommended!

```sh
cargo install sccache
```

## Dependencies by operating system

Find the most common steps to have all the required dependencies (packages, libraries, etc) for Linux, macOS and Windows WSL. As mentioned earlier, the linux guides use Ubuntu as an example, but should give you a good reference for your distro.

## MacOS dependencies

Installing the latest version of Xcode Command Line Tools should be enought to build Ursa. Ursa does not require  [XCode](https://developer.apple.com/xcode), but [XCode](https://developer.apple.com/xcode) compiles software and for that reason installs most of the required packages via the Xcode Command Line Tools.

> Clang may already be installed on your macOS. To verify that it is, open a terminal and run the following command:

```sh
clang --version
```

If Clang isn't installed, enter the following command to install it:

```sh
xcode-select --install
```

To verify that is installed, execute the command:

```sh
clang --version
```

Here's the output we got (versions might differ from time of writing and reading, don't panic 😅).

```sh
Apple clang version 13.0.0 (clang-1300.0.27.3)
Target: x86_64-apple-darwin21.1.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

## Linux Ubuntu dependencies

On Linux Ubuntu (our choice as the linux distro example), start by updating the package information in the source list and then upgrade all the installed packages with the latest versions (⚠️ do the equivalent for your Linux distro), as follows:

```sh
sudo apt-get update
sudo apt-get upgrade
```

💡 You can optionally pass the `y` flag to skip any user prompts e.g. `sudo apt-get update -y` to any remaining apt-get commands.

Install the build-essentials packages, necessary for compiling general software and for our use-case Ursa CLI.

```sh
sudo apt-get install build-essential
```

Followed by the required tools required to compile the application ([cmake](https://cmake.org/), [clang](https://clang.llvm.org/), [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/) and [libssl-dev ](https://packages.debian.org/sid/libssl-dev)).

```sh
sudo apt-get install cmake clang pkg-config libssl-dev
```

## Windows subsystem linux

The instructions in [Linux Ubuntu dependencies for building Ursa](#linux-ubuntu-dependencies-for-building-ursa) apply to WSL users. Check them out!

Once available, run Bash shell instead of Windows powershell 🥴.

```
Bash on Ubuntu on Windows
```

Alternatively, try [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=en-gb&gl=gb) and open a WSL Ubuntu terminal window.

Generally, users report issues with commands not found. 🧐 To avoid frustration verify that your system PATH environment variable is setup correctly and includes all the necessary paths (e.g. the [Cargo binary directory](https://doc.rust-lang.org/cargo/commands/cargo-install.html)). Use the [Install Rust with Rustup tool](#install-rust-with-rustup-tool), if too difficult for you at this time, you might want to use our [Docker solution](fleek-network-running-a-node-in-a-docker-container.md), which is simpler.

## Installing Ursa CLI

If you haven't already 🙄, clone the Fleek Network's Ursa repository to your machine.

Either, run the command:

```sh
git clone https://github.com/fleek-network/ursa.git
```

Or, for user's with configured **ssh**:

```sh
git clone git@github.com:fleek-network/ursa.git
```

💡 Optionally, you can pass a directory name at the end of the commands (as the last argument), otherwise defaults to the repository name and for our case the name is `ursa`. Note that you don't have to use `<` or `>`, when naming, it's just illustrative.

```sh
git clone https://github.com/fleek-network/ursa.git <DIRECTORY-NAME>
```

When git clone completes 👍, `change directory` to the project directory e.g. we cloned to the default name `ursa`:

```sh
cd ursa
```

If you list (`ls`) the files in the directory, it should be similar to:

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

At this point, you should be able to run the `install` command successfully.

Start the `install` process by running the command:

```sh
make install
```

The install process can take some time 🥱, as it compiles the application binary for us. This is where [sccache](#ursa-rust-dependencies) is useful!

🌈 Here's the output when successful!

```sh
    Finished release [optimized] target(s) in 11m 22s
  Installing /root/.cargo/bin/ursa
   Installed package `ursa v0.1.0 (/temp/ursa/crates/ursa)` (executable `ursa`)
```

> Once Rust generates the binary you can find it in the Cargo bin directory.
On mac and linux, this is located at `$HOME/.cargo/bin` and on Windows `%USERPROFILE%\.cargo\bin`. If `ursa` is not available as a command, it's very likely that you need to add the Cargo bin directory to your operating system `PATH` environment variable. 🤨 There are plenty of articles explaining how to do it in most operating systems, a matter of using a web search engine.

Run the ursa `help` command as a checkup:

```sh
ursa 0.1.0
CLI options

USAGE:
    ursa [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -r, --rpc        Allow rpc to be active or not (default = true)
    -V, --version    Prints version information

OPTIONS:
    -c, --config <config>        A toml file containing relevant configurations
    -r, --rpc-port <rpc-port>    Port used for JSON-RPC communication

SUBCOMMANDS:
    help    Prints this message or the help of the given subcommand(s)
    rpc     run rpc commands from cli
```

⚠️ Beware that your output might differ a bit, as [Ursa](https://github.com/fleek-network/ursa) is in constant development. Note that you'll have to "re-install" everytime you want to pull updates from the source repository, as the update at time of writing is done manually and not automatically.

Great 👌 ! You have successfully installed all the required packages, libraries and have compiled and installed Ursa.

To learn more about Fleek Network and Ursa, check our [Getting started guide](fleek-network-getting-started-guide).

## Troubleshooting

😈 Applications are constantly updated, guides can hardly keep up with all the updates, thus being able to do a simple web search can take you a long way...

### Failed to run custom build command for X?

Operating systems are higly customisable and you might be missing some dependencies not described in the guide. An easy way around this is to copy the error message and do a web search to find solutions. E.g. `error: failed to run custom build command for librocksdb-sys v6.20.3`, you'd copy the error message, maybe remove the `v6.20.3` and do a web search. Information is out there, let's use it!

### Don't have cmake, clang, library X installed?

Follow the guide for your operating system in the [Ursa rust dependencies](#ursa-rust-dependencies) topic. It should help most use-cases, but depending on how your operating system is setup, you might need to troubleshoot to find what the missing package is and understand how to install the missing package by copying the error and doing a web search.

## Conclusion

A Fleek Network node can be built and run on your local machine.

The project is built with Rust, a general-purpose programming language, to have it installed on a machine there are some packages, libraries that are required.

We have guided you 🦮 through the Rust installation process in macOS, Linux Ubuntu and Windows (Windows Subsystem Linx), OS tools to help the Rust toolchain do the compilation and installation work; and also suggest some tips to help troubleshoot.

While we do our best to provide the most clear instructions, there's always space for improvement 🙏, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!