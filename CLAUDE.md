# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Personal portfolio website for Johannes Häuser, built with Astro (based on the AstroPaper template). Showcases software engineering projects with tags, pagination, fuzzy search, and dynamic OG image generation.

### Target Audience

The primary visitor is the **Projektverteiler** — a project manager or staffing lead who is scanning the site to decide whether Johannes fits a concrete client project. Full persona: [PERSONA_ZIELGRUPPE.md](PERSONA_ZIELGRUPPE.md).

**Key implication:** Every content and design decision should optimize for a 30–90 second scan. Tags, clear tech labels, and a low-friction contact path matter more than prose depth.

### What This Project Is NOT

- **NOT a blog** — content is projects, not posts. Don't suggest blog-specific patterns.
- **NOT a full-stack app** — static site with no backend. Don't add server-side APIs.
- **NOT a component library** — components exist to serve this one site. Don't abstract for reuse.
- **NOT a multi-user system** — single author, no auth, no CMS integration needed.

---

## Key Directories

```
src/
├── pages/          # File-based routing (.astro and .md files)
├── layouts/        # Layout components (Layout, Main, ProjectDetails, Projects, AboutLayout)
├── components/     # Reusable components (.astro and .tsx)
├── utils/          # Utility functions (sorting, filtering, slugifying, pagination)
├── content/
│   └── projects/   # Project markdown files (content collection)
├── styles/         # base.css — CSS variables for theming
└── assets/         # socialIcons.ts
public/             # Static assets (fonts, images, PDFs)
```

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on localhost:3000 (with type checking)
npm run build        # Build for production (includes jampack optimization)
npm run preview      # Preview production build
npm run sync         # Type checking / generate Astro content types
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without changes
npm run lint         # Lint
npm run cz           # Commit with commitizen (conventional commits)
```

---

## Architecture

### Content Structure

- **Projects**: Markdown files in `src/content/projects/`
- **Content Collections**: Defined in [src/content/config.ts](src/content/config.ts), uses `blogSchema` from [src/content/_schemas.ts](src/content/_schemas.ts)
- **Schema**: Frontmatter includes `author`, `pubDatetime`, `title`, `projectSlug`, `featured`, `tags`, `ogImage`, `description`

> **Note:** The schema and collection still reference "blog" internally — this is intentional. The schema is reused but content is adapted for projects.

### Routing & Pagination

[src/pages/projects/[slug].astro](src/pages/projects/[slug].astro) handles both individual project pages (slug = project slug) and paginated lists (slug = page number) via `getStaticPaths()`.

### Theming System

TailwindCSS with custom "skin" tokens in [tailwind.config.cjs](tailwind.config.cjs). Uses CSS variables (`--color-text-base`, `--color-accent`) with opacity helpers. Supports light/dark mode via [src/styles/base.css](src/styles/base.css).

### Configuration

- **Site config**: [src/config.ts](src/config.ts) — SITE metadata, LOCALE, LOGO_IMAGE, SOCIALS
- **Astro config**: [astro.config.mjs](astro.config.mjs) — integrations (Tailwind, React, Sitemap), markdown plugins (remarkToc, remarkCollapse)

### React Components (interactive only)

- [src/components/Search.tsx](src/components/Search.tsx) — Fuzzy search using FuseJS
- [src/components/Card.tsx](src/components/Card.tsx) — Project cards
- [src/components/Datetime.tsx](src/components/Datetime.tsx) — Date formatting

### Key Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `getSortedProjects.ts` | Sort projects by publication date |
| `getProjectByTag.ts` | Filter projects by tag |
| `getUniqueTags.ts` | Extract unique tags |
| `getPageNumbers.ts` | Generate pagination numbers |
| `slugify.ts` | URL-friendly slugs |
| `generateOgImage.tsx` | Dynamic OG image generation via Satori |

### Build Optimization

`npm run build` runs Astro then [@divriots/jampack](https://github.com/divriots/jampack) on `./dist/`.

### Pre-commit Hooks

Husky + lint-staged auto-formats staged files with Prettier. Config in [package.json](package.json).

### Type Safety

Astro content collections with Zod schemas. Run `npm run sync` to regenerate types.

---

## Principles

| # | Principle | Axiom |
|---|-----------|-------|
| 1 | **Modularity** | Lego blocks, not monoliths |
| 2 | **Simplicity Wins** | Don't reinvent the wheel. Code exists to be used |
| 3 | **Errors Are Answers** | Every failure teaches. Errors must be actionable |
| 4 | **Fix The Pattern** | Cure the root cause. Don't treat symptoms |
| 5 | **Secrets Stay Secret** | Nothing left open to exploitation |

When making design decisions, check against these principles. If a choice violates one, reconsider.

---

## Things to Avoid

- **Don't add features, refactoring, or "improvements" beyond what was asked.** A bug fix doesn't need surrounding code cleaned up.
- **Don't add error handling for scenarios that can't happen.** Trust internal code and framework guarantees. Only validate at system boundaries.
- **Don't create helpers or abstractions for one-time operations.** Three similar lines is better than a premature abstraction.
- **Don't add docstrings, comments, or type annotations to code you didn't change.**
- **Don't use subagents/task tools for research.** Use Read/Grep/Glob directly. Subagents burn 5-10x more tokens for the same result. Only use for truly independent parallel *write* tasks.
- **Don't leave backwards-compatibility shims.** No unused `_vars`, no re-exporting dead types, no `// removed` comments. If unused, delete it.

