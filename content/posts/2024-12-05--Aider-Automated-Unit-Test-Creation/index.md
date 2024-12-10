---
title: Semi-Automated Unit Test Writing with Aider Chat
date: "2024-12-08"
template: "post"
draft: false
slug: "/posts/aider_automated_unit_test_creation"
category: "Software Development Practice"
tags:
  - "Software"
  - "AI"
  - "iOS"
description: ""
socialImage: "./media/AI_Tools_Including_Aider.png"
---

# About  
Testing is a critical part of software development, ensuring functionality, reliability, and maintainability. With AI tools like [Aider Chat](https://aider.chat), automating the creation of unit tests becomes faster and less repetitive. In this post, I explore using Aider Chat to 'semi-automate' the writing of unit tests for an iOS project, highlighting its strengths, pitfalls, and strategies for success.

# Key Findings

- Key Strategies working with AI Assistant: 
  - Using an AI_CONVENTIONS (markdown) file significantly enhanced consistency and quality
  - Breaking the task into first writing the mocks, followed by the tests improved consistency in the output
- Best Performance: GPT-4o model produced the most reliable results
- Free Alternative: Gemini-1.5-pro-latest showed surprisingly good capabilities
- Success Rate: Most tests required manual adjustments but saved significant time on boilerplate code

# Getting Setup with Aider

## 1. Setting Up Aider  
Installation is straightforward through the official [Aider documentation](https://aider.chat/docs/install.html). Before diving in, set up [conventions](https://aider.chat/docs/usage/conventions.html) to guide Aider's behavior, such as an `AI_CONVENTIONS.md` file. This file can define consistent patterns, naming conventions, and dependency strategies to improve the quality of generated tests.

After writing ~ 6 tests, this is what my conventions file looked like, I expect this to grow over time

### Example AI_CONVENTIONS.md
```markdown
- Unit tests
  - When a mock already exists for a protocol in another file prefer to use that Mock instead of create a new one.
  - All new Mocks should go in a file '$(direrctory_name)Mocks' so we have a single file for each group of tests
  - When Asserting against enums that don't conform to Equatable prefer to use a pattern like  'guard case '.case(.subcase)' = .result else { fail } instead of making the enum implement Equatable
  - When testing URLComponents, there is no guaranteed order for the URL Query params, test for the existence of the parameter and the value, not asserting against the whole string
  - Each unit test should instantiate an instance of the entity being tested, and name this variable `sut`
  ```

Conventions can sometimes be specific to a certain domain or general across all tests. Aider has the facility to specify multiple conventions files allowing the flexibility to have a set of 'common' conventions, and then more specific conventions can be loaded for example when testing networking patterns, or local persistence.

## 2. Code Preparation: Dependency Management

A consistent dependency injection (DI) pattern is essential. In these tests I have used one of the most common and simple DI patterns which is to inject dependencies through the constructor, using protocols to abstract their interface from their implementation.

Here's an example of using dependency injection to wrap a NetworkLayer (protocol) within a class, decorating the functionality to create a JSONDecodingNetworkLayer:

```swift
class JSONDecodingNetworkLayer: DecodingNetworkLayer {
    private let wrapped: NetworkLayer

    init(wrapping networkLayer: NetworkLayer) {
        self.wrapped = networkLayer
    }
    // rest of functionality omitted for brevity
}
```

There are many of other valid and standardised patterns for dealing with dependencies for our code, the key thing is that there should be consistency across your project and that you are able to define your strategy concisely. This will significantly help your AI produce sensible output when writing tests.

## 3. Defining Expectations

While AI tools promise to streamline testing, they are not infallible. Your role as a developer includes:

- **Setting clear expectations:** Be clear in defining the behavior you want tested when reviewing the generated output.
- **Breaking tasks into smaller steps:** Split complex tests into manageable parts.
- **Reviewing output thoroughly:** Validate that tests accurately reflect your requirements.


# Workflow when Using Aider to Automate Unit Tests  

## Breaking Down the Process  

To get the best results with Aider, I followed a structured workflow:  

1. **Generate Mocks:** Start with the dependencies required to test the system under test (SUT).  
2. **Write Tests:** Use the mocks to create test cases.  
3. **Refine Iteratively:** Break down large goals into smaller subtasks and refine the output incrementally.

## Review the output against expectations

### Errors to Watch Out For

* **Superficial Tests:** Some generated tests looked correct but didn’t actually validate the SUT. Always review carefully.
* **Overcomplicated Solutions:** Early attempts sometimes produced convoluted tests. Simplify prompts and outputs for better results.
* **Enums and Dependencies:** Handling complex cases like enum matching required manual refinement.

### Example of Incorrect Testing Solution

Using o1-preview, the most advanced reasoning model from Open AI I asked it to create unit tests for the struct: HeadersModifier.

#### Struct being tested:

```swift
struct HeadersModifier: NetworkingModifier {
    
    private var headers: [String: String]

    init(headers: [String: String]) {
        self.headers = headers
    }
    
    func send<T: Decodable>(request: URLRequest, upstream: some DecodingNetworkLayer, decodeTo type: T.Type) async -> Result<T, NetworkIntegrationError> {
        var modifiedRequest = request
        for (key, value) in headers {
            modifiedRequest.setValue(value, forHTTPHeaderField: key)
        }
        return await upstream.send(modifiedRequest, decodeTo: type)
    }
}
```

#### Expectation:
1. I **expect** an instance of `HeadersModifier` to be instantiated injecting a range of constructor arguments for each test
2. I **expect** every scenario in the method to be covered
3. I **expect** the scope of the test to be limited to exactly the functionality within HeadersModifier

#### Testing approach from o1-preview:

```swift
// Within Setup
mockUpstream = MockDecodingNetworkLayer()
networkLayer = mockUpstream.addHeaders(["Authorization": "Bearer token"])

// Within test...
// When
let result: Result<SampleData, NetworkIntegrationError> = await networkLayer.send(originalRequest, decodeTo: SampleData.self)
```

The entity being tested with `networkLayer.send()` is actually of type `MockDecodingNetworkLayer`, which doesn't test the functionality of `HeadersModifier` at all!

`HeadersModifierTest` didn't instantiate an instance of `HeadersModifier`, so didn't clearly test the functionality of our System Under Test (SUT). Expectations 1 and 3 are not being met.

#### What was missing:

The biggest improvement to the process to solve issues like this was to break down the code writing process into 'baby steps'. In this case, these steps were:
1. Write whatever mocks were needed 1st
2. Then use these mocks to write the test

## Experiment for Free - Deliver with Paid

I found that a lot of the understanding of 'how to setup to test' was developed using a free model such as "gemini/gemini-1.5-pro-latest". Once I felt more confident in the setup, I moved to a paid model like 'gpt-4o' to improve the quality of the code completions.

# Testing Runs raw data and notes

For the end result in code, here is the [Pull Request](https://github.com/MBaldo83/public-swot-it-iOS-app/pull/1/files) I merged with the tests generated using Aider Chat.

| Model                                | System Under Test                                                                        | Result                                                  | Conventions Used                              | Comments                                                                             | Other Notes                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| gemini/gemini-1.5-pro-latest         | JSONDecodingNetworkLayer                                                                 | Didn’t compile; manually fixed                          | None                                          | Covered test cases but required manual fixes.                                        | Saved time on boilerplate.                                     |
|                                      | HeadersModifier                                                                          | Compiled successfully                                   | None                                          | Duplicated the Mock of NetworkLayer, creating redundancy.                            | First test used as a prompt example.                           |
|                                      | IdentityModifier                                                                         | Didn’t compile; manually fixed                          | None                                          | Covered test cases; boilerplate time saved.                                          |                                                                |
|                                      | IdentityModifier                                                                         | Compiled successfully                                   | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | Unexpected changes made to Identity.swift; changes respected conventions.            | Added conventions file to improve consistency.                 |
|                                      | RequestBuilder                                                                           | Compiled partially; 1 test failed                       | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | Issue with URL parameter order; revised test improved thoroughness.                  | Added incomplete code to RequestBuilderTests.                  |
|                                      | RequestBuilderDecodingEndpointNetwork                                                    | Didn’t compile; manually fixed enums                    | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | Struggled with comparing enum cases; manual fixes required using pattern matching.   |                                                                |
| o1-preview                           | HeadersModifier                                                                          | Crashed                                                 | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | HeadersModifier test didn’t instantiate the SUT, so the generated test was unusable. | Cost $0.15.                                                    |
| gpt-4o                               | HeadersModifier                                                                          | 1st pass didn’t compile; overcomplicated                | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | HeadersModifier test unusable due to complexity and compilation issues.              |                                                                |
| gpt-4o split between mocks and tests | HeadersModifier, IdentityModifier, RequestBuilder, RequestBuilderDecodingEndpointNetwork | 🏆<br>All test cases compiled successfully on first try | [AI_CONVENTIONS.md](#example-ai_conventionsmd) | Tests improved by splitting instructions into mock generation and testing.           | Reduced added files; minor manual syntax edits for guard case. |
