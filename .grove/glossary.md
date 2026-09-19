# Glossary

| Term | Definition | Source |
| --- | --- | --- |
| Content collection | Astro content layer entry that loads markdown through a glob loader and validates frontmatter against a zod schema. | D-05 |
| Frontmatter | YAML metadata at the top of each markdown file (title, date, template, draft, slug, category, tags, description, socialImage). | A-01 |
| Taxonomy | The category, tag and year groupings that drive the listing routes. | A-02 |
| parity | Equivalence of routes, HTML output and visuals before and after a markup or framework change. | W-12 |
| No-FOUC script | Inline pre-body script that applies the persisted theme class to html before first paint. | D-03 |
| Feed limit | The feedLimit value in content/config.json that sets posts per page for every listing. | W-06 |
| Slug resolution | Rule that prefers the frontmatter slug and falls back to the directory-based path. | W-02 |
| Shiki | The syntax highlighter bundled with Astro that replaces PrismJS in the markdown pipeline. | D-04 |
| Canonical URL | The absolute preferred page URL emitted as a link rel canonical tag, always ending with a trailing slash. | D-06 |
| Islands directory | The flat src/islands directory holding every kebab-case .astro partial; a house layout name, not framework islands. | D-10 |
| css-modules | Scoped stylesheet files whose class map is imported by components; exports differ between bundlers. | B-04 |
| vite | The bundler and dev server underneath Astro, replacing webpack. | D-08 |
| sätteri | The default markdown processor in Astro 7, replacing the unified pipeline. | W-07 |
| content-layer | The Astro data layer behind content collections, including rendered html with image placeholders. | W-08 |
| pagination | The zero-based page splitting driven by feedLimit; extra routes use /page/N starting at 1. | W-06 |
| graph-anchor | A DOM id that a JSON-LD @id fragment points at; every same-page fragment must resolve to one. | D-15 |
| json-ld | The structured-data format emitted as a single application/ld+json script carrying an @graph per page. | D-15 |
| llms | The llms.txt curated index and llms-full.txt raw corpus endpoints served for AI agents. | D-17 |
| semantics-audit | The dev-only schema and accessibility checks that keep the graph and the landmark tree honest. | D-18 |
