import { philosophyPillars, gearKit } from "../data";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

// Philosophy & Gear Kit
export default function PhilosophyAndGear() {
  return (
    <section
      id="philosophy"
      className="bg-obsidian py-24 text-silver border-t border-white/10"
    >
      <div className={inner}>
        {/* Philosophy Intro */}
        <div className="max-w-2xl">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
            The Methodology
          </p>
          <h2 className="mt-2 font-frame text-4xl sm:text-5xl font-black text-white">
            Honoring The Moment As It Happened.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-silver/70">
            We avoid artificial production clutter. Three guiding principles
            govern every photo expedition we undertake.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyPillars.map((p) => (
            <div
              key={p.step}
              className="group relative rounded-2xl border border-white/10 bg-charcoal p-7 transition-all duration-300 hover:border-vermilion/50 hover:bg-card-dark"
            >
              <span className="font-mono text-xs font-bold text-vermilion uppercase tracking-widest">
                {p.step} · Principle
              </span>
              <h3 className="mt-3 font-frame text-xl font-bold text-white group-hover:text-vermilion transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-silver/70 leading-relaxed">
                {p.description}
              </p>
              <p className="mt-4 text-xs font-mono text-silver/40 border-t border-white/10 pt-3">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Inside the Kit / Equipment */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-charcoal/80 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Master Hardware
              </span>
              <h3 className="font-frame text-2xl font-bold text-white mt-1">
                Inside The Camera Bag
              </h3>
            </div>
            <p className="text-xs text-silver/60 max-w-sm">
              We rely strictly on high-resolving prime glass and medium-format
              optics to yield cinematic rendering.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gearKit.map((g) => (
              <div
                key={g.category}
                className="rounded-xl border border-white/10 bg-obsidian p-4"
              >
                <span className="text-[11px] font-mono uppercase text-vermilion font-bold tracking-wider">
                  {g.category}
                </span>
                <p className="mt-2 text-xs font-medium text-silver/90 leading-snug">
                  {g.item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
