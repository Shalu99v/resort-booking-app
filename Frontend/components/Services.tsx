import React from "react";
import { Mountain, Waves, Heart } from "lucide-react"; // icons

const items = [
  {
    title: "Accommodation",
    desc: "Comfortable rooms, lake view suites, family cottages.",
    icon: <Mountain className="h-10 w-10 text-white" />,
  },
  {
    title: "Adventure Activities",
    desc: "Trekking, zipline, kayaking, and guided nature trails.",
    icon: <Waves className="h-10 w-10 text-white" />,
  },
  {
    title: "Wellness & Spa",
    desc: "Massage, steam, sauna, and yoga sessions.",
    icon: <Heart className="h-10 w-10 text-white" />,
  },
];

export default function Services() {
  return (
    <section className="relative py-20 overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a8c0ff] via-[#3f87a6] to-[#3d3d3d] opacity-90" />

      {/* Decorative floating shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl animate-ping" />

      <div className="relative container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl 
                         hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-lg">
                  {it.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white text-center mb-3">
                {it.title}
              </h3>

              <p className="text-white/80 text-center text-sm leading-relaxed">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
