# Design Document: Non-3D Rich Interactive Layouts
Date: 2026-11-21
Status: Approved

## 1. Intent & Purpose
Completely eliminate heavy Three.js 3D WebGL scenes to guarantee instant 120 FPS performance on all mobile and desktop devices. In their place, engineer three radically different layout paradigms packed with rich, tactile, and addictive theme-specific DOM/SVG interactions.

## 2. Layout & Interaction Architecture

### 2.1 Theme 1: Spider-Verse (Interactive Comic Book Issue)
- **Layout Paradigm**: Dynamic Comic Book Spread / Masonry Paneling with bold angled comic borders.
- **Interactions**:
  1. `WebShooterOverlay`: Clicking anywhere on the screen shoots an animated web splatter SVG with audio "THWIP!".
  2. `SpiderSenseRadar`: Velocity-reactive spider-sense meter that pulses faster as mouse movement speed increases.
  3. `ComicPanelInspector`: Clicking any project or skill card expands it with comic onomatopoeia bursts ("BOOM!", "POW!", "THWIP!").
  4. `GraffitiDecals`: Draggable/clickable comic sticker stamps.

### 2.2 Theme 2: The Daily Gazette (1930s Broadsheet Newspaper)
- **Layout Paradigm**: Authentic 4-Column Broadsheet with Section Tabs (Front Page, Business, Patents, Classifieds).
- **Interactions**:
  1. `InteractiveStamper`: User can select rubber stamps ("EXTRA!", "APPROVED", "CENSORED") and stamp them onto the newspaper with mechanical ink sounds.
  2. `MagnifyingGlass`: Hovering over vintage newsprint photographs reveals magnified halftone dot-matrix patterns.
  3. `TelegraphTransmitter`: Contact form with real-time Morse code telegraph beeps as the user types.

### 2.3 Theme 3: Gothic Shinigami (The Death Note Interactive Tome)
- **Layout Paradigm**: Open Two-Page Grimoire / Leather Notebook with lined parchment paper.
- **Interactions**:
  1. `RyukForbiddenApple`: Interactive crimson apple that shakes, chuckles with an ominous audio tone, and unlocks secret death rules.
  2. `HeartbeatCountdown`: A 40-second psychological countdown timer with ticking heartbeat audio when writing in the Death Note.
  3. `FeatherQuillInk`: Custom calligraphy ink scratch sounds and ink blot trails.

## 3. Technology & Performance
- Zero Three.js WebGL canvas overhead.
- Lightweight Framer Motion transitions + Tailwind CSS v4 + Web Audio API synthesizer.
- Build must pass cleanly with zero errors.
