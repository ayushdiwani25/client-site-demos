import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/components/Footer'
import { WHATSAPP, heroImage, listings, types, cities, services, intents, budgets, price } from './data'

const inner = 'mx-auto max-w-6xl px-6'
const wa = (text) => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')

function Hero() {
  const root = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-h]', { opacity: 0, y: 18, duration: 0.8, stagger: 0.12, delay: 0.2 })
      gsap.from('[data-photo]', { opacity: 0, y: 24, duration: 1, delay: 0.25, ease: 'power2.out' })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="overflow-hidden bg-[#e9e8df] text-[#1c3028]">
      <div className={`${inner} grid items-center gap-12 pb-16 pt-12 md:grid-cols-[0.9fr_1.1fr] md:pb-20 md:pt-16`}>
        <div className="relative z-10 md:py-8">
          <p data-h className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#617469]"><span className="h-px w-8 bg-[#a65f3d]" /> Gujarat, considered</p>
          <h1 data-h className="max-w-xl font-estate text-5xl leading-[1.04] md:text-7xl">Find a place that feels like <span className="text-[#a65f3d]">yours.</span></h1>
          <p data-h className="mt-6 max-w-md text-base leading-relaxed text-[#46584e]">A more personal way to find a home. A small, carefully chosen collection of residences across Gujarat, each visited and verified by our team.</p>
          <div data-h className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#listings" className="btn-cta rounded-md bg-[#21382d] px-6 py-3 text-sm font-semibold text-[#f5f2e9]">Explore the collection <span className="ml-3" aria-hidden="true">↗</span></a>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#617469]">Six homes. One good move.</span>
          </div>
        </div>
        <div data-photo className="relative mx-auto w-full max-w-xl pb-8 md:ml-auto">
          <img src={heroImage} alt="Sunlit contemporary residence with a calm, open-plan interior" className="aspect-[0.94] w-full rounded-t-[48%] object-cover object-center md:aspect-[0.88]" />
          <div className="absolute bottom-0 left-0 flex max-w-76 items-center gap-4 bg-[#f5f2e9] p-4 shadow-lg shadow-[#1c3028]/10 sm:p-5">
            <span className="font-estate text-3xl text-[#a65f3d]">01</span>
            <div className="border-l border-[#1c3028]/15 pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">A home, not a listing</p>
              <p className="mt-1 text-xs text-[#617469]">Thoughtfully found in Ahmedabad</p>
            </div>
          </div>
          <span className="absolute right-0 top-8 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#617469] [writing-mode:vertical-rl] md:block">Spaces to settle into · Since 2012</span>
        </div>
      </div>
    </section>
  )
}

