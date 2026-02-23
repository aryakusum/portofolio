# External Integrations

## Backend as a Service (BaaS)

- **Firebase** (v12.6.0)
  - `src/firebase.js` currently contains dummy configuration to prevent build errors.
  - Setup to potentially handle Authentication (`loginWithGoogle`) and Database (`db`).
  - _Current Status:_ Dummy implementation (`console.warn("Firebase not configured")`).

## Assets & Hosted Data

- **Static Assets:** GitHub Pages (`gh-pages`) used for hosting static build.
- **Images:** Uses `placehold.co` dynamically and relies on external CDNs (e.g., jsdelivr) for devicons as defined in `src/data.js`.

## Analytics & Webhooks

- None currently configured or detected in the base setup.
