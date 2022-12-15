---
template: post
draft: false
title: 'Fleek Network: How to deal with files using Content Addressable aRchives'
slug: fleek-network-packing-content-addressed-data
date: 2022-12-13T13:00:00.000+00:00
socialImage: https://storageapi.fleek.co/fleek-team-bucket/fleek-network-how-fleek-network-deals-with-files.png?202212131140
canonical: ''
description: How to deal with files using Content Addressable aRchives
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- GIT
- CAR
- Content Addressable aRchive

---

![](https://storageapi.fleek.co/fleek-team-bucket/fleek-network-how-fleek-network-deals-with-files.png?202212131140)


## Introduction ☀️

Fleek Network uses the IPLD CAR ([Content Adressable aRchive](https://ipld.io/specs/transport/)) as the data structure and packing of data in the network. IPLD provides the primatives to share valuable information in a flexible and extensible manner across the network for the semantic web or Linked Data vision of the next web 🔮. 

In this guide, we'll look into what we have in the web today for accessing files 🕸, the web of tomorrow, the importance of immutable data, hash functions, content addressability, metadata and a practical hands down approach on handling of files in Fleek Network ⚡️.

## Prerequesites

To follow this guide, you will need:

- Some experience with command-line interfaces

For other topics, check our [getting started guide](https://blog.fleek.co/posts/fleek-network-getting-started-guide).

### Table of Contents

- [How Fleek Network deals with files](#how-fleek-network-deals-with-files)
  - [Immutability](#immutability)
  - [Content Addressing](#content-addressing)
  - [Hash functions](#hash-functions)
  - [Interplanetary linked data (IPLD)](#interplanetary-linked-data-ipld)
  - [Content Addressable aRchive (CAR)](#content-addressable-archive-car)
- [Using CAR files](#using-car-files)
  - [Command line tools](#command-line-tools)
    - [IPFS Kubo](#ipfs-kubo)
    - [Adding files to IPFS](#adding-files-to-ipfs)
    - [Creating CAR files](#creating-car-files)
    - [IPFS-CAR library and CLI tool](#ipfs-car-library-and-cli-tool)
- [Final thoughts](#final-thoughts)

***

# How Fleek Network deals with files?

The way content is handled, stored and distributed defines how trustworthy is a protocol 🤞. Some of the primitives to achieve it, has roots in immutability, verification, the [Semantic Web](https://www.w3.org/standards/semanticweb/) and [Linked Data](https://www.w3.org/standards/semanticweb/data). 

When you use Fleek Network, you either provide your data packed into a format called a Content Archive ([CAR](https://ipld.io/specs/transport/car)) or an existing [CID](https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid) of a CAR file, which hash addresses are unique and universally addressable 🛸.

## Immutability

Some of the principles that help us provide guarantees to end-users,
require a high-ability for content verification, as a consequence, immutability of files are critical to the system. To emphasize, immutability means the state of not changing, or being unable to change!

The web is nothing more and nothing less than a mirror of what it has become from within and among its main actors, the service providers, the central authorities 👮🏻 and the powers they have when managing user files.

Fleek Network deals with files in a manner where the content determines the address in which the user of the system can locate and verify it unquestionably 👩🏽‍⚖️. This is possible due to cryptography, of which the same data always produce the same hash deterministically.

A file whose content determines the hash, but also impossible to invert it. We shouldn't be able to reconstruct the data from a hash. It's unique, not two files produce the same file or content. Thus, a small change in the content should always generate a completely different hash.

In retrospect 👵🏼, what we have on the web today are files accessible via a URL address and the problem with this approach is that the content is not intrinsically tight to the address e.g. the content can change and the URL remains the same. That is the problematic way we access files on the web today, which we call "Location addressing", and the way we solve it for the web of tomorrow, is called "Content addressing".

> When content is immutable, we can verify its integrity and thus provide the ability get the content from anyone and everywhere. The ability to get it from anywhere, lead us to the decentralised and distributed nature of content storage and delivery in the Fleek Network.

## Content Addressing

Content addressing is where we use a hash to access the content, and which allow us to verify that the content we received is the content we asked for 📢! For this we use a special hash called CID ([Content Identifier](https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid)), a cryptography hash function that maps input of arbitrary size to output of a fixed size - the content identifiers are short, regardless of the size of the content, and the address does not actually tell us where the content is stored. It's also interesting to observe, that the CID is a sort of string like binary that is human-friendlier in comparison to the underlying binary, which is way longer 🤖.

> Caching and deduplication are possible due to immutability of content e.g. if content changes, let's say that an image has some new detail, the files share many of the same bytes. The amount of data we have to transfer to fetch is minimum, we'd only pull the difference. In today's web, we'd have to transfer both files in full, which is a worse path on resource allocation and performance.

## Hash functions

The hash function for creating [CID's](https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid) use `sha-256`, but there is support for other hashing algorithms, such as sha1 (used by Git), sha2-256, sha3-255, blake2b-160, etc. Some older algorithms are proven not to be collision free, so if algorithms can break, we have to switch the hash algorithm we use in the future! The problem with this switching of algorithms is the need to find a future proof way of identifying the hash functions used to generate the hash, as well as the hash name.

[Multihash](https://multiformats.io/multihash/) is a protocol that comes into play to provide us the valuable metadata for future proofing. 🙋‍♀️ To explain it in simple terms we'll provide an example, it is the composition where a hash is placed at the end, a prefix as a number to identify the algorithm used and a number to identify the hash name. Thereafter, we'd start raising some questions. With the simple example provided here, how would we get the data back without the ability to identify how it was encoded? Some users could use [cbor](https://en.wikipedia.org/wiki/CBOR), [protocol buffers](https://en.wikipedia.org/wiki/Protocol_Buffers), [json](https://en.wikipedia.org/wiki/JSON), etc; and there might be plenty of good reasons why of those choices. Maybe it's a compact binary encoding that is very efficient for storage, or easy to work with, etc.

What's important is that it is the user's choice and why [IPLD](https://ipld.io) becomes useful for Fleek Network's use-cases. A system for understanding and working with data, made up of a [Data Model](https://ipld.io/docs/intro/hello-world/#data-model-and-codecs) and [Codecs](https://ipld.io/docs/intro/hello-world/#data-model-and-codecs), some tools for [Linking](https://ipld.io/docs/intro/hello-world/#linking), and then a handful of other [Powerful Features](https://ipld.io/docs/intro/hello-world/#powerful-features) that help ups 👷 develop a decentralized application.

## Interplanetary linked data (IPLD)

[Interplanetary linked data (IPLD)](https://ipld.io/) provides us all the metadata prefixes to soothe the system needs, and provides us the data model of the content-addressable web, as discussed earlier. IPLD is a set of conventions for creating decentralised data-structures that are universally addressable and linkable.

> These addressable and linkable data structures will allow us to do for data what URLs and links did for HTML web pages (Quote from [IPLD](https://ipld.io/docs/)).

## Content Addressable aRchive (CAR)

For all the reasons demonstrated here 💁‍♀️, Fleek Network uses the IPLD CAR [Content Addressable aRchive](https://ipld.io/specs/transport/) to transport IPLD data. IPLD defines transport as file and stream format, meaning packing IPLD data together and interactivity that involves requests and responses.

As discussed above in [Hash functions -> multihash](#hash-functions), the CAR files contain data encoded in a particular codec, in the Fleek Network, we support any IPLD codec, e.g. [dag-pb](https://ipld.io/docs/codecs/known/dag-pb/), which uses a stricter subset of Protocol Buffers to encode an object graph.

> [DAB-PB](https://ipld.io/docs/codecs/known/dag-pb/) is a codec that implements a very small subset of the IPLD Data Model in a particular set Protobuf messages. But there are other known [codecs](https://ipld.io/docs/codecs/known/).

Fleek Network only works with car files ([CARv1](https://ipld.io/specs/transport/car/carv1/)) and ([CARv2](https://ipld.io/specs/transport/car/carv2/)) soon, this means that it only computes car files, as input and output! Therefore, the decoding of the files is handled by the clients. We're still on early development days, where a client library is in early development, which should abstract some possible hurdles, and simple to use 🌈.

# Using CAR files

As shared above in our discussion about the supported codecs, such as [DAB-PB](https://ipld.io/docs/codecs/known/dag-pb/) for [Content Adressable aRchive (CAR)](#content-addressable-archive-car), inside these object graphs, we find a [UnixFS](https://github.com/ipfs/specs/blob/main/UNIXFS.md) object describing files, directories and symlinks. So, let's have a brief look at it.

To get us started, we'll take a look into some command line tools to help us create and interact with CAR files. In the future, we'll look into how to integrate these in your projects by looking at libraries, SDK's, etc.

## Command line tools

### IPFS Kubo

[IPFS Kubo](https://docs.ipfs.tech/install/command-line/) is a [Go](https://go.dev) based implementation of the InterPlanetary File System (IPFS) protocol. Official binary distributions are provided, if you are not planning to build it yourself from source.

Follow the instructions to install it [here](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions).

> Some users might refer to IPFS Kubo as `go-ipfs`, the previous name.

IPFS Kubo supports exporting any IPFS object graph into a CAR file and importing data from CAR files into your local IPFS repository.

Once "IPFS" is installed, you should do a quick healthcheck to confirm its working correctly:

```sh
ipfs --version
```

Here's how the output should look like (the version you find below is illustrative only, yours might be slightly different):

```sh
ipfs version X.X.X
```

### Adding files to IPFS

Initialise IPFS on your machine, to generate an IPFS repo with a standard default configuration file. The config file is saved as config in your repo root directory by default `~/.ipfs/config`. If interested in learning more about the config, check the [docs](https://docs.ipfs.tech/how-to/default-profile/).

To initialise IPFS, run:

```sh
ipfs init
```

Here's how our output looks like, yours will be slightly different but similar.

```sh
generating ED25519 keypair...done
peer identity: XXXXXXXXXXXXXXXXXXXXXXX
initializing IPFS node at /Users/<YOUR-USERNAME>/.ipfs
```

Find all subcommands available by running:

```
ipfs --help
```

Let's create a new file to use as an example afterwards, a file called `hello.txt` that has some content:

```sh
echo 'Hello world!' > hello.txt
```

Add the file by using the `add` subcommand, as follows:

```sh
ipfs add hello.txt
```

We're not running the IPFS daemon, it'll just add the file locally.

The output should look like:

```sh
added QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM hello.txt
 13 B / 13 B [==================================================] 100.00%
```

The CID for our `hello.text` is `QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM`, this is the content's cryptographic hash. If the file content changes, the hash will change, otherwise if the file's content's the same, the hash will always be the same, as described [here](#immutability).

💡 Notice that our string starts with a "Qm" which refers to the v0 of CID. The v1 of CID starts with "Bafy", or "Bafk" sometimes. You can learn a lot from the CID by using the [cid.ipfs.tech](https://cid.ipfs.tech/#QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM) tool. We can do [CID conversion](https://docs.ipfs.tech/concepts/content-addressing/#cid-conversion) from v0 to v1 using the ipfs cli.

Now that we have a CID `QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM`, we can read the content out of IPFS just as we'd do with a regular `cat` command when reading a content of a file.

```sh
ipfs cat QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM
```

We'll get the same output, as the input provided above when we created the `hello.txt` file.

```sh
Hello world!
```

When we execute `ipfs cat` to read the file content, it returns the content of the file, not the `hello.txt` file.

Let's takes the output of our echo "Hello world" (stdout) and pass directly on the standard input (stdin) of ipfs add.

```sh
echo 'Hello world!' | ipfs add
```

```sh
added QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM
 13 B / 13 B [==================================================] 100.00%
```

You'll always get the same hash, because as far as IPFS is concerned, it is the same content and the filename doesn't matter.

## Creating CAR files

To create a CAR file using [IPFS Kubo](#ipfs-kubo), you can redirect the output of ipfs dag export to a file. Here's an example:

```sh
ipfs dag export <CID> > path/to/filename.car
```

💡 Notice that when we mention `path/to/filename.car`, that's literally asking you to provide a location in your filesystem where to save the file to.

We have the CID `QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM` we got earlier, let's create a `basic.car` file.

We do this by redirecting the output of the ipfs dag export to the new `basic.car` file.

```sh
ipfs dag export QmXgBq2xJKMqVo8jZdziyudNmnbiwjbpAycy5RbfDBoJRM > ./basic.car
```

We'll get the output:

```sh
0s  113 B / ? [---------------------=----------------------] 998 B/s 0s
```

Also, we should find the file we just created in our current work directory. Use the `ls` to list directory contents.

```sh
drwxr-xr-x  3 fleek  staff   96 14 Dec 16:08 .
drwxr-xr-x  5 fleek  staff  160 14 Dec 16:08 ..
-rw-r--r--  1 fleek  staff  113 14 Dec 16:08 basic.car
```

Depending on where you've saved the file, the list should be different but your file should be located there, in the path you have provided earlier.

If you inspect the content of the `basic.car`, you'll notice that there are some funny 
characters. The content is encoded and thus not used as it is to access data.

## IPFS-CAR library and CLI tool

There's a [library](https://github.com/web3-storage/ipfs-car) and CLI-tool for the purpose of packing and unpacking files.

If you are interested, check the repository for the project to install it, [here](https://github.com/web3-storage/ipfs-car).

Otherwise, if you have nodejs setup on your system, you can do a quick check and run some commands by preceeding the package name with `npx`. 

We're assuming that you have the `basic.car` provided in our guide [Creating CAR files](#creating-car-files), or create a new file to use as an example.

The file we're creating gets the output from [here](http://ipfs.io/ipfs/bafybeieqjclrxiva2tqfuii7kyc5fhggncetd5g5gdm5esxh2egmdwuqee), as the filename `planet.jpg`. You can provide a different name if you wish.

```sh
curl http://ipfs.io/ipfs/bafybeieqjclrxiva2tqfuii7kyc5fhggncetd5g5gdm5esxh2egmdwuqee -o planet.jpg
```

We can then pack `planet.jpg`, if an `--output` is not provided it defaults to the base filename.

```sh
npx ipfs-car --pack planet.jpg --output planet.car
```

Where output:

```sh
root CID: bafybeicfhsvyehkt2nfmcln43htotivt6yglb4zysuv2l3xzzu4kb2c63q
  output: planet.car
```

Could then list the content:

```sh
npx ipfs-car --list planet.car
```

The output:

```sh
bafybeicfhsvyehkt2nfmcln43htotivt6yglb4zysuv2l3xzzu4kb2c63q
bafybeicfhsvyehkt2nfmcln43htotivt6yglb4zysuv2l3xzzu4kb2c63q/planet.jpg
```

Then after, if you unpack you'll get the corresponding directory and filename:

```sh
npx ipfs-car --unpack planet.car
```

Under the `bafy...63q` we have the `planet.jpg` file that holds our original content gathered via the curl command.

```sh
.
├── bafybeicfhsvyehkt2nfmcln43htotivt6yglb4zysuv2l3xzzu4kb2c63q
│   └── planet.jpg
├── planet.car
└── planet.jpg
```

The `ipfs-car` is a thin wrapper over [@ipld/car](https://github.com/ipld/js-car) and [unix-fs](https://github.com/ipfs/js-ipfs-unixfs). If your use-case requires you to do more, then you're much better looking deeper into the subject, which is out-of-scope for this guide, we're afraid.

## Final Thoughts

We've looked into the current state of the web today, how's the current state of accessing files,and the web of tomorrow. 🤖 Discussed some of the principles inline with the Fleek Network, such as the importance of immutable data, hash functions, content addressability, metadata, etc.

We have then provided a [demonstration](#creating-car-files) of how to deal with files in the Fleek Network. Keeping things simple to get you started into dealing with Content addressed data 🙃.

While we try our best to provide you with the best information, we are not free of typos and software updates. 👌 Feel free to provide us any feedback to help us improve our guides!

Discover more about the project by watching or contributing on [Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!