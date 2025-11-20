import React from 'react';

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <div className="absolute inset-0 bg-black/45 flex items-center">
        <div className="container mx-auto px-6 lg:px-20 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
            Paradise Resort
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl">
            Relax. Refresh. Rejuvenate — an escape surrounded by nature.
          </p>
          <div className="mt-8">
            <a
              href="#booking"
              className="inline-block px-6 py-3 bg-white text-black rounded-2xl font-medium shadow-lg hover:scale-105 transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
