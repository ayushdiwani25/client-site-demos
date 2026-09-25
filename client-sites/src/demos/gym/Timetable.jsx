import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { days, schedule } from './data'
import { inner } from './layout'

export default function Timetable() {
  const [day, setDay] = useState(days[(new Date().getDay() + 6) % 7])
  return (
    <section id="schedule" className="bg-white border-b border-border">
      <div className={`${inner} py-20`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-court mb-3">Schedule</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">Class timetable</h2>

        <div role="tablist" className="mt-8 flex gap-2 overflow-x-auto">
          {days.map((currentDay) => (
            <button key={currentDay} role="tab" aria-selected={day === currentDay} onClick={() => setDay(currentDay)} className="relative rounded-lg px-4 py-2 font-semibold">
              {day === currentDay && <motion.span layoutId="tab" className="absolute inset-0 rounded-lg bg-ink" />}
              <span className={`relative ${day === currentDay ? 'text-white' : 'text-muted'}`}>{currentDay}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul key={day} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mt-6 divide-y divide-ink/10">
            {schedule[day].map((cls) => (
              <li key={cls.time} className="flex items-baseline gap-6 py-4">
                <span className="w-16 text-xl font-bold tabular-nums text-ink">{cls.time}</span>
                <span className="flex-1 font-semibold text-ink">{cls.name}</span>
                <span className="text-muted">{cls.coach}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}


