import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat text-white py-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl mx-auto space-y-6">
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-wider text-teal-600 drop-shadow-lg">
          Paradise Resort
        </h2>
        <p className="text-lg md:text-xl text-white/90 italic">
          Relax • Refresh • Rejuvenate
        </p>

        {/* Contact */}
        <div className="mt-4 space-y-3 flex flex-col text-sm text-white/80">
          <p className="inline-flex gap-2">
            <MapPin className="text-teal-600" /> Kerala, India
          </p>
          <p className="inline-flex gap-2">
            <Phone className="text-teal-600" /> +91 98765 43210
          </p>
          <p className="inline-flex gap-2">
            <Mail className="text-teal-600" /> contact@paradiseresort.com
          </p>
        </div>

        <div className="flex space-x-5 mt-4">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-teal-400/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.002 3.657 9.127 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.203c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33V21.878C18.343 21.127 22 17.002 22 12z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-teal-400/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.49 0-9.937 4.447-9.937 9.937 0 4.392 2.857 8.122 6.834 9.446.5.092.682-.217.682-.483 0-.238-.01-1.032-.016-1.87-2.779.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.07-.608.07-.608 1.003.071 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025a9.564 9.564 0 012.5-.336c.85.004 1.705.115 2.5.337 1.909-1.294 2.748-1.025 2.748-1.025.547 1.377.203 2.394.1 2.647.64.698 1.03 1.591 1.03 2.682 0 3.842-2.338 4.688-4.566 4.934.359.309.679.921.679 1.857 0 1.338-.012 2.419-.012 2.747 0 .269.18.58.688.482a10.005 10.005 0 006.835-9.446c0-5.49-4.447-9.937-9.937-9.937z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-teal-400/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.95-2.48 9.03 9.03 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12 12.83 12.83 0 01-9.31-4.73 4.52 4.52 0 001.39 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.48 4.48 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54 12.8 12.8 0 008.29 21c7.547 0 11.675-6.155 11.675-11.496 0-.175-.004-.349-.012-.522A8.18 8.18 0 0023 3z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-teal-400/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3H4.385C3.585 3 3 3.585 3 4.385v15.23C3 20.415 3.585 21 4.385 21h15.23c.8 0 1.385-.585 1.385-1.385V4.385C21 3.585 20.415 3 19.615 3zM8.25 17.25h-2.25v-6h2.25v6zm-1.125-6.75a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zm11.625 6.75h-2.25v-3c0-.72-.015-1.65-1-1.65-.985 0-1.135.77-1.135 1.568v3.082h-2.25v-6h2.164v.82h.03c.302-.57 1.04-1.17 2.14-1.17 2.285 0 2.705 1.5 2.705 3.448v3.902z" />
            </svg>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs text-white/60">
          © {new Date().getFullYear()} Paradise Resort. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
