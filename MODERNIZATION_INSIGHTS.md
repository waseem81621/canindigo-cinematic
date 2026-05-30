# Modernization Insights — Multi-Skill Audit

> **How to read this:** Five specialized skills audited the CanIndigo Oman 
> site at `localhost:5173`. Each section is one skill's independent take. 
> Skills did NOT see each other's output — so overlap is signal (multiple 
> experts spotting the same thing) and conflict is choice (we pick which 
> direction). Decisions are deferred to a final "Picks" section at the end.
>
> **Site context:** Enterprise B2B technology consultancy for the Gulf region. 
> Three verticals (ICT primary, Interiors, Automotive). Built with React 19 + 
> Vite + Framer Motion + GSAP + Lenis. Already animation-heavy. Named clients: 
> Shell Oman, Omantel, Bank Dhofar, Royal Flight, Oman Broadband.
>
> **Sandbox branch:** `design-experiments-v1` (production stays on `main`).
> **No code changes from this exercise** — suggestions only.

---

## Skill 1 — Landing Page Design (Strategy & IA)

### Executive verdict
Strong content and sophisticated motion design, but the strategic structure 
is built for a different visitor than the one you actually attract. You're 
an enterprise B2B consultancy with 5 named clients, yet the homepage is 
structured like a SaaS product launch with a feature-led above-the-fold. 
Three high-impact restructures would meaningfully shift conversion.

### Findings

**1. Above-the-fold density — the biggest gap**
- Hero is text-only on subtle gradient. No social proof above the fold.
- Shell, Omantel, Bank Dhofar logos are hidden in section 3 (ClientStrip).
- For B2B enterprise buyers, "Trusted by Shell Oman, Omantel, Bank Dhofar" 
  appearing under the headline is worth more than any animation on the site.
- No outcome imagery — the hero needs to *visualize* what they're buying 
  (NOC dashboards, engineers, datacenter).

**2. Information architecture — VerticalsSelector is in the wrong place**
- VerticalsSelector (ICT / Interiors / Automotive) sits right after hero, 
  implying equal weight. But the rest of the homepage is *entirely* ICT.
- A visitor who picks Interiors leaves before seeing the proof. A visitor who 
  picks ICT is routed past the proof.
- Recommendation: move VerticalsSelector to the *end* of the homepage as a 
  "We also operate in…" cross-sell. Or convert to a tabbed strip in the nav.

**3. Section pacing — middle is too long (8 sections above contact)**
- BoutiqueApps section (6 SaaS-like products) creates positioning dissonance: 
  *"Are they a consultancy or a vendor?"*
- detailedServices (9 service items) has no home on the homepage.
- Recommendation: reframe BoutiqueApps as "Productized capabilities" with 
  consultancy-tied copy, OR move to `/products` page and replace slot with 
  detailedServices grid.

**4. Conversion flow — CTA hierarchy is weak**
- Two CTAs in hero ("Request Consultation" + "Explore Services") — the 
  secondary dilutes the primary.
- After hero, no CTA until Contact section at bottom (~7 sections of scroll 
  with no conversion prompt).
- Recommendation: drop secondary hero CTA. Add single mid-page CTA after 
  CaseStudies ("See how we can do this for you").

**5. Headline isn't doing its job**
- Current: "Infrastructure. Intelligence. Indigo." — brand-elegant but says 
  nothing.
- Your real positioning: *"Canadian precision + Omani partnership for the 
  most demanding enterprises."*
- Alternatives:
  - *"Enterprise IT that Oman's regulators trust. Without the friction."*
  - *"The Canadian way to run enterprise IT in Oman."*
  - *"One partner for infrastructure, security, and transformation. Trusted 
    by Shell, Omantel, Bank Dhofar."*
- Demote alliterative line to eyebrow.

### Priority-ranked recommendations

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | Move client logos into hero as social proof bar | Low | High |
| 2 | Replace headline with outcome-led copy; demote alliteration to eyebrow | Low | High |
| 3 | Move VerticalsSelector to bottom or nav-strip | Low | Medium |
| 4 | Reframe or relocate BoutiqueApps section | Medium | Medium |
| 5 | Add mid-page CTA after CaseStudies | Low | Medium |
| 6 | Add outcome-led hero imagery | Medium | Medium |
| 7 | Drop secondary CTA in hero | Low | Low |

