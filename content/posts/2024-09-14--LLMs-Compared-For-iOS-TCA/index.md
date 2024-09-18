---
title: LLMs Compared when writing a SwiftUI Feature using The Composable Architecture (TCA)
date: "2024-09-14"
template: "post"
draft: false
slug: "/posts/ai_lllms_compared_for_ios_tca"
category: "Sofware Development Practice"
tags:
  - "Software"
  - "AI"
description: "LLMs Compared For Writing iOS Swift using The Composable Architecture"
---

# About
A comparison between [Chat GPT - Swift Copliot GPT](https://chatgpt.com/g/g-L9NbS395h-swift-copilot), [Cursor (using Claude 3.5 Sonnet)](https://www.cursor.com) and [Microsoft Copilot](https://copilot.microsoft.com/) in their ability to code a *clearly defined* SwiftUI feature using the *strongly opinionated* pattern of [The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture).

## Purpose

- Understand the difference in output quality of the AI tools being compared
- Insights into best practice for iOS development with AI tooling support
- Reveal common traits of the tools
- Provide a data point to compare the quality of AI development tools for Swift UI Application development

# Summary of Findings

| Model                                      | Prompts | Compiled Immediately | Build Errors | Changes Required Before Compiling               | Score  |
| ------------------------------------------ | ------- | -------------------- | ------------ | ----------------------------------------------- | ------ |
| Cursor Claude 3.5 Sonnet <br>(2nd attempt) | 1       | Yes                  | 0            | 0                                               | 77.78% |
| Chat GPT-4 Swift Copilot GPT               | 5       | Yes                  | 0            | 0                                               | 55.56% |
| Chat GPT-4 Swift Copilot GPT               | 1       | No                   | 5            | 1 file changed, 5 insertions(+), 6 deletions(-) |        |
| Cursor Claude 3.5 Sonnet <br>(1st attempt) | 7       | No                   | 6            | 1 file changed, >20 lines modified              |        |
| Microsoft Copilot (GPT-4)                  | 2       | No                   | 14           | Unable to Build                                 |        |


- [Chat GPT - Swift Copliot GPT](https://chatgpt.com/g/g-L9NbS395h-swift-copilot)
- [Microsoft Copilot](https://copilot.microsoft.com/)
- [Cursor](https://www.cursor.com)

# Key Learnings

- Having a very clear idea of what you want your code to look like before starting to code with language gives better results, the prompt should give detailed and clear instructions about the expected output
- [Cursor](https://www.cursor.com) improved considerably after 'teaching' it about latest syntax and fixing bugs in attempt 1
- Using an architecture where the syntax has changed considerably between latest and previous versions degraded the results
- Decision making between a 'working' approach, and a 'good' approach is the most time-consuming *human* part
- A lot of the approaches above actually use the same underlying LLMs (GPT-4 / 4o) and the same mistakes appear in multiple tools
- Compared to a hand-written implementation, all of the implementations have issues

# Details

### Coding requirements:
* A TextField where the user can input a topic.
* A Button that, when tapped, triggers an action to load questions related to the entered topic.
* A List that displays all the questions fetched from a mock API based on the topic.
* A Loading Spinner (ActivityIndicator) that appears while the questions are being fetched.
* If no questions are found, the list should appear empty.

### Prompts
The prompts have remained failry similar, however I have made some variations due to the context in which they are given. Eg I have not used "As a Principle iOS Engineer" when prompting within a development IDE. Also, the initial prompt to Chat GPT was less strict in the requriments, however experience showed that better results could be obtained by being more detailed and specific in the language in the prompts

## Cursor

### 1st Attmpt - New Project

#### Prompt
```
I need you to write Swift code for a SwiftUI feature using The Composable Architecture (TCA) pattern - https://github.com/pointfreeco/swift-composable-architecture that includes:
* A TextField where the user can input a topic.
* A Button that, when tapped, triggers an action to load questions related to the entered topic.
* A List that displays all the questions fetched from a mock API based on the topic.
* A Loading Spinner (ActivityIndicator) that appears while the questions are being fetched.
* If no questions are found, the list should appear empty.

Use The Composable Architecture (TCA) structure, ensuring that the code is:
* Modular, clean, and testable.
* Built with the following components:
  * View: A SwiftUI view that displays the text field, button, list of questions, and loading spinner.
  * Feature: A Struct that contains the reducer logic, handles how actions modify the state, including setting loading state, handling results, and updating the view accordingly.
    * Within the Feature struct
       * State: Holds the user's topic input, the loading state, the fetched questions, and a flag for handling empty results.
       * Action: Triggers for text input changes, button taps, starting the API call, receiving the API response, and finishing loading.
  * APIClient: Simulates a simple API call using a delay. This should be a dependency that can be used by the Feature

Ensure that:
* If the API call returns no questions, display an empty list with no error message.
* While the API call is in progress, show a loading spinner in place of the list.
* You provide comments to explain each part of the architecture.
* The code is concise, avoiding unnecessary complexity.
* Do not include unit tests in the code. Return the complete code as a single file that can be copied directly and run in an existing XCode project
```
### Results
Did not compile ❌, required 7 subsequent prompts to compile

### 2nd Attmpt - Same Project

#### Prompt
same as 1st attempt - see above

### Results
Compiled immediately ✅, highest scoring result 🏆

## Chat GPT Swift Copilot GPT

### 5 Prompt Attempt

#### Prompt 1:
```
As a Principle iOS Engineer I want you to help me write functional Swift code that compiles.

Architecture Pattern: The Composable Architecture - https://github.com/pointfreeco/swift-composable-architecture

Requirements: 
1. Create a Swift UI View that has one text field to enter a topic, and one button to load questions using the text entered by the user.

Assumptions: Assume I already have an XCode project created and that I have already imported The Composable Architecture dependency in my project

Output: Firstly Provide the Names and functions of the entities that will be needed to build the feature
```

#### Subsequent Prompts:

```
Make the Reducer functionality be part of a struct or class?

modify the code above to move the QuestionState QuestionAction and QuestionEnvironment inside the QuestionFeature

Actually please take the Environment out of the QuestionFeature, and make it a separate struct called QuestionAPI

Now please provide the code in a single file containing the QuestionView, the QuestionFeature and the QuestionAPI
```

### Results
Compiled immediately ✅

### 1 Prompt Attempt

Stage 1 - Crafted The Prompt (used 1st stage to ask Chat GPT to recursivley critique the prompt to build the prompt below)

```
You will act as an expert Swift developer specializing in The Composable Architecture (TCA) pattern - https://github.com/pointfreeco/swift-composable-architecture 

I need you to write Swift code for a SwiftUI feature using TCA that includes:
* A TextField where the user can input a topic.
* A Button that, when tapped, triggers an action to load questions related to the entered topic.
* A List that displays all the questions fetched from a mock API based on the topic.
* A Loading Spinner (ActivityIndicator) that appears while the questions are being fetched.
* If no questions are found, the list should appear empty.

Use The Composable Architecture (TCA) structure, ensuring that the code is:
* Modular, clean, and testable.
* Built with the following components:
  * View: A SwiftUI view that displays the text field, button, list of questions, and loading spinner.
  * Feature: A Struct that contains the reducer logic, handles how actions modify the state, including setting loading state, handling results, and updating the view accordingly.
    * Within the Feature struct
       * State: Holds the user's topic input, the loading state, the fetched questions, and a flag for handling empty results.
       * Action: Triggers for text input changes, button taps, starting the API call, receiving the API response, and finishing loading.
  * APIClient: Simulates a simple API call using a delay. This should be a dependency that can be used by the Feature

Ensure that:
* If the API call returns no questions, display an empty list with no error message.
* While the API call is in progress, show a loading spinner in place of the list.
* You provide comments to explain each part of the architecture.
* The code is concise, avoiding unnecessary complexity.
* Do not include unit tests in the code. Return the complete code as a single file that can be copied directly and run in an existing XCode project
```

### Results
Did not compile ❌, required 5 line changes to compile

## Microsoft Copilot

#### Prompt 1:
```
You will act as an expert Swift developer specializing in The Composable Architecture (TCA) pattern - https://github.com/pointfreeco/swift-composable-architecture 

I need you to write Swift code for a SwiftUI feature using TCA that includes:
* A TextField where the user can input a topic.
* A Button that, when tapped, triggers an action to load questions related to the entered topic.
* A List that displays all the questions fetched from a mock API based on the topic.
* A Loading Spinner (ActivityIndicator) that appears while the questions are being fetched.
* If no questions are found, the list should appear empty.

Use The Composable Architecture (TCA) structure, ensuring that the code is:
* Modular, clean, and testable.
* Has a Swift UI View called 'TopicInputView' that has one text field to enter a topic, and one button to load questions using the text entered by the user.
* The State of the view should be maintained by a TopicInputFeature Reducer, which is a struct that contains the reducer logic, handles how actions modify the state, including setting loading state, handling results, and updating the view accordingly.
  * Within the TopicInputFeature struct
     * State: Holds the user's topic input, the loading state, the fetched questions, and a flag for handling empty results.
     * Action: Triggers for text input changes, button taps, starting the API call, receiving the API response, and finishing loading.
* The API call should be made by a TriviaAPIClient that can be used by the Reducer as a dependency

Ensure that:
* If the API call returns no questions, display an empty list with no error message.
* While the API call is in progress, show a loading spinner in place of the list.
* You provide comments to explain each part of the architecture.
* The code is concise, avoiding unnecessary complexity.
* Do not include unit tests in the code. Return the complete code as a single file that can be copied directly and run in an existing XCode project
```
#### Prompt 2:

```
Can you modify the code to put the reducer functionality inside a struct called TopicInputFeature
```

### Results
Did not compile ❌, could not change to compile ❌

## Scoring Criteria

| Scoring Criteria                                                | Cursor Claude 3.5 Sonnet <br>(2nd attempt) | Chat GPT-4 Swift Copilot GPT |
| --------------------------------------------------------------- | ------------------------------------------ | ---------------------------- |
| Has View, Feature, Client Dependency                            | 1                                          | 1                            |
| View - topic is bound to feature state                          | 1                                          | 1                            |
| Feature - uses "@Reducer" macro                                 | 0                                          | 0                            |
| Feature - uses "@ObservableState" macro                         | 0                                          | 0                            |
| Feature uses "var body: some ReducerOf<Self>" syntax            | 1                                          | 0                            |
| Feaure has "@Dependency"                                        | 1                                          | 1                            |
| API Client extends "DependencyKey"                              | 1                                          | 0                            |
| API Client uses struct API pattern                              | 1                                          | 1                            |
| API Client uses "async throws" and returns a Model (not Result) | 1                                          | 1                            |
| Score                                                           | 77.78%                                     | 55.56%                       |
