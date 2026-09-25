import { useEffect, useRef, useState } from 'react'
import { nextClass } from './data'
import { inner } from './layout'

const pad = (n) => String(n).padStart(2, '0')

function useNext() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const current = nextClass(now)
  const seconds = Math.max(0, Math.floor((current.at - now) / 1000))
  return {
    current,
    clock: `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`,
  }
}

const stats = [
  { value: '6am–9pm', label: 'Daily hours' },
  { value: '3', label: 'Expert coaches' },
  { value: 'No lock-in', label: 'contracts' },
]

export default function Hero() {
  const root = useRef(null)
  const { current, clock } = useNext()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = root.current?.querySelectorAll('[data-fade]')
    if (!els) return
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, i * 100)
    })
  }, [])

  return (
    <section ref={root} className="bg-white border-b border-border">
      <div className={`${inner} py-20 md:py-28`}>
        <div className="grid gap-12 md:grid-cols-[1fr_380px] items-center">
          {/* Left column */}
          <div>
            <span data-fade className="inline-block rounded-full bg-court/10 px-3 py-1 text-xs font-semibold text-court mb-5">
              Small-group training · Mumbai
            </span>
            <h1 data-fade className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-ink">
              Strength training<br />
              <span className="text-court">you'll actually</span><br />
              keep doing.
            </h1>
            <p data-fade className="mt-5 text-base text-muted max-w-md leading-relaxed">
              Real coaches, small groups, and no contracts. Your first class is free — no strings attached.
            </p>
            <div data-fade className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-lg bg-court px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Book a free class
              </a>
              <a href="#schedule" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink hover:bg-chalk transition-colors">
                See timetable
              </a>
            </div>

            {/* Stats row */}
            <div data-fade className="mt-10 flex flex-wrap gap-8 pt-8 border-t border-border">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-ink">{s.value}</p>
                  <p className="text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Next class card */}
          <div data-fade className="rounded-2xl bg-ink p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Up next</p>
            <p className="text-lg font-bold">{current.name}</p>
            <p className="text-sm text-white/60 mt-0.5">with {current.coach} · {current.day}, {current.time}</p>
            <p
              className="mt-6 text-5xl font-extrabold tabular-nums text-white tracking-tight"
              aria-label="Time until the next class"
            >
              {clock}
            </p>
            <p className="mt-1 text-sm text-white/50">until the doors open</p>
            <a
              href="#contact"
              className="mt-6 block rounded-lg bg-court px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Reserve a spot
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

