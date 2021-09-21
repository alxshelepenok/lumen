---
template: post
draft: false
title: 'IC Kit: Rust Canister Testing Kit we Used to Improve Code Coverage at Fleek'
slug: ickit-rust-canister-testing
date: 2021-09-21T05:00:00Z
socialImage: https://storageapi.fleek.co/fleek-team-bucket/ICKit%20Fleek%20Blog%20Header%20Image.png
canonical: ''
description: 'ICKit is a Rust library to assist with Rust canister testing on the
  Internet Computer. '
category: Tutorial
tags:
- Testing
- Canisters
- Rust
- Internet Computer
- ICKit

---
![](https://storageapi.fleek.co/fleek-team-bucket/ICKit%20Fleek%20Blog%20Header%20Image.png)

The Internet Computer makes it possible to deploy any WASM binary to your canister as long as it meets the runtime standards. So in theory, you could use any programming language that can be compiled to WASM to build canisters. 

Currently, the two most popular languages to write canisters are Rust and Motoko.

To make it possible to write canisters using Rust, the foundation has published the ic-cdk crate which makes it seamless for developers to make use of APIs provided by the IC runtime, but it has one drawback: **you can’t run these methods outside of the runtime.** And it makes sense, but what if you want to test your canister’s logic?

### Why was ICKit needed? 🤔

We care about how safe, reliable, and scalable our open internet services are, and to achieve these goals we had to solve the problem of testing the canister’s logic once and for all.

Since we use Rust internally to create most of our canisters we came up with a solution meeting our needs and making it so that also the community could use it so together we could serve the IC with more confidence.

**The \`ic-kit\` project is a wrapper around the APIs provided by the \`ic-cdk\` making it possible to mock and customize the behavior of the IC runtime in non-wasm builds so that you could do the tests with the tools we already love: \`\`\`cargo test\`\`\`**

You can check out the repository which contains documentation as well as examples on our GitHub:

[https://github.com/Psychedelic/ic-kit](https://github.com/Psychedelic/ic-kit "https://github.com/Psychedelic/ic-kit")

If you’re interested in the black magic that the \`ic-kit\` is doing, feel free to continue reading!

### How does ICKit work? 🧠

It comes down to conditional builds in rust and the **amazing \`cfg\` macro,** all of the IC system APIs which are accessible under \`ic_kit::ic::*\` module try to get the \`Context\` object based on the different build targets.

**We have two implementations for the \`Context\` object**, one that uses the actual methods provided by the wasm runtime, and another that gets a custom context object for the current execution thread, because \`cargo test\` runs tests in parallel and we want isolation for our test cases.

In your test cases, you can create a \`MockContext\` instance, customize it and then \`.inject()\` it to the current thread. After an injection, any calls to the system APIs on that thread will be routed and handled by that instance of \`MockContext\`.

This allows you to bind different values for primitive methods of the API such as \`ic::id(), ic::caller(), ic::balance()\` and more.

We also make it possible to **mock the behavior of inter-canister calls** by treating those as black boxes that you can describe.

The watcher API on the mock context also allows you to monitor any system API call or inter-canister call and the number of cycles spent that were made during a round of execution.

### Wrapping it up 👋

If you would like a live demo & more information on ICKit please **check out our YouTube presentation** [**here**](https://youtu.be/w5pzxzrlmN4)**!**

If you have any questions, please feel free to reach out to us on Discord. 👇

* Join our [Discord](https://discord.com/invite/yVEcEzmrgm)💬
* Follow us on [Twitter](https://twitter.com/FleekHQ) 🐦
* Subscribe to our [Youtube channel ](https://www.youtube.com/channel/UCBzlwYM0JjZpjDZ52-SLUmw)📺