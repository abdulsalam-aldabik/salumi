"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";


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
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image was already in the browser cache it may load before React
  // attaches the onLoad handler, so the event never fires. Checking
  // img.complete after mount catches that case.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);
  return (
    <figure className="card overflow-hidden">
      <div className={`relative ${aspect} bg-surface2`}>
        {/* Placeholder shown until the real image loads */}
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
          ref={imgRef}
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
