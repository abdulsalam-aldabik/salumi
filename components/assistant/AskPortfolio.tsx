"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowUp, ArrowUpRight } from "lucide-react";
import { ask, SUGGESTIONS, type AnswerLink } from "@/lib/assistant";

interface Msg {
  role: "user" | "bot";
  text: string;
  links?: AnswerLink[];
  typing?: boolean;
}

const GREETING: Msg = {
  role: "bot",
  text:
    "Hi, I'm Salumi's portfolio assistant. Ask me about his ML work, projects, the Smart NV internship, or how to get in touch.",
};

export function AskPortfolio() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    const a = ask(q);
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      { role: "bot", text: a.text, links: a.links, typing: true },
    ]);
    setInput("");
  };

  const showSuggestions = messages.filter((m) => m.role === "user").length === 0;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface/90 px-4 py-3 text-sm font-medium text-ink shadow-lg backdrop-blur-md transition-colors hover:border-gold"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ y: -2 }}
            aria-label="Ask my portfolio"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            Ask my portfolio
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex max-h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-base shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Ask my portfolio"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-solid/15 text-gold">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-ink">Ask my portfolio</p>
                  <p className="font-mono text-[10px] text-muted">answers from my real work</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-muted transition-colors hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gold-solid px-3.5 py-2 text-sm text-ongold">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-line bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink">
                      {m.typing ? (
                        <TypedText text={m.text} links={m.links} />
                      ) : (
                        <>
                          <span>{m.text}</span>
                          {m.links && <LinkRow links={m.links} />}
                        </>
                      )}
                    </div>
                  </div>
                )
              )}

              {showSuggestions && (
                <div className="space-y-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-line bg-surface px-3 py-2 text-left text-sm text-muted transition-colors hover:border-gold/50 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-surface px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about my work…"
                className="flex-1 rounded-full border border-line bg-base px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold-solid text-ongold transition-transform hover:scale-105 disabled:opacity-40"
                disabled={!input.trim()}
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LinkRow({ links }: { links: AnswerLink[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {links.map((l) => (
        <a
          key={l.href + l.label}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold-solid/10 px-2.5 py-1 text-xs font-medium text-gold transition-colors hover:bg-gold-solid/20"
        >
          {l.label}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      ))}
    </div>
  );
}

function TypedText({ text, links }: { text: string; links?: AnswerLink[] }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = text.split(" ");
    if (reduced) {
      setCount(words.length);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= words.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 28);
    return () => clearInterval(id);
  }, [text]);

  return (
    <>
      <span>{text.split(" ").slice(0, count).join(" ")}</span>
      {done && links && <LinkRow links={links} />}
    </>
  );
}
