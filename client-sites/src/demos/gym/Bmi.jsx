import { useState } from 'react'
import { inner } from './layout'

function getBmiInfo(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'bg-amber-400', pct: 15 }
  if (bmi < 25)   return { label: 'Healthy weight', color: 'bg-emerald-500', pct: 42 }
  if (bmi < 30)   return { label: 'Overweight', color: 'bg-orange-400', pct: 68 }
  return             { label: 'Obese range', color: 'bg-red-500', pct: 90 }
}

export default function Bmi() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const bmi = height > 0 && weight > 0 ? weight / (height / 100) ** 2 : null
  const info = bmi ? getBmiInfo(bmi) : null

  const field = 'mt-1.5 w-full rounded-lg border border-border bg-chalk px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-court/30 focus:border-court transition'

  return (
    <section className="bg-chalk border-b border-border">
      <div className={`${inner} py-20`}>
        <div className="rounded-2xl border border-border bg-white p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-court mb-3">Tools</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">Quick BMI check</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                A rough starting point only. Your coach looks at much more during your free session.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-ink">
                  Height (cm)
                  <input type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" className={field} />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Weight (kg)
                  <input type="number" min="1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" className={field} />
                </label>
              </div>

              <div className="mt-5 min-h-[80px]" aria-live="polite">
                {bmi ? (
                  <>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-2xl font-extrabold text-ink">{bmi.toFixed(1)}</span>
                      <span className="text-sm font-semibold text-muted">{info.label}</span>
                    </div>
                    {/* BMI bar */}
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full rounded-full ${info.color} transition-all duration-500`}
                        style={{ width: `${info.pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-muted">
                      <span>Underweight</span><span>Healthy</span><span>Obese</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted pt-2">Enter your height and weight above</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

