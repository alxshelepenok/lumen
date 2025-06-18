---

# [Brown Math DUG Journal](https://mathdugresearch.netlify.app/)

Welcome to the **Brown Math DUG Journal**, featuring research by undergraduates in the Math Department at Brown University. Our goal is to provide a space where students can share their work, develop their writing skills, and contribute to the broader mathematical conversation.

---
This journal is run by the Math Department Undergraduate Group (DUG) at Brown. It's a platform for students to:

* Publish original research and expository work.
* Practice clear mathematical writing.
* Explore topics that go beyond the classroom.

You can learn more about the Math DUG [here](https://sites.google.com/brown.edu/mathdug/home).

---

## How to Contribute

Whether you're starting from scratch or already have a LaTeX paper, there are a couple of ways to get your post published.

### Option 1: Write a Post in Markdown

1. **Get Access to the Repo**

   * Make sure you have a GitHub account.
   * Ask for access to the repository, or just fork it and submit a pull request later.

2. **Set Up Your Environment**

   * Install [Git](https://git-scm.com/downloads) if needed (If you are on Windows).
   * Clone the repository to your local machine.
   * Open it in your preferred code editor (VSCode, WebStorm, Vim, etc.).

3. **Create and Edit Your Post**

   * Add a new `.md` (Markdown) file under `content/posts/`.
   * Write your article using Markdown — or adapt from the [example paper](https://mathdugresearch.netlify.app/posts/example-paper)
   * Use your editor’s Markdown preview to check formatting.

4. **Commit and Push**

   * Stage the file.
   * Add a brief commit message.
   * Push your changes to GitHub.
   * If you used a fork, open a pull request.

Need a hand? We’ve put together a [step-by-step guide](https://mathdugresearch.netlify.app/posts/step-by-step-guide-to-start-writing-on-here) to walk you through the process.

---

### Option 2: Convert a LaTeX Paper

Already wrote your paper in LaTeX? Here's how to convert it into a post:

1. **Add Your File**

   * Move your `.tex` file to the `content/posts/` folder.

2. **Run the Conversion Script**

   * Open your terminal or IDE.
   * Run:

     ```bash
     python3 content/posts/addpost.py
     ```
   * Answer the prompts — the script will generate a Markdown version of your article.

3. **Clean Up Formatting**
   You might need to tweak a few things:

   * 📸 Images and videos — see [images guide](https://www.markdownguide.org/basic-syntax/#images-1), [video guide](https://css-tricks.com/embedded-content-in-markdown/)
   * 📊 Tables — check out the [table converter](https://tableconvert.com/latex-to-markdown), [documentation](https://www.markdownguide.org/extended-syntax/#tables)
   * 📝 Footnotes — refer to the [footnote guide](https://www.markdownguide.org/extended-syntax/#footnotes)

4. **Then Just Stage, Commit, and Push** — same as above.

---

## 🛠 Dependencies

If you’re using the conversion script, make sure you have Python installed. It uses standard libraries:

* `os`
* `re`
* `datetime`

These should already be included with Python.

---

## ⚙️ Quick Git Reference

A few helpful commands if you're new to Git:

```bash
git clone <repo-url>      # Clone the repo
git add <file>            # Stage a file
git commit -m "Message"   # Commit your changes
git push                  # Push to GitHub
```

If you're working from a fork, open a pull request when you're done.

---
