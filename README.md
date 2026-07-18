# Astral Spaceways Incorporated

> *If you find Earth boring!*

The in-world website of **Astral Spaceways Incorporated** — the spiritual-travel
agency operated by *The Herd of God*, an immersive theatrical production. It reads
as an authentic late-90s spiritual-business site: a **prop** that deepens the world
and a **funnel** that routes real inquiries to the production.

**This is a work of theatrical fiction.** Nothing here is a real service or a real
transaction. No page collects money or card details. Every "book/reserve" CTA
resolves to the Inquiries page or a `mailto:` link.

---

## What this is (technically)

Hand-authored **static HTML + CSS + a little vanilla JS**. No framework, no build
step, no dependencies. It deploys as-is on GitHub Pages. Everything degrades
gracefully: all content and the inquiry form work with JavaScript disabled; the
starfield and split-flap departures board are progressive enhancements.

```
astral-spaceways/
├── index.html            Splash + hero + departures board + pitch
├── about.html            "Our Cosmology" — the tree, the gates, the Gift World
├── departures.html       Services & fares (the boarding-class menu)
├── destinations.html     The catalog: four terminals + the Gift World easter egg
├── oracle.html           The Oracle & Crew (character bios)
├── testimonials.html     Traveler accounts
├── ascent.html           "How a flight works" — the five-stage itinerary
├── safety.html           Contraindications, disclaimers, the honest seam
├── inquiries.html        The real form → routes to the production
├── membership.html       "Join the Herd" — soft cross-link to the church
├── thanks.html           No-JS form success fallback
├── 404.html              "Lost in the Astral"
├── assets/
│   ├── css/style.css     All design tokens + components
│   ├── js/               starfield.js · splitflap.js · nav.js · form.js
│   ├── img/              calf-sigil.svg · route-map.svg · og-image.(svg|png)
│   └── fonts/            self-hosted Cormorant Garamond, Spectral, Space Mono (woff2, OFL)
├── favicon.svg / favicon.ico / apple-touch-icon.png
├── robots.txt
└── .nojekyll             serves files as-is (no Jekyll processing)
```

## Editing the copy

Every page is a plain `.html` file — open it and edit the text. The shared header
and footer are duplicated on each page (no build step); if you change one, change
it everywhere. Design tokens (colors, fonts, spacing) live in `:root` at the top of
`assets/css/style.css`.

## The inquiry form (activate before launch)

`inquiries.html` posts to **[Web3Forms](https://web3forms.com)**, a static-friendly
form-to-email relay. It ships **inert** so it can't misfire:

1. Create a free access key at <https://web3forms.com> bound to your production
   inbox (the address inquiries should reach).
2. In `inquiries.html`, replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` in the hidden
   `access_key` field with your real key.
3. Update the `mailto:` fallback address in `inquiries.html` (currently
   `synergy@benjaminlife.one`) to your production inbox — this is the interim
   address; confirm or replace it.
4. Submit a real test and confirm the email lands (and the subject routing reads
   correctly).

Until the key is set, the form politely directs visitors to the `mailto:` link, and
that mail link works with or without JavaScript.

## Deploy (GitHub Pages)

Published from the **`main` branch, root** of
[`omniharmonic/astral-spaceways`](https://github.com/omniharmonic/astral-spaceways).
Live at **<https://omniharmonic.github.io/astral-spaceways/>**.

```bash
git add -A && git commit -m "…"
git push
# Settings → Pages → Deploy from a branch → main → / (root)
```

Because it's served from the `/astral-spaceways/` subpath, all internal links are
**relative** and `404.html` uses `<base href="/astral-spaceways/">`. If you move to
an apex custom domain served from `/`, drop that `<base>` tag and add a `CNAME` file.

## Accessibility & performance

- Responsive to 320px; visible gold keyboard focus; `prefers-reduced-motion`
  disables the starfield twinkle and split-flap animation.
- Fonts self-hosted as woff2 with `font-display: swap`; no external requests.
- Contrast on `--bone`/`--void` and `--calf-gold`/`--void` meets WCAG AA.

---

*A work of Benjamin Life ([@omniharmonic](https://twitter.com/omniharmonic)) for* The Herd of God. *Fonts are SIL Open Font Licensed. Empty is the throne.*
