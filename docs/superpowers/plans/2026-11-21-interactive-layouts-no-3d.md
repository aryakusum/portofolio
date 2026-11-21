# Non-3D Rich Interactive Layouts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all 3D WebGL scenes, rebuild each theme with a fundamentally distinct layout paradigm, and integrate tactile, rich theme-specific interactions.

**Architecture:** A unified React 19 portfolio where each of the 3 themes utilizes its own layout engine (Comic Grid for Spider-Verse, Folded 4-Column Broadsheet for Gazette, and Open Two-Page Grimoire for Death Note) powered by a central Web Audio API sound synthesizer and Framer Motion.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS v4, Web Audio API, canvas-confetti, lucide-react.

**Spec:** `docs/superpowers/specs/2026-11-21-interactive-layouts-no-3d.md`

## Global Constraints
- Zero 3D canvas / WebGL scenes in page sections.
- High performance, responsive layout down to 360px viewport.
- Production build `npm run build` must pass cleanly.

---

### Task 1: Enhanced Web Audio Synthesizer
- [ ] Add `rubberStamp()`, `telegraphBeep()`, `heartbeatTick()`, and `ryukChuckle()` to `src/utils/soundFx.js`.

### Task 2: Spider-Verse Rebuild (Comic Book Layout & Web Shooter)
- [ ] Remove `SpiderDimension3D.jsx`.
- [ ] Build `WebShooterLayer.jsx` that captures clicks and spawns web SVG splatters with "THWIP!".
- [ ] Build `SpiderSenseRadar.jsx` velocity-tracking meter.
- [ ] Rebuild `SpiderHero.jsx`, `SpiderAbout.jsx`, `SpiderSkills.jsx`, `SpiderProjects.jsx`, `SpiderContact.jsx` with comic masonry paneling.
- [ ] Update `SpiderContent.jsx`.

### Task 3: The Daily Gazette Rebuild (Folded Broadsheet & Stamp Tool)
- [ ] Remove `NewspaperPress3D.jsx`.
- [ ] Build `GazetteStamper.jsx` allowing users to stamp "EXTRA!", "APPROVED", "CENSORED" anywhere on the newspaper.
- [ ] Build `MagnifyingGlass.jsx` for vintage newsprint photos.
- [ ] Build `TelegraphForm.jsx` for Morse code audio telegram transmission.
- [ ] Rebuild `GazetteContent.jsx` with broadsheet section tabs.

### Task 4: Gothic Death Note Rebuild (Open Leather Grimoire & Ryuk's Apple)
- [ ] Remove `DeathNote3D.jsx`.
- [ ] Build `OpenTomeLayout.jsx` with open two-page notebook spread.
- [ ] Build `RyukAppleWidget.jsx` with interactive shaking, chuckling, and secret rules reveal.
- [ ] Build `HeartbeatTimer.jsx` with 40-second countdown and heartbeat audio.
- [ ] Update `DeathNoteContent.jsx`.

### Task 5: Master Integration & Build Verification
- [ ] Verify `npm run build` passes with 0 errors.
