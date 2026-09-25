# 🏋️ Gym Studio — Client Sites

A production-ready **React + Vite** micro-site template for gym & fitness studios. Built as a multi-demo monorepo: one codebase that can host multiple client demos, each accessible via its own route.

---

## 📁 Project Structure

```
gym-studio/
└── client-sites/
    ├── index.html               # Vite entry point
    ├── package.json             # Dependencies & scripts
    ├── vite.config.js           # Vite + Tailwind plugin config
    └── src/
        ├── main.jsx             # React root, BrowserRouter mount
        ├── App.jsx              # Top-level router (add new demos here)
        ├── index.css            # Global design tokens & base styles
        ├── shared/
        │   ├── Navbar.jsx       # Reusable sticky navigation bar
        │   └── ContactForm.jsx  # Reusable WhatsApp contact form
        └── demos/
            └── gym/
                ├── Gym.jsx      # Page composer for the gym landing page
                ├── Hero.jsx     # Hero and live next-class countdown
                ├── Timetable.jsx # Interactive weekly class schedule
                ├── Plans.jsx    # Monthly/yearly membership plans
                ├── Trainers.jsx # Coach profile cards
                ├── Bmi.jsx      # BMI calculator widget
                ├── layout.js    # Shared gym layout constants
                └── data.js      # All content data & business logic
```

---

## 🚀 Getting Started

```bash
# Install dependencies
cd client-sites
npm install

# Start dev server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server runs at **`http://localhost:5173`** by default.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **React** | 18.x | UI component library |
| **Vite** | 6.x | Dev server & production bundler |
| **React Router DOM** | 6.x | Client-side routing between demos |
| **Tailwind CSS** | 4.x | Utility-first styling via `@vitejs/plugin-react` |
| **Framer Motion** | 11.x | Declarative animations (tab transitions, price flips) |
| **GSAP** | 3.x | Imperative entrance animations on the Hero section |

---

## 🎨 Design System (`index.css`)

All global design tokens are defined in a single `@theme` block using **Tailwind CSS v4's** CSS-first configuration:

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#101828` | Primary dark text / backgrounds |
| `--color-chalk` | `#e8edf3` | Light background / inverse text |
| `--color-court` | `#2143ff` | Brand blue — CTAs, active states |
| `--color-flash` | `#ffd23f` | Accent yellow — countdown timer |
| `--font-display` | Bricolage Grotesque | Headings, numbers, brand name |
| `--font-sans` | Instrument Sans | Body text |

### Global Behaviours
- **Smooth scrolling** — `html { scroll-behavior: smooth }` enables anchor link transitions.
- **Accessible focus ring** — `:focus-visible` uses the brand blue (`--color-court`) for keyboard navigation.
- **Reduced motion** — A `@media (prefers-reduced-motion: reduce)` block disables all animations and transitions for users who prefer it, respecting OS-level accessibility settings.

---

## 🗂️ Features In Detail

### 1. 🔀 Multi-Demo Router (`App.jsx`)

`App.jsx` is intentionally minimal — it is only a route registry. Each demo lives at its own path:

```jsx
// Add the next demo like this:
<Route path="/clinic" element={<Clinic />} />
```

Currently the Gym demo is mounted at the root path `/`. Adding a new client demo requires only creating a new folder under `demos/` and registering it here.

---

### 2. 🗄️ Centralised Data Layer (`data.js`)

All content that a client would need to customise is isolated in a single file. No code changes are needed for common edits.

#### `WHATSAPP`
```js
export const WHATSAPP = '919999999999'
```
The client's WhatsApp number (country code + number, no `+`). Used by the `ContactForm` to build a deep-link URL.

#### `days`
```js
export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
```
Ordered day list used by the timetable tab strip. ISO week order (Mon = index 0).

#### `schedule`
A derived object mapping each day name to an array of class objects `{ time, name, coach }`. Built from a `base` template; Sunday automatically receives a reduced schedule (only 2 classes). Adding a new class only requires editing the `base` array.

