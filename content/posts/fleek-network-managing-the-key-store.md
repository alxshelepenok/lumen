---
template: post
draft: false
title: 'Fleek Network: Managing the key store'
slug: fleek-network-managing-the-key-store
date: 2023-01-02T23:00:00Z
canonical: ''
socialImage: https://storageapi.fleek.one/fleek-team-bucket/fleek-network-managing-the-keystore.png?202301021625
description: An explainer on how to manage the key store
category: Tutorial
tags:
- DCDN
- Guide
- Getting Started
- Fleek Network
- Keystore

---

![](https://storageapi.fleek.one/fleek-team-bucket/fleek-network-managing-the-keystore.png?202301021625)

## Introduction

Fleek Network incentivises participation by rewarding it's node providers. A node is identifiable by an identity, which the reward mechanism uses to identify the node to reward it! 

We'll use the term identity to describe the key store declared in the configuration file, in our case a [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail). Remember to keep this file secret 🙏!

The key store is in the file system and the location defined in the Fleek Network
`config.toml`, as a private key stored in an identity named PEM file (by default `default.pem`).

This is interesting, as you may want to move to a new server setup and persist the identity you had originally from another server, let's say!

The following will guide you through some of the fundamentals to help understand how to manage the key store at the very basics, and help you persist the key store identity, in any supported system you're migrating to.

## Topics
  - [Configuration file](#configuration-file)
    - [Locating the file](#locating-the-file)
    - [Configuration sections](#configuration-sections)
    - [Identity selection](#identity-selection)
  - [Identity](#identity)
    - [Type of keys](#type-of-keys)
    - [Key privacy](#key-privacy)
  - [Conclusion](#conclusion)

## Configuration file

### Locating the file

The Ursa CLI has a configuration file in the home directory of the user, which is located in the path `$HOME/.ursa` or `~/.ursa` under the name `config.toml`. 

💡 The tilda in `~/.ursa` represents `$HOME` which is simpler, but we'll use `$HOME` to make it easy to follow.


If you log in with `root` user that'll be:

```sh
/root/.ursa
```

If you log in with another user, let's say `fleek` this means:

```sh
/fleek/.ursa
```

At anytime, you can check which user you are logged in with by running the command:

```sh
whoami
```

Here's an example of our user `fleek`, which for the command above outputs:

```sh
fleek
```

Now that you know where to locate the configuration file for any given user you are logged in with, learn about the [Configuration sections](#configuration-sections).

### Configuration sections

The Fleek Network node configuration settings are located in the path `$HOME/.ursa/config.toml`, and it's organized by configuration sections.

At time of writing, we have the following sections:
- Network config
- Provider config
- Server config

Each of the sections, hold a number of property names and values. If you are accustomed to the [JSON](https://en.wikipedia.org/wiki/JSON) or [YAML](https://en.wikipedia.org/wiki/YAML) formats, you'll find the TOML format a bit similar (if you'd like to learn more about the TOML file format, read about it [here](https://toml.io/en/)).

By default, the Ursa CLI configuration file (config.toml) is similar to:

```sh
[network_config]
mdns = false
relay_server = true
autonat = true
relay_client = true
bootstrapper = false
swarm_addr = "/ip4/0.0.0.0/tcp/6009"
bootstrap_nodes = ["/ip4/159.223.211.234/tcp/6009/p2p/xxxx", "/ip4/146.190.232.131/tcp/6009/p2p/yyyyy"]
database_path = "/root/.ursa/data/ursa_db"
identity = "default"
keystore_path = "/root/.ursa/keystore"

[provider_config]
local_address = "0.0.0.0"
port = 8070
domain = ""
indexer_url = "https://dev.cid.contact"
database_path = "/root/.ursa/data/index_provider_db"

[server_config]
port = 4069
addr = "0.0.0.0"
```

⚠️ Beware that the configuration file might look a bit different depending on the version you're running and the current development features in place by the Fleek Network dev team.

Some advanced use-cases might require to deal with the host and port number binding, depending on the service provider needs and customisation. We'll keep things simple and assume the default settings!

In this guide, we are interested in the `network_config` section settings for the `keystore_path` which defaults to `/root/.ursa/keystore`.

💡 The identity is a text description for the keystore and at time of writing we have not yet implemented multiple identity management via the CLI. Thereupon, the identity value serves to find the filename match in the `keystore_path`. This might change as we progress with development. Check the [Identity selection](#identity-selection) to learn more about it!

### Identity selection

Multiple identity management is yet to be implemented but in any case, some users might find it trivial to keep multiple identities and switch between them referencing them by name.

Let's suppose that we've recently moved to a new server setup and copied our previous server keystore as `old-server-keystore.pem` and renamed the `$HOME/.ursa/keystore/default.pem` to `new-server-keystore.pem`.

Here's an example of how our `$HOME/.ursa/keystore` directory would look like:

```sh
.
├── new-server-keystore.pem
└── old-server-keystore.pem

0 directories, 2 file
```

The `old-server-keystore.pem` is the original keystore and `new-server-keystore.pem` a brand new identity we got when completed setup the node in the new system.

As we have our `network_config` -> `identity` set as `default` and `network_config` -> `keystore_path` defined as `/root/.ursa/keystore`, we have to change it! We can switch to an existing identity by providing the filename before the node initialisation! 

Set the identity name in the `network_config` -> `identity` to a matching PEM file that exists in the `keystore_path`. For our example, that'd be `new-server-keystore` or `old-server-keystore`.

💡 Name the PEM files as you wish, we have used the naming above to make it as clear as possible.

## Identity

When you run a node, there's a private key which is used to compute a public key that your node is identified with. 

If another party holds the private key, they can control the identity, e.g. have access to the rewards. For this reason, it's important to have at the very least a basic understanding of how identity works in Fleek Network.

### Type of keys

There are two types of keys related to the identity your node is configured to run with, the private and public keys! 

💡 The public-key cryptography curve used for our key store is the [ed25519](https://en.wikipedia.org/wiki/EdDSA)

The public key is open to anybody to see and it represents a unique node in the Fleek Network, a bit like a bank account number. On the other hand, the private key is secret and the operator is responsible to store it privately!

The Fleek Network relies on cryptography, thus it's not possible to the Fleek Network team to access, compromise or manipulate the secrets of an identity. On the other hand, the public key can be used by anyone, Fleek Network included, to identity a node or send rewards to the address without jeopardizing the identity security!

### Key privacy

If you don’t keep your private key a secret, you have your node compromised.

Here are few examples of what you should not do:
- Share your `$HOME/.ursa/keystore` directory files publicly
- Track the `$HOME/.ursa/keystore` directory files in a version control repository e.g. git
- Have poor "rights" permissions in UNIX systems e.g. everyone can read, delete, modify `$HOME/.ursa`, etc
- Allow anyone to access the node provider physically without any access control to the operating and file systems
- Get rid of a hard drive unformatted or blind erased by selling to somebody or dumping in the bin, which contains `$HOME/.ursa/keystore`

There are many other ways of getting compromised, but hopefully the ones put above give you a good starting idea!

Remember, the node provider is the only one responsible when managing the key store! Neither Fleek Network, nor the most sophisticated AI system presently can compromise the cryptography in use to help you out.

## Conclusion

We've walked through the most basics of where the configuration file is located, the configuration settings we use to setup and run the node, the different configuration sections we have, but most importantly the identity section.

Additionally, a brief guide on the [identity](#identity), more specifically an introduction to the [type of keys](#type-of-keys) and [key privacy](#key-privacy), which we find important to understand for anyone seriously interested in running a node by hinting into some system administration and security principals.

In the future, we'll introduce more advanced topics that will help you improve into the knowledge you get from this, but we are glad that you followed this guide and got some comprehension to help you manage the key store.

While we do our best to provide the most clear instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!
