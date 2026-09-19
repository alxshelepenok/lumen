interface A11yElement {
  alt?: string | null;
  children?: A11yElement[];
  hidden?: boolean;
  id?: string;
  interactive?: boolean;
  label?: string | null;
  labelledBy?: string[];
  tag: string;
  tabindex?: string | null;
  text?: string;
}

interface A11yWarning {
  id?: string;
  message: string;
}

interface A11yAuditInput {
  anchors: string[];
  root: A11yElement;
}

const LANDMARK_TAGS = new Set(["main", "nav", "aside"]);
const SCOPED_TAGS = new Set([
  "article",
  "aside",
  "main",
  "nav",
  "section",
]);
const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

const normalize = (value: string): string =>
  value.replace(/\s+/g, " ").trim().toLowerCase();

interface Visited {
  ancestors: A11yElement[];
  element: A11yElement;
}

const flatten = (root: A11yElement): Visited[] => {
  const visited: Visited[] = [];

  const walk = (element: A11yElement, ancestors: A11yElement[]) => {
    visited.push({ ancestors, element });

    for (const child of element.children ?? []) {
      walk(child, [...ancestors, element]);
    }
  };

  walk(root, []);
  return visited;
};

const descendantAlt = (element: A11yElement): string[] => {
  const alts: string[] = [];

  for (const child of element.children ?? []) {
    if (child.tag.toLowerCase() === "img" && child.alt && child.alt.trim()) {
      alts.push(child.alt);
    }

    alts.push(...descendantAlt(child));
  }

  return alts;
};

const auditAccessibility = (
  input: A11yAuditInput
): { errors: A11yWarning[]; warnings: A11yWarning[] } => {
  const errors: A11yWarning[] = [];
  const warnings: A11yWarning[] = [];
  const visited = flatten(input.root);
  const byId = new Map<string, A11yElement>();

  for (const { element } of visited) {
    if (!element.id) continue;

    if (byId.has(element.id)) {
      errors.push({ id: element.id, message: "duplicate id in the document" });
    } else {
      byId.set(element.id, element);
    }
  }

  const nameOf = (element: A11yElement): string | null => {
    if (element.label && element.label.trim()) {
      return element.label;
    }

    if (element.labelledBy?.length) {
      const parts = element.labelledBy
        .map((id) => byId.get(id)?.text)
        .filter((text): text is string => Boolean(text && text.trim()));

      if (parts.length === element.labelledBy.length && parts.length > 0) {
        return parts.join(" ");
      }
    }

    return null;
  };

  const landmarks: { element: A11yElement; name: string | null; parent: A11yElement | null; role: string }[] = [];

  for (const { ancestors, element } of visited) {
    const tag = element.tag.toLowerCase();
    const parent = ancestors[ancestors.length - 1] ?? null;
    const scopedAncestor = ancestors.some((candidate) =>
      SCOPED_TAGS.has(candidate.tag.toLowerCase())
    );
    const isLandmark =
      LANDMARK_TAGS.has(tag) ||
      ((tag === "header" || tag === "footer") && !scopedAncestor) ||
      ((tag === "section" || tag === "article") &&
        Boolean(element.labelledBy?.length || (element.label && element.label.trim())));

    if (isLandmark) {
      const name = nameOf(element);
      landmarks.push({ element, name, parent, role: tag });

      if (!name) {
        errors.push({
          id: element.id,
          message: `<${tag}> landmark has no accessible name (aria-labelledby or aria-label)`,
        });
      }
    }

    if (tag === "img" && (element.alt === null || element.alt === undefined)) {
      errors.push({ id: element.id, message: "img is missing an alt attribute" });
    }

    if (HEADING_TAGS.has(tag) && !(element.text && element.text.trim())) {
      errors.push({ id: element.id, message: `<${tag}> heading is empty` });
    }

    if (element.interactive) {
      const descendantAlts = descendantAlt(element);
      const name =
        nameOf(element) ??
        (element.text && element.text.trim() ? element.text : null) ??
        (element.alt && element.alt.trim() ? element.alt : null) ??
        (descendantAlts.length > 0 ? descendantAlts.join(" ") : null);

      if (!name) {
        errors.push({
          id: element.id,
          message: `interactive <${tag}> has no accessible name`,
        });
      }
    }
  }

  const siblings = new Map<A11yElement | null, Map<string, (string | null)[]>>();

  for (const landmark of landmarks) {
    const byRole = siblings.get(landmark.parent) ?? new Map();
    const names = byRole.get(landmark.role) ?? [];
    names.push(landmark.name);
    byRole.set(landmark.role, names);
    siblings.set(landmark.parent, byRole);
  }

  for (const byRole of siblings.values()) {
    for (const [role, names] of byRole) {
      if (names.length < 2) continue;

      const named = names.filter((name): name is string => name !== null && name.trim() !== "");

      if (named.length > 0 && named.length !== names.length) {
        errors.push({
          message: `sibling <${role}> landmarks must all be named to stay distinct`,
        });
        continue;
      }

      const unique = new Set(named.map(normalize));

      if (unique.size !== named.length) {
        errors.push({
          message: `sibling <${role}> landmarks share the same accessible name`,
        });
      }
    }
  }

  for (const anchor of input.anchors) {
    const target = byId.get(anchor);

    if (!target) {
      errors.push({ id: anchor, message: "graph anchor has no element with this id" });
      continue;
    }

    const entry = visited.find(({ element }) => element === target);

    if (!entry) continue;

    const hidden = [...entry.ancestors, target].some((element) => element.hidden);

    if (hidden) {
      errors.push({ id: anchor, message: "graph anchor is inside a hidden subtree" });
    }
  }

  for (const landmark of landmarks) {
    if (landmark.element.id && landmark.element.tabindex !== "-1") {
      warnings.push({
        id: landmark.element.id,
        message: `anchored <${landmark.role}> landmark lacks tabindex="-1" for fragment focus`,
      });
    }
  }

  return { errors, warnings };
};