---

## Skill 2 — Hero Generator

### Five alternative hero concepts

**Concept 1 — Trust-Stack Hero (Logo-led)**
- Eyebrow: *Canadian-led. Omani-registered.*
- Headline: *Enterprise IT trusted by Oman's most critical operations.*
- Subhead: *Managed infrastructure, cybersecurity, and digital transformation — 
  delivered with North American discipline and on-the-ground Omani partnership.*
- CTA: *Request a confidential consultation* (single, no secondary)
- Visual: No image. "**Trusted by**" client logo strip (Shell · Omantel · 
  Bank Dhofar · Royal Flight · Oman Broadband) woven into the composition.
- Why it works: B2B enterprise buyers don't buy from animations, they buy from 
  peers. CTO sees Bank Dhofar/Shell in first 2 seconds → rest of page becomes 
  proof, not pitch.
- Sacrifices: Loses alliterative brand poetry. Less theatrical visually.

**Concept 2 — Numbers Hero (Proof-led)**
- Eyebrow: *Since 2022 in Oman.*
- Headline: *Five enterprises. OMR 380K in active contracts. Zero compromises.*
- Subhead: *CanIndigo Oman runs the infrastructure that Oman's most demanding 
  organizations rely on. Canadian engineering standards. Local partnership.*
- CTA: *Talk to our engineers*
- Visual: Split 60/40. Right column has three glass-card stat tiles counting 
  up on load: 5 enterprise clients · OMR 380K+ active contracts · 3+ years.
- Why it works: Reuses existing `aboutContent.stats` data. Signals "small 
  enough to care, big enough to deliver." Procurement-friendly.
- Sacrifices: OMR 380K might undersell to multinationals. More transactional 
  feel — weaker with visionary CTOs.

**Concept 3 — Ambient Operations Hero (Video-led)**
- Eyebrow: *24/7 Network Operations · Muscat*
- Headline: *The infrastructure behind Oman's enterprise.*
- Subhead: *Managed IT, cybersecurity, and transformation services for 
  organizations that can't afford to fail.*
- CTA: *Request a consultation*
- Visual: Full-bleed looped 12-15s muted video at 50% opacity over deep 
  indigo wash — NOC dashboard, engineer at server rack, datacenter aisle, 
  scrolling logs. Lenis fades video on scroll.
- Why it works: Solves the "no outcome imagery" gap. Matches 2024-2025 
  enterprise aesthetic (Stripe/Vercel/Anthropic). Conveys operational 
  seriousness.
- Sacrifices: LCP cost (500KB-2MB). Requires real footage OR generic stock. 
  Loses warm cream/indigo differentiator — makes you visually indistinguishable 
  from every other ICT consultancy.

**Concept 4 — Two Worlds Hero (Geography-led)**
- Eyebrow: (none)
- Headline: *Two cities. One standard.*
- Subhead: *Engineered in Toronto. Delivered in Muscat. CanIndigo brings 
  North American technical discipline to the Sultanate's most demanding 
  enterprises.*
- CTA: *Start a conversation*
- Visual: Split 50/50. Toronto skyline left, Muscat skyline right, both in 
  indigo line-art SVG. Animated line connects them across the headline on load.
- Why it works: Visualizes the single biggest differentiator (Canadian-Omani 
  axis). Strong brand recall. Plays to GSAP line-draw strength.
- Sacrifices: Visually elegant but conversion-weak. Subordinates offering 
  to origin story. Risk of looking like an architecture boutique, not a 
  hardcore IT operations firm.

**Concept 5 — Capability Carousel Hero (Services-led)**
- Eyebrow: *Enterprise Technology Partner — Muscat*
- Headline: *We run Oman's enterprise **[Infrastructure / Cybersecurity / 
  Cloud / Operations]**.* — bracketed word morphs every 3.5s via existing 
  TextScramble component.
- Subhead: *Managed services and digital transformation for the organizations 
  that hold the Sultanate's most critical systems.*
- CTAs: *Request a consultation* + *See our services* (scroll)
- Visual: Headline word-morph is the visual. One muted line under CTAs: 
  "Trusted by Shell · Omantel · Bank Dhofar."
- Why it works: Reuses existing TextScramble.tsx — implementation cost is 
  hours. Demonstrates capability range in headline itself.
