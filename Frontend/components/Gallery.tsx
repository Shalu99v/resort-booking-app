// components/Gallery.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

// AUTO-LOAD resort1.jpg → resort20.jpg with dynamic badges
const badgeOptions = [
  "Popular",
  "Top View",
  "Premium Shot",
  "Room Highlight",
  "Best Angle",
  "Editor's Pick"
];

const imgs = Array.from({ length: 20 }, (_, i) => ({
  src: `/resort${i + 1}.jpg`,
  label: `Resort View ${i + 1}`,
  icon: <Camera className="h-5 w-5 inline-block" />,
  badge: badgeOptions[i % badgeOptions.length]
}));

const VIDEO_SRC = "/promo.mp4";

export default function Gallery() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIsVideo, setLightboxIsVideo] = useState(false);

  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});

  // AUTO-SCROLL CAROUSEL
  useEffect(() => {
    if (carouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % imgs.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [carouselPaused]);

  // LAZY FADE-IN
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            setVisibleMap((m) => ({ ...m, [idx]: true }));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-idx]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openImage = (src: string) => {
    setLightboxIsVideo(false);
    setLightboxSrc(src);
  };

  const openVideo = (src: string) => {
    setLightboxIsVideo(true);
    setLightboxSrc(src);
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Resort gallery section"
      style={{
        background: `
          linear-gradient(
            180deg,
            #E0F2FF 0%,
            #B3E5FF 25%,
            #80D4FF 50%,
            #4BA8FF 75%,
            #1E3F8A 100%
          )
        `
      }}
    >
      {/* Top waves */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-24 opacity-40">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path
            d="M0,16 C150,80 350,0 600,40 C850,80 1050,20 1200,56 L1200 120 L0 120 Z"
            fill="rgba(255,255,255,0.6)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-12">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-rose-700 drop-shadow-md">
            Resort Gallery
          </h2>
          <p className="text-sm text-rose-900/70 mt-2">
            Browse rooms, amenities and our beautiful grounds
          </p>
        </div>

        {/* MASONRY */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {imgs.map((it, i) => (
            <article
              key={i}
              data-idx={i}
              style={{ breakInside: "avoid" }}
              className={`relative rounded-2xl overflow-hidden mb-6 neon-border transition-all duration-500 ${
                visibleMap[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="cursor-pointer group" onClick={() => openImage(it.src)}>
                <img
                  src={it.src}
                  alt={it.label}
                  className="w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Icon + Label */}
                <div className="absolute left-4 bottom-4 bg-black/40 rounded-full px-3 py-2 backdrop-blur-sm flex items-center gap-2">
                  <span className="text-amber-100/90">{it.icon}</span>
                  <div className="text-sm text-white font-medium">{it.label}</div>
                </div>

                {/* Blue-Themed Badge */}
                <div className="absolute top-4 left-4 bg-blue-500/80 text-white font-semibold text-xs px-2 py-1 rounded-md shadow-md">
                  {it.badge}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
          <div className="relative max-w-4xl w-full">
            {!lightboxIsVideo ? (
              <img src={lightboxSrc} alt="Preview" className="w-full rounded-xl shadow-2xl" />
            ) : (
              <video src={lightboxSrc} autoPlay controls className="w-full rounded-xl shadow-2xl" />
            )}

            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-border {
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.18), 0 0 20px rgba(255, 99, 132, 0.06) inset;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .neon-glow {
          filter: drop-shadow(0 6px 18px rgba(255, 99, 132, 0.18));
        }
      `}</style>
    </section>
  );
}
