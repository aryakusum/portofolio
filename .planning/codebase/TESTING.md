# Testing

## Current Testing Strategy

- **Framework:** None currently configured.
- **Coverage:** No unit, integration, or E2E tests are present in the core repository setup.

## Recommendations for Implementation

- **Unit Testing:** Add Vitest and React Testing Library for testing pure functions and individual UI components.
- **E2E Testing:** Consider Cypress or Playwright for critical user flows, given the heavy reliance on complex scroll and 3D animations where manual testing is error-prone.
- **Visual Regression:** Since the app is highly visual and animation-heavy (Framer Motion, GSAP, Three.js), tools like Percy or Chromatic would be highly beneficial to catch unintended UI changes across the `editorial` and `retro` themes.
