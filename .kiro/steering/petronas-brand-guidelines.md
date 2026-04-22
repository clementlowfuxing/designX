---
inclusion: always
---

# PETRONAS Brand Guidelines for Web Development

Complete PETRONAS Visual Identity System extracted from petronas.com production CSS, their official brand guidelines document, and SVG logo assets. Use this whenever building UI, dashboards, or web applications that follow the PETRONAS brand.

Sources:
- petronas.com production CSS (3 stylesheets, ~5000+ rules analyzed)
- petronas.com SVG logo assets (`/themes/custom/petronas/images/`)
- Adobe Typekit font configuration (`use.typekit.net/ycj1lau.css`)
- PETRONAS Visual Identity System brand guidelines document

---

## 1. Color System

### 1.1 Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Emerald Green | `#00A19C` | rgb(0,161,156) | Primary brand color. 43+ bg usages, 70+ text usages in production CSS. Headers, buttons, links, active states, focus rings, accordions. |
| Emerald Dark | `#00615e` | rgb(0,97,94) | Hover states for emerald, secondary emphasis. Used in `background-color` and `color` rules. |
| Deep Grey | `#3D3935` | rgb(61,57,53) | Primary text, logo wordmark (dark version). Bootstrap body color override: `#343a40`. |
| White | `#FFFFFF` | rgb(255,255,255) | Card surfaces, logo backdrop (mandatory), button text on emerald. 46+ bg usages. |

### 1.2 CSS Custom Properties (from petronas.com)

These are the actual `--petronas-*` variables defined in their production CSS:

```css
--petronas-green: #00a99d;
--petronas-purple: #763F98;
--petronas-blue: #314396;
```

Bootstrap overrides they use:

```css
--bs-body-bg: #fff;
--bs-body-color: #343a40;
--bs-link-color: #0079C0;
--bs-link-hover-color: #005283;
--bs-accordion-active-color: #00918c;
--bs-accordion-active-bg: #e6f6f5;
--bs-accordion-btn-focus-border-color: #80d0ce;
--bs-accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(0,161,156,0.25);
```

### 1.3 Secondary / Accent Colors

Used for data visualization, charts, color coding, section backgrounds, and numbered step indicators. Never dominant over primary emerald.

| Name | Hex | CSS Count | Usage |
|------|-----|-----------|-------|
| Purple | `#6C4196` | 12 border, 2 bg | Section accents, chart segments, category coding |
| Purple Alt | `#763F98` | 7 bg | `--petronas-purple`. Hero gradients, section backgrounds, accordion active states |
| Purple Dark | `#432C5F` | — | Darker purple from brand guidelines |
| Blue Deep | `#20419A` | 4 bg | `--petronas-blue` range. Numbered step indicators, section gradients |
| Blue Alt | `#314396` | CSS var | `--petronas-blue`. Section gradient endpoints |
| Gold/Orange | `#F9A330` | 2 bg | Warnings, highlights, chart accent, step indicators |
| Red | `#f02500` | 3 bg | Errors, alerts, caution. Reserved as highlight only per brand guidelines |
| Red Alt | `#ff5268` / `#ff4e2e` | 1 each | Lighter red variants for hover/active error states |
| Lime Green | `#A6CA42` | 2 bg | Positive secondary, chart segments, step indicators |
| Cyan | `#51BCBC` | 2 bg | Lighter teal accent, step indicators, supplementary to emerald |
| Sky Blue | `#7ecfff` | 2 bg | Light informational accent |
| Blue Light | `#93BFEB` | — | Informational, chart segments (from brand guidelines) |
| Teal Light | `#cceceb` | 2 bg-color | Light emerald tint for alert backgrounds, tags |
| Teal Extra Light | `#e6f6f5` | accordion bg | Very subtle emerald bg for hover states, active accordions |
| Sand | `#CEB888` | — | Neutral secondary from brand guidelines |

### 1.4 Numbered Step / Color Coding System

From petronas.com's licensing page, steps are color-coded in this exact order:

| Step | Color | Hex |
|------|-------|-----|
| 1 | Emerald | `#00A19C` |
| 2 | Purple | `#763F98` |
| 3 | Blue Deep | `#20419A` |
| 4 | Cyan | `#51BCBC` |
| 5 | Gold | `#F9A330` |
| 6 | Lime | `#A6CA42` |

This is the official PETRONAS color coding sequence for ordered items, process steps, and categorized lists.

### 1.5 Emerald-to-Purple Gradient System

PETRONAS heavily uses emerald-to-purple gradients for section backgrounds. These are the actual gradient endpoints from their CSS:

