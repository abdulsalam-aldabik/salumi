"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Clock } from "lucide-react";

/**
 * A download card for a mandatory internship document.
 * On mount it checks whether the PDF exists (HEAD request). If present, it
 * renders as a real download link that opens in a new tab; if not, it shows a
 * tidy "pending" state so the section always looks intentional to the jury.
 * Drop the file at `public{href}` to activate it.
 */
export function DocLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch(href, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        // A real PDF returns 200 + a pdf/octet content-type; a dev-server 404
        // fallback returns HTML, so guard against that.
        if (active) setAvailable(res.ok && !type.includes("text/html"));
      })
      .catch(() => active && setAvailable(false));
    return () => {
      active = false;
    };
  }, [href]);

  const content = (
    <>
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-line ${
          available ? "bg-gold-solid/10 text-gold" : "text-muted"
        }`}
      >
        <FileText className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg text-ink">{label}</span>
        <span className="block text-sm text-muted">{description}</span>
      </span>
      {available ? (
        <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-medium text-gold">
          <Download className="h-4 w-4" />
          PDF
        </span>
      ) : (
        <span className="inline-flex flex-shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          <Clock className="h-3.5 w-3.5" />
          {available === null ? "…" : "Pending"}
        </span>
      )}
    </>
  );

  if (available) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover flex items-center gap-4 p-5"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="card flex items-center gap-4 p-5 opacity-70">{content}</div>
  );
}