- Sacrifices: Headline-as-animation reads as 2018-era to some buyers. 
  Morphing word can feel restless on long sessions. Doesn't solve social-proof 
  gap as cleanly as 1 or 2.

### Comparison

| Concept | Strategic strength | Conversion impact | Implementation cost | Visual risk |
|---|---|---|---|---|
| 1. Trust-Stack | Highest social proof | High | Low | Low |
| 2. Numbers | Credibility, reuses data | High | Low | Medium |
| 3. Ambient Ops | Strongest emotional pull | Med-High | High (video) | Medium |
| 4. Two Worlds | Strongest brand story | Low-Med | Medium | High |
| 5. Capability Carousel | Reuses existing code | Medium | Very Low | Medium |

### Skill's recommendation
Concepts 1 and 2 are the safest, highest-conversion picks. Both solve the 
"no social proof above fold" gap that landing-page-design also flagged — 
strong cross-skill signal. Concept 3 is the highest-ceiling option if 
willing to invest in real NOC/engineer footage.

---

## Skill 3 — Web Component Design

### Component-by-component upgrades

**1. BoutiqueApps Grid → True Bento Grid**
- Your data already has `span: large/normal/wide` — latent bento waiting to render.
- HR Management (large) as 2×2 anchor, smaller apps in 1×1 cells, WPS/VAT as 
  2×1 banner ("Coming soon").
- Uses CSS Grid + Tailwind 4 container queries (`@container`).
- Signals *curated portfolio* not *product catalog*. Dominant 2024-2025 
  enterprise pattern (Linear, Vercel, Apple, Anthropic).
- **Complexity: Low**

**2. CaseStudies TiltCards → Spotlight Cards + animated gradient borders**
- TiltCards are a 2022-era pattern; spotlight cards (cursor-follow radial 
  glow *behind* content, no transform) are the current iteration.
- Conic gradient border slowly rotates on hover (single-hue indigo variant 
  of the trendy rainbow border).
- Each card gets subtle accent variation (Shell = petroleum amber, Bank 
  Dhofar = teal, Omantel = indigo) so they read as 3 distinct stories.
- Keep existing TiltCard for BoutiqueApps where playfulness fits.
- **Complexity: Low-Medium**

**3. VerticalsSelector → Segmented control (collapse the full section)**
- A full section implies the 3 verticals are equal weight; they aren't.
- Three-button segmented control with sliding indicator. Lives in nav or as 
  a thin band above hero.
- Removes a full scroll-step without removing the affordance.
- **Complexity: Low**

**4. Hero → Aurora/mesh background + dimensional typography**
- Current 12%-opacity gradient is invisible. Aurora gives presence without 
  photo/video.
- Headline gets vertical gradient fill (deep indigo top → lighter bottom). 
  One word could have wireframe outline variant.
- Emerging 2024-2025 pattern (Anthropic, OpenAI, Vercel product launches).
- **Complexity: Medium** (canvas implementation ~80 lines, or pre-built 
  React lib like Aceternity)

**5. About Section → Stat counters + asymmetric marquee strips**
- Static About underutilizes the 4 stats (3+ years, 5 enterprises, 
  15-20 team, OMR 380K+). Counter-on-scroll is a proven credibility lift.
- Two horizontal marquee rows (opposite directions, different speeds): 
  certifications/locations + team-role labels (CCIE · CISSP · AWS · Azure · 
  Canadian-Omani · Riyada SME).
- Asymmetric 60/40 split (not 50/50) — feels editorial.
- **Complexity: Low** (Framer Motion `useInView` + CSS marquee)

**6. MagneticButton on forms → Multi-state button choreography**
- Magnetic effect = brand expression. State choreography = information.
- Idle → click → shrink to circle with spinner → checkmark morph → 
  confirmation message. Error state: horizontal shake + "Try again."
- Especially impactful on Contact form Submit.
- **Complexity: Low-Medium** (Framer Motion AnimatePresence + state machine)

**7. Services Pillars → Horizontal scroll-pin (GSAP ScrollTrigger)**
- Currently linear vertical (all 3 equal). Horizontal-pin treats them as 
  a *journey*: Infrastructure → Cybersecurity → Transformation.
- High-end agency pattern (Awwwards territory). Signals "we sweat details."
- Falls back to current stacked layout on mobile + reduced-motion.
- **Complexity: Medium** (battle-tested GSAP pattern; risk: scroll-jacking)