```css
/* Emerald → Purple (most common section gradient) */
background: linear-gradient(180deg, #00A19C 0%, #763F98 100%);

/* Emerald → Purple (46% split — used for footers, long sections) */
background: linear-gradient(180deg, #00A19C 46%, #583F98 100%);

/* Emerald → Blue → Purple (3-stop, used for hero/feature sections) */
background: linear-gradient(180deg, #00A19C 0%, #20419A 50%, #6E4598 100%);

/* Emerald → Blue (sustainability, media sections) */
background: linear-gradient(180deg, #00A19C 0%, #0A839B 90%);

/* Emerald → Deep Blue */
background: linear-gradient(180deg, #00A19C 0%, #1A539B 100%);

/* Purple → Emerald (reverse, used for alternating sections) */
background: linear-gradient(180deg, #564099 0%, #00A19C 50%);
```

These gradients always use white text (`#FFFFFF`) and the white logo version.

### 1.6 Surface & UI Colors — Light Theme

| Token | Hex | Usage |
|-------|-----|-------|
| Page background | `#f2f4f6` | Main body background |
| Alt page bg | `#F7F7F7` | Secondary sections |
| Alt page bg 2 | `#F3F3F3` | Tertiary sections |
| Card background | `#FFFFFF` | All card/panel surfaces |
| Card hover | `#f9fafb` | Subtle hover state |
| Border | `#dee2e6` | Card borders, dividers (29 border usages) |
| Border light | `#e9ecef` | Lighter borders, inner dividers (5 bg usages) |
| Border input | `#c1c1c1` | Form input borders (11 usages) |
| Text primary | `#3D3935` / `#343a40` | Headings, body copy |
| Text secondary | `#6c757d` | Labels, descriptions |
| Text muted | `#adb5bd` | Timestamps, placeholders |
| Link | `#0079C0` | Hyperlinks |
| Link hover | `#005283` | Hyperlink hover |

### 1.7 Surface & UI Colors — Dark Theme

Derived from petronas.com dark sections (footer, hero overlays, dark cards) and the brand's Deep Grey base. When building a dark-themed PETRONAS UI, use these tokens:

| Token | Hex | Derivation |
|-------|-----|------------|
| Page background | `#0B1615` | Near-black with emerald undertone |
| Header background | `#0E1D1B` | Slightly lighter, emerald-tinted |
| Card background | `#12241F` | Dark surface with green warmth |
| Card alt / elevated | `#152A25` | Slightly lighter for layering |
| Card hover | `#193530` | Hover state |
| Border subtle | `rgba(0,161,156,0.10)` | Faint emerald borders |
| Border medium | `rgba(0,161,156,0.18)` | Visible on hover |
| Border strong | `rgba(0,161,156,0.30)` | Active/focus states |
| Text primary | `#E4EDEB` | High contrast on dark |
| Text secondary | `#8BABA6` | Emerald-tinted secondary |
| Text muted | `#5A7E78` | Low emphasis |
| Overlay light | `rgba(255,255,255,0.10)` | Subtle white overlay (from their CSS) |
| Overlay medium | `rgba(255,255,255,0.25)` | Medium white overlay |

Dark theme shadows should use emerald tints:
```css
--shadow-dark: 0 1px 3px rgba(0,0,0,0.3);
--shadow-dark-hover: 0 8px 24px rgba(0,99,91,0.15);
--focus-ring-dark: 0 0 0 0.25rem rgba(0,161,156,0.25);
```

Dark theme header options:
- **Emerald header on dark body**: Keep `#00A19C` header, use white logo version
- **Dark header**: Use `#0E1D1B` or `#1e1e1e` (from their CSS), use dark logo version with emerald mark

### 1.8 White Opacity Scale (from petronas.com CSS)

Used for overlays, glass effects, and text on dark/emerald backgrounds:

| Opacity | Value | Usage |
|---------|-------|-------|
| 10% | `rgba(255,255,255,0.10)` | Subtle bg tints, badge backgrounds on emerald |
| 15% | `rgba(255,255,255,0.15)` | Button hover overlays, dividers on dark |
| 25% | `rgba(255,255,255,0.25)` | Medium overlays |
| 30% | `rgba(255,255,255,0.30)` | Divider lines on emerald/dark headers |
| 55% | `rgba(255,255,255,0.55)` | Secondary text on dark backgrounds |
| 75% | `rgba(255,255,255,0.75)` | Primary text on dark backgrounds |
| 85% | `rgba(255,255,255,0.85)` | High emphasis text on dark |
| 90% | `rgba(255,255,255,0.90)` | Near-white text on dark |

### 1.9 Black Opacity Scale (from petronas.com CSS)

