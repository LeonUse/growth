---
name: Webdesign Site UI/UX
description: Design system guidelines for the webdesign-site project. Applies Luxury Minimal × Editorial styles using the project's CSS variables, typography, colors, animations, and component structures.
---

# Webdesign Site UI/UX Design System

Use this skill when developing new components, sections, or pages for the `webdesign-site` (`c:\myProjects\webdesign-site`). This ensures the new features seamlessly match the existing **Luxury Minimal × Editorial** design language.

## 1. Design Philosophy
- **Vibe:** Luxury, Minimal, Editorial.
- **Theme:** Dark mode by default (`color-scheme: light dark`).
- **Contrast & Glow:** Use subtle glowing effects and warm accents over dark minimalist backgrounds.

## 2. Colors & Theming
Always refer to the CSS variables defined in `src/styles/variables.css`.

- **Backgrounds:**
  - `var(--color-bg)` (`#0A0A0B`): Main page background.
  - `var(--color-bg-elevated)` (`#141416`): Slightly elevated elements.
  - `var(--color-surface)` (`#1C1C1F`): Cards and panels.
  - `var(--color-surface-hover)` (`#222227`): Hovered panels.
- **Text:**
  - `var(--color-text)` (`#F5F2EB`): Primary text (Off-white for luxury feel).
  - `var(--color-text-muted)` (`#8A8A8E`): Secondary text.
  - `var(--color-text-subtle)` (`#5A5A60`): Minor hints or inactive text.
- **Accents (Gold):**
  - `var(--color-accent)` (`#D4A853`): Primary brand color (buttons, links, active states).
  - `var(--color-accent-hover)` (`#E0BC6A`): Hover state for accents.
  - `var(--color-accent-dim)` / `var(--color-accent-glow)`: Used for glowing shadows (`var(--shadow-accent)` or selection highlights).
- **Borders:**
  - `var(--color-border)` (`#2A2A2E`): Default borders.
  - `var(--color-border-accent)` (`#3A3022`): Hovered or active borders mixing dark and gold.

## 3. Typography
- **Headings (Display):** `var(--font-display)` (Playfair Display, Georgia, serif). Use for `h1` - `h6`. Weight should be `var(--fw-bold)`(700) or `var(--fw-black)`(900). Line-height 1.2, letter-spacing `-0.02em`.
- **Body Text:** `var(--font-body)` (system-ui, sans-serif). Regular weight (`400`). Line-height 1.7.
- **Monospace:** `var(--font-mono)` (JetBrains Mono, Fira Code) for code or technical data.
- **Spacing:** Fluid typography with variables (`--text-sm` to `--text-8xl`).

## 4. Components & Layout
- **Container (`.container` in globals):** Constrained to `1280px` max-width with fluid padding (`clamp(1rem, 5vw, 4rem)`). Always wrap page content in a container to maintain alignment.
- **Section (`.section` in globals):** Apply generous vertical padding (`clamp(4rem, 8vw, 7rem)`).
- **Cards (`.card` in `Card.module.css`):**
  - Use `var(--color-surface)` background.
  - Large border radius (`var(--radius-lg)` = 20px).
  - Add interactive states with `.card--clickable` (translates up `-4px`, adds `var(--shadow-lg)` and border color transition).
  - `.card--glow` variant adds a subtle gold shadow (`var(--shadow-accent)`).
- **Buttons (`.btn` in `Button.module.css`):**
  - Pill shape (`--radius-full`).
  - Font: body font, semibold (`--fw-semibold`).
  - Primary: Gold background, dark text (`#0A0A0B`). On hover, gains glow (`0 0 24px var(--color-accent-glow)`) and moves up (`-1px`).
  - Secondary/Ghost: Transparent background with accent/border lines.
- **Accent Elements:**
  - **Text Gradient (`.text-gradient`):** For highlighting important words in headings (gold to light gold).
  - **Accent Line (`.accent-line`):** A small horizontal line used below headings or categories (3rem width, 2px height, gold).

## 5. Animations & Interaction Patterns
Use the utility classes from `src/styles/animations.css` combined with Framer Motion, GSAP, or Lenis smooth scrolling (which is active in the project):
- `.animate-fadeUp`: Default entrance for text and cards (`transform: translateY(32px)` -> `0`).
- `.animate-fadeIn`: Subtle entrance.
- `.animate-scaleUp`: For prominent pop-ups or badges.
- `.delay-100` to `.delay-600`: For staggering list items.
- Incorporate GSAP scroll animations (`useScrollAnimation`) for advanced reveal-on-scroll behaviors.

## Implementation Rules
1. Never hardcode colors, spacing, or fonts. Always use the mapped CSS variables from `variables.css`.
2. Keep the UI uncluttered. Depend on robust padding (e.g., `var(--space-8)`, `var(--space-12)`) to give elements space.
3. Don't mix system serif fonts for display if Playfair isn't loaded; stick to the fallback stack.