**8. Contact Form → Conversational inline form**
- Multi-field forms feel like data entry. Conversational fits "confidential 
  consultation" framing.
- Sentence form: *"Hi, I'm [Name] from [Company]. I'd like to discuss 
  [Interest]. Reach me at [Email]."*
- Phone + notes + submit below.
- **Complexity: Medium** (layout-heavy; accessibility care for screen readers)

### Deliberately NOT recommended
- Three.js / WebGL hero scenes — overkill, signals startup not enterprise.
- Heavy parallax — Lenis already provides subtle movement.
- Custom cursor — trendy in 2022, fading.
- Glassmorphism everywhere — would dilute its impact in BoutiqueApps.

### Priority-ranked

| # | Pattern | Replaces | Complexity | Visual Lift |
|---|---|---|---|---|
| 1 | True Bento Grid | BoutiqueApps | Low | High |
| 2 | Spotlight Cards + gradient borders | CaseStudies | Low-Med | High |
| 3 | Segmented control | VerticalsSelector | Low | Medium |
| 4 | Aurora + dimensional type | Hero gradient | Medium | High |
| 5 | Stat counters + marquee | About | Low | Medium |
| 6 | Button state choreography | Form submit | Low-Med | Medium |
| 7 | Horizontal scroll-pin | Services pillars | Medium | High (risky) |
| 8 | Conversational form | Contact form | Medium | Medium |

### Skill's recommendation
Top three by impact-vs-effort: **Bento grid (BoutiqueApps)**, **Spotlight 
cards (CaseStudies)**, **Stat counters (About)**. All low-complexity wins 
that reuse the existing stack and meaningfully shift visual sophistication. 
Horizontal scroll-pin is the highest-ceiling/highest-risk option.

---

## Skill 4 — GSAP + Framer Scroll Animation

### Verdict
Strong individual scroll moments but **no choreographed scroll story.** Each 
section animates in isolation — slide-up, reveal, parallax — but there's no 
narrative thread tying them together. Modern enterprise sites (Stripe, Linear, 
Apple product pages) feel like a film reel; yours currently feels like a 
slide deck. Fix is mostly **scrubbed timelines, layered parallax, and filling 
the two dead zones (About and Footer).**

### Dead zones

**Dead Zone 1 — About: Pinned scrub + stat counters (GSAP, Medium)**
- Pin section for ~150% viewport height; 4 stats count up sequentially as 
  user scrolls. Scrolling backwards counts down.
- Locations + certifications animate in at tail of pin.
- About section currently weakest scroll moment, yet contains strongest 
  credibility numbers (OMR 380K+).

**Dead Zone 2 — Footer: Sticky reveal + aurora background (Framer/CSS, Low)**
- Footer slides up *over* Contact section as user reaches bottom.
- Aurora background drift connects visual story to hero (if hero also gets 
  aurora per web-component-design recommendation).
- "Canadian precision. Omani partnership." gets the BreathingText weight 
  modulation — closes the loop on a motif.

### Upgrades

**Upgrade 1 — Hero: Layered parallax (3 depth planes) (Framer, Low)**
- Background plane 0.3× scroll, mid plane 0.6×, foreground plane 1×.
- Single-plane parallax (current) is barely perceptible. Three-plane is the 
  difference between "this site moves" and "this site has depth."

**Upgrade 2 — Services pillars: Triggered → Scrubbed (GSAP, Low)**
- Single `scrub: 1` property change in existing setup.
- Clip-path reveal becomes tied to scroll position, not triggered once.
- Scrolling backwards re-clips. User *drives* the animation instead of 
  being shown one.
- Right power dynamic for a B2B site selling control and reliability.

**Upgrade 3 — Case Studies: Multi-property scrub (Framer, Low)**
- Per card during scroll: y-translate -50→+50 (current ±30 too subtle), 
  scale 1.0→1.05→1.0, caption opacity peaks when centered, tilt-card 
  gets scroll-rotation on top of mouse-rotation.
- Three identical cards currently feel repetitive; choreographing 4 
  properties per card gives each a kinetic signature without changing design.

**Upgrade 4 — Hero → Services handoff (Both, Medium)**
- Hero exit animation *triggers* Services entry. Hero fades up while first 
  Services pillar image starts clip-path reveal from bottom — meeting hero 
  halfway in the scroll.