Used for overlays on images, shadows, and dark gradients:

| Opacity | Value | Common usage |
|---------|-------|-------------|
| 3-5% | `rgba(0,0,0,0.03)` – `rgba(0,0,0,0.05)` | Subtle card shadows |
| 6-8% | `rgba(0,0,0,0.06)` – `rgba(0,0,0,0.08)` | Standard card shadows |
| 10-15% | `rgba(0,0,0,0.10)` – `rgba(0,0,0,0.15)` | Elevated shadows |
| 30-35% | `rgba(0,0,0,0.30)` – `rgba(0,0,0,0.35)` | Image overlays |
| 55% | `rgba(0,0,0,0.55)` | Medium image overlay |
| 70-85% | `rgba(0,0,0,0.70)` – `rgba(0,0,0,0.85)` | Heavy image/hero overlays |

---

## 2. Typography

### 2.1 Font Loading

PETRONAS uses **Museo Sans** (and variants) loaded via Adobe Typekit. The kit includes:
- `museo-sans` (primary)
- `museo-sans-condensed`
- `museo-sans-display`
- `museo-sans-rounded`

```html
<link rel="stylesheet" href="https://use.typekit.net/ycj1lau.css">
```

```css
font-family: 'museo-sans', 'Museo Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Fallback stack from their Bootstrap override:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
```

### 2.2 Weight Hierarchy (from CSS frequency analysis)

| Weight | Occurrences | Role |
|--------|-------------|------|
| **300** | 61 | **Default body weight.** Most text on petronas.com. Gives the clean, premium feel. |
| **500** | 28 | Navigation items, labels, medium emphasis |
| **600** | 17 | Semi-bold UI elements, sub-labels |
| **700** | 18 | Card titles, subheadings, button text |
| **900** | 12 | Hero headings, KPI values, major emphasis |

**Key rule:** Default `font-weight: 300`. This is the signature PETRONAS typographic feel — light and airy. Reserve 700/900 for clear hierarchy.

### 2.3 Font Sizes (from CSS frequency analysis)

| Size | Occurrences | Usage |
|------|-------------|-------|
| `14px` | 33 | **Most common.** Body copy, descriptions, labels |
| `30px` | 31 | Section headings |
| `20px` | 23 | Card titles, sub-headings |
| `50px` | 18 | Hero headings, large KPI values |
| `40px` | 17 | Large headings |
| `18px` | 18 | Intro paragraphs, emphasized body |
| `16px` / `1rem` | 12+14 | Standard body, buttons |
| `24px` | 6 | Medium headings |
| `12px` | 4 | Small labels, captions |

### 2.4 Line Heights (from CSS frequency analysis)

| Value | Occurrences | Paired with |
|-------|-------------|-------------|
| `20px` | 26 | 14px body copy |
| `36px` | 19 | 30px headings |
| `55px` | 14 | 50px hero text |
| `48px` | 14 | 40px headings |
| `24px` | 12 | 16-18px body |
| `1.5` | 10 | General body (Bootstrap default) |

---

## 3. Gradients & Overlays (from petronas.com CSS)

### 3.1 Emerald Gradients

```css
/* Vertical fade — hero sections, card overlays */
background: linear-gradient(180deg, rgba(0,161,156,1), rgba(0,161,156,0));

/* Bottom-up emerald */
background: linear-gradient(0deg, rgba(0,161,156,1), transparent);

/* Horizontal fade — scroll indicators */
background: linear-gradient(to right, var(--petronas-green), transparent);
```

### 3.2 Purple Section Gradients

Used for alternate section backgrounds on petronas.com:

```css
background: linear-gradient(180deg, rgba(104,63,152,1), ...);  /* #683F98 */
background: linear-gradient(180deg, rgba(86,64,153,1), ...);   /* #564099 */
background: linear-gradient(180deg, rgba(88,63,152,1), ...);   /* #583F98 */
```

### 3.3 Blue Section Gradients

```css
background: linear-gradient(180deg, rgba(55,65,154,1), ...);   /* #37419A */
background: linear-gradient(188deg, rgba(44,70,133,1), ...);   /* #2C4685 */
background: linear-gradient(180deg, rgba(10,131,155,1), ...);  /* #0A839B */
background: linear-gradient(180deg, rgba(12,126,156,1), ...);  /* #0C7E9C */
```

### 3.4 Dark Overlays (for images/heroes)

```css
/* Heavy bottom overlay */
background: linear-gradient(0deg, rgba(0,0,0,0.85), transparent);

/* Full dark overlay with transparency zones */
--bg-overlay: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%);

/* Diagonal dark */
background: linear-gradient(130deg, #000 55%, rgba(0,0,0,0.8));
```

