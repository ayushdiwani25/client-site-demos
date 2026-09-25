import { useState, useEffect } from 'react'

export default function Navbar({ brand, links, cta }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-30 transition-shadow duration-200 ${scrolled ? 'shadow-sm bg-white/95 backdrop-blur' : 'bg-white/80 backdrop-blur'} border-b border-border`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-ink">{brand}</a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-muted">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-ink transition-colors">{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={cta[1]} className="btn-cta hidden md:inline-block rounded-lg bg-court px-4 py-2 text-sm font-semibold text-white">
            {cta[0]}
          </a>
          {/* Mobile menu toggle */}
          <button
            className="no-hover-scale md:hidden p-2 rounded-lg hover:bg-chalk transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-6 pb-4">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-muted hover:text-ink transition-colors">{label}</a>
              </li>
            ))}
          </ul>
          <a href={cta[1]} onClick={() => setOpen(false)} className="btn-cta mt-3 block rounded-lg bg-court px-4 py-2.5 text-center text-sm font-semibold text-white">
            {cta[0]}
          </a>
        </div>
      )}
    </header>
  )
}