- One continuous motion instead of "hero leaves, dead air, services arrives."
- Risk: requires tuning scroll positions across components.

**Upgrade 5 — BoutiqueApps: Staggered reveal + peek-ahead (Framer, Low-Med)**
- First card peeks into view from below *before* section fully in viewport.
- GlowingLine SVG paths draw in *sequence* (line 1, then line 2, etc.) 
  instead of all at once.
- Card glow pulses offset by 0.5s creates a subtle "wave" of activity.

**Upgrade 6 — Shuaa Program: Cinematic pinned moment (GSAP, Medium)**
- Video pins behind section while text/imagery slides over it at different 
  speeds. Video fades on scroll-out.
- 2022 founding date counts up. "Entirely free." stat scrubs scale 
  1.0→1.1→1.0.
- Shuaa is your human moment in an otherwise technical site — deserves the 
  most cinematic treatment.

**Upgrade 7 — ClientStrip: Velocity-linked marquee (Framer, Low)**
- Marquee speed coupled to user's scroll velocity via `useVelocity` + 
  `useSpring`.
- Constant-velocity marquees feel mechanical; velocity-linked feel alive.
- Moot if logos move into hero (per landing-page-design recommendation).

### Deliberately NOT recommending
- Full-screen pinned horizontal scroll for Services (suggested by 
  web-component-design) — interrupts scroll story rather than extending it.
- More TextScramble effects — would dilute the eyebrow moment.
- More smooth-scroll velocity manipulation — Lenis handles it; piling on 
  creates "drunk" scroll feel.

### Priority-ranked

| # | Section | Pattern | Library | Complexity | Impact |
|---|---|---|---|---|---|
| 1 | About | Pinned scrub + stat counters | GSAP | Medium | High (dead zone) |
| 2 | Hero | 3-plane layered parallax | Framer | Low | High |
| 3 | Services | Triggered → scrubbed | GSAP | Low | High |
| 4 | Case Studies | Multi-property scrub | Framer | Low | Med-High |
| 5 | Hero→Services | Choreographed handoff | Both | Medium | Med-High |
| 6 | Shuaa | Cinematic pinned moment | GSAP | Medium | Medium |
| 7 | Footer | Sticky reveal + aurora | Framer/CSS | Low | Medium |
| 8 | BoutiqueApps | Peek-ahead + sequenced | Framer | Low-Med | Medium |
| 9 | ClientStrip | Velocity-linked marquee | Framer | Low | Low |

### Skill's recommendation
Three changes give 80% of the cinematic uplift:
1. **About pinned scrub + counters** — fills biggest dead zone, exploits 
   strongest data
2. **Hero 3-plane parallax** — cheapest, highest-perceived-quality change
3. **Services scrubbed reveals** — single property change, transforms feel

Ship 1-3 first, evaluate before going further.

---

## Skill 5 — Motion Direction & Polish

### Overall verdict
Motion language is **technically excellent** but reads as **"polished 
startup"** rather than **"premium enterprise consultancy."** The difference 
is subtle but commercial: startups want energy and playfulness; enterprise 
buyers want calm, deliberate, *confident* motion. Three changes — easing 
diversification, spring de-bouncing, and adding exit animations — would 
shift the personality from "designed" to "directed."

### Findings

**1. Single easing curve for everything (Cross-cutting, Medium)**
- Global `[0.25, 0.1, 0.25, 1]` applied to entrances, exits, hover, modals, 
  staggers. Motion equivalent of writing every sentence in the same tone.
- Adopt 4-curve system:

| Context | Curve | Notes |
|---|---|---|
| Entrances | `[0.16, 1, 0.3, 1]` (easeOutExpo) | Lands gently — feels arrived |
| Exits | `[0.7, 0, 0.84, 0]` (easeInQuart) | Accelerates out — feels departing |
| UI feedback (hover/focus) | `[0.4, 0, 0.2, 1]` (Material standard) | Tight, snappy, no overshoot |
| Decorative scrubs | `none` (linear) | Easing on scroll feels wrong |

- Single config file with 4 curves, then update component imports. ~30 min.

**2. MagneticButton spring is too bouncy (Single component, Low)**
- Current `stiffness: 350, damping: 15` = damping ratio ~0.4, underdamped, 
  visibly overshoots.
