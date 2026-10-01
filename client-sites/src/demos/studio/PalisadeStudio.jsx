import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/components/Footer'
import { WHATSAPP, projects, services, studioDetails, testimonials, faqs, projectTypes, budgets } from './data'

const inner = 'mx-auto max-w-6xl px-6'
const draw = { strokeDasharray: 1, strokeDashoffset: 0 }

function Elevation() {
  return (
    <svg viewBox="0 0 600 420" className="w-full" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Line drawing of a house elevation">
      {[
        'M20 380H580',
        'M90 380V170H510V380',
        'M70 170L300 60L530 170',
        'M90 170H510',
        'M130 210H230V300H130Z', 'M180 210V300', 'M130 255H230',
        'M370 210H470V300H370Z', 'M420 210V300', 'M370 255H470',
        'M262 380V290A38 38 0 0 1 338 290V380', 'M300 252V380',
        'M110 330H250', 'M350 330H490',
        'M300 60V30', 'M470 90V130',
      ].map((d) => <path key={d} d={d} pathLength="1" className="draw" style={draw} />)}
    </svg>
  )
}

function Hero() {
  const root = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.draw', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.09, ease: 'power2.inOut' })
      gsap.from('[data-hero-text]', { opacity: 0, y: 16, duration: 0.8, delay: 1.2, stagger: 0.12 })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="bg-limewash text-bottle">
      <div className={`${inner} grid items-center gap-10 py-16 md:grid-cols-2 md:py-24`}>
        <div>
          <h1 data-hero-text className="font-studio text-5xl leading-[1.05] md:text-7xl">Rooms drawn before they are built.</h1>
          <p data-hero-text className="mt-6 max-w-md text-base leading-relaxed text-bottle/75">
            Palisade Studio designs homes, clinics and cafes in Gujarat. Every project starts with measured drawings and a material palette you approve first.
          </p>
          <a data-hero-text href="#enquire" className="btn-cta mt-8 inline-block rounded-md bg-bottle px-6 py-3 text-sm font-semibold text-limewash">Start an enquiry</a>
        </div>
        <Elevation />
      </div>
    </section>
  )
}

