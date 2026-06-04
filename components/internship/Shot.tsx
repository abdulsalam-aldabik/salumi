"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

/**
 * Displays a screenshot from /public/internship/.
 * The image is layered over a placeholder and only fades in once it has
 * actually loaded — so a missing file simply leaves the tidy placeholder
 * visible (no broken-image icon). Drop a file at `public{src}` to fill it.
 */
export function Shot({
  src,
  alt,
  caption,
  aspect = "aspect-[9/16]",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="card overflow-hidden">
      <div className={`relative ${aspect} bg-surface2`}>
        {/* Placeholder (always rendered underneath) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-gold">
            <ImageIcon className="h-6 w-6" />
          </span>
          <span className="font-mono text-[11px] uppercase leading-tight tracking-wider text-muted">
            {alt}
          </span>
        </div>

        {/* Real image — fades in only when it successfully loads */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {caption && (
        <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
