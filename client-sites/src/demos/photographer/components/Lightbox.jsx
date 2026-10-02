import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { photos } from "../data";
import PhotoImg from "./PhotoImg";

// Fullscreen Lightbox Modal with EXIF Telemetry
export default function Lightbox({ index, setIndex }) {
  const [zoom, setZoom] = useState(false);

  const close = useCallback(() => {
    setIndex(null);
  }, [setIndex]);

  const step = useCallback(
    (dir) => {
      setZoom(false);
      setIndex((prev) => (prev + dir + photos.length) % photos.length);
    },
    [setIndex],
  );

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "z") setZoom((v) => !v);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close, step]);

  if (index === null || !photos[index]) return null;
  const p = photos[index];

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
            className="absolute top-4 right-4 z-30 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-black/60 p-2.5 text-silver hover:bg-vermilion hover:text-obsidian transition-colors border border-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Center: The Photograph */}
          <div className="relative flex flex-1 h-full w-full items-center justify-center overflow-hidden">
            <PhotoImg
              p={p}
              large
              eager
              className={`max-h-[75vh] w-auto max-w-full rounded-lg object-contain transition-transform duration-300 ${
                zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={{ maxHeight: "72vh" }}
            />

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-silver hover:bg-vermilion hover:text-obsidian transition-colors border border-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
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
                {p.category}{p.year ? ` · Series ${p.year}` : ''}
              </span>
              <h3 className="font-frame text-2xl font-bold text-white mt-1">
                {p.title}
              </h3>
              <p className="mt-2 text-xs text-silver/70 leading-relaxed font-sans">
                {p.story}
              </p>
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
                <span className="text-vermilion font-bold">
                  {p.exif.settings}
                </span>
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
                {zoom ? (
                  <ZoomOut className="w-3.5 h-3.5" />
                ) : (
                  <ZoomIn className="w-3.5 h-3.5" />
                )}
                <span>{zoom ? "Reset" : "Zoom"}</span>
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
  );
}
