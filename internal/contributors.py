"""Regenerate the contributors table in README.md.

Reads the GitHub contributors endpoint, drops bot accounts and the
repository owner and renders the historical six-per-row avatar table
between marker comments; every row of six is its own GFM table.
"""

import argparse
import json
import os
import re
import urllib.request

DEFAULT_REPO = "alxshelepenok/lumen"
PER_ROW = 6
AVATAR_SIZE = 117

SECTION_HEADING = "## Contributors"
SECTION_INTRO = "Thanks goes to these wonderful people!"
START_MARKER = "<!-- contributors:start -->"
END_MARKER = "<!-- contributors:end -->"

BOT_LOGINS = {
    "allcontributors",
    "codecov",
    "codefactor",
    "dependabot",
    "greenkeeper",
    "imgbot",
    "mergify",
    "renovate",
    "semantic-release-bot",
    "vercel",
}


def is_bot(contributor):
    login = contributor.get("login", "")
    stem = login.split("[", 1)[0]
    return (
        contributor.get("type") == "Bot"
        or "[bot]" in login
        or login.endswith("-bot")
        or stem in BOT_LOGINS
    )


def is_owner(contributor, repo):
    return contributor.get("login", "").lower() == repo.split("/", 1)[0].lower()


def fetch_contributors(repo, token):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "lumen-contributors-script",
    }
    if token:
        headers["Authorization"] = "Bearer " + token
    contributors = []
    page = 1
    while True:
        url = "https://api.github.com/repos/{}/contributors?per_page=100&page={}".format(repo, page)
        request = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(request) as response:
            batch = json.loads(response.read().decode("utf-8"))
        contributors.extend(batch)
        if len(batch) < 100:
            return contributors
        page += 1


def render_table(contributors):
    tables = []
    for start in range(0, len(contributors), PER_ROW):
        row = contributors[start : start + PER_ROW]
        tables.append(
            "\n".join(
                [
                    " | ".join(
                        '[<img alt="{login}" src="{avatar}&s={size}" width="{size}">]({url})'.format(
                            login=contributor["login"],
                            avatar=contributor["avatar_url"],
                            size=AVATAR_SIZE,
                            url=contributor["html_url"],
                        )
                        for contributor in row
                    ),
                    " | ".join([":---:"] * len(row)),
                    " | ".join(
                        "[{login}]({url})".format(
                            login=contributor["login"], url=contributor["html_url"]
                        )
                        for contributor in row
                    ),
                ]
            )
        )
    return "\n\n".join(tables)


def build_section(table):
    return "\n\n".join(
        [SECTION_HEADING, SECTION_INTRO, START_MARKER + "\n" + table + "\n" + END_MARKER]
    )


def update_readme(content, table):
    if START_MARKER in content and END_MARKER in content:
        pattern = re.compile(
            re.escape(START_MARKER) + ".*?" + re.escape(END_MARKER), re.DOTALL
        )
        return pattern.sub(START_MARKER + "\n" + table + "\n" + END_MARKER, content, count=1)
    sponsors = re.search(r"^## Sponsors[^\n]*\n", content, re.MULTILINE)
    if not sponsors:
        raise SystemExit("README has no Sponsors section and no contributors markers to update")
    following = re.search(r"^## ", content[sponsors.end():], re.MULTILINE)
    insert_at = sponsors.end() + (following.start() if following else 0)
    return content[:insert_at] + build_section(table) + "\n\n" + content[insert_at:]


def main():
    parser = argparse.ArgumentParser(
        description="Regenerate the README contributors table from the GitHub API."
    )
    parser.add_argument("--repo", default=DEFAULT_REPO, help="owner/name repository to read")
    parser.add_argument("--readme", default="README.md", help="README file for --write")
    parser.add_argument(
        "--token", default=os.environ.get("GITHUB_TOKEN"), help="GitHub token (default GITHUB_TOKEN)"
    )
    parser.add_argument(
        "--write", action="store_true", help="rewrite the marked block instead of printing"
    )
    args = parser.parse_args()

    contributors = [
        c
        for c in fetch_contributors(args.repo, args.token)
        if not is_bot(c) and not is_owner(c, args.repo)
    ]
    if not contributors:
        raise SystemExit("No human contributors returned for " + args.repo)
    table = render_table(contributors)

    if args.write:
        with open(args.readme, "r", encoding="utf-8") as file:
            content = file.read()
        with open(args.readme, "w", encoding="utf-8", newline="\n") as file:
            file.write(update_readme(content, table))
        print(
            "Contributors table refreshed in {}: {} contributors, bots and owner filtered.".format(
                args.readme, len(contributors)
            )
        )
    else:
        print(table)


if __name__ == "__main__":
    main()