const toElement = (element: Element): A11yElement => {
  const tag = element.tagName.toLowerCase();
  const interactive =
    tag === "button" ||
    tag === "a" ||
    tag === "input" ||
    tag === "select" ||
    tag === "textarea" ||
    element.hasAttribute("tabindex");

  const labelledBy = element.getAttribute("aria-labelledby");

  return {
    alt: tag === "img" ? element.getAttribute("alt") : undefined,
    children: Array.from(element.children).map(toElement),
    hidden:
      element.hasAttribute("hidden") ||
      element.getAttribute("aria-hidden") === "true",
    id: element.id || undefined,
    interactive,
    label: element.getAttribute("aria-label"),
    labelledBy: labelledBy ? labelledBy.split(/\s+/) : undefined,
    tag,
    tabindex: element.getAttribute("tabindex"),
    text: element.textContent?.trim() || undefined,
  };
};

const domBudgetOf = (root: A11yElement): { count: number; depth: number } => {
  let count = 0;
  let depth = 0;

  const walk = (element: A11yElement, level: number) => {
    count += 1;

    if (level > depth) {
      depth = level;
    }

    for (const child of element.children ?? []) {
      walk(child, level + 1);
    }
  };

  walk(root, 1);
  return { count, depth };
};

const auditDomBudget = (doc: Document): void => {
  const { count, depth } = domBudgetOf(toElement(doc.body));

  if (count > 1500) {
    console.warn(`[audit-a11y] DOM node count ${count} exceeds the 1500 budget`);
  }

  if (depth > 32) {
    console.warn(`[audit-a11y] DOM depth ${depth} exceeds the 32 budget`);
  }
};

const runAccessibilityAudit = (doc: Document): void => {
  const scripts = Array.from(
    doc.querySelectorAll('script[type="application/ld+json"]')
  );

  const anchors: string[] = [];
  const pagePath = doc.defaultView?.location.pathname ?? "/";

  for (const script of scripts) {
    try {
      const text = script.textContent ?? "";

      for (const match of text.matchAll(/"@id":"([^"]+)#([^"]+)"/g)) {
        try {
          if (new URL(match[1]).pathname.replace(/\/$/, "") === pagePath.replace(/\/$/, "") || (match[1].replace(/\/$/, "").endsWith("/") && pagePath === "/")) {
            anchors.push(match[2]);
          }
        } catch {
          // non-url ids are not DOM anchors
        }
      }
    } catch {
      // invalid graphs are reported by the schema audit
    }
  }

  const { errors, warnings } = auditAccessibility({
    anchors: [...new Set(anchors)],
    root: toElement(doc.documentElement),
  });

  for (const error of errors) {
    console.error(
      `[audit-a11y] ${error.id ? `${error.id}: ` : ""}${error.message}`
    );
  }

  for (const warning of warnings) {
    console.warn(
      `[audit-a11y] ${warning.id ? `${warning.id}: ` : ""}${warning.message}`
    );
  }

  auditDomBudget(doc);
};

export { auditAccessibility, auditDomBudget, domBudgetOf, runAccessibilityAudit };
export type { A11yAuditInput, A11yElement, A11yWarning };
