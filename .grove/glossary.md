# Glossary

| Term | Definition | Source |
| --- | --- | --- |
| Content collection | Astro content layer entry that loads markdown through a glob loader and validates frontmatter against a zod schema. | D-05 |
| Frontmatter | YAML metadata at the top of each markdown file (title, date, template, draft, slug, category, tags, description, socialImage). | A-01 |
| Taxonomy | The category, tag and year groupings that drive the listing routes. | A-02 |
| Parity | Equivalence of routes, HTML output and visuals between the Gatsby and Astro builds. | W-12 |
| No-FOUC script | Inline pre-body script that applies the persisted theme class to html before first paint. | D-03 |
| Feed limit | The feedLimit value in content/config.json that sets posts per page for every listing. | W-06 |
| Slug resolution | Rule that prefers the frontmatter slug and falls back to the directory-based path. | W-02 |
| Shiki | The syntax highlighter bundled with Astro that replaces PrismJS in the markdown pipeline. | D-04 |
| Canonical URL | The absolute preferred page URL emitted as a link rel canonical tag, always ending with a trailing slash. | D-06 |
| Islands directory | The flat src/islands directory holding every kebab-case .astro partial; a house layout name, not framework islands. | D-10 |
