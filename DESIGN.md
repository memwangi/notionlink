---
name: Joseph Mugo Portfolio
description: A calm, slightly daring portfolio system for curious clients and recruiters.
colors:
  primary-navy: "#192649"
  ember-accent: "#CA4D0B"
  paper-background: "#FBFAF7"
  ink-foreground: "#28231F"
  quiet-muted: "#706A62"
  soft-subtle: "#A7A29A"
  hairline: "#DEDAD3"
  raised-surface: "#F4F2ED"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0"
  headline:
    fontFamily: "Plus Jakarta Sans, Arial, Helvetica Neue, sans-serif"
    fontSize: "clamp(2.25rem, 5.6vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "0"
  title:
    fontFamily: "Plus Jakarta Sans, Arial, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "0"
  body:
    fontFamily: "Plus Jakarta Sans, Arial, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Plus Jakarta Sans, Arial, Helvetica Neue, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
rounded:
  sm: "4px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
components:
  button-text:
    textColor: "{colors.soft-subtle}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0"
  button-text-hover:
    textColor: "{colors.ink-foreground}"
  picture-card:
    backgroundColor: "{colors.raised-surface}"
    textColor: "{colors.ink-foreground}"
    rounded: "{rounded.sm}"
    padding: "24px"
  project-row:
    backgroundColor: "{colors.paper-background}"
    textColor: "{colors.ink-foreground}"
    rounded: "{rounded.sm}"
    padding: "32px 0"
---

# Design System: Joseph Mugo Portfolio

## 1. Overview

**Creative North Star: "The Quiet Ember Index"**

This portfolio should feel like a still room with one precise ember of color. The experience is calm, respectful, and inviting, but not timid. It gives a curious mind enough restraint to read and enough strangeness to remember who made it.

The system is an editorial brand surface, not an app shell. Typography, measure, and pacing carry the first impression. The portfolio should reject generic SaaS portfolio patterns, flashy gimmicks, noisy card grids, over-explained prototype copy, heavy decorative chrome, and raw Notion export behavior.

**Key Characteristics:**
- Quiet white-base atmosphere with rare, deliberate color.
- Large, tight display type paired with restrained body text.
- Flat surfaces, fine rules, and measured spacing instead of shadow drama.
- Project interactions that invite curiosity without shouting instructions.
- Picture-card moments that can carry hidden notes behind the image.

## 2. Colors

The palette is a restrained white-base system anchored by deep navy and burnt orange, used rarely enough that each appearance feels intentional.

### Primary
- **Deep Curiosity Navy**: The main brand anchor for future high-emphasis surfaces, active states, and decisive moments.

### Secondary
- **Burnt Ember**: The daring color. Use it for rare focus, links, selection, and one memorable accent per view.

### Neutral
- **Warm Paper**: The default page background. It keeps the white base from feeling sterile.
- **Soft Ink**: The primary reading color for headlines and body text.
- **Quiet Taupe**: Secondary text, descriptions, and longer explanatory copy.
- **Distant Stone**: Low-emphasis labels, frame counts, and metadata.
- **Fine Hairline**: Dividers, borders, card outlines, and image-frame rules.
- **Raised Paper**: Quiet lifted areas such as flipped picture-note backs and Notion callouts.

### Named Rules

**The Rare Ember Rule.** Burnt Ember must stay rare. If it appears everywhere, the system becomes noisy and loses the daring quality.

**The White Base Rule.** Warm Paper remains the default atmosphere. Do not drench the portfolio in dark navy unless a specific campaign section earns that shift.

## 3. Typography

**Display Font:** Marcellus with Georgia fallback  
**Body Font:** Plus Jakarta Sans with Arial and Helvetica Neue fallback  
**Label/Mono Font:** Courier New only for inline code and technical fragments

