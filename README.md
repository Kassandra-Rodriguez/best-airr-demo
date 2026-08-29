# Best AirR — spec demo

Concept one-page lead-gen site built to pitch **Best AirR Cooling & Heating LLC** (El Paso, TX).
Prospect #1 on `El-Paso-Website-Prospects.xlsx`.

```
best-airr-demo/
├── index.html    all markup + inline SVG (logo, icons, map)
├── styles.css    "Refrigerated Blue" palette, mobile-first
├── script.js     EN/ES toggle, financing calculator, form validation
└── assets/       (empty — drop client photos here)
```

**Preview:** double-click `index.html`, or
`cd best-airr-demo && python3 -m http.server 8899` → <http://localhost:8899>

---

## Why the page is built this way

Their #1 Meta ad offer is **swamp cooler → refrigerated air conversion**, sold on
*low monthly payments, free estimates, 10-year warranty*. That's an $8k–$15k job and a huge
El Paso market. So the page leads with that conversion — not generic "AC repair."

The pitch hook: **the website on their own BBB profile (`wearebestair.com`) doesn't resolve.**
Verified 29 Aug 2026 — no DNS A record. A homeowner vetting a $10k job clicks it, gets an
error, and calls the next company.

---

## ⚠️ Verified vs. placeholder

**Real — safe to keep:**

| Fact | Source |
|---|---|
| Owner: Raul Ricardo Martinez | BBB profile |
| (915) 888-9856 / (915) 505-9265 | BBB, their ads |
| License TACLA00146067E (exp 12/23/2026) | TDLR via BBB |
| BBB Accredited, A rating (since 12/1/2025) | BBB |
| Founded 10/7/2024 · El Paso, TX 79928 | BBB |
| 10-year warranty · free estimates · financing | their own Meta ads |
| Serves El Paso + Las Cruces · bilingual | their own Meta ads |
| IG @wearebestairr · FB /p/Best-AirR-61572178573241 | verified live |

**Photos — now wired in (client-supplied):**

`assets/` has the 4 originals plus web-optimized copies used by the page:

| file | used as | from |
|---|---|---|
| `hero.jpg` | hero background + gallery tile 3 | `ppl_working.jpg` (crew + ductwork) |
| `unit-clean.jpg` | "Refrigerated air" section photo | `ac_unit.jpg` (rooftop condenser) |
| `crane.jpg` | gallery tile 1 | `placing_a_unit.jpg` (crane lift) |
| `rooftop.jpg` | gallery tile 2 | `ac_unit2.jpg` (package unit, desert) |

To swap any of them: replace the optimized file, keep the same name, keep it roughly the same
shape (hero = landscape, gallery = portrait). Re-optimize with
`sips -Z 1500 -s formatOptions 60 new.jpg --out hero.jpg`.

**Still placeholder — must confirm before this goes live:**

- **Financing APR/terms.** `script.js` line ~10: `APR = 0.0999`, terms 5/10/15 yr. Invented for
  the demo. The page carries a "not an offer of credit" disclaimer, but get his lender's real
  numbers before publishing.
- **Hours.** Footer says "Mon–Sat" with a visible `(confirm hours)` flag. Ask him, then delete
  the `.demo-inline` span.
- **No testimonials/star ratings anywhere** — deliberate. I couldn't verify a Google rating or
  review count, and inventing them would be indefensible. Add real ones once he supplies them.
- **Form has no backend.** Submitting shows a success state and says so on screen. Wire to
  Formspree / Netlify Forms / email before launch.
- Footer carries: *"Concept site prepared for Best AirR — not an official page."* Keep that
  line until he buys.

---

## Repo & hosting

- Repo (public): <https://github.com/Kassandra-Rodriguez/best-airr-demo>
- **Live demo: <https://kassandra-rodriguez.github.io/best-airr-demo/>**

Hosted on GitHub Pages (free; requires the repo to be public). Every `git push`
to `main` redeploys automatically, usually live within ~1 minute.

The page has `<meta name="robots" content="noindex, nofollow">` so it won't be
indexed as a competing "Best AirR" result.

## Before you send it

1. Confirm hours; delete the `(confirm hours)` flag in the footer.
2. Get the real financing APR/terms and update `script.js`.
3. Open it on your phone first. The whole pitch is "your ad clicks come from phones."

**Talk track:**

> "Hi Raul — I build websites for El Paso contractors. I noticed the site listed on your BBB
> profile, wearebestair.com, doesn't load. And your Facebook ads for refrigerated air send
> people straight into Messenger, so there's nothing capturing them at 11pm. I already built
> you a page — free estimate form, your license and BBB accreditation up front, a payment
> calculator, in English and Spanish. Want the link?"

Lead with the dead domain. It's specific, it's verifiable in ten seconds, and it isn't an insult.

---

## Reusing this as a template

Yes — it's built to be reskinned. Everything business-specific is isolated:

**1. Palette** — all colors are CSS custom properties at the top of `styles.css`. Swap 5 values:

```css
:root{
  --navy:#10243F;   /* dark base, headings, footer   */
  --blue:#1D6FC4;   /* primary buttons, links, accent */
  --ice:#EAF3FB;    /* tinted section backgrounds     */
  --green:#4CA64C;  /* checkmarks                     */
  --sun:#F2A81D;    /* warning/flag accents           */
}
```

**2. Copy** — every visible string is `data-en` / `data-es` on the element. Change both, or
delete the toggle + `data-es` attributes if the client isn't bilingual.

**3. Structure** — the sections are independent; keep what fits, delete the rest:

| Section | Reuse for |
|---|---|
| Hero + form card | **always keep** — the lead capture is the product |
| Trust bar | license / accreditation / warranty / years — every trade has these |
| Compare cards | any "old way vs. our way" (swamp vs. refrigerated, repair vs. replace) |
| Financing calculator | any high-ticket job: roofing, concrete, turf, remodels |
| Service grid | any multi-service business |
| Gallery | before/afters — detailers, landscapers, concrete |
| Service area | anything mobile or route-based |

**4. Per-trade swaps that take ~30 min:**

- **Roofing (HGC, Outlaws):** hero → "Storm damage? Free inspection." Compare → repair vs.
  replace. Keep the calculator.
- **Landscaping (JADA, GreenLife):** hero → backyard transformation. Gallery becomes the star —
  move it above the fold. Keep the calculator (turf jobs are financed).
- **Detailing (J's Elite, PRIME, Black & White):** drop the calculator, swap the form for a
  booking form (vehicle, date, address), and put the price menu where the compare cards are.
- **Window tint (GLM):** form becomes a vehicle-specific quote request; add hours + a map,
  since they have a storefront.

**5. Things to re-do per client, not copy:**

- The inline SVG logo in the header/footer is hand-drawn to match *their* mark. Redraw it.
- Every factual claim (license #, accreditation, warranty, years). Never carry one client's
  credentials into another's page.
- The hook. Best AirR's is a dead domain. JADA's is "no website at all despite 3 active social
  channels." Top Deck's is "your ads bypass the form on the site you already paid for."
  The hook is the sale — it can't be templated.

Suggested: once you close one, copy this folder to `_template/`, strip the Best AirR facts,
and keep it as the starting point.
