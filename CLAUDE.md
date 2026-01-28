# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Johannes Häuser, built with Astro and based on the AstroPaper template. The site showcases software engineering projects instead of blog posts, with support for tags, pagination, fuzzy search, and dynamic OG image generation.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with type checking (runs on localhost:3000)
npm run dev

# Build for production (includes jampack optimization)
npm run build

# Preview production build
npm run preview

# Type checking
npm run sync

# Code formatting
npm run format        # Format all files
npm run format:check  # Check formatting without changes

# Linting
npm run lint

# Commit with commitizen (conventional commits)
npm run cz
```

## Architecture

### Content Structure

- **Projects**: Stored as markdown files in `src/content/projects/`
- **Content Collections**: Defined in [src/content/config.ts](src/content/config.ts), uses `blogSchema` from [src/content/_schemas.ts](src/content/_schemas.ts)
- **Schema**: Projects follow the blog schema with frontmatter including `author`, `pubDatetime`, `title`, `projectSlug`, `featured`, `tags`, `ogImage`, and `description`

### Key Directories

- `src/pages/`: File-based routing (`.astro` and `.md` files)
- `src/layouts/`: Layout components (Layout, Main, ProjectDetails, Projects, AboutLayout)
- `src/components/`: Reusable components (mix of `.astro` and `.tsx` files)
- `src/utils/`: Utility functions for sorting, filtering, slugifying, and pagination
- `src/content/`: Content collections (projects)
- `public/`: Static assets (fonts, images, PDFs)

### Routing & Pagination

The site uses a unique routing pattern in [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro#L14-L26) that handles both:
- Individual project pages (slug = project slug)
- Paginated project lists (slug = page number)

This is implemented via `getStaticPaths()` which returns both project routes and page number routes.

### Theming System

TailwindCSS with custom "skin" tokens defined in [tailwind.config.cjs](tailwind.config.cjs). The theming uses CSS variables (e.g., `--color-text-base`, `--color-accent`) with an opacity helper function. Colors are defined in [src/styles/base.css](src/styles/base.css) and support both light and dark modes.

### Configuration

- **Site config**: [src/config.ts](src/config.ts) - Contains SITE metadata, LOCALE, LOGO_IMAGE, and SOCIALS configuration
- **Astro config**: [astro.config.mjs](astro.config.mjs) - Integrations (Tailwind, React, Sitemap), markdown plugins (remarkToc, remarkCollapse)

### React Components

React is used selectively for interactive components:
- [src/components/Search.tsx](src/components/Search.tsx) - Fuzzy search using FuseJS
- [src/components/Card.tsx](src/components/Card.tsx) - Project cards
- [src/components/Datetime.tsx](src/components/Datetime.tsx) - Date formatting

### Utilities

Located in `src/utils/`:
- `getSortedProjects.ts` - Sorts projects by publication date
- `getProjectByTag.ts` - Filters projects by tag
- `getUniqueTags.ts` - Extracts unique tags
- `getPageNumbers.ts` - Generates pagination numbers
- `slugify.ts` - Creates URL-friendly slugs
- `generateOgImage.tsx` - Dynamic OG image generation using Satori

## Important Notes

### Content Collection Naming

The codebase still references "blog" in the schema and collection definitions ([src/content/config.ts](src/content/config.ts#L4-L8), [src/content/_schemas.ts](src/content/_schemas.ts#L3)), but the actual content is stored in `projects/` directory. This is intentional - the schema is reused but the content type has been adapted for projects.

### Pre-commit Hooks

Husky runs lint-staged on pre-commit, which automatically formats staged files with Prettier. Configuration is in [package.json](package.json#L53-L57).

### Build Optimization

The build process uses [@divriots/jampack](https://github.com/divriots/jampack) to optimize the output in `./dist/` after Astro builds.

### Type Safety

The site uses Astro's content collections for type-safe markdown with Zod schemas. Run `npm run sync` to generate TypeScript types for all Astro modules.
