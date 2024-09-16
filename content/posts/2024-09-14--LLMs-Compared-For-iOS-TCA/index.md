---
title: LLMs Compared when Writing SwiftUI Application using The Composable Architecture
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
Comparison between [Chat GPT - Swift Copliot GPT](https://chatgpt.com/g/g-L9NbS395h-swift-copilot) and [Microsoft Copilot](https://copilot.microsoft.com/) in their ability to code a well defined SwiftUI feature in the pattern of [The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture).

# Purpose

- Understand the difference in output quality of the AI tools being compared
- Reveal common traits of the tools
- Provide a data point to compare the quality of AI development tools for Swift UI Application development

# Summary of Findings

| Model                           | Prompts | Compiled Immediately | Build Errors | Changes Required Before Compiling               |
|---------------------------------|---------|----------------------|--------------|-------------------------------------------------|
| 1. Chat GPT-4 Swift Copilot GPT | 1       | No                   | 5            | 1 file changed, 5 insertions(+), 6 deletions(-) |
| 2. Chat GPT-4 Swift Copilot GPT | 5       | Yes                  | 0            | 0                                               |
| 3. Microsoft Copilot (GPT-4)    | 2       | No                   | 14           | Unable to Build                                 |

- CG Swift CP: [Chat GPT - Swift Copliot GPT](https://chatgpt.com/g/g-L9NbS395h-swift-copilot)
- MS Copilot: [Microsoft Copilot](https://copilot.microsoft.com/)

# Details

## 1. Chat GPT Swift Copilot GPT (1 Prompt)

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

## 2. Chat GPT Swift Copilot GPT (5 Prompts)

### Prompt 1:
```
As a Principle iOS Engineer I want you to help me write functional Swift code that compiles.

Architecture Pattern: The Composable Architecture - https://github.com/pointfreeco/swift-composable-architecture

Requirements: 
1. Create a Swift UI View that has one text field to enter a topic, and one button to load questions using the text entered by the user.

Assumptions: Assume I already have an XCode project created and that I have already imported The Composable Architecture dependency in my project

Output: Firstly Provide the Names and functions of the entities that will be needed to build the feature
```

### Subsequent Prompts:

```
Make the Reducer functionality be part of a struct or class?

modify the code above to move the QuestionState QuestionAction and QuestionEnvironment inside the QuestionFeature

Actually please take the Environment out of the QuestionFeature, and make it a separate struct called QuestionAPI

Now please provide the code in a single file containing the QuestionView, the QuestionFeature and the QuestionAPI
```

## 3. Microsoft Copilot

### Prompt 1:
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
### Prompt 2:

```
Can you modify the code to put the reducer functionality inside a struct called TopicInputFeature
```