#### `plans`
```js
{ name: 'Starter', price: 1999, note: '8 classes a month' }
```
Array of membership plan objects. The `pick: true` flag marks the recommended/highlighted plan.

#### `trainers`
```js
{ name: 'Riya Shah', role: 'Head coach, strength', years: 9 }
```
Array of coach objects rendered as cards with auto-generated monogram avatars.

#### `nextClass(now?)` _(function)_
Scans up to 8 days ahead from a given `Date` and returns the nearest upcoming class object enriched with `{ day, at }`. This is the engine behind the live countdown in the Hero section.

---

### 3. 📌 Sticky Navbar (`shared/Navbar.jsx`)

A **fully prop-driven**, reusable navigation bar. No gym-specific content is hardcoded inside it.

**Props:**
| Prop | Type | Description |
|---|---|---|
| `brand` | `string` | The gym/studio name shown top-left |
| `links` | `[label, href][]` | Array of nav link pairs (label + anchor href) |
| `cta` | `[label, href]` | The call-to-action button (right side) |

**Behaviour:**
- `sticky top-0` with `z-20` keeps it above all page sections.
- `backdrop-blur` + `bg-chalk/90` creates a frosted-glass effect as content scrolls underneath.
- Nav links are **hidden on mobile** (`hidden md:flex`) to avoid cramping small screens.
- On hover, links transition to the brand `court` blue.

---

### 4. 🦸 Hero Section (`demos/gym/Hero.jsx`)

The above-the-fold section. Contains two main areas:

#### Headline with GSAP entrance animation
Three lines of the headline are individually animated using **GSAP**:
- Each line is wrapped in an `overflow-hidden` container so text slides up from below (a classic "reveal" effect).
- Uses `gsap.context()` for scoped cleanup via `ctx.revert()` on unmount.
- Skipped entirely if `prefers-reduced-motion` is set.

```
"Strength training / you'll actually / keep doing."
```

A sub-headline and a **"Book a free class"** anchor CTA link to the `#contact` section.

#### Live Countdown Card (`useNext` hook)
A dark card that shows:
- **Next class name, coach, and scheduled day/time**
- A **live `HH:MM:SS` countdown** ticking every second to when the doors open

The `useNext` hook:
1. Stores `now` in state, updated every 1 second via `setInterval`.
2. Calls `nextClass(now)` to find the upcoming class.
3. Computes remaining seconds and formats them with zero-padding into `HH:MM:SS`.

The countdown number is styled in `--color-flash` (yellow) with `tabular-nums` so digits don't shift as they change.

---

### 5. 📅 Class Timetable (`demos/gym/Timetable.jsx`)

An interactive weekly schedule with animated tab switching.

**How it works:**
- State: `day` — the currently selected day string (e.g. `"Mon"`), defaulting to **today**.
- A `role="tablist"` button strip renders all 7 days. The active day gets a **Framer Motion** `layoutId="tab"` animated pill that slides smoothly between tabs.
- The class list itself is wrapped in `AnimatePresence` + `motion.ul` so switching days triggers a **fade + slide-in** transition (old list fades out, new list slides in from the right).
- Each class row shows: **time** | **class name** | **coach name**.

---

### 6. 💳 Membership Plans (`demos/gym/Plans.jsx`)

A pricing grid with a **monthly / yearly billing toggle**.

**Plans rendered:** Starter · Standard (recommended) · Unlimited

**Billing toggle:**
- A pill-shaped button group switches between Monthly and Yearly.
- When Yearly is selected, prices are recalculated: `Math.round((monthly × 10) / 12)` — equivalent to 2 months free.
- Each price change is animated with **Framer Motion** (`opacity: 0 → 1`, `y: 8 → 0`) so the number doesn't just snap.

**Recommended plan:**
- The plan with `pick: true` in `data.js` is visually highlighted with the brand blue (`bg-court`) background.
- All "Choose X" buttons anchor to `#contact`.