---

## 4. Border Radius (from petronas.com CSS)

| Value | Occurrences | Usage |
|-------|-------------|-------|
| `100px` | 42 | **Pill shape** — buttons, badges, tags, nav pills. The dominant PETRONAS radius. |
| `10px` | 18 | Cards, panels, containers |
| `30px` | 6 | Medium rounded elements, feature cards |
| `25px` | 6 | Similar to 30px, alternate containers |
| `69px` | 3 | Asymmetric rounded corners (e.g., `69px 0px 0px 69px`) |
| `50%` | 7 | Circles (avatars, status dots) |
| `3px` | 5 | Small elements, subtle rounding |

**Key rule:** Buttons and badges = pill (`100px`). Cards = `10px`. This is non-negotiable for brand consistency.

---

## 5. Shadows (from petronas.com CSS)

```css
/* Standard card */
box-shadow: 0 1px 3px rgba(0,0,0,0.06);

/* Elevated / hover */
box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);

/* Large elevation */
box-shadow: 0 1rem 3rem rgba(0,0,0,0.175);

/* Small subtle */
box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);

/* Focus ring — always emerald */
box-shadow: 0 0 0 0.25rem rgba(0,161,156,0.25);
```

---

## 6. Transitions (from petronas.com CSS)

```css
/* Primary transition — used 35 times, the PETRONAS standard */
transition: all 300ms ease;

/* Transform animations */
transition: transform 0.3s ease-in-out;

/* Bootstrap component transitions */
transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
```

**Key rule:** Default transition is `all 300ms ease`. Use this for cards, buttons, and interactive elements.

---

## 7. Official PETRONAS Logo

Two SVG variants from `petronas.com/themes/custom/petronas/images/`:

### 7.1 Logo Color Breakdown

| Variant | Mark outer | Mark inner | Wordmark | Use on |
|---------|-----------|------------|----------|--------|
| **White** (`petronas-logo-white.svg`) | `#FFFFFF` | `#00A19C` | `#FFFFFF` | Emerald or dark backgrounds |
| **Dark** (`petronas-logo-dark.svg`) | `#FFFFFF` | `#00A19C` | `#3D3935` | White or light backgrounds |

Both variants share the same SVG paths. The only difference is the wordmark fill color.

### 7.2 Logo Structure

ViewBox: `0 0 220 84.1`

1. **Geometric 'P' mark** (x: 0–66, y: 0–84):
   - Outer shield shape in white (continuous line = innovation/passion)
   - Inner triangle in emerald `#00A19C` (points to the future; represents Federal Government, State Government, PETRONAS)
   - Inner circle in emerald `#00A19C` (potential within individuals, communities, environment)
2. **Wordmark** "PETRONAS" (x: 67–220):
   - 8 individual letter paths: P, E, T, R, O, N, A, S
   - Fill: `#3D3935` (dark) or `#FFFFFF` (white)

### 7.3 Logo Rules

- Logo **must** sit on a white backdrop with NO border/keyline when placed on colored backgrounds
- Never distort, rotate, mirror, recolor, add effects, outline, tint, watermark, or violate the white backdrop
- Minimum clear space = height of the letter 'P' in the wordmark, on all four sides
- Minimum size: 15mm print / 80px digital
- The "reimagining energy™" tagline lockup is the commercial mark — use for external/consumer-facing applications
- Always use official logo files; never recreate or scan

### 7.4 Inline Logo SVG — White Version (for emerald/dark headers)

