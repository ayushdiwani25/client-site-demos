export default function Navbar({ brand, links, cta, active }) {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-chalk/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="font-display text-xl font-extrabold">{brand}</a>
        <ul className="hidden gap-8 text-sm font-semibold md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className={`transition-colors ${active === href ? 'text-court' : 'hover:text-court'}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href={cta[1]} className="btn-cta inline-block rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-chalk">{cta[0]}</a>
      </nav>
    </header>
  )
}
