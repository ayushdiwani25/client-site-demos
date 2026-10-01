export default function Footer({
  brand,
  brandClass = '',
  tagline,
  groups,
  footerClass = 'bg-ink text-white',
  mutedClass = 'text-white/60',
  borderClass = 'border-white/10',
  note,
}) {
  return (
    <footer className={footerClass}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <a href="#top" className={`text-lg font-extrabold tracking-tight ${brandClass}`}>
            {brand}
          </a>
          <p className={`mt-2 text-sm ${mutedClass}`}>{tagline}</p>
        </div>
        {groups.map(({ title, links }) => (
          <div key={title}>
            <p className={`mb-4 text-xs font-semibold uppercase tracking-widest ${mutedClass}`}>{title}</p>
            <ul className={`flex flex-col gap-2 text-sm ${mutedClass}`}>
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition-opacity hover:opacity-70">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={`border-t ${borderClass} px-6 py-5 text-center text-xs ${mutedClass}`}>
        © {new Date().getFullYear()} {brand}. All rights reserved.{note ? ` ${note}` : ''}
      </div>
    </footer>
  )
}

