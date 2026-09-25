const demos = [
  { name: 'Stride Strength Club', path: '/gym', description: 'A focused fitness studio landing page with classes, plans, coaches, and a free trial flow.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-chalk">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-court mb-4">Client sites</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-ink md:text-6xl">Demo collection</h1>
        <p className="mt-4 text-base text-muted max-w-lg">A set of focused, production-ready site templates for small businesses.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {demos.map((demo) => (
            <a
              key={demo.path}
              href={demo.path}
              className="group block rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-court">Demo</span>
              <h2 className="mt-3 text-2xl font-bold text-ink tracking-tight">{demo.name}</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{demo.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-court group-hover:gap-2.5 transition-all">
                View site
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