---

### 7. 👥 Coaches / Trainers (`demos/gym/Trainers.jsx`)

A 3-column card grid showcasing the coaching team.

Each card contains:
- **Monogram avatar** — auto-generated from the coach's initials, styled in one of three rotating colour schemes (`court`, `flash`, `ink`).
- **Full name** — as an `<h3>` heading.
- **Role / speciality** — e.g. "Head coach, strength".
- **Years of experience** — displayed as "X years coaching".

No images are needed — the monogram system works as a clean placeholder that also scales well as the team grows.

---

### 8. ⚖️ BMI Calculator (`demos/gym/Bmi.jsx`)

A simple interactive widget designed as a soft lead-generation tool.

**Inputs:** Height (cm) + Weight (kg) — both number fields.

**Calculation:** `BMI = weight / (height_in_metres)²`

**Output labels (deliberately non-clinical):**
| BMI Range | Label |
|---|---|
| < 18.5 | Below the typical range |
| 18.5 – 24.9 | Within the typical range |
| 25 – 29.9 | Above the typical range |
| ≥ 30 | Well above the typical range |

The result updates **live** as the user types (no submit button). Uses `aria-live="polite"` so screen readers announce the result. A disclaimer nudges users toward booking a free session instead of over-relying on the number.

---

### 9. 📬 Contact / WhatsApp Form (`shared/ContactForm.jsx`)

A frontend-only lead capture form that opens a **pre-filled WhatsApp chat**.

**Inputs:**
- `Your name` — required text field.
- `Your main goal` — `<select>` dropdown (options passed as the `goals` prop).

**On submit:**
1. Builds a natural-language message: `"Hi, I'm [Name]. I'd like to book a free trial. My goal: [Goal]."`
2. URL-encodes it and opens `https://wa.me/{number}?text=...` in a new tab with `noopener` for security.

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `number` | `string` | — | WhatsApp number (from `data.js`) |
| `goals` | `string[]` | — | Dropdown options |
| `button` | `string` | `"Send on WhatsApp"` | CTA button label |

> **Swap to email:** The component comment notes that this can be replaced with a Formspree endpoint if the client prefers email over WhatsApp.

---

### 10. 🦶 Footer

A minimal `<footer>` with:
- Studio name and address.
- Opening hours: 6 am to 9 pm.
- `bg-ink` background with muted `chalk/60` text for contrast.

---

## ♿ Accessibility

| Feature | Implementation |
|---|---|
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all CSS animations; GSAP checks `matchMedia` before running |
| Focus rings | `focus-visible` shows a 2px brand-blue outline on all interactive elements |
| ARIA tabs | Timetable uses `role="tablist"`, `role="tab"`, and `aria-selected` |
| Live region | BMI result uses `aria-live="polite"` |
| Semantic HTML | `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h3>` hierarchy respected throughout |
| Secure links | All `window.open` calls include `noopener` |

---

## ➕ Adding a New Client Demo

1. Create `src/demos/<client>/` with a main component (e.g. `Clinic.jsx`) and a `data.js`.
2. Register it in `App.jsx`:
   ```jsx
   import Clinic from './demos/clinic/Clinic'
   // ...
   <Route path="/clinic" element={<Clinic />} />
   ```
3. Reuse `shared/Navbar.jsx` and `shared/ContactForm.jsx` — both are fully prop-driven and require no modification.

---

## 📦 Build & Deploy

```bash
npm run build
# Output: client-sites/dist/
```

The `dist/` folder is a static site — deploy to any static host:
- **Vercel** — `vercel --prod`
- **Netlify** — drag & drop `dist/`
- **GitHub Pages** — push `dist/` to `gh-pages` branch

> For multi-demo routing to work on a static host, configure **all routes to serve `index.html`** (e.g. `_redirects` on Netlify, `rewrites` on Vercel).
