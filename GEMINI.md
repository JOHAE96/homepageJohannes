# Gemini Code Assistant Context

This document provides context for the Gemini code assistant to understand the project structure, technologies, and conventions.

## Project Overview

This is a personal blog website built using the [Astro](https://astro.build/) framework. The project is based on the "AstroPaper" theme, which is a minimal, responsive, and SEO-friendly blog theme.

- **Framework**: Astro
- **UI Components**: React
- **Styling**: Tailwind CSS
- **Content**: Markdown

The main content of the site is blog posts, which are located in the `src/content/projects` directory.

## Building and Running

The project uses `npm` for package management.

- **Install Dependencies**:
  ```bash
  npm install
  ```

- **Run Development Server**:
  ```bash
  npm run dev
  ```
  This will start the development server at `http://localhost:4321`.

- **Build for Production**:
  ```bash
  npm run build
  ```
  This will build the static site to the `dist/` directory.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Development Conventions

- **Formatting**: The project uses [Prettier](https://prettier.io/) for code formatting. To format the code, run:
  ```bash
  npm run format
  ```

- **Linting**: The project uses [ESLint](https://eslint.org/) for linting. To lint the code, run:
  ```bash
  npm run lint
  ```

- **Commits**: The project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. To make a compliant commit, use:
  ```bash
  npm run cz
  ```