---

## Coding Standards (CRITICAL)

### 1. Simple Solutions Over Complex Ones

Prefer the simpler approach that already works. If something worked before, check git history before rewriting it.

### 2. Error Messages Must Be Actionable

Every error must say what happened, why, and what to do:
```ts
// WRONG
throw new Error("Something went wrong");
// RIGHT
throw new Error(`Failed to load ${file}: ${err.message}. Check if the file exists.`);
```

### 3. Don't Create Dead Code

If you replace a function or variable, remove the old one. No commented-out code, no unused imports.

### 4. Check Git History Before "Fixing"

```bash
git log --oneline --all | grep -i "relevant-keyword"
git show <commit>:path/to/file
```

### 5. Fix ALL Instances of a Pattern

When you find a bug, search for the same pattern everywhere. Fix them all or none.

### 6. No Cross-File String Contracts Without a Shared Source

If two files must agree on a string value — there MUST be a single source of truth. Never rely on comments like "must match foo.ts".

### 7. Dual-Layer Changes Must Update Both Sides

When logic exists in two places (e.g., client + layout), updating one without the other creates silent bugs. Before finishing any change, grep for the same constant/string in other files.

---

## Git Workflow

**Always sync before pushing:**
```bash
git fetch origin
git merge origin/main --no-edit
git push -u origin <branch-name>
```

**Commit messages** follow conventional style (use `npm run cz`):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code restructuring
- `chore:` Maintenance tasks

Keep first line under 72 characters.

---

## Common Session Traps

### Trap 1: "Let me optimize this"
**Stop.** Is it slow? Is the user complaining? If not, don't touch it.

### Trap 2: "I'll fix this one place"
**Stop.** Search for the same pattern. Fix them all or none.

### Trap 3: "The error says X, so I'll fix X"
**Stop.** Trace backwards to the root cause before touching code.

### Trap 4: "I need to rewrite this function"
**Stop.** Check git history. Maybe revert, not rewrite.

### Trap 5: "While I'm here, I'll also clean up..."
**Stop.** Do exactly what was asked. If you see something worth improving, mention it — don't do it.

### Trap 6: "I'll add this to the validation list"
**Stop.** If validation exists in two places, update BOTH sides.

### Trap 7: "I'll wrap this in a helper for reuse"
**Stop.** Is it actually used more than once *right now*? If not, inline it.

### Trap 8: "I think the user wants..."
**Stop.** If the request is ambiguous, **ask** — don't infer.

### Trap 9: "This looks correct to me"
**Stop.** Prove it — trace the logic, find a concrete input, verify the output.

---

## Context Discipline

### Research → Decision → Implement

Complex tasks: separate thinking from doing.

**Phase 1 — Research:** Explore options, read code, output a concrete decision (e.g., `DECISION.md`). Be specific.

**Phase 2 — Implement:** Start from the decision + only relevant source files. No re-exploring.

### Task Contracts

Before complex work, define what "done" looks like:
```markdown
## Done when:
- [ ] All existing tests pass
- [ ] Feature works end-to-end in dev
- [ ] No new TypeScript errors (`npm run sync`)
- [ ] Formatter passes (`npm run format:check`)
```

---

## Before Submitting Changes

1. Did I test the happy path?
2. Did I search for similar patterns to fix?
3. Did I remove dead code? No commented-out code, no unused variables.
4. Did I check git history for regressions?
5. Is this simpler than what was there before?
6. Did I stay within scope? No unasked-for refactoring, no bonus features.
7. Are type checks still passing? (`npm run sync`)

---

## Session Continuity

When starting a session, look for `SESSION_NOTES.md` in the project root. If it exists, read it to pick up where the last session left off.

When ending a session, update `SESSION_NOTES.md`:
```markdown
# Session Notes — [date]
## What we worked on
## Current state
## Next steps
## Key decisions made
```