```html
<svg viewBox="0 0 220 84.1" xmlns="http://www.w3.org/2000/svg">
  <g>
    <g>
      <path fill="#fff" d="M29.3,84.1c-5.3,0-10.5-1.4-15.1-4.2C5.3,74.5,0,65.1,0,54.8C0,49.6,1.4,44.5,4,40l0,0c0.3-0.6,2.5-4.3,18.1-31.4c3.8-6.5,7.1-8.4,15.7-8.6h0.1h33.9L51.7,34.9l2.7,4.7c2.7,4.6,4.2,9.8,4.2,15.1C58.6,70.9,45.4,84.1,29.3,84.1z"/>
      <path fill="#fff" d="M47.8,34.9L66.1,3.3H37.9C30.1,3.5,28,5.1,25,10.3c0,0-18.1,31.4-18.1,31.4C4.6,45.5,3.3,50,3.3,54.8c0,9.5,5,17.7,12.6,22.3c3.9,2.3,8.5,3.7,13.4,3.7c14.3,0,26-11.6,26-26c0-4.9-1.4-9.5-3.7-13.4L47.8,34.9z"/>
      <g>
        <path fill="#00A19C" d="M43.7,54.8c0,8-6.5,14.4-14.4,14.4c-8,0-14.4-6.5-14.4-14.4c0-8,6.5-14.4,14.4-14.4C37.3,40.4,43.7,46.8,43.7,54.8"/>
        <path fill="#00A19C" d="M47.8,34.9L66.1,3.3H37.9C30.1,3.5,28,5.1,25,10.3c0,0-18.1,31.4-18.1,31.4C4.6,45.5,3.3,50,3.3,54.8c0,9.5,5,17.7,12.6,22.3c3.9,2.3,8.5,3.7,13.4,3.7c14.3,0,26-11.6,26-26c0-4.9-1.4-9.5-3.7-13.4L47.8,34.9z M38.1,10h16.5L44,28.3L40.4,22l-6.7-11.6C34.6,10.1,36,10,38.1,10 M29.3,74.1c-4.7,0-9.1-1.7-12.5-4.5c-4.2-3.5-6.9-8.9-6.9-14.8c0-3.6,1-6.9,2.7-9.8c0,0,16.6-28.8,16.7-28.9l6.5,11.2l0,0l0,0L46,45c0,0,0,0,0,0c1.7,2.9,2.7,6.2,2.7,9.8C48.6,65.5,40,74.1,29.3,74.1"/>
      </g>
    </g>
    <g>
      <path fill="#fff" d="M74.1,51.2c0-1.4,0-4.4,0-4.6c0-0.2,0.2-0.5,0.4-0.6c0.1,0,0.2,0,0.3,0c0.7,0,1.3,0,2,0c1.4,0,2.7-0.1,4-0.6c1.4-0.5,2.6-1.3,3.3-2.6c0.8-1.2,1-2.7,0.9-4.1c-0.1-1.1-0.4-2.1-1-3c-1.3-1.9-3.5-2.7-5.7-2.8c-0.3,0-0.6,0-0.9,0c-0.9,0-1.7,0-2.6,0c-1.2,0-2.4,0-3.6,0c-0.9,0-2.3,0-2.3,1.2c0,0.6,0,1.2,0,1.8v15.3L74.1,51.2z M80,39.6c0,1.4-1.1,2.4-2.9,2.4h-3v-4c0-0.4,0.4-0.8,0.8-0.8h2.2C78.9,37.1,80,38,80,39.6z"/>
      <path fill="#fff" d="M87.2,34.1v17h14.7v-4.3h-9.7v-2.2c0-0.3,0.3-0.7,0.6-0.7h7.9v-4h-8.6v-2.1c0-0.3,0.3-0.7,0.6-0.7h9.1v-4.3H88.5C87.8,32.9,87.2,33.4,87.2,34.1"/>
      <path fill="#fff" d="M104.2,34.1v3.2h5.5v13.8h5.1V37.9c0-0.3,0.3-0.6,0.6-0.6h4.9v-4.5h-14.8C104.8,32.9,104.2,33.5,104.2,34.1"/>
      <path fill="#fff" d="M138.8,39.4c0-4.1-3-6.5-7.6-6.5H124c-0.7,0-1.3,0.6-1.3,1.2v17.1h5.1v-4.6c0-0.3,0.3-0.6,0.6-0.6h1.8l3.5,5.2h5.9l-4.2-6.1C137.5,44,138.8,42.1,138.8,39.4z M133.7,39.6c0,1.4-1.1,2.4-2.9,2.4h-3v-4c0-0.4,0.4-0.8,0.8-0.8h2.2C132.7,37.1,133.7,38,133.7,39.6z"/>
      <path fill="#fff" d="M150.7,32.5c-5.6,0-9.9,4.3-9.9,9.5v0c0,5.3,4.2,9.5,9.8,9.5c5.6,0,9.9-4.3,9.9-9.5V42C160.6,36.7,156.4,32.5,150.7,32.5 M155.4,42.1c0,2.6-1.8,4.9-4.7,4.9c-2.8,0-4.7-2.3-4.7-4.9V42c0-2.6,1.9-4.9,4.6-4.9C153.5,37.1,155.4,39.4,155.4,42.1z"/>
      <path fill="#fff" d="M175.5,34v8.5l-7.5-9.7h-3.4c-0.7,0-1.3,0.6-1.3,1.3v17h5v-10l7.8,10h4.4V32.9h-3.7C176.1,32.9,175.5,33.4,175.5,34"/>
      <path fill="#fff" d="M188.2,51.2l0.9-2.3c0.1-0.4,0.4-0.7,0.8-0.8h6.5l1.3,3.1h5.4l-7.7-18.3h-4.2c-0.6,0.1-0.9,0.4-1.1,0.8l-7.4,17.5z M193,38.9l2,5.2h-4.1L193,38.9z"/>
      <path fill="#fff" d="M213.2,39.8c-2.5-0.6-3.2-0.9-3.2-1.8V38c0-0.7,0.6-1.2,1.8-1.2c1.1,0,2.3,0.3,3.5,0.9c0,0,0.3,0.1,0.4,0.2c0.3,0.2,0.7,0.3,1.2,0.2c0.4-0.1,0.6-0.4,0.9-0.8l1.6-2.2c-2-1.6-4.4-2.4-7.5-2.4c-4.4,0-7.1,2.5-7.1,5.9v0.1c0,3.8,3,4.9,6.9,5.8c2.5,0.6,3.1,1,3.1,1.7v0c0,0.8-0.7,1.3-2.1,1.3c-1.6,0-3.1-0.4-4.6-1.3c-0.4-0.2-0.9-0.5-1.6-0.3c-0.3,0.1-0.5,0.2-0.7,0.5l-1.9,2.3c2.2,2,5.3,3,8.6,3c4.4,0,7.4-2.2,7.4-6v-0.1C220,42.1,217.4,40.7,213.2,39.8"/>
    </g>
  </g>
</svg>
```

