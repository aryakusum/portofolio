# Design Document: The Iconic Trio Portfolio Overhaul
Date: 2026-11-20
Status: Approved

## 1. Intent & Overview
Total wipe and replacement of the 3 portfolio themes with three culturally iconic, visually unforgettable identities:
1. **Spider-Verse (Comic Multiverse)**
2. **The Daily Gazette (1930s Broadsheet Newspaper)**
3. **Gothic Shinigami (Death Note Psychological Thriller)**

Each theme features completely unique layouts, typography, color palettes, custom 3D WebGL scenes, interactive soundscapes, and tailored UX micro-interactions.

---

## 2. The 3 Themes Specification

### 2.1 Theme 1: Spider-Verse (Multiverse Comic Pop-Art)
- **Palette**: Neon Cyan `#00f0ff`, Hot Magenta `#ff0055`, Canary Yellow `#ffe600`, Void Black `#08080f`.
- **Typography**: Comic display font, heavy angled italic grotesque, onomatopoeia sound effect bursts ("THWIP!", "BOOM!", "GLITCH!").
- **3D Scene**: `SpiderDimension3D.jsx` — 3D Dimensional Portal Shards floating in space with chromatic aberration distortion, dynamic camera tilt, and interactive glitch on pointer hover.
- **Sections**:
  - `SpiderHero`: Comic cover splash with spider-sense pulse and multiverse coordinates.
  - `SpiderAbout`: Comic origin story strip with angled panels and halftone Ben-Day dots.
  - `SpiderSkills`: Power Grid / Gadget loadout (Web-shooters, Camouflage, Venom Strike).
  - `SpiderProjects`: Multiverse Incident Reports (Dimension 1610, 616, etc.) with graffiti stickers.
  - `SpiderContact`: Signal Flare / Multiverse Dispatch terminal.

### 2.2 Theme 2: The Daily Gazette (1930s Broadsheet Newspaper)
- **Palette**: Aged Newsprint Parchment `#f4ecd8`, Ink Black `#181512`, Faded Gray `#6e6658`, Crimson Stamp Red `#b91c1c`.
- **Typography**: Playfair Display (Serif Broadsheet Headline), Cheltenham-style multi-column serif body, all-caps sub-headers.
- **3D Scene**: `NewspaperPress3D.jsx` — Interactive 3D Cylindrical Printing Press Roll & Folded Broadsheet with rotating pages and ink splatter particles.
- **Sections**:
  - `GazetteHero`: Front Page Above-The-Fold headline: "EXTRA! EXTRA! ARYA KUSUMA REVOLUTIONIZES DIGITAL WEB".
  - `GazetteAbout`: Feature Editorial & Opinion Column with authentic multi-column text wrap and vintage press photo filter.
  - `GazetteSkills`: "Machinery & Technical Patents" patent registry grid.
  - `GazetteProjects`: "Major Developments & Commercial Endeavors" case study broadsheets.
  - `GazetteContact`: "Classified Advertisements & Public Inquiries" classified columns with telegram dispatch.

### 2.3 Theme 3: Gothic Shinigami (Death Note Psychological Thriller)
- **Palette**: Obsidian Leather Black `#08080a`, Crisp Silver `#e2e8f0`, Crimson Apple Red `#990000`, Deep Blood Maroon `#450a0a`.
- **Typography**: Ornate Old English / Gothic Serif headers, handwritten script on notebook lines.
- **3D Scene**: `DeathNote3D.jsx` — 3D Obsidian Leather Death Note notebook with silver engraved lettering, floating over drifting black feathers, ash embers, and an ominous glowing crimson apple.
- **Sections**:
  - `DeathNoteHero`: "THE RULES OF THE NOTEBOOK" intro with ticking pocket watch and crimson lighting.
  - `DeathNoteAbout`: "THE DETECTIVE VS THE SHINIGAMI" psychological profile with L vs Light tension.
  - `DeathNoteSkills`: "SPELLS OF THE NOTEBOOK" (PHP, Python, WebGL, Laravel) bound by ancient shinigami pacts.
  - `DeathNoteProjects`: "SOLVED CASES & CONQUERED REALMS" dossier ledger with inked timestamps.
  - `DeathNoteContact`: "WRITE A NAME IN THE NOTEBOOK" interactive lined parchment where inquiries are inscribed with feather pen ink sounds!

---

## 3. Global Architecture
- **Theme Switcher**: Seamless circle transition with theme-specific sound effects.
- **Audio Synthesizer**: Procedural Web Audio API sound fx for comic pops, newspaper page flips, and gothic pen scratches.
- **Performance & Accessibility**: Zero layout shift, responsive down to 360px viewport, lightweight Three.js geometries with smooth RAF loop.
