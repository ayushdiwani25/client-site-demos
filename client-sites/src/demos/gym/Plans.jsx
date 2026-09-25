import { useState } from 'react'
import { motion } from 'framer-motion'
import { plans } from './data'
import { inner } from './layout'

const checkIcon = (
  <svg className="w-4 h-4 text-court shrink-0" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12" />
    <path d="M4.5 8l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Plans() {
  const [yearly, setYearly] = useState(false)
  return (
    <section id="plans" className="bg-chalk border-b border-border">
      <div className={`${inner} py-20`}>
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-court mb-3">Pricing</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">Membership plans</h2>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex rounded-full bg-white border border-border p-1">
              {['Monthly', 'Yearly'].map((label) => (
                <button
                  key={label}
                  aria-pressed={yearly === (label === 'Yearly')}
                  onClick={() => setYearly(label === 'Yearly')}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    yearly === (label === 'Yearly') ? 'bg-ink text-white' : 'text-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-muted text-xs">Save 2 months with yearly</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? Math.round((plan.price * 10) / 12) : plan.price
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.pick
                    ? 'bg-court text-white ring-2 ring-court ring-offset-2'
                    : 'bg-white border border-border text-ink'
                }`}
              >
                {plan.pick && (
                  <span className="absolute top-4 right-4 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h3 className="font-semibold text-base">{plan.name}</h3>
                <motion.div key={price} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <p className="mt-4 text-4xl font-extrabold tracking-tight">
                    ₹{price.toLocaleString('en-IN')}
                    <span className={`text-sm font-medium ${plan.pick ? 'text-white/60' : 'text-muted'}`}>/mo</span>
                  </p>
                </motion.div>
                <p className={`mt-1 text-sm ${plan.pick ? 'text-white/70' : 'text-muted'}`}>{plan.note}</p>
                <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      {plan.pick ? (
                        <svg className="w-4 h-4 shrink-0 text-white/70" viewBox="0 0 16 16" fill="none">
                          <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : checkIcon}
                      <span className={plan.pick ? 'text-white/90' : 'text-ink/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.pick
                      ? 'bg-white text-court hover:bg-blue-50'
                      : 'bg-ink text-white hover:bg-gray-800'
                  }`}
                >
                  Get started
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

