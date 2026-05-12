# Muraloo Website

Pre-launch landing page for **Muraloo** — repositionable art paper for kids.

## Project
- **Hosting:** GitHub Pages (static)
- **Stack:** Single `index.html` — no build tools, no frameworks
- **Font:** Nunito via Google Fonts (400/700/800/900)

## Images (`images/`)
| File | Used for |
|------|----------|
| `hero-girl.png` | Hero section — girl drawing on wall |
| `muraloo-logo.png` | Brand logo (not yet used in HTML — logo is text-based) |
| `product-box.png` | Floating product box in product showcase section |
| `star.png` | Decorative stars (features header, hero) |
| `heart.png` | Decorative heart (hero) |
| `stick-figure.png` | "Made for little artists" feature card icon |

## Brand Colours
```
--purple:  #7c3aed
--blue:    #2563eb
--green:   #16a34a
--amber:   #f59e0b
--orange:  #f97316
--dark:    #1e1b4b
--gradient: purple → indigo → blue → cyan → green → amber → orange → red
```

## Sections (top to bottom)
1. Navbar (absolute positioned over hero)
2. Hero — gradient bg, headline, hero-girl image, floating decorations
3. Wave SVG transition
4. Product showcase — floating product box
5. Features — 4-up grid (Unroll / Sticks / Peels / Little artists)
6. CTA — gradient card with email signup form
7. Footer wave + Footer

## Email form
Currently client-side only (shows success state, resets after 5s). Needs a backend or service (e.g. Mailchimp, Formspree) wired up before launch.
