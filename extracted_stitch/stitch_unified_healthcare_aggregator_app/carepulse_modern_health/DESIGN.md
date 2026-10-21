---
name: CarePulse Modern Health
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f484f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7880'
  outline-variant: '#bec8d0'
  surface-tint: '#00658c'
  primary: '#006388'
  on-primary: '#ffffff'
  primary-container: '#007dab'
  on-primary-container: '#fcfcff'
  inverse-primary: '#80d0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#a5361e'
  on-tertiary: '#ffffff'
  tertiary-container: '#c64d34'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5e7ff'
  primary-fixed-dim: '#80d0ff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6a'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a4'
  on-tertiary-fixed: '#3e0500'
  on-tertiary-fixed-variant: '#87200b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-md: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system establishes a human-centered, calming, and deeply reassuring atmosphere for personal health navigation, diagnostic booking, and clinical appointments. Medical interfaces frequently trigger cognitive friction and health-related anxiety; the UI responds by softening clinical sterility through organic curves, optimistic warm coral touches, accessible contrast, and gentle micro-depth.

Drawing from a synthesis of **Modern Tactile Minimalism** and **Airy Soft-Surface Glassmorphism**, the aesthetic avoids aggressive borders, overly clinical monochrome palettes, or cold enterprise dashboards. Instead, it pairs friendly pill silhouettes, high-readability type scales, and pastel-tinted cards with crisp, trustworthy status signifiers (such as verified check badges, doctor star ratings, and transparent lab pricing tiers). The interface invites gentle interaction, prioritizing clarity, immediate visual triage, and effortless decision-making under stress.

## Colors

The palette balances clinical precision with natural warmth:
- **Primary (`#0D8ABC`)**: Trustworthy medical blue anchored across primary interactive nodes, hero header accents, prominent action buttons, and active bottom navigation states.
- **Secondary (`#10B981`)**: Refreshing mint teal communicating health restoration, verified practitioner badges, positive diagnosis availability, and successful confirmations.
- **Tertiary (`#F97356`)**: Gentle coral/peach utilized for primary attention draws—such as emergency symptom checks, urgent call-to-actions, cart/order checkouts, and promotional health test badges.
- **Neutral (`#64748B`)**: Slate neutral establishing crisp, legible typography tiers and subtle card borders.

### Surface Tones & Backgrounds
- **Canvas Base**: `#F8FAFC` (ultra-soft light slate ensuring no harsh glare).
- **Surface Elevation 01**: `#FFFFFF` (pure crisp card containers with pill boundaries).
- **Surface Elevation 02**: `#F0F9FF` (soft cyan tint used for highlight cards and active filter containers).
- **Surface Urgent/Soft Accent**: `#FFF4F2` (delicate peach wash behind primary symptom CTA containers).
- **Text Primary**: `#0F172A` (deep slate navy for maximum WCAG AAA legibility).
- **Text Secondary**: `#475569` (supporting metadata, reviews, distance metrics).

## Typography

**Plus Jakarta Sans** governs the system across all tiers. Its open letterforms, balanced geometry, and friendly curves eliminate intimidating sterile medical undertones while preserving high scanning efficiency.

- **Headlines**: Semi-bold to bold cuts with slight optical tightening (-0.01em to -0.02em) for doctor titles, diagnostic names, and screen titles.
- **Body**: Regular weights maintain comfortable line heights (1.4–1.5x) to ensure test instructions, preparation notes, and clinical descriptions remain effortlessly legible.
- **Labels & Badges**: Medium and bold weights support pill tags, rating displays, and verification labels.

## Layout & Spacing

The layout is built upon an 8pt baseline rhythm adapted for a 4-column mobile grid system (expanding to 8 columns on tablet viewports and 12 on desktop dashboards):
- **Outer Canvas Margins**: Set to `1rem` (16px) on compact handhelds, extending to `1.25rem` (20px) on standard devices.
- **Component Breathing Space**: Doctor cards, lab package listings, and pill chips utilize internal padding between `0.75rem` (`space-md`) and `1rem` (`space-lg`), delivering touch-first, tap-safe comfort (minimum touch target of 44x44px).
- **Vertical Hierarchy**: Distinct health categories and service carousels maintain an open separation of `1.5rem` (`space-xl`) to discourage visual clutter during triage.

