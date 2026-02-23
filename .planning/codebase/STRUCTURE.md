# Codebase Structure

## Root Directory

- `/src` - Application source code.
- `/public` - Static public assets.
- `/docs` - Potential documentation or build artifacts.

## `src/` Layout

- `/assets/` - Static files like `react.svg`.
- `/components/` - The core building blocks of the UI. Organized into many subdirectories:
  - Theme specific: `editorial/`, `retro/`, `renaissance/`
  - Granular UI: `Aurora/`, `BlurText/`, `ThemeToggle.jsx`, `ContactForm.jsx`
  - 3D/Canvas Elements: `three/`, `Scene3D/`
- `/context/` - React Context providers (e.g., ThemeContext).
- `/hooks/` - Custom React hooks (`useBackgroundAudio`).
- `/theatre/` - @theatre/core integration scripts or states.
- `App.jsx` - Root application component coordinating themes and audio.
- `main.jsx` - React DOM render entry point.
- `data.js` - Data mocks and constant exports.
- `firebase.js` - Firebase initialization (currently dummy).
- `index.css` & `App.css` - Global styling configurations, Tailwind directives.

## Naming Conventions

- React Components: PascalCase directories and `.jsx` files (e.g., `ThemeToggle.jsx`, `BlurText/`).
- Hooks: camelCase starting with "use" (e.g., `useBackgroundAudio.js`).
- Scripts / Utilities: camelCase `.js` (e.g., `firebase.js`, `data.js`).
