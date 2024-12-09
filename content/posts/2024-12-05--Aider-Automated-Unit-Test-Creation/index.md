---
title: Blasting through Unit Tests with Aider
date: "2024-12-05"
template: "post"
draft: true
slug: "/posts/aider_automated_unit_test_creation"
category: "Software Development Practice"
tags:
  - "Software"
  - "AI"
  - "iOS"
description: ""
socialImage: "./media/AI_Tools_and_Flutter.png"
---

# NOTES

## Setup for success when working through testing cases

### Aider Installation 

Installation instructions on website

### Use a standardised dependency replacement pattern 

In the code I'm testing I use a simple dependency injection pattern through the constructor of the class

The dependency's interface is defined as a protocol, which makes it easy for me to mock this functionality and test that the system under test functions as expected

### Define Conventions

- Aider allows you to provide a conventions file in markdown that allows you to define requirements for the code that you are asking the LLM to write

- read more about that here: 
- After writing ~ 6 tests, this is what my conventions file looked like, I expect this to grow over time
```
```

### Consider your expectations

It is tempting to imagine a future where your AI assistant happily churns through all of your unit tests and you can trust that it's writing maintainable code that does exactly what you want. We're not there yet! A common theme with every AI coding assistant I've explored in this series is that to get the best out of it, your role as the human is to:

1. Define clear expectations
2. Breakdown the goal into small tasks 
3. Refine the solution against your expectations

This is true for writing unit tests just as much as writing new software. Watch out for tests that *look* like they're testing what you want, but are  actually testing something else entirely.

Example: using o1-preview:

function being tested:

expectation:

Testing approach from o1-preview

HeadersModifierTest didn't instantiate an instance of HeadersModifier, so didn't really test the SUT (system under test)
Overcomplicated the solution, which 'passed', but didn't really test anything

What was missing...

5. Split the implementation into multiple parts, eg. writing a mock for the injected dependency, using the mock to write the tests. In more complex cases you could split the writing of the tests into each function you want tested.

6. Use a free model 1st then once you have a good setup, move to a paid model like 'gpt-4o'


Details of Test Runs Using Model: gemini/gemini-1.5-pro-latest

1. 1st run generating test:
* covered the cases
* didn't compile 
* wasn't able to fix through the chat
* manually updated the tests to pass
* (comment): still saved time on boilerplate

2 Testing HeadersModifier
* used the 1st test as an example in the prompt
* covered the test cases
* compiled successfully
* Duplicated the Mock of my NetworkLayer, so I ended up with 2 Mocks of the same protocol (unnecessary within the) same module

3 Testing IdentityModifier
* used the 1st test as an example in the prompt
* covered the test cases
* did not compile 
* wasn't able to fix through the chat
* manually updated the tests to pass
* (comment): still saved time on boilerplate

4 Testing IdentityModifier again, after adding AI_CONVENTIONS.md file
* used the 1st test as an example in the prompt
* used AI_CONVENTIONS.md
* covered the test cases
* Made some unexpected changes to an Identity.swift. I think this was because it expected the Identity protocol to be defined here and it wasn't. So it added the file to the chat and then modified it.
* (comment): Changes made to actually run the tests were good and they respected the conventions defined in the AI_CONVENTIONS file.

5 Testing RequestBuilder
* used the 1st test as an example in the prompt
* used AI_CONVENTIONS.md
* covered the test cases
* Made some unexpected changes to RequestBuilderTests, adding half completed nonsense at the end of the file
* Made 1 test that failed 50% of the time: 
  * `XCTAssertEqual(request?.url?.absoluteString, "https://example.com/test/path?param1=value1&param2=value2")`
    * there is no guarantee of the URL parameter order, we should be testing for the existence of 'param1=value' and 'param2=value2'
    * after asking to rewrite this line, it generated a very thorough test of the URLRequest returned testing each part of the URL and the request components

6 Testing RequestBuilderDecodingEndpointNetwork
* used the 1st test as an example in the prompt
* used AI_CONVENTIONS.md
* covered most test cases
* Struggled with comparing enum cases

Doesn't compile
```
guard case .requestError(let returnedError) = error, returnedError == networkError else { // Fail }
```

Fix - Use enum pattern matching properly
```
guard case .requestError(.unexpectedResponse) = error else { // Fail }
```

Test Runs Using Model: gemini/gemini-1.5-pro-latest

7 Testing HeadersModifier Using o1-preview
Main model: o1-preview with architect edit format
Editor model: gpt-4o with editor-diff edit format
Weak model: gpt-4o-mini
* Headers Modifier test crashed
* HeadersModifierTest didn't instantiate an instance of HeadersModifier, so didn't really test the SUT (system under test) at all
* Cost $0.15 for 1 run adding tests that I couldn't use 

Test Runs Using Model: gpt-4o

8 Testing HeadersModifier Using gpt-4o 
* Again made unusable test that didn't compile and was over complicated

9, 10, 11, 12 Testing HeadersModifier, IdentityModifier, RequestBuilder, RequestBuilderDecodingEndpointNetwork Using gpt-4o 
* improved example test to use SUT, 
* split the testing instruction into 2 parts: Firstly to write the mock, secondly to use the mock to write the test
* reduced the list of files being added
* covered the test cases
* compiled successfully 1st time
* some minor improvements edited manually with syntax for `guard case let test cases`

Exploring Scripting with Aider
Functionality exists with Aider to run aider commands through a script: https://aider.chat/docs/scripting.html
I spent some time trying to get this running to automate the testing of a collection of files, however, on this attempt the results were unsatisfactory since the aider 'chat' exits after each command. This restricts even simple refinements such as adding a new set of files.
I will be looking into a way around this in a future post.

General Comments:
* The results were improved by adding an AI_CONVENTIONS.md file providing a place to guide consistency across the tests such as how to handle non-equatable enum models
* The results were also improved by breaking down the testing task into 2 parts; firstly writing the requiried mocks and then writing the tests.
* As with other sessions using AI assisted coding, as a workflow it's advised to 1st consider what you the expect the outcome of the code you're writing to be *before* running the code generation. Expect to take time checking that your expectations have been met before moving on.
* The best results in these sessions was produced with the gpt-4o model. However, the free model 'gemini-1.5-pro-latest' was surprisingly good, and provides a good free alternative.

# About

# Summary of Findings

## Key Takeaways

### What works well

### What to watch out for

### Future Speculation!