## Elevation & Depth

Visual hierarchy uses **Soft Surface Tiers** combined with **Ambient Tinted Shadows**, avoiding harsh drop-shadows or stark borders:

- **Level 0 (Base Canvas)**: `#F8FAFC` flat canvas.
- **Level 1 (Cards & Modules)**: Pure white `#FFFFFF` layered with an ambient shadow: `0 4px 20px -2px rgba(13, 138, 188, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`. A crisp hairline stroke (`1px solid #E2E8F0` or `#F1F5F9`) provides edge stability.
- **Level 2 (Floating Action & Overlays)**: Bottom sticky booking bars, pill filters, and dialogs: `0 10px 25px -4px rgba(13, 138, 188, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Urgent & Hero Action Modules)**: Coral gradient cards (`#F97356` to `#FB923C`) and Primary Blue CTA triggers cast a color-matched diffuse glow: `0 8px 20px -4px rgba(249, 115, 86, 0.35)`.

## Shapes

The system relies on a **Pill-Shaped / Continuous Curve** philosophy (Roundedness level `3`):
- **Full Pill (`9999px`)**: Filter chips, tag indicators, primary interactive buttons, search toggles, and status markers.
- **Rounded-XL (`1.5rem` to `2rem`)**: Healthcare provider cards, test packages, bottom action sheets, and specialty banners.
- **Rounded-MD (`0.75rem`)**: Inner photo frames, hospital thumbnail views, and nested item rows.
- **Avatars**: Circular (`50%` radius) with a 2px white outline and subtle soft-teal verification badge anchored at the bottom-right quadrant.

## Components

### Buttons
- **Primary Action (Blue)**: Full pill shape (`9999px`), background gradient from `#0D8ABC` to `#0B729D`, white bold text, height 48px, subtle cyan ambient shadow.
- **Urgent Action (Coral)**: Background gradient from `#F97356` to `#FF8C66`, white bold text, forward chevron icon on the trailing edge. Used for "Check Symptoms" and checkout completions.
- **Secondary / Ghost**: White background, `1.5px` border in `#0D8ABC`, text in `#0D8ABC`, zero shadow.
- **Tertiary / Action Badges**: Pill-shaped micro-buttons (`height: 32px`, `padding: 0 12px`, `font-size: 12px`), used for "Book Now", "View Profile", and "Check Availability".

### Filter & Selection Chips
- **Inactive**: Solid white or `#F1F5F9` surface, `#475569` text, hairline border in `#E2E8F0`, pill radius.
- **Active**: Soft cyan `#E0F2FE` or light emerald background, `#0D8ABC` text, accompanied by a small leading checkmark icon.

### Doctor & Clinic Cards
- Constructed with a `#FFFFFF` surface container, `24px` corner radius, `space-lg` padding.
- Left-aligned doctor avatar (`56x56px`) with border radius `16px` or circle.
- Right-aligned pricing (`₹500`, `₹699`) in bold headline-sm slate.
- Includes star ratings with `#F59E0B` icon and inline verified badge (teal shield/checkmark).
- Bottom row features pill-shaped direct-action micro buttons.

### Symptom & Health Check Banners
- Dual-color gradient fills (e.g., Peach-to-Coral for triage, Ice-Blue-to-Cyan for lab packages).
- Left-aligned illustrative or iconography badge in a translucent frosted circle.
- Right-directed disclosure arrow ensuring obvious clickability.

### Bottom Navigation Bar
- Frosted translucent slate surface (`rgba(255, 255, 255, 0.92)` with `backdrop-filter: blur(16px)`).
- Hairline top border `#F1F5F9`.
- Active item marked by `#0D8ABC` icon, colored dot, and bold typography; inactive items in muted `#94A3B8`.