export default function Footer() {
  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat text-white py-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold tracking-wide">Paradise Resort</h2>
        <p className="mt-2 text-lg opacity-90">
          Relax • Refresh • Rejuvenate
        </p>

        {/* Contact */}
        <div className="mt-6 space-y-1 text-sm opacity-90">
          <p>📍 Kerala, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ contact@paradiseresort.com</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6">
          {["facebook", "instagram", "twitter", "youtube"].map((icon) => (
            <a
              key={icon}
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 hover:bg-white/20 transition"
            >
              <img
                src={`/icons/${icon}.svg`}
                className="w-5 h-5 invert"
                alt={icon}
              />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs opacity-70">
          © {new Date().getFullYear()} Paradise Resort. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
