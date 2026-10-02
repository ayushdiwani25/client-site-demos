import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, Sun, Sparkles, MoveHorizontal } from "lucide-react";
import { photos } from "../data";
import PhotoImg from "./PhotoImg";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

// Interactive "RAW vs. Signature Master Grade" Split-Screen Slider
export default function BeforeAfterColorAlchemy() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const samplePhoto =
    photos.find((photo) => photo.id === "root-1748261787226") || photos[0];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    setSliderPos(pct);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="comparison"
      className="bg-charcoal py-24 text-silver border-t border-white/10"
    >
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
              Every deliverable frame is hand-tuned in an analog-calibrated
              workflow. We preserve highlight roll-off, lift true shadow
              details, and develop rich, warm Indian skin tones without plastic
              artificial smoothing.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-obsidian/60 p-3.5">
                <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Dynamic Highlight Rolloff
                  </h4>
                  <p className="text-xs text-silver/60 mt-0.5">
                    Gentle soft transitions mimicking medium-format celluloid
                    negative film.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-obsidian/60 p-3.5">
                <Sparkles className="w-5 h-5 text-vermilion shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Organic Grain & Halation
                  </h4>
                  <p className="text-xs text-silver/60 mt-0.5">
                    Subtle microscopic texture adding timeless tactile weight to
                    prints.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-silver/50 pt-2">
              Drag the interactive slider right or left to compare the sensor
              RAW flat profile against the Master Final Grade.
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
                    filter:
                      "contrast(0.78) brightness(1.08) saturate(0.42) sepia(0.06)",
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
  );
}
