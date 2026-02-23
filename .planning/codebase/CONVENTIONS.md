# Coding Conventions

## Component Style

- **Functional Components:** Uses React functional components with hooks (`useState`, `useEffect`, `useRef`).
- **Export Pattern:** Default exports are mostly used at the bottom of the file (e.g., `export default App;`), with some named exports for utilities (e.g., `export { auth, db }`).

## Styling System

- **Tailwind Heavy:** Extensive use of Tailwind utility classes directly in `className`.
- **Dynamic Classes:** Template literals used for conditional styling (e.g., ``className={`... ${theme === 'editorial' ? 'bg-[#f4f4f0]' : 'bg-[#050505]'}`}``).
- **Inline Styles:** Rarely used, mostly for dynamic calculations or 3D canvas styles.

## Asset Handling

- External assets and images are currently linked via URLs/CDNs (e.g., `https://cdn.jsdelivr.net/...`) or placeholder services (`placehold.co`) inside `src/data.js`.
- Local assets use native ES modules imports when applicable.

## Error Handling & Logic

- Simple console warnings for unimplemented features (e.g., `console.warn("Firebase not configured")`).
- Heavy usage of `setTimeout` for UI transitions (e.g., theme switching animations) without robust error boundaries visible at the root level.
