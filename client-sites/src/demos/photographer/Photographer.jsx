import { useState, useEffect } from "react";
import PhotographerNav from "./components/PhotographerNav";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import BeforeAfterColorAlchemy from "./components/BeforeAfterSlider";
import PhilosophyAndGear from "./components/PhilosophyAndGear";
import ShootPlannerAndBooking from "./components/ShootPlanner";
import ClientStories from "./components/ClientStories";
import Lightbox from "./components/Lightbox";
import Footer from "../../shared/components/Footer";
import { PHOTOGRAPHER, photos } from "./data";

export default function Photographer() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Per-route SEO: update page title
  useEffect(() => {
    document.title = `${PHOTOGRAPHER.name} — Fine-Art Photography | ${PHOTOGRAPHER.place}`;
    return () => {
      document.title = "Client Sites | Demo Collection";
    };
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-obsidian text-silver selection:bg-vermilion selection:text-obsidian"
    >
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
        <Lightbox index={lightboxIndex} setIndex={setLightboxIndex} />
      )}

      <Footer
        brand={PHOTOGRAPHER.name}
        brandClass="font-frame"
        tagline={`${PHOTOGRAPHER.place} · Fine-Art Light.`}
        groups={[
          {
            title: "Explore",
            links: [
              ["Archive", "#archive"],
              ["The Craft", "#comparison"],
              ["Philosophy", "#philosophy"],
            ],
          },
          {
            title: "Connect",
            links: [
              ["Sessions", "#pricing"],
              ["Inquire", "#book"],
            ],
          },
        ]}
        footerClass="border-t border-white/10 bg-obsidian text-silver"
        mutedClass="text-silver/60"
        borderClass="border-white/10"
        note="All photographic works cataloged under creative copyright."
      />
    </div>
  );
}
