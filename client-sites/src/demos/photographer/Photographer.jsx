import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Aperture, Eye, Sparkles, MapPin,
  ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight,
  Award, Layers, Film,
  Check, Grid, MoveHorizontal, Sun,
  Sparkle, SlidersHorizontal, ArrowDownRight, Phone
} from 'lucide-react'
import {
  WHATSAPP, PHOTOGRAPHER, photos, categories, shootPackages,
  addOns, philosophyPillars, gearKit, accolades,
  testimonials, sizes
} from './data'
import Footer from '../../shared/components/Footer'

const inner = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

// Helper for responsive photo loading
function PhotoImg({ p, eager, large, className = '', style = {} }) {
  const ratio = p.w && p.h ? { aspectRatio: `${p.w} / ${p.h}` } : {}
  const src = (w) => `/photos/${p.id}-${w}.webp`
  const fallbackSrc = p.remote || src(large ? 1600 : 960)

  return (
    <img
      className={className}
      src={fallbackSrc}
      srcSet={p.remote ? undefined : sizes.map((w) => `${src(w)} ${w}w`).join(', ')}
      sizes={p.remote ? undefined : large ? '100vw' : '(min-width: 1280px) 380px, (min-width: 768px) 45vw, 95vw'}
      width={p.w}
      height={p.h}
      alt={p.title}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        ...ratio,
        ...(p.lqip ? { backgroundImage: `url(${p.lqip})`, backgroundSize: 'cover' } : {}),
        ...style,
      }}
    />
  )
}