**Character:** The pairing is quiet and deliberate: Marcellus gives the name a calm signature quality, while Plus Jakarta Sans keeps project titles, metadata, and reading copy crisp. The hierarchy should feel spacious, not decorative.

### Hierarchy
- **Display** (400, fluid display scale, 0.88 line-height): Reserved for the site name and rare signature moments.
- **Headline** (600, fluid headline scale, 0.9 line-height): Project titles and expanded project headers.
- **Title** (600, fluid title scale, 0.98 line-height): Picture-note backs and section-level statements.
- **Body** (400, 1.0625rem, 1.75 line-height): Descriptions, Notion prose, and case-study reading. Keep normal body line length around 40-66ch.
- **Label** (500, 0.8125rem, no letter spacing by default): Metadata, project counts, close controls, and quiet interface labels. Use tabular numbers for indexes.

### Named Rules

**The Measure Rule.** Headlines may be narrow and dramatic; body copy may not. Any paragraph longer than 66ch is too wide for this portfolio.

**The No Default Label Rule.** Labels are small, calm, and specific. Avoid repeated uppercase tracked labels unless the label is doing real work.

## 4. Elevation

This system is flat by default. Depth comes from tonal layering, fine borders, and state changes, not shadows. Hover states may lift a card by a fraction, but shadows should remain absent unless the site later introduces real imagery that needs optical separation.

### Named Rules

**The Flat-Still Rule.** No ambient card shadows at rest. If a surface needs hierarchy, use spacing, scale, border, or tonal contrast first.

## 5. Components

### Buttons
- **Shape:** Text-first controls with small-radius focus geometry (4px).
- **Primary:** No large filled primary button exists yet. Future primary actions should use Deep Curiosity Navy text or fill with Warm Paper text, not Burnt Ember by default.
- **Hover / Focus:** Hover shifts text from Distant Stone to Soft Ink. Focus uses the accent outline defined globally.
- **Secondary / Ghost / Tertiary:** Close and project title buttons are quiet text buttons. They must preserve the portfolio rhythm and avoid app-like button chrome.

### Cards / Containers
- **Corner Style:** Gently squared surfaces (4px radius).
- **Background:** Warm Paper for page and project rows, Raised Paper for flipped picture-note backs.
- **Shadow Strategy:** Reference the Flat-Still Rule. Use borders and small motion instead of shadows.
- **Border:** Fine Hairline border for cards, image placeholders, Notion callouts, and flipped card backs.
- **Internal Padding:** 24px on compact card surfaces, 32px on roomier narrative surfaces.

### Navigation
- **Style:** The site name functions as the primary home navigation. It uses Marcellus at display scale with no decorative wrapper.
- **States:** Default text is Soft Ink. Hover may shift to Burnt Ember, but the color should remain a rare signal.
- **Mobile Treatment:** Keep the same typographic identity; reduce scale through fluid clamp values rather than introducing a different mobile header.

### Picture Note Deck

The signature component is a horizontal deck of picture cards. Each card opens from a visual face to a full note face. The interaction should feel like turning over a photograph to read what was written behind it, not like operating a dashboard carousel.

## 6. Do's and Don'ts

### Do:
- **Do** use Deep Curiosity Navy and Burnt Ember as brand anchors, not as decoration.
- **Do** keep the interface calm, respectful, inviting, and a bit daring.
- **Do** let large type, line length, and spacing create hierarchy before adding visual chrome.
- **Do** keep project opening, closing, horizontal browsing, and picture-note reading keyboard accessible.
- **Do** respect reduced-motion preferences when adding animation beyond simple state changes.

### Don't:
- **Don't** use generic SaaS portfolio patterns.
- **Don't** use flashy gimmicks.
- **Don't** build noisy card grids.
- **Don't** add over-explained prototype copy.
- **Don't** add heavy decorative chrome.
- **Don't** make the interface feel like a raw Notion export.
- **Don't** turn Burnt Ember into a repeated badge, stripe, or loud CTA color across every section.
