import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Aperture,
  MapPin,
  ChevronRight,
  Award,
  ArrowDownRight,
} from "lucide-react";
import { PHOTOGRAPHER, photos, accolades } from "../data";
import PhotoImg from "./PhotoImg";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function Hero({ onOpenLightbox }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const featuredList = useMemo(() => {
    const featured = photos.filter((photo) => photo.heroFeatured);
    const original = featured.find(
      (photo) => photo.id === "root-1748261787226",
    );
    return original
      ? [original, ...featured.filter((photo) => photo !== original)]
      : featured;
  }, []);
  const current = featuredList[heroIndex];

  const triggerNextFrame = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
    setHeroIndex((prev) => (prev + 1) % featuredList.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-obsidian pt-12 pb-20 md:pt-16 md:pb-28 text-silver">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-10 h-125 w-125 rounded-full bg-vermilion/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-95 w-95 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Shutter flash effect */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-white transition-opacity duration-150 ${
          flash ? "opacity-35" : "opacity-0"
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
              <span className="italic font-normal text-silver/80">
                Unspoken
              </span>{" "}
              Moments.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-silver/70 leading-relaxed font-sans">
              Editorial portraits and fine-art chronicles crafted across Gujarat
              and worldwide destinations. Shot exclusively in raw, honest
              daylight with prime optics and master analog color grading.
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
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-vermilion">
                  {PHOTOGRAPHER.shootsCompleted}+
                </p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">
                  Commissioned Shoots
                </p>
              </div>
              <div>
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-white">
                  {PHOTOGRAPHER.awardsCount}
                </p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">
                  International Awards
                </p>
              </div>
              <div>
                <p className="font-frame text-2xl sm:text-3xl font-extrabold text-amber-400">
                  100%
                </p>
                <p className="text-xs text-silver/60 uppercase tracking-wider mt-0.5">
                  Natural Ambient Light
                </p>
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
                  onClick={() =>
                    onOpenLightbox(photos.findIndex((x) => x.id === current.id))
                  }
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
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

                      {/* EXIF Card Overlay on Image */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white tracking-wide text-sm">
                            {current.title}
                          </span>
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
        <div
          className={`${inner} flex flex-wrap items-center justify-between gap-6 text-xs text-silver/60 font-medium`}
        >
          <span className="text-[11px] uppercase tracking-widest text-silver/40 font-mono">
            Recognitions & Honors:
          </span>
          {accolades.map((acc) => (
            <div key={acc.name} className="flex items-center gap-2">
              <Award className="w-4 h-4 text-vermilion" />
              <span className="text-white font-semibold">{acc.name}</span>
              <span className="text-silver/40 hidden sm:inline">
                — {acc.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
