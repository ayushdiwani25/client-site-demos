import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../../shared/Navbar'
import ContactForm from '../../shared/ContactForm'
import { days, schedule, plans, trainers, testimonials, gallery, story, address, hours, faqs, nextClass, WHATSAPP } from './data'

gsap.registerPlugin(ScrollTrigger)

const pad = (n) => String(n).padStart(2, '0')
const inner = 'mx-auto max-w-6xl px-6'
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function useActiveSection(ids) {
  const [active, setActive] = useState(`#${ids[0]}`)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids])
  return active
}

function Reveal({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() =>
      gsap.from(ref.current, {
        opacity: 0, y: 32, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    )
    return () => ctx.revert()
  }, [])
  return <div ref={ref}>{children}</div>
}

function useNext() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const c = nextClass(now)
  const s = Math.max(0, Math.floor((c.at - now) / 1000))
  return { c, clock: `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}` }
}

function Hero() {
  const root = useRef(null)
  const { c, clock } = useNext()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' })
      gsap.from('[data-card]', { opacity: 0, y: 24, delay: 0.5, duration: 0.7 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className={`${inner} grid items-end gap-10 pb-20 pt-16 md:grid-cols-[1.4fr_1fr] md:pt-28`}>
      <div>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
          {['Strength training', "you'll actually", 'keep doing.'].map((l) => (
            <span key={l} className="block overflow-hidden pb-1"><span data-line className="block">{l}</span></span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink/70">Small-group classes, real coaches, and no contracts. Your first class is free.</p>
        <a href="#contact" className="btn-cta mt-8 inline-block rounded-lg bg-court px-6 py-3 font-semibold text-white">Book a free class</a>
      </div>
      <div data-card className="rounded-2xl bg-ink p-6 text-chalk">
        <p className="text-sm text-chalk/60">Next class: {c.day}, {c.time}</p>
        <p className="mt-1 font-display text-2xl font-bold">{c.name} with {c.coach}</p>
        <p className="mt-6 font-display text-6xl font-extrabold tabular-nums text-flash" aria-label="Time until the next class">{clock}</p>
        <p className="mt-1 text-sm text-chalk/60">until the doors open</p>
      </div>
    </section>
  )
}

function Timetable() {
  const [day, setDay] = useState(days[(new Date().getDay() + 6) % 7])
  return (
    <section id="schedule" className={`${inner} py-20`}>
      <h2 className="font-display text-4xl font-extrabold">Class timetable</h2>
      <div role="tablist" className="mt-8 flex gap-2 overflow-x-auto">
        {days.map((d) => (
          <button key={d} role="tab" aria-selected={day === d} onClick={() => setDay(d)} className="relative rounded-lg px-4 py-2 font-semibold">
            {day === d && <motion.span layoutId="tab" className="absolute inset-0 rounded-lg bg-ink" />}
            <span className={`relative ${day === d ? 'text-chalk' : ''}`}>{d}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={day} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mt-6 divide-y divide-ink/10">
          {schedule[day].map((c) => (
            <li key={c.time}>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I'd like to book ${c.name} on ${day} at ${c.time}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline gap-6 py-4"
              >
                <span className="w-16 font-display text-xl font-bold tabular-nums">{c.time}</span>
                <span className="flex-1 font-semibold">{c.name}</span>
                <span className="text-ink/60">{c.coach}</span>
                <span className="hidden text-sm font-semibold text-court group-hover:inline">Book →</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  )
}

function Plans() {
  const [yearly, setYearly] = useState(false)
  return (
    <section id="plans" className="bg-ink py-20 text-chalk">
      <div className={inner}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-extrabold">Membership plans</h2>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex rounded-full bg-chalk/10 p-1">
              {['Monthly', 'Yearly'].map((l) => (
                <button key={l} aria-pressed={yearly === (l === 'Yearly')} onClick={() => setYearly(l === 'Yearly')}
                  className={`rounded-full px-4 py-1.5 font-semibold hover:scale-105 transition-all duration-200 ${yearly === (l === 'Yearly') ? 'bg-chalk text-ink' : 'hover:bg-chalk/20'}`}>{l}</button>
              ))}
            </div>
            <span className="text-chalk/60">Yearly includes 2 months free</span>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const price = yearly ? Math.round((p.price * 10) / 12) : p.price
            return (
              <div key={p.name} className={`rounded-2xl p-6 hover:scale-105 transition-transform duration-300 ${p.pick ? 'bg-court' : 'bg-chalk/5 ring-1 ring-chalk/15'}`}>
                <h3 className="font-semibold">{p.name}</h3>
                <motion.p key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-5xl font-extrabold">
                  ₹{price.toLocaleString('en-IN')}<span className="text-base font-medium opacity-60">/mo</span>
                </motion.p>
                <p className="mt-2 text-sm opacity-70">{p.note}</p>
                <a href="#contact" className="mt-6 block rounded-lg bg-chalk py-2.5 text-center font-semibold text-ink hover:scale-105 hover:brightness-110 transition-all duration-300">Choose {p.name}</a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Trainers() {
  return (
    <section id="coaches" className={`${inner} py-20`}>
      <h2 className="font-display text-4xl font-extrabold">Your coaches</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {trainers.map((t, i) => (
          <article key={t.name} className="group rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
            <div className="overflow-hidden">
              <img src={t.img} alt={t.name} className="h-64 w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="text-ink/70">{t.role}</p>
              <p className="mt-1 text-sm text-ink/50">{t.years} years coaching</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const initials = (n) => n.split(' ').map((w) => w[0]).join('')
const tint = ['bg-court text-white', 'bg-flash text-ink', 'bg-ink text-chalk']

function Testimonials() {
  return (
    <section id="results" className="bg-white py-20">
      <div className={inner}>
        <h2 className="font-display text-4xl font-extrabold">Real member results</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl bg-chalk p-6"
            >
              <span className="inline-block rounded-full bg-court px-3 py-1 text-sm font-semibold text-white">{t.stat}</span>
              <blockquote className="mt-4 text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold ${tint[i]}`}>{initials(t.name)}</span>
                <span className="font-semibold">{t.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [open, setOpen] = useState(null)
  return (
    <section id="gallery" className={`${inner} py-20`}>
      <h2 className="font-display text-4xl font-extrabold">Inside the studio</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setOpen(g)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline-white cursor-pointer"
          >
            <img src={g.img} alt={g.label} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <span className="absolute bottom-3 left-3 text-left text-sm font-semibold text-white/90">{g.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-30 grid place-items-center bg-ink/80 p-6"
          >
            <motion.div layoutId={`ph-${open.id}`} className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl">
              <img src={open.img} alt={open.label} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-5 left-6 text-xl font-bold text-white">{open.label}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className={`${inner} grid gap-10 md:grid-cols-2 md:items-center`}>
        <div>
          <h2 className="font-display text-4xl font-extrabold">Why Stride exists</h2>
          <p className="mt-4 max-w-md text-ink/70">{story.paragraph}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {story.stats.map(([n, l]) => (
            <div key={l} className="rounded-xl bg-chalk p-4 text-center">
              <p className="font-display text-3xl font-extrabold text-court">{n}</p>
              <p className="mt-1 text-xs text-ink/60">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [openId, setOpenId] = useState(0)

  return (
    <section id="faq" className={`${inner} py-20`}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        {/* Left Column: Headline, intro, and coach WhatsApp card */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-court">Frequently Asked</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Questions people ask</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Everything you need to know about getting started, memberships, and class formats. No surprises.
          </p>

          <div className="mt-8 rounded-2xl border border-ink/5 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-court/10 text-xl text-court">💬</span>
              <div>
                <h4 className="text-sm font-semibold text-ink">Have a different question?</h4>
                <p className="text-xs text-ink/60">Our coaches reply within an hour</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I have a question about Stride Strength Club.")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-cta mt-4 !inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-center text-sm font-semibold text-chalk shadow-xs hover:brightness-110"
            >
              Ask on WhatsApp →
            </a>
          </div>
        </div>

        {/* Right Column: Card-style accordions */}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openId === i
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${isOpen ? 'border-court/30 shadow-md ring-1 ring-court/10' : 'border-ink/5 shadow-xs hover:border-ink/15'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="faq-btn flex w-full items-center justify-between gap-4 p-5 text-left font-semibold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${isOpen ? 'bg-court text-white' : 'bg-chalk text-ink/70'
                        }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-base font-bold transition-colors ${isOpen ? 'text-court' : 'text-ink'}`}>{f.q}</span>
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? 'bg-court/10 text-court rotate-45' : 'bg-chalk text-ink/60'
                      }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-ink/5 px-5 pb-5 pt-3">
                        <p className="text-sm leading-relaxed text-ink/75">{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function getStudioStatus() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60

  let open = false
  let closesAt = ''
  let opensNext = ''

  if (day >= 1 && day <= 5) {
    if (hour >= 6 && hour < 21) {
      open = true
      closesAt = '9:00 pm'
    } else {
      opensNext = hour < 6 ? 'today at 6:00 am' : (day === 5 ? 'tomorrow at 7:00 am' : 'tomorrow at 6:00 am')
    }
  } else if (day === 6) {
    if (hour >= 7 && hour < 18) {
      open = true
      closesAt = '6:00 pm'
    } else {
      opensNext = hour < 7 ? 'today at 7:00 am' : 'tomorrow at 8:00 am'
    }
  } else {
    if (hour >= 8 && hour < 13) {
      open = true
      closesAt = '1:00 pm'
    } else {
      opensNext = hour < 8 ? 'today at 8:00 am' : 'tomorrow at 6:00 am'
    }
  }
  return { open, closesAt, opensNext }
}

function MapHours() {
  const [copied, setCopied] = useState(false)
  const status = getStudioStatus()

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <section className={`${inner} pb-20`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-court">Visit the Studio</span>
          <h2 className="mt-1 font-display text-4xl font-extrabold">Find us & studio hours</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold shadow-xs">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${status.open ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-ink/80">{status.open ? `Open now · Closes at ${status.closesAt}` : `Closed now · Opens ${status.opensNext}`}</span>
        </div>
      </div>

      <div className="grid gap-0 overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
        <div className="relative min-h-[380px] w-full bg-chalk md:min-h-full">
          <iframe
            title="Studio Location Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-full w-full min-h-[380px] border-0"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between p-8">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-extrabold">{address}</h3>
                <p className="mt-1 text-sm text-ink/60">Riverside District · 5 min walk from Metro</p>
              </div>
              <button
                type="button"
                onClick={copyAddress}
                className="no-hover-scale shrink-0 rounded-lg border border-ink/10 bg-chalk/60 px-3 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:bg-chalk hover:text-ink cursor-pointer"
                title="Copy address"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Operating Hours</p>
              <ul className="mt-2 divide-y divide-ink/5">
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between py-2 text-sm text-ink/70">
                    <span className="font-semibold text-ink">{d}</span>
                    <span className="font-medium text-ink/90">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink/5">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-cta !inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-chalk shadow-sm hover:brightness-110"
            >
              <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const instaTint = ['bg-court', 'bg-flash text-ink', 'bg-ink', 'bg-court/70']
function InstaStrip() {
  const posts = [
    { label: 'New PR Monday', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEWilzr93v26Yfr1g7lMdQU-uEb6vTOY7kfLJz7lpc0Q&s=10' },
    { label: 'Mobility flow', img: 'https://t4.ftcdn.net/jpg/21/82/98/33/240_F_2182983315_K4fQa7oR9vBe182iAKJTNSj12XAtiMKB.jpg' },
    { label: 'Barbell club', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAquGZxyHMy_skyPW5t_6bGOgzXK86qSbPiVDowyPnhg&s=10' },
    { label: 'Community day', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_KYxJfnROoKFosAA4ApuEyCIyk4hF60Wa1DLJsa7OQ&s=10' },
  ]
  return (
    <section className={`${inner} pb-20`}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold">Follow along</h2>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-court">@stridestrength →</a>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {posts.map((p, i) => (
          <a
            key={p.label}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className={`group relative aspect-square overflow-hidden rounded-xl cursor-pointer ${!p.img ? instaTint[i] : ''}`}
          >
            {p.img
              ? <img src={p.img} alt={p.label} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
              : null
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <span className="absolute bottom-2 left-2 text-xs font-semibold text-white/90">{p.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Bmi() {
  const [h, setH] = useState('')
  const [w, setW] = useState('')
  const bmi = h > 0 && w > 0 ? w / (h / 100) ** 2 : null
  const label = bmi && (bmi < 18.5 ? 'Below the typical range' : bmi < 25 ? 'Within the typical range' : bmi < 30 ? 'Above the typical range' : 'Well above the typical range')
  const field = 'mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5'
  return (
    <section className={`${inner} pb-20`}>
      <div className="grid gap-8 rounded-2xl bg-white p-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold">Quick BMI check</h2>
          <p className="mt-2 text-ink/70">A rough starting point only. Your coach looks at much more in your free session.</p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-semibold">Height (cm)<input type="number" value={h} onChange={(e) => setH(e.target.value)} className={field} /></label>
            <label className="text-sm font-semibold">Weight (kg)<input type="number" value={w} onChange={(e) => setW(e.target.value)} className={field} /></label>
          </div>
          <p className="mt-4 min-h-12 font-display text-2xl font-bold" aria-live="polite">
            {bmi ? `${bmi.toFixed(1)}: ${label}` : 'Enter height and weight'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Gym() {
  const active = useActiveSection(['schedule', 'plans', 'coaches', 'results'])
  return (
    <div id="top">
      <Navbar
        brand="Stride"
        links={[['Timetable', '#schedule'], ['Plans', '#plans'], ['Coaches', '#coaches'], ['Results', '#results']]}
        cta={['Free trial', '#contact']}
        active={active}
      />
      <Hero />
      <Reveal><Timetable /></Reveal>
      <Reveal><Plans /></Reveal>
      <Reveal><Trainers /></Reveal>
      <Testimonials />
      <Gallery />
      <About />
      <Faq />
      <MapHours />
      <InstaStrip />
      <Bmi />
      <section id="contact" className="bg-court py-20 text-white">
        <div className={`${inner} grid gap-10 md:grid-cols-2`}>
          <div>
            <h2 className="font-display text-4xl font-extrabold">Try a class on us</h2>
            <p className="mt-3 max-w-sm text-white/80">Tell us your goal and we will message you the best class to start with.</p>
          </div>
          <div className="rounded-2xl bg-chalk p-6 text-ink">
            <ContactForm number={WHATSAPP} goals={['Build strength', 'Lose fat', 'Improve mobility', 'Just get started']} />
          </div>
        </div>
      </section>
      <footer className="bg-ink py-8 pb-24 text-center text-sm text-chalk/60 md:pb-8">Stride Strength Club, 12 Riverside Road. Open 6 am to 9 pm.</footer>
    </div>
  )
}
