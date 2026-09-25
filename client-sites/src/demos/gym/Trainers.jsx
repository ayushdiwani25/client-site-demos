import { trainers } from './data'
import { inner } from './layout'

const avatarBg = ['bg-court', 'bg-ink', 'bg-amber-500']

export default function Trainers() {
  return (
    <section id="coaches" className="bg-white border-b border-border">
      <div className={`${inner} py-20`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-court mb-3">The team</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">Your coaches</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {trainers.map((trainer, index) => (
            <article key={trainer.name} className="rounded-2xl border border-border bg-white p-6">
              <div className={`w-14 h-14 rounded-xl ${avatarBg[index]} flex items-center justify-center text-white font-extrabold text-lg`}>
                {trainer.name.split(' ').map((w) => w[0]).join('')}
              </div>
              <h3 className="mt-4 font-bold text-ink">{trainer.name}</h3>
              <p className="text-sm text-muted mt-0.5">{trainer.role}</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-1.5">
                <span className="text-xs font-semibold text-ink">{trainer.years} yrs</span>
                <span className="text-xs text-muted">coaching experience</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

