import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Layers } from "lucide-react";
import { PHOTOGRAPHER } from "../data";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function PhotographerNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <a href="#archive" className="hover:text-vermilion transition-colors">
            Archive
          </a>
          <a
            href="#comparison"
            className="hover:text-vermilion transition-colors"
          >
            The Craft
          </a>
          <a
            href="#philosophy"
            className="hover:text-vermilion transition-colors"
          >
            Philosophy
          </a>
          <a href="#pricing" className="hover:text-vermilion transition-colors">
            Sessions
          </a>
          <a href="#book" className="hover:text-vermilion transition-colors">
            Inquire
          </a>
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
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Layers className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-obsidian/95 px-6 py-4 space-y-3"
          >
            <a
              href="#archive"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion"
            >
              The Archive
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion"
            >
              Color Alchemy
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion"
            >
              Philosophy & Kit
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-semibold text-silver/80 hover:text-vermilion"
            >
              Shoot Packages
            </a>
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-semibold text-vermilion"
            >
              Inquire on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
