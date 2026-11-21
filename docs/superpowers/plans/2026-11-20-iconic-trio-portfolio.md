# Iconic Trio Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely wipe the existing three themes and replace them with three culturally iconic themes: Spider-Verse (Multiverse Comic), The Daily Gazette (1930s Broadsheet Newspaper), and Gothic Shinigami (Death Note Thriller).

**Architecture:** A unified React 19 + Vite portfolio where ThemeContext manages three active runtime states (`spiderverse`, `gazette`, `deathnote`). Each theme has its own dedicated 3D WebGL scene (Spider Shard Portal, Vintage Newspaper Press, 3D Leather Death Note), procedural Web Audio API soundscapes, and tailored UX micro-interactions.

**Tech Stack:** React 19, Three.js 0.167, @react-three/fiber 9, @react-three/drei 10, Framer Motion 12, canvas-confetti, Tailwind CSS v4, Web Audio API, lucide-react.

**Spec:** `docs/superpowers/specs/2026-11-20-iconic-trio-portfolio-design.md`

## Global Constraints
- React 19 and Three.js 0.167 compatibility without broken peer dependencies.
- Zero layout shift during theme transition with full mobile responsiveness (360px+).
- Procedural audio via Web Audio API (no heavy external mp3 asset downloads).
- Production build `npm run build` must pass cleanly with 0 errors.

## Review Focus
1. Canvas WebGL context memory leaks when rapidly switching between the 3 themes -> Ensure clean unmount and dispose.
2. Web Audio API autoplay restrictions on mobile browsers -> Wrap in user gesture trigger.
3. Font rendering consistency across browsers (Playfair Display for Gazette, Gothic typography for Death Note).
4. Viewport overflow on small screens with tilted/angled CSS transforms -> Ensure `overflow-x-hidden`.
5. High frame-rate performance for 3D shaders on lower-end devices -> Cap geometry counts and disable shadow cascades where appropriate.

---

### Task 1: Theme Context & Global Soundscape Updates
**Files:**
- Modify: `src/context/ThemeContext.jsx`
- Modify: `src/utils/soundFx.js`
- Modify: `src/components/ThemeToggle.jsx`

- [ ] **Step 1:** Update ThemeContext valid themes from `['retro', 'editorial', 'persona']` to `['spiderverse', 'gazette', 'deathnote']` with default `'spiderverse'`.
- [ ] **Step 2:** Add theme-specific audio synthesizer functions in `src/utils/soundFx.js`: `spiderThwip()`, `newspaperCrank()`, `gothicFeatherInk()`.
- [ ] **Step 3:** Update `ThemeToggle.jsx` icons (Spider, Newspaper, Skull/Book) and style states for the three new themes.
- [ ] **Step 4:** Verify theme toggling cycle in runtime without errors.

---

### Task 2: Theme 1 - Spider-Verse Implementation
**Files:**
- Create: `src/components/spiderverse/SpiderDimension3D.jsx`
- Create: `src/components/spiderverse/SpiderHero.jsx`
- Create: `src/components/spiderverse/SpiderAbout.jsx`
- Create: `src/components/spiderverse/SpiderSkills.jsx`
- Create: `src/components/spiderverse/SpiderProjects.jsx`
- Create: `src/components/spiderverse/SpiderContact.jsx`
- Create: `src/components/spiderverse/SpiderContent.jsx`

- [ ] **Step 1:** Build `SpiderDimension3D.jsx` featuring floating comic dimensional shards with chromatic aberration and pointer-hover glitch physics.
- [ ] **Step 2:** Build `SpiderHero.jsx` with comic cover masthead, spider-sense pulse, and halftone Ben-Day dot background.
- [ ] **Step 3:** Build `SpiderAbout.jsx` as an origin story strip with angled panels and onomatopoeia sound stamps ("THWIP!", "BOOM!").
- [ ] **Step 4:** Build `SpiderSkills.jsx` gadget loadout grid with interactive power meters.
- [ ] **Step 5:** Build `SpiderProjects.jsx` multiverse incident reports with graffiti decals.
- [ ] **Step 6:** Build `SpiderContact.jsx` multiverse signal flare dispatch with confetti bursts.
- [ ] **Step 7:** Assemble in `SpiderContent.jsx`.

---

### Task 3: Theme 2 - The Daily Gazette Implementation
**Files:**
- Create: `src/components/gazette/NewspaperPress3D.jsx`
- Create: `src/components/gazette/GazetteHero.jsx`
- Create: `src/components/gazette/GazetteAbout.jsx`
- Create: `src/components/gazette/GazetteSkills.jsx`
- Create: `src/components/gazette/GazetteProjects.jsx`
- Create: `src/components/gazette/GazetteContact.jsx`
- Create: `src/components/gazette/GazetteContent.jsx`

- [ ] **Step 1:** Build `NewspaperPress3D.jsx` showing an interactive 3D cylindrical printing press roll & folded broadsheet.
- [ ] **Step 2:** Build `GazetteHero.jsx` with authentic 1930s broadsheet front page: "EXTRA! EXTRA! READ ALL ABOUT IT!".
- [ ] **Step 3:** Build `GazetteAbout.jsx` multi-column editorial opinion column with vintage halftone press photo filter.
- [ ] **Step 4:** Build `GazetteSkills.jsx` styled as an industrial machinery patent registry.
- [ ] **Step 5:** Build `GazetteProjects.jsx` commercial endeavors case study newspaper spreads.
- [ ] **Step 6:** Build `GazetteContact.jsx` classified advertisements and telegram dispatch column.
- [ ] **Step 7:** Assemble in `GazetteContent.jsx`.

---

### Task 4: Theme 3 - Gothic Shinigami (Death Note) Implementation
**Files:**
- Create: `src/components/deathnote/DeathNote3D.jsx`
- Create: `src/components/deathnote/DeathNoteHero.jsx`
- Create: `src/components/deathnote/DeathNoteAbout.jsx`
- Create: `src/components/deathnote/DeathNoteSkills.jsx`
- Create: `src/components/deathnote/DeathNoteProjects.jsx`
- Create: `src/components/deathnote/DeathNoteContact.jsx`
- Create: `src/components/deathnote/DeathNoteContent.jsx`

- [ ] **Step 1:** Build `DeathNote3D.jsx` with an interactive 3D Obsidian Leather Death Note notebook, drifting black ash feathers, and glowing crimson Shinigami apple.
- [ ] **Step 2:** Build `DeathNoteHero.jsx` with the iconic "HOW TO USE IT" sacred rules intro and ticking pocket watch aura.
- [ ] **Step 3:** Build `DeathNoteAbout.jsx` psychological profile (The Detective vs The Shinigami).
- [ ] **Step 4:** Build `DeathNoteSkills.jsx` dark grimoire spells bound by ancient technical pacts.
- [ ] **Step 5:** Build `DeathNoteProjects.jsx` solved cases ledger with blood-stamped completion marks.
- [ ] **Step 6:** Build `DeathNoteContact.jsx` lined notebook paper contact form where typing plays feather pen scratch sounds and submitting triggers death seal confetti.
- [ ] **Step 7:** Assemble in `DeathNoteContent.jsx`.

---

### Task 5: Master App Integration & Build Verification
**Files:**
- Modify: `src/App.jsx`
- Run: `npm run build`

- [ ] **Step 1:** Update `src/App.jsx` imports to point to `SpiderContent`, `GazetteContent`, and `DeathNoteContent`.
- [ ] **Step 2:** Update theme transition overlay banners and colors.
- [ ] **Step 3:** Run `npm run build` and ensure 0 errors and full bundle emission.
