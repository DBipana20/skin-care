---
name: GlowTrack
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4e4445'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#807475'
  outline-variant: '#d2c3c4'
  surface-tint: '#6d595b'
  primary: '#6d595b'
  on-primary: '#ffffff'
  primary-container: '#fde2e4'
  on-primary-container: '#776365'
  inverse-primary: '#dac0c2'
  secondary: '#57605e'
  on-secondary: '#ffffff'
  secondary-container: '#d8e2df'
  on-secondary-container: '#5b6562'
  tertiary: '#7b535c'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffe1e6'
  on-tertiary-container: '#865d66'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f7dcde'
  primary-fixed-dim: '#dac0c2'
  on-primary-fixed: '#26181a'
  on-primary-fixed-variant: '#544244'
  secondary-fixed: '#dbe5e2'
  secondary-fixed-dim: '#bfc9c6'
  on-secondary-fixed: '#141d1c'
  on-secondary-fixed-variant: '#3f4947'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ecb9c4'
  on-tertiary-fixed: '#2f121a'
  on-tertiary-fixed-variant: '#613c45'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 120px
---

## Brand & Style
The design system is rooted in the "Soft Wellness" aesthetic, blending modern minimalism with a tactile, high-end skincare sensibility. It aims to evoke a sense of calm, ritual, and cleanliness, transforming skincare management from a chore into a moment of self-care. 

The visual language utilizes a mix of **Minimalism** and **Soft UI**, prioritizing generous white space to reduce cognitive load. Surfaces are treated with subtle depth to mimic the soft, frosted glass of luxury cosmetic packaging. The overall emotional response should be one of "gentle organization"—sophisticated yet deeply approachable.

## Colors
The palette is inspired by natural skin tones and botanical extracts. 

- **Primary (Blush Pink):** Used for key brand moments, active states, and highlights. It represents vitality and health.
- **Secondary (Sage Green):** Applied to success states, calming notifications, and "AM" routine indicators.
- **Tertiary (Muted Rose):** Reserved for subtle accents, progress bars, and high-priority call-to-actions.
- **Neutral (Soft Charcoal):** Used exclusively for typography and iconography to maintain high legibility without the harshness of pure black.
- **Surface (Cream/Off-white):** The foundational canvas for all layouts, providing a warmer, more premium feel than standard white.

## Typography
This design system uses **Quicksand** for its rounded terminals and friendly architecture, which perfectly aligns with the soft-wellness vibe. 

- **Headlines:** Use Bold or Semi-Bold weights with slightly tightened letter spacing for a modern, editorial look.
- **Body Text:** Use Medium weight for primary body content to ensure accessibility against the cream background.
- **Labels:** Use uppercase for small labels (label-sm) to add a touch of professional, apothecary-style branding.

## Layout & Spacing
The layout follows a **fluid grid** model with an emphasis on vertical rhythm. 

- **Mobile:** A 4-column grid with 20px side margins. Content cards usually span the full width of the margins.
- **Desktop:** A 12-column centered grid with a maximum content width of 1140px. 
- **Spacing Philosophy:** Use "generous breathing room." Group related items with `sm` (12px) spacing, but separate distinct sections with `lg` (40px) or `xl` (64px) to maintain a clean, unhurried atmosphere.

## Elevation & Depth
This design system avoids heavy shadows. Depth is communicated through:

1.  **Ambient Shadows:** Cards and buttons utilize very soft, ultra-diffused shadows. The shadow color is never black; it is a desaturated version of the Soft Charcoal or a deep Muted Rose (#4A4A4A at 5-8% opacity with a 24px-32px blur).
2.  **Tonal layering:** Placing Sage or Blush surfaces on top of the Cream background creates a natural hierarchy without the need for high-contrast borders.
3.  **Backdrop Blurs:** For overlays or navigation bars, use a 12px background blur with 80% opacity of the Cream color to simulate frosted glass.

## Shapes
The shape language is extremely organic and "bubbly." 

- **Standard Elements:** Buttons, inputs, and small modules use a 1rem (16px) radius.
- **Primary Containers:** Large content cards and routine trackers must use the **rounded-xl** (24px to 32px) setting to evoke the soft edges of a river stone or a smooth cosmetic bottle.
- **Icons:** Use icons with rounded caps and corners. Avoid sharp angles or hairline strokes.

## Components
- **Buttons:** Primary buttons should be pill-shaped (full roundedness) using the Blush Pink or Muted Rose fill. Text should be Soft Charcoal. Secondary buttons use a Sage Green tint with no border.
- **Cards:** The hallmark of the design. Cards use a white background (purer than the cream page background), 24px corner radius, and the signature ambient shadow. 
- **Input Fields:** Softly tinted backgrounds (Sage or Blush at 10% opacity) instead of heavy borders. Focus states are indicated by a 2px Muted Rose glow.
- **Progress Trackers:** For skincare routines, use thick, rounded progress bars with Sage Green for "completed" steps and Cream for "remaining" steps.
- **Chips:** Small, pill-shaped tags used for "Skin Type" (e.g., Oily, Dry). Use low-saturation background tints with darker text of the same hue.
- **Routine Cards:** Specialized cards containing a product image, time-of-day icon (Sun/Moon), and a checkbox. Checkboxes should be large, circular, and transform into a Sage Green checkmark when active.