### 7.5 Inline Logo SVG — Dark Version (for white/light backgrounds)

Same paths as white version, but wordmark uses Deep Grey `#3D3935`:

```html
<svg viewBox="0 0 220 84.1" xmlns="http://www.w3.org/2000/svg">
  <g>
    <g>
      <path fill="#fff" d="M29.3,84.1c-5.3,0-10.5-1.4-15.1-4.2C5.3,74.5,0,65.1,0,54.8C0,49.6,1.4,44.5,4,40l0,0c0.3-0.6,2.5-4.3,18.1-31.4c3.8-6.5,7.1-8.4,15.7-8.6h0.1h33.9L51.7,34.9l2.7,4.7c2.7,4.6,4.2,9.8,4.2,15.1C58.6,70.9,45.4,84.1,29.3,84.1z"/>
      <path fill="#fff" d="M47.8,34.9L66.1,3.3H37.9C30.1,3.5,28,5.1,25,10.3c0,0-18.1,31.4-18.1,31.4C4.6,45.5,3.3,50,3.3,54.8c0,9.5,5,17.7,12.6,22.3c3.9,2.3,8.5,3.7,13.4,3.7c14.3,0,26-11.6,26-26c0-4.9-1.4-9.5-3.7-13.4L47.8,34.9z"/>
      <g>
        <path fill="#00A19C" d="M43.7,54.8c0,8-6.5,14.4-14.4,14.4c-8,0-14.4-6.5-14.4-14.4c0-8,6.5-14.4,14.4-14.4C37.3,40.4,43.7,46.8,43.7,54.8"/>
        <path fill="#00A19C" d="M47.8,34.9L66.1,3.3H37.9C30.1,3.5,28,5.1,25,10.3c0,0-18.1,31.4-18.1,31.4C4.6,45.5,3.3,50,3.3,54.8c0,9.5,5,17.7,12.6,22.3c3.9,2.3,8.5,3.7,13.4,3.7c14.3,0,26-11.6,26-26c0-4.9-1.4-9.5-3.7-13.4L47.8,34.9z M38.1,10h16.5L44,28.3L40.4,22l-6.7-11.6C34.6,10.1,36,10,38.1,10 M29.3,74.1c-4.7,0-9.1-1.7-12.5-4.5c-4.2-3.5-6.9-8.9-6.9-14.8c0-3.6,1-6.9,2.7-9.8c0,0,16.6-28.8,16.7-28.9l6.5,11.2l0,0l0,0L46,45c0,0,0,0,0,0c1.7,2.9,2.7,6.2,2.7,9.8C48.6,65.5,40,74.1,29.3,74.1"/>
      </g>
    </g>
    <g>
      <path fill="#3D3935" d="M74.1,51.2c0-1.4,0-4.4,0-4.6c0-0.2,0.2-0.5,0.4-0.6c0.1,0,0.2,0,0.3,0c0.7,0,1.3,0,2,0c1.4,0,2.7-0.1,4-0.6c1.4-0.5,2.6-1.3,3.3-2.6c0.8-1.2,1-2.7,0.9-4.1c-0.1-1.1-0.4-2.1-1-3c-1.3-1.9-3.5-2.7-5.7-2.8c-0.3,0-0.6,0-0.9,0c-0.9,0-1.7,0-2.6,0c-1.2,0-2.4,0-3.6,0c-0.9,0-2.3,0-2.3,1.2c0,0.6,0,1.2,0,1.8v15.3z M80,39.6c0,1.4-1.1,2.4-2.9,2.4h-3v-4c0-0.4,0.4-0.8,0.8-0.8h2.2C78.9,37.1,80,38,80,39.6z"/>
      <path fill="#3D3935" d="M87.2,34.1v17h14.7v-4.3h-9.7v-2.2c0-0.3,0.3-0.7,0.6-0.7h7.9v-4h-8.6v-2.1c0-0.3,0.3-0.7,0.6-0.7h9.1v-4.3H88.5C87.8,32.9,87.2,33.4,87.2,34.1"/>
      <path fill="#3D3935" d="M104.2,34.1v3.2h5.5v13.8h5.1V37.9c0-0.3,0.3-0.6,0.6-0.6h4.9v-4.5h-14.8C104.8,32.9,104.2,33.5,104.2,34.1"/>
      <path fill="#3D3935" d="M138.8,39.4c0-4.1-3-6.5-7.6-6.5H124c-0.7,0-1.3,0.6-1.3,1.2v17.1h5.1v-4.6c0-0.3,0.3-0.6,0.6-0.6h1.8l3.5,5.2h5.9l-4.2-6.1C137.5,44,138.8,42.1,138.8,39.4z M133.7,39.6c0,1.4-1.1,2.4-2.9,2.4h-3v-4c0-0.4,0.4-0.8,0.8-0.8h2.2C132.7,37.1,133.7,38,133.7,39.6z"/>
      <path fill="#3D3935" d="M150.7,32.5c-5.6,0-9.9,4.3-9.9,9.5v0c0,5.3,4.2,9.5,9.8,9.5c5.6,0,9.9-4.3,9.9-9.5V42C160.6,36.7,156.4,32.5,150.7,32.5 M155.4,42.1c0,2.6-1.8,4.9-4.7,4.9c-2.8,0-4.7-2.3-4.7-4.9V42c0-2.6,1.9-4.9,4.6-4.9C153.5,37.1,155.4,39.4,155.4,42.1z"/>
      <path fill="#3D3935" d="M175.5,34v8.5l-7.5-9.7h-3.4c-0.7,0-1.3,0.6-1.3,1.3v17h5v-10l7.8,10h4.4V32.9h-3.7C176.1,32.9,175.5,33.4,175.5,34"/>
      <path fill="#3D3935" d="M188.2,51.2l0.9-2.3c0.1-0.4,0.4-0.7,0.8-0.8h6.5l1.3,3.1h5.4l-7.7-18.3h-4.2c-0.6,0.1-0.9,0.4-1.1,0.8l-7.4,17.5z M193,38.9l2,5.2h-4.1L193,38.9z"/>
      <path fill="#3D3935" d="M213.2,39.8c-2.5-0.6-3.2-0.9-3.2-1.8V38c0-0.7,0.6-1.2,1.8-1.2c1.1,0,2.3,0.3,3.5,0.9c0,0,0.3,0.1,0.4,0.2c0.3,0.2,0.7,0.3,1.2,0.2c0.4-0.1,0.6-0.4,0.9-0.8l1.6-2.2c-2-1.6-4.4-2.4-7.5-2.4c-4.4,0-7.1,2.5-7.1,5.9v0.1c0,3.8,3,4.9,6.9,5.8c2.5,0.6,3.1,1,3.1,1.7v0c0,0.8-0.7,1.3-2.1,1.3c-1.6,0-3.1-0.4-4.6-1.3c-0.4-0.2-0.9-0.5-1.6-0.3c-0.3,0.1-0.5,0.2-0.7,0.5l-1.9,2.3c2.2,2,5.3,3,8.6,3c4.4,0,7.4-2.2,7.4-6v-0.1C220,42.1,217.4,40.7,213.2,39.8"/>
    </g>
  </g>
</svg>
```