// Custom Navigation Bar
function PhotographerNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-obsidian/90 backdrop-blur-md text-silver">
      <div className={`${inner} flex h-16 items-center justify-between`}>
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-vermilion/10 border border-vermilion/30 text-vermilion transition-all duration-300 group-hover:bg-vermilion group-hover:text-obsidian">
            <Camera className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <span className="font-frame text-xl font-bold tracking-tight text-silver block leading-tight">
              {PHOTOGRAPHER.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-vermilion">
              Fine-Art Light
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-wider text-silver/70 sm:flex md:gap-8">
          <a href="#archive" className="hover:text-vermilion transition-colors">Archive</a>
          <a href="#comparison" className="hover:text-vermilion transition-colors">The Craft</a>
          <a href="#philosophy" className="hover:text-vermilion transition-colors">Philosophy</a>
          <a href="#pricing" className="hover:text-vermilion transition-colors">Sessions</a>
          <a href="#book" className="hover:text-vermilion transition-colors">Inquire</a>
        </nav>

        {/* Direct CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="#book"
            className="btn-cta ml-1 rounded-full bg-vermilion px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-obsidian shadow-md shadow-vermilion/25 hover:bg-vermilion-glow"
          >
            Book Shoot
          </a>

          {/* Mobile hamburger */}
          <div className="hidden max-sm:block">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-silver hover:text-vermilion"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-obsidian/95 px-6 py-4 space-y-3"
          >
            <a href="#archive" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion">The Archive</a>
            <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion">Color Alchemy</a>
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion">Philosophy & Kit</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion">Shoot Packages</a>
            <a href="#book" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-semibold text-vermilion">Inquire on WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Hero Section with Shutter Action & Dynamic Showcase
function Hero({ onOpenLightbox }) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [flash, setFlash] = useState(false)
  const featuredList = useMemo(() => [photos[0], photos[1], photos[3], photos[5], photos[6]], [])
  const current = featuredList[heroIndex]

  const triggerNextFrame = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 180)
    setHeroIndex((prev) => (prev + 1) % featuredList.length)
  }

  return (
    <section className="relative isolate overflow-hidden bg-obsidian pt-12 pb-20 md:pt-16 md:pb-28 text-silver">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-10 h-125 w-125 rounded-full bg-vermilion/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-95 w-95 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Shutter flash effect */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-white transition-opacity duration-150 ${flash ? 'opacity-35' : 'opacity-0'
          }`}
        aria-hidden="true"
      />

      <div className={inner}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-vermilion/30 bg-vermilion/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-vermilion">
              <span className="h-1.5 w-1.5 rounded-full bg-vermilion animate-pulse" />
              Available for Commissions · 2026/2027
            </div>

            <h1 className="font-frame text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.94] tracking-tight text-white">
              Light. Shadow. <br />
              <span className="italic font-normal text-silver/80">Unspoken</span> Moments.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-silver/70 leading-relaxed font-sans">
              Editorial portraits and fine-art chronicles crafted across Gujarat and worldwide destinations.
              Shot exclusively in raw, honest daylight with prime optics and master analog color grading.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#archive"
                className="btn-cta rounded-full bg-vermilion px-7 py-3 text-sm font-bold uppercase tracking-wider text-obsidian shadow-lg shadow-vermilion/30 hover:bg-vermilion-glow flex items-center gap-2"
              >
                <span>Explore The Archive</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <button
                onClick={triggerNextFrame}
                className="btn-cta group flex items-center gap-2 rounded-full border border-silver/20 bg-white/5 px-6 py-3 text-sm font-semibold text-silver hover:border-vermilion/50 hover:bg-white/10 transition-all"
              >
                <Camera className="w-4 h-4 text-vermilion transition-transform group-hover:scale-125" />
                <span>Snap Frame</span>
                <span className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-silver/60">
                  {heroIndex + 1}/{featuredList.length}
                </span>
              </button>
            </div>

            {/* Credibility / Key Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-vermilion">{PHOTOGRAPHER.shootsCompleted}+</p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">Commissioned Shoots</p>
              </div>
              <div>
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-white">{PHOTOGRAPHER.awardsCount}</p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">International Awards</p>
              </div>
              <div>
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-amber-400">100%</p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">Natural Ambient Light</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Shutter Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              {/* Back decorative frame */}
              <div className="absolute -inset-3 rounded-2xl bg-linear-to-tr from-vermilion/20 via-transparent to-white/5 blur-sm" />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-2xl border border-white/15 bg-charcoal p-3 shadow-2xl shadow-black/80 overflow-hidden group">
                <div
                  className="relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => onOpenLightbox(photos.findIndex((x) => x.id === current.id))}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative"
                    >
                      <PhotoImg
                        p={current}
                        large
                        eager
                        className="w-full max-h-130 object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Film grain vignette gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-80" />

                      {/* Floating Viewfinder Bracket Corner Accents */}
                      <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-white/70" />
                      <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-white/70" />
                      <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-white/70" />
                      <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-white/70" />

                      {/* Click to expand badge */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-obsidian/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-silver/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5 text-vermilion" />
                        <span>Inspect Frame</span>
                      </div>

                      {/* EXIF Card Overlay on Image */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white tracking-wide text-sm">{current.title}</span>
                          <span className="rounded bg-vermilion/20 text-vermilion border border-vermilion/30 px-2 py-0.5 text-[10px] uppercase font-bold">
                            {current.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-silver/70">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-vermilion" />
                            {current.location}
                          </span>
                          <span>•</span>
                          <span>{current.exif.settings}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Shutter Card Bottom Controls */}
                <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono text-silver/60">
                  <span className="flex items-center gap-1.5">
                    <Aperture className="w-3.5 h-3.5 text-vermilion" />
                    <span>{current.exif.camera}</span>
                  </span>
                  <button
                    onClick={triggerNextFrame}
                    className="flex items-center gap-1 text-vermilion hover:text-white transition-colors cursor-pointer"
                  >
                    <span>NEXT FRAME</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accolades Ticker Bar */}
      <div className="mt-16 border-y border-white/10 bg-charcoal/60 py-4">
        <div className={`${inner} flex flex-wrap items-center justify-between gap-6 text-xs text-silver/60 font-medium`}>
          <span className="text-[11px] uppercase tracking-widest text-silver/40 font-mono">Recognitions & Honors:</span>
          {accolades.map((acc) => (
            <div key={acc.name} className="flex items-center gap-2">
              <Award className="w-4 h-4 text-vermilion" />
              <span className="text-white font-semibold">{acc.name}</span>
              <span className="text-silver/40 hidden sm:inline">— {acc.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Master Gallery with Dual-View (Editorial Masonry & 35mm Contact Sheet)
function Gallery({ onOpenLightbox }) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'filmstrip'
  const [searchQuery, setSearchQuery] = useState('')
  const filmstripRef = useRef(null)

  const scrollFilmstrip = (direction) => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' })
    }
  }

  // Filtered photos
  const filtered = useMemo(() => {
    return photos.filter((p) => {
      const matchCat = selectedCat === 'All' || p.category === selectedCat
      const matchQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.exif.camera.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selectedCat, searchQuery])

  return (
    <section id="archive" className="bg-obsidian py-20 text-silver border-t border-white/10">
      <div className={inner}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
              <Film className="w-4 h-4" />
              <span>The Visual Vault · Archive 01</span>
            </div>
            <h2 className="mt-2 font-frame text-4xl sm:text-5xl font-black text-white">
              Selected Frames & Series
            </h2>
            <p className="mt-2 text-sm text-silver/65 max-w-lg">
              Explore high-fidelity captures shot across old stepwells, heritage courtyards, and sun-drenched desert horizons.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-2 bg-charcoal p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Masonry grid view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'grid'
                ? 'bg-vermilion text-obsidian shadow-sm'
                : 'text-silver/60 hover:text-white'
                }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Curated Grid</span>
            </button>
            <button
              onClick={() => setViewMode('filmstrip')}
              aria-label="35mm filmstrip contact sheet view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'filmstrip'
                ? 'bg-vermilion text-obsidian shadow-sm'
                : 'text-silver/60 hover:text-white'
                }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>35mm Filmstrip</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const active = selectedCat === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${active ? 'text-obsidian font-bold' : 'text-silver/70 hover:text-silver bg-white/5 border border-white/10'
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-vermilion"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search location, camera, mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-charcoal px-4 py-1.5 pl-9 text-xs text-silver placeholder:text-silver/40 focus:border-vermilion focus:outline-none"
            />
            <Eye className="w-3.5 h-3.5 absolute left-3 top-2.5 text-silver/40" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-silver/40 hover:text-white cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Curated Editorial Masonry Grid */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6"
          >
            <AnimatePresence>
              {filtered.map((p, idx) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="break-inside-avoid"
                >
                  <div
                    onClick={() => onOpenLightbox(photos.findIndex((x) => x.id === p.id))}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-all duration-300 hover:border-vermilion/50 hover:shadow-xl hover:shadow-black/70"
                  >
                    {/* Photo Image */}
                    <PhotoImg
                      p={p}
                      eager={idx < 4}
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Hover Overlay Dark Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {p.awards ? (
                        <span className="flex items-center gap-1 rounded-full bg-vermilion/90 px-2.5 py-0.5 text-[10px] font-bold text-obsidian tracking-wide uppercase shadow">
                          <Sparkle className="w-3 h-3" />
                          {p.awards}
                        </span>
                      ) : (
                        <span className="rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-mono text-silver/80 border border-white/10">
                          {p.category}
                        </span>
                      )}

                      <span className="rounded-full bg-black/50 p-1.5 text-silver/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bottom Details (Shows on Hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                      <p className="font-frame text-base font-bold text-white tracking-wide">{p.title}</p>
                      <p className="text-xs text-silver/70 line-clamp-1 mt-0.5">{p.story}</p>

                      <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2 text-[11px] font-mono text-silver/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-vermilion" />
                          {p.location}
                        </span>
                        <span className="text-vermilion font-semibold">{p.exif.aperture}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode 2: 35mm Analog Filmstrip Contact Sheet */}
        {viewMode === 'filmstrip' && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-black p-4 sm:p-6 shadow-2xl">
            {/* Filmstrip Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 text-xs font-mono text-amber-500">
              <span className="truncate pr-2">● KODAK PROFESSIONAL PORTRA 400 · 120 / 35mm FORMAT · 36 EXP</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => scrollFilmstrip(-1)}
                  className="flex items-center justify-center h-6 w-6 rounded border border-white/20 bg-charcoal text-silver hover:border-vermilion hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll filmstrip left"
                  title="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollFilmstrip(1)}
                  className="flex items-center justify-center h-6 w-6 rounded border border-white/20 bg-charcoal text-silver hover:border-vermilion hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll filmstrip right"
                  title="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sprocket Holes Top */}
            <div className="flex gap-4 py-2 overflow-hidden opacity-40 select-none" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="h-3 w-5 shrink-0 rounded-xs bg-white/20 border border-white/40" />
              ))}
            </div>

            {/* Scrollable Filmstrip Track */}
            <div
              ref={filmstripRef}
              className="flex gap-6 overflow-x-auto py-6 px-2 snap-x snap-mandatory scrollbar-thin"
            >
              {filtered.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => onOpenLightbox(photos.findIndex((x) => x.id === p.id))}
                  className="w-70 sm:w-80 shrink-0 snap-start cursor-pointer group"
                >
                  <div className="relative rounded-lg overflow-hidden border border-white/20 bg-charcoal p-2 shadow-lg group-hover:border-vermilion transition-all">
                    <PhotoImg p={p} className="h-64 w-full object-cover rounded" />
                    {/* Frame numbering */}
                    <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-amber-500/90">
                      <span>{String(idx + 1).padStart(2, '0')}A</span>
                      <span className="truncate max-w-35 text-silver/80">{p.title}</span>
                      <span>{p.exif.focalLength}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sprocket Holes Bottom */}
            <div className="flex gap-4 py-2 overflow-hidden opacity-40 select-none" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="h-3 w-5 shrink-0 rounded-xs bg-white/20 border border-white/40" />
              ))}
            </div>
          </div>
        )}

        {/* Empty Search Feedback */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center py-12 border border-white/10 rounded-2xl bg-charcoal/40">
            <Camera className="w-10 h-10 text-vermilion mx-auto mb-3 opacity-60" />
            <p className="text-base font-semibold text-white">No photographs found matching "{searchQuery}"</p>
            <p className="text-xs text-silver/60 mt-1">Try searching for other categories or clear the filter.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCat('All')
              }}
              className="mt-4 rounded-full bg-vermilion px-4 py-1.5 text-xs font-bold text-obsidian cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// Interactive "RAW vs. Signature Master Grade" Split-Screen Slider
function BeforeAfterColorAlchemy() {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const samplePhoto = photos[0] // "Aura in Ochre"

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const pct = (x / rect.width) * 100
    setSliderPos(pct)
  }

  const handleTouchMove = (e) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX)
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    handleMove(e.clientX)
  }

  const handleTouchStart = (e) => {
    isDragging.current = true
    if (e.touches[0]) handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false
    }
    const handleMouseMove = (e) => {
      if (isDragging.current) handleMove(e.clientX)
    }
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section id="comparison" className="bg-charcoal py-24 text-silver border-t border-white/10">
      <div className={inner}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Behind The Lens · Color Alchemy</span>
            </div>

            <h2 className="font-frame text-4xl sm:text-5xl font-black text-white leading-tight">
              From Flat RAW to Film Royalty.
            </h2>

            <p className="text-silver/70 text-base leading-relaxed">
              Every deliverable frame is hand-tuned in an analog-calibrated workflow. We preserve highlight roll-off, lift true shadow details, and develop rich, warm Indian skin tones without plastic artificial smoothing.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-obsidian/60 p-3.5">
                <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Dynamic Highlight Rolloff</h4>
                  <p className="text-xs text-silver/60 mt-0.5">Gentle soft transitions mimicking medium-format celluloid negative film.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-obsidian/60 p-3.5">
                <Sparkles className="w-5 h-5 text-vermilion shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Organic Grain & Halation</h4>
                  <p className="text-xs text-silver/60 mt-0.5">Subtle microscopic texture adding timeless tactile weight to prints.</p>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-silver/50 pt-2">
              Drag the interactive slider right or left to compare the sensor RAW flat profile against the Master Final Grade.
            </p>
          </div>

          {/* Right Interactive Comparison Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="relative aspect-4/5 sm:aspect-4/3 w-full select-none overflow-hidden rounded-2xl border border-white/20 bg-obsidian shadow-2xl cursor-ew-resize"
            >
              {/* Layer 1: Final Master Grade (Right / Base) */}
              <div className="absolute inset-0">
                <PhotoImg
                  p={samplePhoto}
                  large
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-4 right-4 z-10 rounded-full bg-vermilion/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-obsidian shadow-lg">
                  Signature Grade
                </span>
              </div>

              {/* Layer 2: RAW Capture (Left / Clipped via clipPath) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <PhotoImg
                  p={samplePhoto}
                  large
                  className="h-full w-full object-cover"
                  style={{
                    filter: 'contrast(0.78) brightness(1.08) saturate(0.42) sepia(0.06)',
                  }}
                />
                <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-silver/80 border border-white/20">
                  RAW Flat Sensor
                </span>
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-vermilion text-obsidian shadow-xl border-2 border-white">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Philosophy & Gear Kit
function PhilosophyAndGear() {
  return (
    <section id="philosophy" className="bg-obsidian py-24 text-silver border-t border-white/10">
      <div className={inner}>
        {/* Philosophy Intro */}
        <div className="max-w-2xl">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">The Methodology</p>
          <h2 className="mt-2 font-frame text-4xl sm:text-5xl font-black text-white">
            Honoring The Moment As It Happened.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-silver/70">
            We avoid artificial production clutter. Three guiding principles govern every photo expedition we undertake.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyPillars.map((p) => (
            <div
              key={p.step}
              className="group relative rounded-2xl border border-white/10 bg-charcoal p-7 transition-all duration-300 hover:border-vermilion/50 hover:bg-card-dark"
            >
              <span className="font-mono text-xs font-bold text-vermilion uppercase tracking-widest">{p.step} · Principle</span>
              <h3 className="mt-3 font-frame text-xl font-bold text-white group-hover:text-vermilion transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-silver/70 leading-relaxed">{p.description}</p>
              <p className="mt-4 text-xs font-mono text-silver/40 border-t border-white/10 pt-3">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Inside the Kit / Equipment */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-charcoal/80 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Master Hardware</span>
              <h3 className="font-frame text-2xl font-bold text-white mt-1">Inside The Camera Bag</h3>
            </div>
            <p className="text-xs text-silver/60 max-w-sm">
              We rely strictly on high-resolving prime glass and medium-format optics to yield cinematic rendering.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gearKit.map((g) => (
              <div key={g.category} className="rounded-xl border border-white/10 bg-obsidian p-4">
                <span className="text-[11px] font-mono uppercase text-vermilion font-bold tracking-wider">{g.category}</span>
                <p className="mt-2 text-xs font-medium text-silver/90 leading-snug">{g.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Interactive Shoot Planner & WhatsApp Instant Quote Estimator
function ShootPlannerAndBooking() {
  const [selectedPackage, setSelectedPackage] = useState(shootPackages[0])
  const [selectedAddons, setSelectedAddons] = useState([])
  const [clientName, setClientName] = useState('')
  const [preferredMonth, setPreferredMonth] = useState('Next Month')
  const [locationPreference, setLocationPreference] = useState('Gujarat (Ahmedabad/Baroda/Kutch)')
  const [notes, setNotes] = useState('')

  // Calculate live estimate in INR
  const basePriceNum = parseInt(selectedPackage.price.replace(/[^\d]/g, ''), 10)
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const item = addOns.find((a) => a.id === addonId)
    return acc + (item ? parseInt(item.price.replace(/[^\d]/g, ''), 10) : 0)
  }, 0)
  const totalEstimate = basePriceNum + addonsTotal

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((x) => x !== id))
    } else {
      setSelectedAddons([...selectedAddons, id])
    }
  }

  const handleWhatsAppSend = (e) => {
    e.preventDefault()
    const addonNames = selectedAddons
      .map((id) => addOns.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ')

    const message = `Hello Ayush! I would like to book a shoot with you.
• Name: ${clientName || 'Inquirer'}
• Package: ${selectedPackage.name} (${selectedPackage.price})
• Preferred Location: ${locationPreference}
• Timeline: ${preferredMonth}
${addonNames ? `• Add-ons Selected: ${addonNames}\n` : ''}• Total Estimated Investment: ₹${totalEstimate.toLocaleString()}
${notes ? `• Brief/Notes: ${notes}\n` : ''}
Could you please confirm your calendar availability?`

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
  }

  return (
    <section id="pricing" className="bg-charcoal py-24 text-silver border-t border-white/10">
      <div className={inner}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">Investment & Commission</p>
          <h2 className="mt-2 font-frame text-4xl sm:text-5xl font-black text-white">
            Curate Your Shoot Experience.
          </h2>
          <p className="mt-3 text-sm text-silver/70">
            Select a base tier and add optional analog celluloid film or drone aerials. Get a real-time instant estimate and connect directly on WhatsApp.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {shootPackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative rounded-2xl border p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between ${isSelected
                  ? 'border-vermilion bg-obsidian shadow-xl shadow-vermilion/10 ring-2 ring-vermilion/50'
                  : 'border-white/10 bg-card-dark hover:border-white/20'
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-vermilion px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-obsidian shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-frame text-xl font-bold text-white">{pkg.name}</h3>
                    <span className="font-mono text-xs text-silver/50">{pkg.duration}</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-frame text-3xl font-black text-vermilion">{pkg.price}</span>
                    <span className="text-xs text-silver/50 font-mono">/ {pkg.usdPrice}</span>
                  </div>

                  <p className="mt-3 text-xs text-silver/70 leading-relaxed">{pkg.summary}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-silver/80">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPackage(pkg)
                  }}
                  className={`mt-8 w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${isSelected
                    ? 'bg-vermilion text-obsidian shadow-md'
                    : 'bg-white/10 text-silver hover:bg-white/15'
                    }`}
                >
                  {isSelected ? '✓ Selected Tier' : 'Select Tier'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Interactive Shoot Builder Form */}
        <div id="book" className="mt-16 rounded-2xl border border-white/10 bg-obsidian p-6 sm:p-10 shadow-2xl">
          <div className="border-b border-white/10 pb-6">
            <h3 className="font-frame text-2xl font-bold text-white">Customize & Confirm Details</h3>
            <p className="text-xs text-silver/60 mt-1">Review add-on celluloid options and formulate your WhatsApp inquiry.</p>
          </div>

          <form onSubmit={handleWhatsAppSend} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Options */}
            <div className="lg:col-span-7 space-y-6">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-silver/80 mb-2">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Priyanshi & Aarav"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none"
                />
              </div>

              {/* Location & Month */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-silver/80 mb-2">
                    Location
                  </label>
                  <select
                    value={locationPreference}
                    onChange={(e) => setLocationPreference(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-charcoal px-3 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none cursor-pointer"
                  >
                    <option>Ahmedabad & Old City</option>
                    <option>Udaipur / Rajasthan Haveli</option>
                    <option>White Desert, Kutch</option>
                    <option>Mumbai / Goa</option>
                    <option>International Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-silver/80 mb-2">
                    Ideal Date / Month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mid November 2026"
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none"
                  />
                </div>
              </div>

              {/* Addons Checklist */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-silver/80 mb-3">
                  A La Carte Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const checked = selectedAddons.includes(addon.id)
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer select-none transition-all ${checked
                          ? 'border-vermilion bg-vermilion/10 text-white'
                          : 'border-white/10 bg-charcoal text-silver/70 hover:border-white/20'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? 'border-vermilion bg-vermilion text-obsidian' : 'border-white/30'}`}>
                            {checked && <Check className="w-3 h-3 stroke-3" />}
                          </div>
                          <span className="text-xs font-medium">{addon.name}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-vermilion">{addon.price}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-silver/80 mb-2">
                  Special Vision / Wardrobe Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell me a bit about the occasion, vibe, or preferred timing..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-charcoal p-3 text-xs text-silver focus:border-vermilion focus:outline-none"
                />
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-vermilion/30 bg-charcoal/90 p-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-vermilion font-bold">
                  Live Estimate Summary
                </span>
                <h4 className="font-frame text-xl font-bold text-white mt-1">{selectedPackage.name}</h4>
                <p className="text-xs text-silver/60 mt-1">{selectedPackage.duration}</p>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between text-silver/70">
                    <span>Base Tier:</span>
                    <span className="font-mono text-white">{selectedPackage.price}</span>
                  </div>
                  {selectedAddons.map((id) => {
                    const item = addOns.find((a) => a.id === id)
                    return (
                      <div key={id} className="flex justify-between text-silver/70">
                        <span className="truncate pr-2">+ {item?.name}:</span>
                        <span className="font-mono text-vermilion">{item?.price}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-white">Estimated Investment:</span>
                  <span className="font-frame text-2xl font-black text-vermilion">
                    ₹{totalEstimate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="submit"
                  className="btn-cta w-full rounded-xl bg-vermilion py-3.5 text-xs font-bold uppercase tracking-wider text-obsidian shadow-lg shadow-vermilion/30 hover:bg-vermilion-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Proposal via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-silver/50">
                  Direct encrypted line · Usually replies within 2–4 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// Client Stories & Praise
function ClientStories() {
  const [activeStory, setActiveStory] = useState(0)

  return (
    <section className="bg-obsidian py-24 text-silver border-t border-white/10">
      <div className={inner}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">Client Stories</p>
            <h2 className="mt-1 font-frame text-4xl font-black text-white">Words From Those Before The Glass.</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStory(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeStory === i ? 'w-8 bg-vermilion' : 'w-2 bg-white/20'}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => setActiveStory((activeStory - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
                className="p-1.5 rounded-full border border-white/15 hover:border-vermilion text-silver/80 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveStory((activeStory + 1) % testimonials.length)}
                aria-label="Next testimonial"
                className="p-1.5 rounded-full border border-white/15 hover:border-vermilion text-silver/80 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                setActiveStory((activeStory + 1) % testimonials.length)
              } else if (info.offset.x > 60) {
                setActiveStory((activeStory - 1 + testimonials.length) % testimonials.length)
              }
            }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-grab active:cursor-grabbing"
          >
            <div className="lg:col-span-8">
              <blockquote className="font-frame text-2xl sm:text-3xl font-medium leading-relaxed text-silver/90 italic">
                “{testimonials[activeStory].quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-10 w-1 bg-vermilion rounded-full" />
                <div>
                  <p className="font-frame text-lg font-bold text-white">{testimonials[activeStory].name}</p>
                  <p className="text-xs text-silver/50 font-mono">{testimonials[activeStory].role}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-white/10 bg-charcoal p-3 shadow-xl max-w-xs">
                {(() => {
                  const photoObj = photos.find((p) => p.id === testimonials[activeStory].photo) || photos[0]
                  return (
                    <PhotoImg p={photoObj} className="w-full h-72 object-cover rounded-xl" />
                  )
                })()}
                <p className="mt-2 text-center text-[10px] font-mono text-silver/40">Framed Session Reference</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Fullscreen Lightbox Modal with EXIF Telemetry
function Lightbox({ index, setIndex }) {
  const [zoom, setZoom] = useState(false)

  const close = useCallback(() => {
    setIndex(null)
  }, [setIndex])

  const step = useCallback((dir) => {
    setZoom(false)
    setIndex((prev) => (prev + dir + photos.length) % photos.length)
  }, [setIndex])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'z') setZoom((v) => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [close, step])

  if (index === null || !photos[index]) return null
  const p = photos[index]

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={close}
        className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4 sm:p-8"
      >
        {/* Lightbox Main Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/15 bg-charcoal p-4 sm:p-6 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-30 rounded-full bg-black/60 p-2 text-silver hover:bg-vermilion hover:text-obsidian transition-colors border border-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Center: The Photograph */}
          <div className="relative flex flex-1 h-full w-full items-center justify-center overflow-hidden">
            <PhotoImg
              p={p}
              large
              eager
              className={`max-h-[75vh] w-auto max-w-full rounded-lg object-contain transition-transform duration-300 ${zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
              style={{ maxHeight: '72vh' }}
            />

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-silver hover:bg-vermilion hover:text-obsidian transition-colors border border-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-silver hover:bg-vermilion hover:text-obsidian transition-colors border border-white/10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Panel: Technical EXIF & Curatorial Story */}
          <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 space-y-5 text-left text-silver overflow-y-auto max-h-[75vh]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-vermilion font-bold">
                {p.category} · Series {p.year}
              </span>
              <h3 className="font-frame text-2xl font-bold text-white mt-1">{p.title}</h3>
              <p className="mt-2 text-xs text-silver/70 leading-relaxed font-sans">{p.story}</p>
            </div>

            {/* EXIF Readout HUD */}
            <div className="rounded-xl border border-white/10 bg-obsidian/70 p-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-silver/50 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Camera className="w-3.5 h-3.5 text-vermilion" />
                  Camera
                </span>
                <span className="text-silver/90">{p.exif.camera}</span>
              </div>
              <div className="flex items-center justify-between text-silver/50">
                <span>Lens</span>
                <span className="text-silver/90">{p.exif.lens}</span>
              </div>
              <div className="flex items-center justify-between text-silver/50">
                <span>Exposure</span>
                <span className="text-vermilion font-bold">{p.exif.settings}</span>
              </div>
              <div className="flex items-center justify-between text-silver/50">
                <span>Location</span>
                <span className="text-silver/90">{p.location}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setZoom(!zoom)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 py-2 text-xs font-semibold text-silver hover:border-vermilion/50 transition-colors cursor-pointer"
              >
                {zoom ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{zoom ? 'Reset' : 'Zoom'}</span>
              </button>

              <a
                href="#book"
                onClick={close}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-vermilion py-2 text-xs font-bold uppercase tracking-wider text-obsidian shadow hover:bg-vermilion-glow transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Book Shoot</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// Master Main Photographer Component
export default function Photographer() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div id="top" className="min-h-screen bg-obsidian text-silver selection:bg-vermilion selection:text-obsidian">
      <PhotographerNav />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenLightbox={(idx) => setLightboxIndex(idx)} />
        <Gallery onOpenLightbox={(idx) => setLightboxIndex(idx)} />
        <BeforeAfterColorAlchemy />
        <PhilosophyAndGear />
        <ShootPlannerAndBooking />
        <ClientStories />
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <Lightbox
          index={lightboxIndex}
          setIndex={setLightboxIndex}
        />
      )}

      <Footer
        brand={PHOTOGRAPHER.name}
        brandClass="font-frame"
        tagline={`${PHOTOGRAPHER.place} · Fine-Art Light.`}
        groups={[
          { title: 'Explore', links: [['Archive', '#archive'], ['The Craft', '#comparison'], ['Philosophy', '#philosophy']] },
          { title: 'Connect', links: [['Sessions', '#pricing'], ['Inquire', '#book']] },
        ]}
        footerClass="border-t border-white/10 bg-obsidian text-silver"
        mutedClass="text-silver/60"
        borderClass="border-white/10"
        note="All photographic works cataloged under creative copyright."
      />
    </div>
  )
}