function Studio() {
  return (
    <section id="studio" className="bg-bottle py-16 text-limewash md:py-20">
      <div className={`${inner} grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">A considered practice</p>
          <h2 className="mt-4 max-w-md font-studio text-4xl leading-tight md:text-5xl">The quiet work behind a room that feels right.</h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-relaxed text-limewash/75">Palisade is an interior architecture studio for people who care about how a space lives, ages and holds together. We pair a clear point of view with the drawings and coordination that make it buildable.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-limewash/20 pt-5">
            {studioDetails.map(([value, label]) => (
              <div key={label}>
                <p className="font-studio text-3xl text-brass">{value}</p>
                <p className="mt-1 max-w-20 text-xs leading-relaxed text-limewash/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="bg-plaster py-16 text-bottle">
      <div className={inner}>
        <h2 className="font-studio text-4xl">Recent projects</h2>
        <p className="mt-3 max-w-md text-sm text-bottle/70">A selection of homes and working spaces shaped around light, movement and lasting materials.</p>
      </div>
      <ul className={`${inner} mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3`} aria-label="Project catalogue">
        {projects.map((p) => (
          <li key={p.name} className="group min-w-0">
            <div className="overflow-hidden rounded-sm bg-plaster">
              <img src={p.image} alt={`${p.name} interior project in ${p.location}`} loading="lazy" decoding="async" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <h3 className="mt-4 font-studio text-xl">{p.name}</h3>
            <p className="text-sm text-bottle/70">{p.category} in {p.location}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="bg-limewash py-16 text-bottle">
      <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr]`}>
        <h2 className="font-studio text-4xl">How we work</h2>
        <ol className="divide-y divide-bottle/15">
          {services.map(([title, text], i) => (
            <li key={title} className="grid gap-1 py-5 sm:grid-cols-[2rem_1fr]">
              <span className="font-studio text-brass">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-bottle/70">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="bg-plaster py-16 text-bottle">
      <div className={inner}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-studio text-4xl">A good process is felt.</h2>
          <p className="max-w-xs text-sm leading-relaxed text-bottle/65">Clear decisions, thoughtful details and a team that stays close to the work.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map(({ quote, name }) => (
            <figure key={name} className="border-t border-bottle/20 pt-5">
              <blockquote className="max-w-lg font-studio text-2xl leading-snug">{quote}</blockquote>
              <figcaption className="mt-6 text-sm font-semibold">{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-limewash py-16 text-bottle">
      <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr]`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">Good to know</p>
          <h2 className="mt-4 font-studio text-4xl">Before we begin.</h2>
        </div>
        <div className="divide-y divide-bottle/15 border-t border-bottle/15">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button type="button" className="faq-btn flex w-full items-center justify-between gap-6 py-5 text-left font-semibold" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
                {question}
                <span className="font-studio text-2xl font-normal text-brass">{open === index ? '−' : '+'}</span>
              </button>
              {open === index && <p className="-mt-2 max-w-xl pb-5 pr-10 text-sm leading-relaxed text-bottle/70">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Enquiry() {
  const [name, setName] = useState('')
  const [type, setType] = useState(projectTypes[0])
  const [budget, setBudget] = useState(budgets[0])
  const send = (e) => {
    e.preventDefault()
    const text = `Hi Palisade Studio, I'm ${name}. I'm planning: ${type}. Budget: ${budget}. I'd like to talk about the project.`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }
  const field = 'mt-1.5 w-full rounded-md border border-bottle/25 bg-limewash px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass'
  return (
    <section id="enquire" className="bg-bottle py-16 text-limewash">
      <div className={`${inner} grid gap-10 md:grid-cols-2`}>
        <div>
          <h2 className="font-studio text-4xl">Tell us what you are planning.</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-limewash/75">We reply on WhatsApp within a working day with questions and a suggested next step.</p>
        </div>
        <form onSubmit={send} className="space-y-4 rounded-md bg-limewash p-6 text-bottle">
          <label className="block text-sm font-semibold">Your name
            <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </label>
          <label className="block text-sm font-semibold">Project type
            <select value={type} onChange={(e) => setType(e.target.value)} className={field}>{projectTypes.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label className="block text-sm font-semibold">Budget range
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className={field}>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
          </label>
          <button type="submit" className="btn-cta w-full rounded-md bg-bottle py-3 text-sm font-semibold text-limewash">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  )
}

export default function PalisadeStudio() {
  useEffect(() => { document.title = 'Palisade Studio | Interior Architecture in Gujarat' }, [])
  return (
    <div id="top">
      <Navbar
        brand="Palisade" brandClass="font-studio font-normal"
        links={[['Studio', '#studio'], ['Projects', '#work'], ['Process', '#services'], ['FAQ', '#faq']]}
        cta={['Enquire', '#enquire']}
        headerClass="border-bottle/15 bg-limewash/90 text-bottle"
        hoverClass="hover:text-brass" ctaClass="bg-bottle text-limewash"
      />
      <Hero />
      <Studio />
      <Work />
      <Services />
      <Testimonials />
      <FAQ />
      <Enquiry />
      <Footer
        brand="Palisade Studio"
        brandClass="font-studio"
        tagline="Interior architecture for homes and working spaces in Gujarat."
        groups={[
          { title: 'Explore', links: [['Studio', '#studio'], ['Projects', '#work'], ['Process', '#services']] },
          { title: 'Connect', links: [['FAQs', '#faq'], ['Enquire', '#enquire']] },
        ]}
        footerClass="bg-bottle text-limewash"
        mutedClass="text-limewash/60"
        borderClass="border-limewash/15"
        note="Projects and copy are placeholders."
      />
    </div>
  )
}
