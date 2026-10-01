import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar({
  brand, links, cta, active,
  headerClass = 'border-ink/10 bg-chalk/90',
  brandClass = 'font-display',
  activeClass = 'text-court',
  hoverClass = 'hover:text-court',
  ctaClass = 'bg-ink text-chalk',
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur ${headerClass}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className={`text-xl font-extrabold ${brandClass}`}>{brand}</a>
        <ul className="hidden gap-8 text-sm font-semibold md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className={`transition-colors ${active === href ? activeClass : hoverClass}`}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={cta[1]} className={`btn-cta inline-block rounded-lg px-4 py-2 text-sm font-semibold ${ctaClass}`}>{cta[0]}</a>
          <button
            className="no-hover-scale p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>
      </nav>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-current/10 px-6 pb-3 md:hidden"
          >
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-semibold">{label}</a>
            </li>
          ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
