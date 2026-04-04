"use client";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0b1120]/95 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex flex-col gap-3">
          <a href="#problems" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Why</a>
          <a href="#features" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Features</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Pricing</a>
          <a href="/blog" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Blog</a>
          <a href="/changelog" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Changelog</a>
          <a href="/account" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-sm font-medium py-2 transition-colors">Account</a>
        </div>
      )}
    </div>
  );
}
