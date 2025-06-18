import os
import re
from datetime import datetime

## Latex Conversion Functions
def latex_to_markdown(latex_text):
    # match LaTeX commands that should be replaced with their corresponding Markdown syntax
    latex_text = re.sub(r'\\title(?:\*?){(.+?)}', r'\n# \1', latex_text)
    latex_text = re.sub(r'\\section(?:\*?){(.+?)}', r'## \1', latex_text)
    latex_text = re.sub(r'\\subsection(?:\*?){(.+?)}', r'### \1', latex_text)
    latex_text = re.sub(r'\\subsubsection(?:\*?){(.+?)}', r'#### \1', latex_text)
    latex_text = re.sub(r'\\textbf{(.+?)}', r'**\1**', latex_text)
    latex_text = re.sub(r'\\emph{(.+?)}', r'*\1*', latex_text)
    latex_text = re.sub(r'\\\[(.+?)\\\]', r'$$\1$$', latex_text)
    # convert included images to imported images in Markdown
    latex_text = re.sub(r'\\includegraphics(?:\[.+\])?\{(.+?)\}', r'![Image](media/\1)', latex_text)
    # convert href links to links in Markdown
    latex_text = re.sub(r'\\href{(.+?)}{(.+?)}', r'[\2](\1)', latex_text)
    latex_text = re.sub(r'\\hyperlink{(.+?)}{(.+?)}', r'[\2](\1)', latex_text)
    latex_text = re.sub(r'\\url{(.+?)}', r'[\1](\1)', latex_text)
    latex_text = re.sub(r'\\begin{(equation|theorem|corollary|lemma)}(.+?)\\label{(.+?)}\n(.+?)\\end{(equation|theorem|corollary|lemma)}', r'\\label{\3}\n\\begin{\1}\2\4\\end{\1}', latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\label{(.+?)}', r'<a name="\1"></a>', latex_text)
    latex_text = re.sub(r'\\ref{(.+?)}', r'[\1](#\1)', latex_text)
    latex_text = re.sub(r'\\hyperref\[(.+?)\]{(.+?)}', r'[\1](#\2)', latex_text)
    # match LaTeX environments that should be replaced with their corresponding Markdown syntax
    latex_text = re.sub(r'\\begin{itemize}(.+?)\\end{itemize}', list_items_to_markdown, latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\begin{enumerate}(.+?)\\end{enumerate}', numbered_list_items_to_markdown, latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\begin{verbatim}(.+?)\\end{verbatim}', r'```\n\1```', latex_text, flags=re.DOTALL)
    # remove LaTeX commands and environments that should be ignored
    latex_text = re.sub(r'\\begin{document}(.+?)\\end{document}', r'\1', latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\maketitle', r'', latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\begin{equation}(.+?)\\end{equation}', r'$$\1$$', latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\begin{align\*?}(.+?)\\end{align\*?}', r'\1', latex_text, flags=re.DOTALL)
    latex_text = re.sub(r'\\begin{gather}(.+?)\\end{gather}', r'\1', latex_text, flags=re.DOTALL)
    # comment comments and important parameters
    latex_text = re.sub(r'%(.+?)\n', r'[//]: # (\1)', latex_text)
    latex_text = re.sub(r'\\documentclass(\[.+?\])?{((.+?))}', r'[//]: # (documentclass: \1, \2)', latex_text)
    latex_text = re.sub(r'\\usepackage(\[.+?\])?{((.+?))}', r'[//]: # (usepackage: \1, \2)', latex_text)
    # convert certain commands to be in math mode
    latex_text = re.sub(r'\\LaTeX{}', r'$\\LaTeX{}$', latex_text)
    latex_text = re.sub(r'\\dots', r'$\\dots$', latex_text)
    # remove whitespace
    latex_text = re.sub(r'\$\$\n(\n)+', r'$$\n', latex_text)
    latex_text = re.sub(r'\n(\n)+$$', r'\n$$', latex_text)
    # latex_text = re.sub(r'\n\n', r'\n', latex_text)
    return latex_text

def list_items_to_markdown(match):
    # convert LaTeX itemize environment to Markdown unordered list
    item_list = re.findall(r'\\item (.+)', match.group(1))
    markdown_items = '\n'.join([f'- {item}' for item in item_list])
    return markdown_items

def numbered_list_items_to_markdown(match):
    # convert LaTeX itemize environment to Markdown unordered list
    item_list = re.findall(r'\\item (.+)', match.group(1))
    markdown_items = '\n'.join([f'{i}. {item}' for i, item in enumerate(item_list)])
    return markdown_items


## Gatsby Formatting Functions
def get_current_datetime():
    return datetime.utcnow().isoformat() + 'Z'

def format_title(title):
    return title.replace(" ", "-").lower()

def format_tag(string):
    tags = string.split(", ")
    formatted_string = "\n".join([f"  - \"{tag}\"" for tag in tags])
    return formatted_string

## User Input
print(
    """
    This program will convert your tex file into a functioning post written in markdown.
    
    Note: After the conversion, there might have to be some changes made to the markdown file to gain full functionally. For example, embedded elements (like videos, images) must be added the markdown file after processing. See https://mathdugresearch.netlify.app/posts/creating-a-post-using-a-latex-file for more.
    """
)

try:
    # Get the current path of the script file
    current_path = os.path.dirname(os.path.abspath(__file__))

    # Construct the full path to the TeX file
    tex_filename = input("What is the filename of the tex file? (ex. \"An-aperiodic-monotile-Finalpaper\")\t")
    
    if tex_filename[-4:] != '.tex':
        tex_filename += '.tex'

    tex_path = os.path.join(current_path, tex_filename)
    try:
        # Open and read the TeX file
        with open(tex_path, 'r') as file:
            latex_text = file.read()

        title_input = input("What is the title of your paper? (ex. \"An aperiodic monotile\")\t").title()

        category_input = input("What is the category your paper fits under? (ex. \"Combinatorics\")\t").title()

        tag_input = input("What tags (i.e. keywords) should be associated with your paper? (ex. \"Tilings, Aperiodic order, Polyforms\")\t").title()

        description_input = input("Write a brief description of your paper (1-2 sentences):\t")

        ## Create Markdown file and folders
        preamble = (
            '---\n'
            f'title: {title_input.title()}\n'
            f'date: "{get_current_datetime()}"\n'
            'template: "post"\n'
            'draft: false\n'
            f'slug: "/posts/{format_title(title_input)}"\n'
            f'category: "{category_input.title()}"\n'
            f'tags: \n{format_tag(tag_input)}\n'
            f'description: "{description_input}"\n'
            '---\n'
        )

        # Process the TeX file to generate Markdown text
        markdown_text = ''.join((preamble, latex_to_markdown(latex_text)))

        try:
            # Create a folder for the post
            post_foldername = f'{datetime.now().strftime("%Y-%m-%d")}---{format_title(title_input)}'
            folder_path = os.path.join(current_path, post_foldername)
            os.makedirs(folder_path)

            # Create a "media" subfolder inside the post folder
            media_folder_path = os.path.join(folder_path, "media")
            os.makedirs(media_folder_path)

            print(f"Folder created: {folder_path}")

            # Write the generated Markdown text to the index.md file inside the post folder
            markdown_path = os.path.join(folder_path, "index.md")
            with open(markdown_path, 'w') as file:
                file.write(markdown_text)
            
            print("Program complete. Please check the markdown file for any issues")

        except Exception as folder_creation_error:
            print(f"Error creating folder: {folder_creation_error}")

    except Exception as file_read_error:
        print(f"Error reading TeX file: {file_read_error}")

except Exception as path_error:
    print(f"Error getting current path: {path_error}")

    