---

## 8. Component Patterns

### 8.1 Header

**Light theme (petronas.com default):**
- Background: `#00A19C` (emerald)
- Logo: white version SVG
- Text: `#FFFFFF`, font-weight 500
- Height: ~56px, sticky positioned
- Dividers between elements: `rgba(255,255,255,0.30)`
- Badge/pill on header: `rgba(255,255,255,0.15)` background

**Dark theme header:**
- Option A: Keep emerald `#00A19C` header (maintains brand recognition)
- Option B: Dark header `#0E1D1B` or `#1e1e1e`, use white logo version, emerald accents for active states

### 8.2 Cards

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Background | `#FFFFFF` | `#12241F` |
| Border | `1px solid #e9ecef` | `1px solid rgba(0,161,156,0.10)` |
| Border-radius | `10px` | `10px` |
| Shadow | `0 1px 3px rgba(0,0,0,0.06)` | `0 1px 3px rgba(0,0,0,0.3)` |
| Hover shadow | `0 4px 16px rgba(0,0,0,0.08)` | `0 8px 24px rgba(0,99,91,0.15)` |

### 8.3 Buttons (primary)

| Property | Value |
|----------|-------|
| Background | `#00A19C` |
| Color | `#FFFFFF` |
| Border-radius | `100px` (pill) |
| Font-weight | 700 |
| Hover bg | `#00615e` |
| Transition | `all 300ms ease` |
| Focus ring | `0 0 0 0.25rem rgba(0,161,156,0.25)` |

