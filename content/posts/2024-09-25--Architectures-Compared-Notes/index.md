---
title: SwiftUI Architectures Compared Notes
date: "2024-09-25"
template: "post"
draft: true
slug: "/posts/swiftui_architectures_compared_notes"
category: "Software Development Practice"
tags:
  - "Software"
  - "AI"
description: "SwiftUI Architectures Compared Notes"
---

# About

# Summary of Findings

# Example Feature

# Architectures

## TCA

### For and Against TCA

These are not my opinions from experience, but they do make sense with my current understanding of TCA.

* For
  * Highly opinionated architecture leading to more consistent overall approach to implementations over time
* Against
  * Steep learning curve and on-going complexity
  * Reliance on SPM still has issues when building apps
  * Overhead due to maintenance of a 3rd party library

## MVVM+Router (iOS 16+)

Constraints:
* Using iOS 16+ Navigation Stack + Navigation Path

Model View View-Model + Router

Examples:
* https://medium.com/fiverr-engineering/swiftui-navigation-part-1-infrastructure-a44c2a9f4b46
* https://github.com/bryan-vh/Voyager/tree/main
