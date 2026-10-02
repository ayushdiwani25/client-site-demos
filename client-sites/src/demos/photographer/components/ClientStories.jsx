import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos, testimonials } from "../data";
import PhotoImg from "./PhotoImg";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

// Client Stories & Praise
export default function ClientStories() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="bg-obsidian py-24 text-silver border-t border-white/10">
      <div className={inner}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
              Client Stories
            </p>
            <h2 className="mt-1 font-frame text-4xl font-black text-white">
              Words From Those Before The Glass.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStory(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeStory === i ? "w-8 bg-vermilion" : "w-2 bg-white/20"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() =>
                  setActiveStory(
                    (activeStory - 1 + testimonials.length) %
                      testimonials.length,
                  )
                }
                aria-label="Previous testimonial"
                className="p-1.5 rounded-full border border-white/15 hover:border-vermilion text-silver/80 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveStory((activeStory + 1) % testimonials.length)
                }
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
                setActiveStory((activeStory + 1) % testimonials.length);
              } else if (info.offset.x > 60) {
                setActiveStory(
                  (activeStory - 1 + testimonials.length) % testimonials.length,
                );
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
                  <p className="font-frame text-lg font-bold text-white">
                    {testimonials[activeStory].name}
                  </p>
                  <p className="text-xs text-silver/50 font-mono">
                    {testimonials[activeStory].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-white/10 bg-charcoal p-3 shadow-xl max-w-xs">
                {(() => {
                  const photoObj =
                    photos.find(
                      (p) => p.id === testimonials[activeStory].photo,
                    ) || photos[0];
                  return (
                    <PhotoImg
                      p={photoObj}
                      className="w-full h-72 object-cover rounded-xl"
                    />
                  );
                })()}
                <p className="mt-2 text-center text-[10px] font-mono text-silver/40">
                  Framed Session Reference
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
