"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: "/luxury-tropical-resort-beach-sunset-with-palm-tree.jpg", title: "Tropical Paradise" },
    { url: "/modern-luxury-resort-pool-overlooking-ocean-with-l.jpg", title: "Infinity Pool Oasis" },
    { url: "/private-beach-resort-with-white-sand-pristine-wate.jpg", title: "Private Beach Escape" },
    { url: "/luxury-resort-sunset-golden-hour-beachfront-romant.jpg", title: "Golden Hour Getaway" },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentIndex ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 z-[-10]"
          }`}
          style={{
            backgroundImage: `url(${img.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Paradise Resort
        </h1>
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
          {images[currentIndex].title}
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Relax. Refresh. Rejuvenate — an escape surrounded by nature and luxury.
        </p>
        <a
          href="#booking"
          className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
        >
          Book Your Paradise
        </a>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm text-white text-xl"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm text-white text-xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
