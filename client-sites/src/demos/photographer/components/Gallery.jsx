import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Eye,
  MapPin,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Film,
  Grid,
  MoveHorizontal,
  Sparkle,
} from "lucide-react";
import { photos, categories } from "../data";
import PhotoImg from "./PhotoImg";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

// Master Gallery with Dual-View (Editorial Masonry & 35mm Contact Sheet)
export default function Gallery({ onOpenLightbox }) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'filmstrip'
  const [searchQuery, setSearchQuery] = useState("");
  const filmstripRef = useRef(null);

  const scrollFilmstrip = (direction) => {
    if (filmstripRef.current) {
      filmstripRef.current.scrollBy({
        left: direction * 340,
        behavior: "smooth",
      });
    }
  };

  // Filtered photos
  const filtered = useMemo(() => {
    return photos.filter((p) => {
      const matchCat = selectedCat === "All" || p.category === selectedCat;
      const matchQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.exif.camera.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCat, searchQuery]);

  return (
    <section
      id="archive"
      className="bg-obsidian py-20 text-silver border-t border-white/10"
    >
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
              Explore high-fidelity captures shot across old stepwells, heritage
              courtyards, and sun-drenched desert horizons.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-2 bg-charcoal p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Masonry grid view"
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "grid"
                  ? "bg-vermilion text-obsidian shadow-sm font-bold"
                  : "text-silver/85 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Curated Grid</span>
            </button>
            <button
              onClick={() => setViewMode("filmstrip")}
              aria-label="35mm filmstrip contact sheet view"
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "filmstrip"
                  ? "bg-vermilion text-obsidian shadow-sm font-bold"
                  : "text-silver/85 hover:text-white"
              }`}
            >
              <MoveHorizontal className="w-4 h-4" />
              <span>35mm Filmstrip</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? "text-obsidian font-bold"
                      : "text-silver/70 hover:text-silver bg-white/5 border border-white/10"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-vermilion"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
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
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-silver/40 hover:text-white cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Curated Editorial Masonry Grid */}
        {viewMode === "grid" && (
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
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      onOpenLightbox(photos.findIndex((x) => x.id === p.id))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenLightbox(photos.findIndex((x) => x.id === p.id));
                      }
                    }}
                    aria-label={`View ${p.title}`}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-all duration-300 hover:border-vermilion/50 hover:shadow-xl hover:shadow-black/70 focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian outline-none"
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
                      <p className="font-frame text-base font-bold text-white tracking-wide">
                        {p.title}
                      </p>
                      <p className="text-xs text-silver/70 line-clamp-1 mt-0.5">
                        {p.story}
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2 text-[11px] font-mono text-silver/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-vermilion" />
                          {p.location}
                        </span>
                        <span className="text-vermilion font-semibold">
                          {p.exif.aperture}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode 2: 35mm Analog Filmstrip Contact Sheet */}
        {viewMode === "filmstrip" && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-black p-4 sm:p-6 shadow-2xl">
            {/* Filmstrip Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 text-xs font-mono text-amber-500">
              <span className="truncate pr-2">
                ● KODAK PROFESSIONAL PORTRA 400 · 120 / 35mm FORMAT · 36 EXP
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => scrollFilmstrip(-1)}
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-white/20 bg-charcoal text-silver/90 hover:border-vermilion hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll filmstrip left"
                  title="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollFilmstrip(1)}
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-white/20 bg-charcoal text-silver/90 hover:border-vermilion hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll filmstrip right"
                  title="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sprocket Holes Top */}
            <div
              className="flex gap-4 py-2 overflow-hidden opacity-40 select-none"
              aria-hidden="true"
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-5 shrink-0 rounded-xs bg-white/20 border border-white/40"
                />
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
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    onOpenLightbox(photos.findIndex((x) => x.id === p.id))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenLightbox(photos.findIndex((x) => x.id === p.id));
                    }
                  }}
                  aria-label={`View ${p.title}`}
                  className="w-70 sm:w-80 shrink-0 snap-start cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
                >
                  <div className="relative rounded-lg overflow-hidden border border-white/20 bg-charcoal p-2 shadow-lg group-hover:border-vermilion transition-all">
                    <PhotoImg
                      p={p}
                      className="h-64 w-full object-cover rounded"
                    />
                    {/* Frame numbering */}
                    <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-amber-500/90">
                      <span>{String(idx + 1).padStart(2, "0")}A</span>
                      <span className="truncate max-w-35 text-silver/80">
                        {p.title}
                      </span>
                      <span>{p.exif.focalLength}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sprocket Holes Bottom */}
            <div
              className="flex gap-4 py-2 overflow-hidden opacity-40 select-none"
              aria-hidden="true"
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-5 shrink-0 rounded-xs bg-white/20 border border-white/40"
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty Search Feedback */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center py-12 border border-white/10 rounded-2xl bg-charcoal/40">
            <Camera className="w-10 h-10 text-vermilion mx-auto mb-3 opacity-60" />
            <p className="text-base font-semibold text-white">
              No photographs found matching "{searchQuery}"
            </p>
            <p className="text-xs text-silver/60 mt-1">
              Try searching for other categories or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All");
              }}
              className="mt-4 rounded-full bg-vermilion px-4 py-1.5 text-xs font-bold text-obsidian cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
