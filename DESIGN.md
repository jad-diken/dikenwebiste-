---
name: Diken Bros
description: The Rider's Jacket. Colour-blocked panels, stitched borders and reflective-tape rules on an off-black ground, in brand red and Alexandria.
colors:
  ink: "#0b0b0c"
  ink-panel: "#131315"
  ink-raised: "#1b1b1e"
  brand-red: "#ed1c26"
  red-fill: "#d4141d"
  red-fill-hover: "#bf1017"
  red-bright: "#ff3b44"
  red-deep: "#9e0f16"
  chalk: "#f4f4f2"
  chalk-72: "rgba(244, 244, 242, 0.72)"
  chalk-52: "rgba(244, 244, 242, 0.52)"
  stitch: "rgba(255, 255, 255, 0.12)"
  stitch-strong: "rgba(255, 255, 255, 0.24)"
typography:
  display:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(32px, 3.35vw, 50px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(30px, 4vw, 52px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(20px, 2vw, 26px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(17px, 1.35vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Alexandria, Helvetica Neue, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  patch: "4px"
  panel: "6px"
spacing:
  xs: "6px"
  sm: "14px"
  md: "26px"
  gutter: "clamp(20px, 4.5vw, 64px)"
  section: "clamp(64px, 9vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.red-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.panel}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.red-fill-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    rounded: "{rounded.panel}"
    padding: "0 24px"
    height: "50px"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "0 24px"
    height: "50px"
  panel:
    backgroundColor: "{colors.ink-panel}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.panel}"
    padding: "{spacing.md}"
  panel-red:
    backgroundColor: "{colors.red-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.panel}"
    padding: "{spacing.md}"
  patch:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.patch}"
    padding: "6px 12px"
    typography: "{typography.label}"
  patch-red:
    backgroundColor: "{colors.red-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.patch}"
    padding: "6px 12px"
    typography: "{typography.label}"
---

# Design System: Diken Bros

## Overview

**Creative North Star: "The Rider's Jacket"**

The site is built the way a delivery captain's jacket is built: colour-blocked panels joined by stitched seams, reflective tape at the breaks, and patches that say who you ride for. The ground is off-black like the Diken suit; the only colour Diken itself wears is the brand red. Every partner appears in its own colour, on its own panel, as a peer standing beside Diken rather than a client standing behind it.

Density is moderate: sections breathe, but panels are packed with real numbers and real names. Motion is one authored moment, the hero rising in on load and the numbers strip lighting up as it enters, plus quiet reveals as the page scrolls. Nothing loops.

**Key Characteristics:**
- One dark theme, page-wide, no section inverts to light.
- Red leads: it carries every primary action, every emphasis word, every seam.
- Panels have a 1px outer border and a 1px dashed inner border, the stitch.
- Reflective-tape rules separate major sections.
- Partner colours appear only on partner panels.
- Alexandria for everything, English and Arabic.

## Colors

A near-black ground with one saturated accent and chalk-white text; partner colours are quoted, never adopted.

### Primary
- **Brand Red** (#ed1c26): Pantone 485 C from the brand guideline. Used for emphasis words in headlines, seams, timeline stripes, arrows and number highlights on the dark ground.
- **Red Fill** (#d4141d): the red used as a background under white text, on buttons, red panels and red patches. It exists because brand red under white sits at 4.4:1; this fill passes 4.5:1.
- **Red Fill Hover** (#bf1017): hover state of red-filled controls.
- **Red Bright** (#ff3b44): focus rings and hover on red lines only, never under text.

### Neutral
- **Ink** (#0b0b0c): the page ground.
- **Ink Panel** (#131315): panel fields.
- **Ink Raised** (#1b1b1e): patches, hovered panels, diagram boxes.
- **Chalk** (#f4f4f2): primary text.
- **Chalk 72 / Chalk 52**: secondary and tertiary text as translucent chalk, never gray.
- **Stitch / Stitch Strong**: 12% and 24% white for borders and dashed inner lines.

### Named Rules
**The Red Under White Rule.** Text on red uses Red Fill (#d4141d), not Brand Red. Brand Red is for red-on-dark only.

**The Quoted Colour Rule.** A partner's colour appears only inside that partner's panel or uniform. It never colours Diken's own controls, headings or rules.

## Typography

**Display Font:** Alexandria (with Helvetica Neue, Arial)
**Body Font:** Alexandria
**Arabic:** Alexandria, semibold, right-to-left, line-height 1.6

**Character:** The brand guideline's own face, geometric and wide, set heavy for headlines and light for body. The same family carries English and Arabic so bilingual lines sit as one voice.

### Hierarchy
- **Display** (800, clamp(32px, 3.35vw, 50px), 1.08): the hero headline only, max 17ch wide, emphasis words in Brand Red.
- **Headline** (800, clamp(30px, 4vw, 52px), 1.08): section headings, always a full sentence with a period.
- **Title** (600, clamp(20px, 2vw, 26px), 1.08): panel and tile headings.
- **Lead** (400, clamp(17px, 1.35vw, 20px), 1.6, Chalk 72): the paragraph under a heading, max 62ch.
- **Body** (400, 16px, 1.6): everything else.
- **Label** (600, 12.5px, 0.02em): patch text. Never uppercase.
- **Numbers**: tabular lining figures wherever a figure appears (`font-variant-numeric: tabular-nums`).

### Named Rules
**The Sentence Rule.** Headings are sentences and end with a period. No labels above headings.

## Layout

A single 1360px container with a fluid gutter (clamp(20px, 4.5vw, 64px)). Sections are padded clamp(64px, 9vw, 128px) vertically, 40 to 80px for the tight contact band. The hero is a 46/54 split, copy left and image bleeding right, with the numbers strip pinned along the bottom; under 1024px it stacks copy, image, then numbers in two columns. Panel grids use 14px gaps: five division doors as 1.35fr 1fr 1fr with the first spanning two rows, the firsts as 1.15fr 1fr 1fr with a two-row photo panel, partners as eight columns at desktop, four on tablet, three on phone. The navigation is 68px, single line to 1024px, then a full-screen panel behind a 44px toggle.

## Elevation & Depth

Flat by default. Depth comes from tonal layering (Ink, Ink Panel, Ink Raised) and from the stitched inner border, not from shadows. The only shadows are inset: the 1px red seam at the top of a panel (`box-shadow: inset 0 1px 0 0 #ed1c26`) and the patch's inset ring. The sticky navigation uses a 14px backdrop blur over the page.

### Named Rules
**The No Drop Shadow Rule.** Nothing casts a shadow. Hover lifts a panel by 3px and raises its tone one step.

## Shapes

Small, consistent radii: 6px on panels, buttons, inputs and diagram boxes; 4px on patches. Every panel carries a 1px outer border in Stitch and a 1px dashed inner border inset 6px, the stitch line. Section breaks are the tape: a 10px band of repeating 28px light dashes on 12px gaps, faded top and bottom with a mask, in white at 55% or in Brand Red. Timelines use the same dashed language as a 4px red dashed stripe.

## Components

### Buttons
- **Shape:** softly rounded (6px), 50px tall, 24px side padding, semibold 16px, icon at 18px after the label.
- **Primary:** Red Fill background, white text; hover Red Fill Hover; active scales to 0.97.
- **Ghost:** transparent with a Stitch Strong border; hover white border and 6% white fill.
- **Light:** white background, Ink text, used on red panels.
- **Focus:** 2px Red Bright outline, 3px offset.

### Patches
- **Style:** Ink Raised field, Stitch Strong border, inset double ring, label type, nowrap. Red variant uses Red Fill with a white inner ring.
- **Use:** division and topic marks inside tiles and timelines. Never above a section heading.

### Panels / Tiles
- **Corner Style:** 6px.
- **Background:** Ink Panel; Ink Raised on hover for links.
- **Border:** 1px Stitch outside, 1px dashed inner line inset 6px.
- **Seam:** optional 1px Brand Red inset line at the top.
- **Internal Padding:** 26px.
- **Red panel:** Red Fill field, white text, used once per page for the contact band.

### Inputs / Fields
- **Style:** Ink Panel field, Stitch Strong border, 6px radius, 14px padding, label above in semibold 14px.
- **Focus:** 2px Red Bright outline and Brand Red border.
- **Error:** message below the field in Red Bright, shown only when `aria-invalid` is true.

### Navigation
- Sticky, 68px, blurred Ink at 78%, 1px Stitch bottom border. Links 14.5px medium in Chalk 72, white on hover, current page underlined by a 2px red inset. A red primary button for Contact. Under 1024px a full-screen list with 20px links divided by Stitch lines.

### Tape (signature)
A 10px reflective-stripe rule between major sections, `repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 28px, rgba(255,255,255,0.08) 28px 40px)` under a vertical fade mask, at 55% opacity; the red variant marks the Impact break.

### Numbers strip (signature)
Five tabular figures on a blurred Ink band with Stitch dividers, the first in Brand Red. Figures fade and rise in sequence when the strip enters the viewport.

## Do's and Don'ts

### Do:
- **Do** set every figure in tabular lining numerals.
- **Do** keep one dark theme across every page and section.
- **Do** use Red Fill (#d4141d) under white text and Brand Red (#ed1c26) on dark.
- **Do** give every panel both borders: 1px solid outside, 1px dashed inside at 6px.
- **Do** end headings with a period and write them as sentences.
- **Do** honour reduced motion: reveals and the hero stagger collapse to their final state.

### Don't:
- **Don't** put a label, kicker or eyebrow above a heading; patches live inside tiles.
- **Don't** use a partner's colour outside that partner's panel.
- **Don't** add drop shadows, gradient text or glass on content panels.
- **Don't** use the em dash or en dash anywhere on the site; the build refuses them.
- **Don't** raise a seam above 1px.