- For a cybersecurity/managed-IT firm selling "Canadian precision," wobble 
  on release is a millisecond-level signal that flair beats rigor.
- Premium luxury brands (Rolex, Hermès, B&O) use critically-damped springs.
- **Recommendation:** `stiffness: 250, damping: 25` (calm, no oscillation). 
  Or switch to tween: `duration: 0.3, ease: [0.16, 1, 0.3, 1]`.

**3. TiltCard rotation feels right but lacks restraint at extremes (Single, Low)**
- At corners can exceed 15° — crosses from premium to gimmicky.
- No input smoothing on cursor velocity — frenetic tilting during fast moves.
- **Recommendation:** cap rotation at ±8°, add cursor-velocity damping 
  (>X px/frame → dampen by 30%), increase perspective to 1400px (flatter).

**4. No exit animations anywhere (Cross-cutting, Medium)**
- Hero slides up on mount, never out. Image reveals reveal in, never out. 
  Modal exit is identical-reversed (lazy).
- Sites that only animate in feel *decorative*. Sites with proper enter/exit 
  feel *directed*.
- **Recommendation:** every animated component gets explicit `exit` prop 
  with exit-easing curve. Hero: reverse-slide lines at 0.8× entrance speed 
  on scroll-out. Modal: asymmetric exit (`[0.7, 0, 0.84, 0]` at 0.2s) 
  instead of symmetric reverse.

**5. Lenis 1.2s smooth-scroll is too long (Single config, Low)**
- 1.2s makes fast wheel-scroll feel delayed; page keeps coasting after user 
  stops. Frustrates power users (who scroll fast — exactly your audience).
- Apple product pages use 0.7-0.9s.
- **Recommendation:** reduce to **0.9s**. Keep cubic easing. Add 
  `wheelMultiplier: 1.0`, `lerp: 0.1`. Trade-off: scroll-linked animations 
  become snappier (good — current 1.2s makes BreathingText/parallax feel drifty).

**6. Duration consistency is accidental (Cross-cutting, Low+refactor)**
- TextScramble 800ms, Modal ~300ms, stagger 80ms, ImageReveal ~600ms, 
  hover varies 200-300ms. Reasonable individually, no documented system.
- New animations will compound the inconsistency into a "weird feel" no 
  one can pinpoint.
- **Recommendation:** adopt 3-speed (really 4-speed) scale, document in code:

| Speed | Duration | Use |
|---|---|---|
| Instant | 150ms | Hover, focus, button states |
| Quick | 300ms | Modals, dropdowns, tooltips |
| Calm | 600ms | Reveals, hero entrances, transitions |
| Cinematic | 1200ms | Page transitions, big moments |

**7. Reduced-motion handling is partial (Cross-cutting infrastructure, Low)**
- Lenis respects `prefers-reduced-motion`. Framer Motion doesn't (no global 
  `MotionConfig`). GSAP ScrollTrigger doesn't auto-respect it either.
- WCAG 2.1 SC 2.3.3 compliance issue. Inconsiderate to vestibular-sensitive 
  enterprise employees — contradicts "Canadian precision + Omani partnership" 
  positioning.
- **Recommendation:** wrap app in `<MotionConfig reducedMotion="user">`. 
  Add `matchMedia('(prefers-reduced-motion: reduce)')` guard at GSAP setup. 
  Verify TiltCard / MagneticButton / TextScramble become **static** under 
  reduce-motion.

**8. Choreography handoffs missing (Mostly single-component, Medium)**
- Preloader → Hero: fades out, then hero appears separately. No morph.
- Click feedback: hover scales, click... releases scale. No "thunk."
- Idle → Loading → Success: covered in web-component-design Finding 6.
- **Recommendation:** use `layoutId` for preloader→hero shared element 
  transition. Add `whileTap={{ scale: 0.96 }}` to MagneticButton with 
  fast spring `{ stiffness: 600, damping: 30 }`.

### Motion personality assessment

**Currently signals:** *Polished, designed, ambitious startup. Sophisticated 
taste. Willing to invest in craft.*

**Should signal:** *Calm, deliberate, confident. Restrained mastery. Trust us 
with your infrastructure.*

### Priority-ranked

