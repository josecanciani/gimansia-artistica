# Gimnasia Artística

This is the central development profile and constraint guide for the Gimnasia Artística website project.

## Tech Stack

- **Framework:** FuseWire UI Framework (client-side implementation via `github:josecanciani/fusewire#release/1.0.0`)
- **Server:** Minimal Express server via `server.js` (for serving static assets on port `8080`)
- **Type Safety & Linting:** Enforced strictly via `oxlint`, `oxfmt`, and JS Type annotations handled by `eslint-plugin-jsdoc`.

## Project Requirements

1. **Language:** All user-facing text and content in the components and HTML must be written natively in Spanish.
2. **Branding & Theming:** The application adheres strictly to the primary colors of the **Hacoaj club logo**, enforcing a dominant **blue and white** color palette throughout the layout.
3. **Responsive Architecture:** The website is a Progressive Web App (PWA). All layouts, grids, and UI components must gracefully adapt to and be tested for mobile screens (mobile-first paradigm).
4. **Client-Side Rendering:** Everything must be implemented fully client-side. Operations involving state, navigation, or data hydration are exclusively handled by the front-end codebase (the `htdocs/` folder).

## Development Guidelines

All agents contributing to this project MUST abide by these rules, alongside the `writing-fusewire-components` skill specification defining proper Component construction.

## Code Style

- The site is in Spanish, but all code files, comments and AI chats should be in English. The only exception are variable names in the URL.
- **Indentation:** 4 spaces (not tabs)
- **Quotes:** Single quotes for strings
- **No hardcoded duplicates:** Never repeat a value that is already stored in a variable or derived from code. If a path, name, or label appears in log messages, error messages, or comments, reference the variable — don't hardcode the string a second time.
- **No defensive fallbacks:** Do not use optional chaining (`?.`), ternary fallbacks (`x ? x.prop : ''`), `|| defaultValue`, or silent early returns to mask values that should always be present. If state is required, access it directly and let the error surface. Defensive fallbacks hide bugs. Legitimate uses: public lookup methods returning null for missing keys, optional function parameters with defaults, and API boundaries where input is untrusted.
- **JSDoc Strict Enforcement:** ESLint `typecheck` is meticulously strict. You CANNOT bypass JSDoc linting by solely specifying `@returns` or `@param` annotations. You **MUST ALWAYS** include a native, human-readable Block Description prior to the annotations inside the JSDoc tags for every newly created or modified method/getter.
- **No CSS class names in JavaScript:** JS files must never contain CSS class names or visual styling strings. Components should expose semantic data properties (booleans, enums, counts) and let the HTML template decide which CSS classes to apply. For example, a dot indicator should expose `isActive: true` — not `cssClass: 'bg-primary'`. The template uses `fw-if` or similar directives to branch styling based on the semantic value. This keeps the separation of concerns clean: JS owns data, HTML owns structure and class assignment, CSS owns visual presentation.

### Scaffolding

- Put main entry point components within `htdocs/components/` as `.js`, `.html` and `.css` files (using the ES6 classes configuration).
- Put components into subfolders within `htdocs/components/` grouping them by features. Common components (like a Carousel) can go into `htdocs/components/Common/`, for example. It's ok to build multi-level folders (like `htdocs/components/Catalog/Product/`).
- Rely on modern Bootstrap CSS variables and custom utility classes mapped to our blue and white theme.

### Reference

- Check `.agents/skills/writing-fusewire-components/SKILL.md` to learn how to create and manage the components for this site securely, scalably, and interactively.