### 8.4 Tags / Badges

- Border-radius: `100px` (pill)
- Font-size: ~12-13px
- Font-weight: 700
- Uppercase with slight letter-spacing

### 8.5 Data Visualization Color Order

When building charts, use the official PETRONAS color coding sequence:
1. `#00A19C` — Emerald (always first/primary)
2. `#763F98` — Purple
3. `#20419A` — Blue Deep
4. `#51BCBC` — Cyan
5. `#F9A330` — Gold
6. `#A6CA42` — Lime
7. `#00615e` — Emerald Dark (overflow)
8. `#6C4196` — Purple Alt (overflow)
9. `#93BFEB` — Blue Light (overflow)

### 8.6 Tooltips

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Background | `#FFFFFF` | `#12241F` |
| Border | `1px solid #dee2e6` | `1px solid rgba(0,161,156,0.15)` |
| Border-radius | `8px` | `8px` |
| Title color | `#3D3935` | `#E4EDEB` |
| Body color | `#6c757d` | `#8BABA6` |

---

## 9. Quick Reference CSS Variables

### Light Theme

```css
:root {
  /* Brand */
  --p-emerald: #00A19C;
  --p-emerald-dark: #00615e;
  --p-deep-grey: #3D3935;

  /* Accent / Secondary (in step-coding order) */
  --p-purple: #763F98;
  --p-purple-alt: #6C4196;
  --p-blue-deep: #20419A;
  --p-blue-alt: #314396;
  --p-cyan: #51BCBC;
  --p-gold: #F9A330;
  --p-lime: #A6CA42;
  --p-red: #f02500;
  --p-blue-light: #93BFEB;
  --p-sky: #7ecfff;
  --p-teal-light: #cceceb;
  --p-teal-bg: #e6f6f5;

  /* Surfaces */
  --bg: #f2f4f6;
  --bg-white: #ffffff;
  --bg-alt: #F7F7F7;
  --border: #dee2e6;
  --border-light: #e9ecef;
  --border-input: #c1c1c1;

  /* Text */
  --text: #3D3935;
  --text-body: #343a40;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --text-link: #0079C0;
  --text-link-hover: #005283;

  /* Radii */
  --radius-card: 10px;
  --radius-pill: 100px;

  /* Shadows */
  --shadow: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-hover: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 1rem 3rem rgba(0,0,0,0.175);
  --focus-ring: 0 0 0 0.25rem rgba(0,161,156,0.25);
}
```

### Dark Theme

```css
:root {
  /* Brand — same as light */
  --p-emerald: #00A19C;
  --p-emerald-dark: #00615e;
  --p-deep-grey: #3D3935;

  /* Accent / Secondary — same as light */
  --p-purple: #763F98;
  --p-purple-alt: #6C4196;
  --p-blue-deep: #20419A;
  --p-blue-alt: #314396;
  --p-cyan: #51BCBC;
  --p-gold: #F9A330;
  --p-lime: #A6CA42;
  --p-red: #f02500;
  --p-blue-light: #93BFEB;
  --p-sky: #7ecfff;
  --p-teal-light: #cceceb;
  --p-teal-bg: #e6f6f5;

  /* Dark surfaces */
  --bg: #0B1615;
  --bg-white: #12241F;
  --bg-alt: #152A25;
  --bg-hover: #193530;
  --border: rgba(0,161,156,0.10);
  --border-light: rgba(0,161,156,0.06);
  --border-hover: rgba(0,161,156,0.18);
  --border-strong: rgba(0,161,156,0.30);

  /* Dark text */
  --text: #E4EDEB;
  --text-body: #E4EDEB;
  --text-secondary: #8BABA6;
  --text-muted: #5A7E78;

  /* Dark shadows */
  --shadow: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-hover: 0 8px 24px rgba(0,99,91,0.15);
  --focus-ring: 0 0 0 0.25rem rgba(0,161,156,0.25);
}
```
