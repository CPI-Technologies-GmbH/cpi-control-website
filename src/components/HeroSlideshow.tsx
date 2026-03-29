"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { key: "dashboard", label: "Dashboard", src: "/screenshots/01-dashboard.png" },
  { key: "services", label: "Services", src: "/screenshots/02-services.png" },
  { key: "deployments", label: "Deployments", src: "/screenshots/05-deployments.png" },
  { key: "projects", label: "Projects", src: "/screenshots/04-project-detail.png" },
  { key: "incidents", label: "Incidents", src: "/screenshots/06-incidents.png" },
  { key: "settings", label: "Settings", src: "/screenshots/07-integrations.png" },
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full">
      {/* Tab navigation */}
      <div className="flex items-center gap-1 mb-4">
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all ${
              i === active
                ? "bg-gray-800/80 text-white border-t border-x border-gray-700/40"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Screenshot display */}
      <div className="relative rounded-xl border border-gray-700/40 bg-gray-900 shadow-2xl shadow-black/60 overflow-hidden">
        {/* macOS title bar */}
        <div className="flex items-center gap-[6px] px-3 py-[6px] bg-gray-800/60 border-b border-gray-700/20">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div>

        <div className="relative aspect-[16/9.5] overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.key}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                className="object-cover object-top"
                quality={95}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{
              width: "100%",
              animation: "progress 4s linear infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