| # | Finding | Effort | Personality Shift |
|---|---|---|---|
| 1 | 4-curve easing system | Med (cross-cutting) | High |
| 2 | De-bounce MagneticButton | Low (one file) | Med-High |
| 3 | Add exit animations | Med (additive) | High |
| 4 | Lenis 1.2s → 0.9s | Low (one config) | Medium |
| 5 | Document duration scale | Low + refactor | Low now, high long-term |
| 6 | Cap TiltCard rotation ±8° | Low (one file) | Medium |
| 7 | Global reduced-motion handling | Low (infrastructure) | Accessibility floor |
| 8 | Preloader → Hero layoutId | Medium | Medium |

### Skill's recommendation
**Top three for biggest personality shift:**
1. **De-bounce MagneticButton** — one config change, instantly more premium
2. **Diversify easing curves** — defines motion vocabulary, foundation
3. **Cap TiltCard rotation** — restraint signals confidence

These three together would shift the site's motion personality more than 
any new animation could. *Polish doesn't require addition — sometimes it 
requires subtraction.*

---

# Final Picks — Synthesis

## Strong cross-skill signals (multiple skills said the same thing — high confidence)

**Signal 1: The hero needs social proof above the fold**
- **landing-page-design** rec #1: Move client logos into hero
- **hero-generator** Concept 1 (Trust-Stack) and Concept 2 (Numbers) both 
  put proof in the hero
- Three of the five skills converged on this. Highest-confidence change on 
  the entire list.

**Signal 2: The About section is wasting its strongest asset**
- **landing-page-design** flagged About has the credibility numbers 
  (OMR 380K+, 5 enterprises)
- **web-component-design** rec #5: Stat counters + marquee for About
- **gsap-framer-scroll-animation** rec #1: Pinned scrub + stat counters 
  (highest-priority dead-zone fill)
- All three skills independently flagged this section. Counter animations 
  are unanimously recommended.

**Signal 3: The VerticalsSelector is in the wrong place**
- **landing-page-design** rec #3: Move to end or nav-strip
- **web-component-design** rec #3: Collapse to a segmented control
- Both skills said the same thing. The current full-section treatment is 
  clearly wrong.

**Signal 4: The BoutiqueApps grid is underutilizing its own data**
- **landing-page-design** rec #4: Reframe or relocate (positioning dissonance)
- **web-component-design** rec #1: Apply true bento grid layout (data already 
  has spans)
- Both flagged this section. The fix is either *reframe* (copy-led) or 
  *redesign* (layout-led). Bento layout is the higher-leverage move.

---

## Conflicts to resolve (skills disagreed — we pick)

**Conflict 1: Hero direction**
- **hero-generator** Concept 1 (Trust-Stack — logo-led, text-only): safe, 
  high-conversion, low-cost
- **hero-generator** Concept 3 (Ambient Operations video): high-impact but 
  needs real NOC/engineer footage + LCP cost
- **web-component-design** rec #4: Aurora background + dimensional typography 
  (no video, but adds visual presence)
- **Resolution:** Trust-Stack hero (Concept 1) + Aurora background. Gets 
  social proof above fold AND visual presence without video production cost. 
  Reserve Concept 3 (video) as a future Phase 2 if real footage becomes 
  available.

**Conflict 2: Services pillars**
- **web-component-design** rec #7: Horizontal scroll-pin (high-impact, 
  high-risk, signals "we sweat details")
- **gsap-framer-scroll-animation** rec #3: Just change Services from 
  triggered to scrubbed (low-cost, transforms feel without restructuring) 
  — AND explicitly DOESN'T recommend the horizontal pin
- **Resolution:** Start with scrubbed reveals (scroll-animation skill's 
  rec). Horizontal scroll-pin is a Phase 2 decision after seeing the simpler 
  change land.

**Conflict 3: How much motion to add vs. polish what's there**
- **gsap-framer-scroll-animation** wants to ADD more choreography 
  (8 upgrades, layered parallax, handoffs, sequenced reveals)
- **motion** skill wants to POLISH what's there (de-bounce, cap rotation, 
  diversify easings — *"polish doesn't require addition — sometimes it 
  requires subtraction"*)
- **Resolution:** Polish first, then add. Motion polish is foundational — 
  if MagneticButton stays bouncy, adding choreographed handoffs amplifies 
  the same wrong personality. Sequence: polish (skill 5) → strategic 
  adds (skill 4) → new components (skill 3).

---

