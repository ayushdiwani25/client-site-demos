export default function Footer({ brand = 'Stride', tagline = 'Small-group strength training.', address = '12 Riverside Road', hours = '6am – 9pm, 7 days' }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="text-lg font-extrabold tracking-tight">{brand}</p>
          <p className="mt-2 text-sm text-white/50">{tagline}</p>
        </div>
        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Navigate</p>
          <ul className="flex flex-col gap-2 text-sm text-white/60">
            {[['Timetable', '#schedule'], ['Plans', '#plans'], ['Coaches', '#coaches'], ['Contact', '#contact']].map(([label, href]) => (
              <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Visit us</p>
          <p className="text-sm text-white/60">{address}</p>
          <p className="mt-1 text-sm text-white/60">Open {hours}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {brand}. All rights reserved.
      </div>
    </footer>
  )
}

