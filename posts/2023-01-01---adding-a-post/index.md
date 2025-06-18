---
title: Creating a Post using a LaTeX File
date: "2023-01-01T22:41:32.169Z"
template: "post"
draft: false
slug: "/posts/creating-a-post-using-a-latex-file"
category: "Meta"
tags:
description: "Quick intro to add a post using a latex file"
---

## Motivation:
LaTeX is a popular typesetting system used for writing scientific and technical documents. However, when it comes to creating a blog post or webpage, Markdown is a more convenient format.

## Gathering the Required Libraries
To get started, make sure you have [Python installed](https://www.python.org/downloads/) on your system. The script utilizes the following libraries:

- **os**: for path manipulation and file operations
- **re**: for regular expression matching and replacement
- **datetime**: for generating the current date and time

These libraries should be on your machine with your install of Python

## Running the Script
Complete the [steps](https://mathdugresearch.netlify.app/posts/step-by-step-guide-to-start-writing-on-here#add-your-article) till "Create a new markdown file". In your preferred IDE (or terminal), open the repository and find the "[addpost.py](https://github.com/Geoc2022/BrownMathDUG_Research/blob/main/content/posts/addpost.py)" script under "content/post". Move your LaTeX file to the "content/posts" folder. Run the python script using your IDE (or "python3 addpost.py" on your terminal), and answer the questions prompted by the script. Then complete the [steps](https://mathdugresearch.netlify.app/posts/step-by-step-guide-to-start-writing-on-here#stage-the-file) starting from "Stage the file".

Here are some items you may need to fix:
 - Images/Video:
	* [Images Documentation](https://www.markdownguide.org/basic-syntax/#images-1)
	* [Embedded Images/Video](https://css-tricks.com/embedded-content-in-markdown/)
 - Tables:
	* [Converting LaTeX to Markdown](https://tableconvert.com/latex-to-markdown)
	* [Table Documentation](https://www.markdownguide.org/extended-syntax/#tables)
 - Footnotes:
	* [Footnote Documentation](https://www.markdownguide.org/extended-syntax/#footnotes)