## Recommended implementation order

This sequence respects: foundations before features, low-risk before high-risk, 
and high-confidence (cross-skill signal) before single-skill picks.

### Phase 1 — Strategic foundations (no visual change, sets up everything else)
1. **Adopt 4-curve easing system** (motion skill #1) — single config file
2. **Document 3-speed duration scale** (motion skill #6) — single config file 
   + light refactor
3. **Global reduced-motion handling** (motion skill #7) — MotionConfig wrap 
   + GSAP guard. Accessibility floor.

### Phase 2 — Hero rebuild (highest-confidence change — 3 skills converged)
4. **Trust-Stack hero** (hero-generator Concept 1)
   - Replace headline with outcome-led copy ("Enterprise IT trusted by 
     Oman's most critical operations")
   - Demote alliteration to eyebrow
   - Add client logo bar (Shell · Omantel · Bank Dhofar · Royal Flight · 
     Oman Broadband) into hero
   - Drop secondary CTA
   - Add aurora background (web-component-design #4)

### Phase 3 — Quick personality wins (small files, large feel changes)
5. **De-bounce MagneticButton** (motion #2)
6. **Cap TiltCard rotation at ±8°** (motion #3)
7. **Reduce Lenis to 0.9s** (motion #4)

### Phase 4 — Information architecture
8. **Move VerticalsSelector to segmented control** (landing-page-design #3 + 
   web-component-design #3) — frees up a full page section
9. **Remove now-redundant ClientStrip section** (logos moved into hero)
10. **Apply true bento grid to BoutiqueApps** (web-component-design #1)
11. **Add mid-page CTA after CaseStudies** (landing-page-design #5)

### Phase 5 — Choreography & scroll story
12. **About: pinned scrub + stat counters** (scroll-animation #1, 
    web-component-design #5)
13. **Services: trigger → scrubbed** (scroll-animation #3) — single GSAP 
    property change
14. **Hero: 3-plane layered parallax** (scroll-animation #2)
15. **CaseStudies: multi-property scrub + spotlight cards** 
    (scroll-animation #4 + web-component-design #2)
16. **Add exit animations across all reveals** (motion #4)

### Phase 6 — Polish & micro-interactions
17. **Multi-state Submit button** (web-component-design #6) — Contact form
18. **Preloader → Hero layoutId handoff** (motion #8)
19. **Footer: sticky reveal + aurora drift** (scroll-animation dead-zone #2)

### Phase 7 — Reserved for after testing (high-risk, high-ceiling)
- Services horizontal scroll-pin (web-component-design #7) — only if Phase 5 
  scrubbed reveals land well
- Shuaa cinematic pinned moment (scroll-animation #6) — if budget allows
- Conversational form (web-component-design #8) — if user feedback says the 
  Contact form is friction
- Ambient Operations video hero (hero-generator #3) — if real NOC footage 
  becomes available

---

## Estimated effort to ship Phases 1-6

| Phase | Items | Effort |
|---|---|---|
| 1. Foundations | 3 | 1-2 hrs |
| 2. Hero rebuild | 1 (5 sub-changes) | 4-6 hrs |
| 3. Quick wins | 3 | 1 hr |
| 4. IA cleanup | 4 | 3-4 hrs |
| 5. Choreography | 5 | 6-8 hrs |
| 6. Polish | 3 | 3-4 hrs |
| **Total** | **19 items** | **~20 hrs** |

Phases 1-3 are the cheapest, highest-impact starting point — roughly 
**6-8 hours of work** and would deliver the biggest personality shift 
the site has seen since launch.

---

## What was NOT picked (and why)

- **Two Worlds Hero** (hero-generator #4) — too brand-poetic for the audience
- **Capability Carousel Hero** (hero-generator #5) — reuses TextScramble but 
  pattern reads dated
- **Numbers Hero** (hero-generator #2) — OMR 380K might undersell to 
  multinationals; Trust-Stack is safer
- **Horizontal scroll-pin for Services** (web-component-design #7) — 
  explicitly cautioned against by scroll-animation skill
- **Conversational form** (web-component-design #8) — Medium complexity, 
  uncertain payoff
- **Shuaa cinematic pinned moment** (scroll-animation #6) — Phase 2 if budget
- **Velocity-linked marquee** (scroll-animation #7) — moot if ClientStrip 
  is removed