function Listings() {
  const [type, setType] = useState('All')
  const [city, setCity] = useState(cities[0])
  const [sort, setSort] = useState('high')
  const shown = useMemo(() => {
    const list = listings.filter((l) => (type === 'All' || l.type === type) && (city === cities[0] || l.city === city))
    return [...list].sort((a, b) => (sort === 'high' ? b.price - a.price : a.price - b.price))
  }, [type, city, sort])
  const chip = (on) => `rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? 'border-[#21382d] bg-[#21382d] text-[#f5f2e9]' : 'border-[#21382d]/25 text-[#21382d]'}`
  const sel = 'rounded-md border border-[#21382d]/25 bg-[#f5f2e9] px-3 py-2 text-sm text-[#21382d]'
  return (
    <section id="listings" className="bg-[#f5f2e9] py-16 text-[#1c3028] md:py-20">
      <div className={inner}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3d]">The collection / 2026</p><h2 className="font-estate text-4xl md:text-5xl">A few worth seeing.</h2></div>
          <p className="max-w-xs text-sm leading-relaxed text-[#617469]">Every address is personally visited. Every price is grounded in the market.</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {types.map((t) => <button key={t} aria-pressed={type === t} onClick={() => setType(t)} className={chip(type === t)}>{t}</button>)}
          <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} className={`${sel} sm:ml-auto`}>{cities.map((c) => <option key={c}>{c}</option>)}</select>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className={sel}>
            <option value="high">Price: high to low</option><option value="low">Price: low to high</option>
          </select>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <li key={l.id} className="group min-w-0">
              <div className="relative overflow-hidden rounded-sm bg-[#d9ded5]">
                <img src={l.image} alt={`${l.name}, ${l.type === 'Apartment' ? 'an' : 'a'} ${l.type.toLowerCase()} in ${l.city}`} loading="lazy" className="aspect-[1.28] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 bg-[#f5f2e9] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#21382d]">{l.type}</span>
                <span className="absolute bottom-3 left-3 bg-[#21382d]/90 px-3 py-1.5 text-xs text-[#f5f2e9]">{l.area}, {l.city}</span>
              </div>
              <div className="pt-4">
                <div className="flex items-baseline justify-between gap-3"><h3 className="min-w-0 font-estate text-xl leading-tight md:text-2xl">{l.name}</h3><p className="shrink-0 text-sm font-semibold text-[#a65f3d]">{price(l.price)}</p></div>
                <p className="mt-3 border-t border-[#21382d]/15 pt-3 text-xs text-[#617469]">{l.beds} beds <span className="px-1.5">/</span> {l.baths} baths <span className="px-1.5">/</span> {l.sqft.toLocaleString('en-IN')} sq ft</p>
                <button onClick={() => wa(`Hi Aurelia Estates, I'd like to arrange a viewing of ${l.name}, ${l.area}, ${l.city} (${price(l.price)}).`)} className="btn-cta mt-4 w-full rounded-md bg-[#21382d] py-2.5 text-sm font-semibold text-[#f5f2e9]">Request a viewing <span className="ml-2" aria-hidden="true">↗</span></button>
              </div>
            </li>
          ))}
        </ul>
        {!shown.length && <p className="mt-8 text-sm text-dusk/70">No listings match. Try another type or city.</p>}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="bg-[#dfe5dc] py-16 text-[#1c3028] md:py-20">
      <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr]`}>
        <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3d]">Good guidance, always</p><h2 className="font-estate text-4xl md:text-5xl">One advisor, start to finish.</h2></div>
        <ul className="divide-y divide-[#21382d]/15">
          {services.map(([title, text], index) => (
            <li key={title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
              <span className="font-estate text-2xl text-[#a65f3d]">0{index + 1}</span>
              <div><h3 className="font-semibold">{title}</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-[#617469]">{text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Enquiry() {
  const [name, setName] = useState('')
  const [intent, setIntent] = useState(intents[0])
  const [budget, setBudget] = useState(budgets[0])
  const field = 'mt-1.5 w-full rounded-md border border-[#21382d]/25 bg-[#f5f2e9] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#a65f3d]'
  return (
    <section id="contact" className="bg-[#21382d] py-16 text-[#f5f2e9] md:py-20">
      <div className={`${inner} grid gap-10 md:grid-cols-2`}>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d7a17b]">Begin somewhere</p>
          <h2 className="font-estate text-4xl md:text-5xl">Tell us what you are looking for.</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f5f2e9]/70">An advisor replies on WhatsApp within a working day.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); wa(`Hi Aurelia Estates, I'm ${name}. I want to: ${intent}. Budget: ${budget}.`) }} className="space-y-4 rounded-md bg-[#f5f2e9] p-6 text-[#1c3028]">
          <label className="block text-sm font-semibold">Your name<input required value={name} onChange={(e) => setName(e.target.value)} className={field} /></label>
          <label className="block text-sm font-semibold">I want to<select value={intent} onChange={(e) => setIntent(e.target.value)} className={field}>{intents.map((i) => <option key={i}>{i}</option>)}</select></label>
          <label className="block text-sm font-semibold">Budget<select value={budget} onChange={(e) => setBudget(e.target.value)} className={field}>{budgets.map((b) => <option key={b}>{b}</option>)}</select></label>
          <button type="submit" className="btn-cta w-full rounded-md bg-[#21382d] py-3 text-sm font-semibold text-[#f5f2e9]">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  )
}

export default function AureliaEstates() {
  useEffect(() => { document.title = 'Aurelia Estates | Homes in Gujarat' }, [])
  return (
    <div id="top">
      <Navbar
        brand="Aurelia" brandClass="font-estate font-medium"
        links={[['Listings', '#listings'], ['Services', '#services'], ['Contact', '#contact']]}
        cta={['Enquire', '#contact']}
        headerClass="border-[#f5f2e9]/10 bg-[#21382d]/95 text-[#f5f2e9]"
        hoverClass="hover:text-[#d7a17b]" ctaClass="bg-[#d7a17b] text-[#1c3028]"
      />
      <Hero />
      <Listings />
      <Services />
      <Enquiry />
      <Footer
        brand="Aurelia Estates"
        brandClass="font-estate"
        tagline="Carefully chosen homes across Gujarat."
        groups={[
          { title: 'Explore', links: [['Listings', '#listings'], ['Services', '#services']] },
          { title: 'Connect', links: [['Arrange a viewing', '#listings'], ['Enquire', '#contact']] },
        ]}
        footerClass="bg-[#21382d] text-[#f5f2e9]"
        mutedClass="text-[#f5f2e9]/60"
        borderClass="border-[#f5f2e9]/10"
        note="Listings and prices are placeholders."
      />
    </div>
  )
}
