"use client";

import { motion } from "framer-motion";
import {
  Camera,
  ScanSearch,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Boxes,
  MapPin,
  Building2,
  CalendarDays,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { InternshipHeader } from "./InternshipHeader";
import { Shot } from "./Shot";
import { DocLink } from "./DocLink";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

const steps = [
  {
    icon: Camera,
    title: "Capture the board",
    text: "You point the phone at the board and take a frame, the same as a normal photo.",
  },
  {
    icon: ScanSearch,
    title: "Detect the pieces",
    text: "The model finds every piece in the image and reads its colour and its position on the board grid.",
  },
  {
    icon: Wand2,
    title: "Solve the state",
    text: "A solver takes the current board state and works out where the remaining pieces fit.",
  },
  {
    icon: Boxes,
    title: "Show the answer",
    text: "The solution is rendered on the digital board in 3D, in a clean top-down view that's easy to follow.",
  },
];

const features = [
  {
    icon: Lightbulb,
    title: "Hints",
    text: "Stuck on the next move? The app highlights one piece at a time, so you still solve most of the board yourself.",
  },
  {
    icon: Sparkles,
    title: "Solve",
    text: "Short on time? It reveals the full solution, with every piece shown in its correct cell.",
  },
  {
    icon: CheckCircle2,
    title: "Validate",
    text: "Not sure a piece is right? It reads the board and flags which placements are correct and which aren't.",
  },
];

const techStack = [
  "Computer Vision",
  "YOLO segmentation",
  "Blender (synthetic training images)",
  "Roboflow (real-data annotation)",
  "Python",
  "PyTorch / Ultralytics",
  "React",
  "TypeScript",
  "Three.js (3D)",
  "ONNX Runtime Web (on-device)",
  "Vite",
];

export function InternshipContent() {
  return (
    <main className="min-h-screen bg-base">
      <InternshipHeader />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="glow-warm pointer-events-none absolute inset-x-0 top-0 h-[55vh] opacity-70" />
        <div className="shell relative z-10">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Internship · Smart NV · 2026
          </motion.p>

          <motion.h1
            className="display max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            I taught a phone to{" "}
            <span className="italic text-gold">solve a puzzle</span>.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            For my internship I built{" "}
            <strong className="text-ink">IQ Noodles</strong>, a web app that
            reads a physical puzzle through a phone camera. It detects each
            piece, maps where the pieces sit on the board, and computes the
            placements needed to finish the game. From there it can suggest the
            next move, reveal a full solution, or check the pieces you have
            already placed.
          </motion.p>

          <motion.div
            className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
          >
            <Meta icon={Building2} label="Company" value="Smart NV" />
            <Meta icon={CalendarDays} label="When" value="23 Feb – 22 May 2026" />
            <Meta icon={MapPin} label="Where" value="Kontich, Belgium" />
          </motion.div>
        </div>
      </section>

      {/* ── Summary / abstract ──────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">Summary</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              IQ Noodles: a camera that reads a puzzle.
            </h2>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16"
          >
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Over a three-month internship at Smart NV, I designed and
                delivered <span className="text-ink">IQ Noodles</span>, a
                camera-based assistant for a physical IQ puzzle. The app detects
                the pieces, works out where each one belongs on the board, and
                helps the player complete it. I owned the full assignment:{" "}
                <span className="text-ink">
                  training the computer-vision model
                </span>{" "}
                that detects the pieces, and{" "}
                <span className="text-ink">building the web app</span> that runs
                it.
              </p>
              <p>
                Hand-labelling real photos would have taken weeks, so I built a
                synthetic dataset instead. I rendered thousands of
                automatically-labelled images of the puzzle in 3D, trained the
                model on those, then fine-tuned it on a smaller set of real
                photos so it held up under real lighting and camera angles. The
                finished app runs entirely in the browser on the user&apos;s
                device, and can hint, solve, or validate the board.
              </p>
            </div>
            <div className="card divide-y divide-line self-start">
              <SummaryRow k="Assignment" v="Computer-vision puzzle assistant" />
              <SummaryRow k="My role" v="CV model training & web app development" />
              <SummaryRow k="Company" v="Smart NV, Kontich (BE)" />
              <SummaryRow k="Duration" v="23 Feb – 22 May 2026" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The challenge ────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <motion.div {...reveal}>
            <p className="eyebrow mb-4">01 — The idea</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              A simple-looking puzzle with a huge number of arrangements.
            </h2>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="space-y-5 text-lg leading-relaxed text-muted"
          >
            <p>
              IQ Noodles is a single-player game by SmartGames: a board of
              twenty-one metal pins and eleven uniquely shaped, colour-coded
              &ldquo;noodle&rdquo; pieces that thread around the pins instead of
              filling a grid. The pieces look similar and there are countless
              ways to route them, so players get stuck or place one slightly
              wrong without noticing.
            </p>
            <p>
              Smart NV wanted to find out whether a phone could handle the hard
              part: read the board, work out its current state, and guide the
              player from there. It was a team project across three SmartGames
              titles, and I owned IQ Noodles end to end, from{" "}
              <span className="text-ink">
                training the model that detects the pieces
              </span>{" "}
              to <span className="text-ink">building the app people use</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">02 — How it works</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              From a photo to a solution in{" "}
              <span className="italic text-gold">four steps</span>.
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="card card-hover relative p-6"
                >
                  <span className="font-mono text-xs text-gold">
                    0{i + 1}
                  </span>
                  <span className="mt-4 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-gold-solid/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 font-display text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Screenshots ──────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="shell">
          <motion.div {...reveal} className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">03 — See it in action</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              The app, on a real puzzle.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              A few moments from the working app, from pointing the camera at the
              board to the solved layout rendered back over it.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <Shot
              src="/internship/scan.jpg"
              alt="Pointing the camera at the board"
              caption="Point & capture"
            />
            <Shot
              src="/internship/detected.jpg"
              alt="Pieces recognised"
              caption="Pieces recognised"
            />
            <Shot
              src="/internship/solution.jpg"
              alt="Solution shown in 3D"
              caption="Solution in 3D"
            />
            <Shot
              src="/internship/validate.jpg"
              alt="Checking the placements"
              caption="Placements checked"
            />
          </motion.div>
          <p className="mt-4 font-mono text-[11px] text-muted/70">
            Screenshots load automatically once added to{" "}
            <span className="text-muted">/public/internship/</span>.
          </p>
        </div>
      </section>

      {/* ── Teaching it to see ───────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <motion.div {...reveal} className="space-y-5 text-lg leading-relaxed text-muted">
            <p className="eyebrow !mb-2">04 — The tricky part</p>
            <h2 className="display mb-4 text-[clamp(1.9rem,4vw,3rem)] text-ink">
              Teaching the model to recognise the pieces.
            </h2>
            <p>
              Telling these small, similar pieces apart is hard for a model,
              especially across changing lighting, angles and shadows. The usual
              approach is to photograph and hand-label thousands of real boards,
              which takes weeks.
            </p>
            <p>
              Instead, I had the pipeline{" "}
              <span className="text-ink">generate its own training data</span>.
              Using Blender, I rendered thousands of realistic images of the
              puzzle, each one labelled automatically with the position of every
              piece. The model learned from those renders, then I fine-tuned it
              on a smaller batch of real photos so it stayed accurate outside the
              simulation.
            </p>
            <p>
              The recognition runs{" "}
              <span className="text-ink">on the phone itself, in the browser</span>
              , using ONNX Runtime Web. No server does the work, so it stays fast
              and private to the user.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="card divide-y divide-line self-start"
          >
            <Fact big="0.94" small="Mask mAP@0.5 on real phone photos (synthetic-to-real model)" />
            <Fact big="800×" small="Faster solving after the right search heuristic (24s to 30ms)" />
            <Fact big="On-device" small="Inference in the browser, no server required" />
            <Fact big="2 phases" small="Synthetic pre-training, then fine-tuning on real photos" />
          </motion.div>
        </div>
      </section>

      {/* ── What it does for you ─────────────────────────────── */}
      <section className="section bg-surface">
        <div className="shell">
          <motion.div {...reveal} className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">05 — What it does</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              Three ways it helps the player.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="card card-hover p-7"
                >
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-solid text-ongold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 font-display text-2xl text-ink">
                    {f.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{f.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bonus: Deluxe ────────────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="card overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col justify-center gap-4 border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
                <span className="chip w-fit !border-gold/40 !bg-gold-solid/15 text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Bonus project
                </span>
                <h2 className="display text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink">
                  IQ Square <span className="italic text-gold">Deluxe</span>
                </h2>
                <p className="leading-relaxed text-muted">
                  With IQ Noodles done ahead of schedule, I took on a second
                  SmartGames puzzle and built it on a cleaner architecture.
                </p>
              </div>
              <div className="space-y-5 p-8 text-muted md:p-10">
                <p className="leading-relaxed">
                  IQ Square is a different puzzle: a grid of interlocking{" "}
                  <span className="text-ink">block pieces</span> rather than
                  noodles around pins. I reused the same{" "}
                  <span className="text-ink">vision pipeline</span> (YOLO
                  segmentation, board localization and colour classification)
                  and rebuilt everything as a proper monorepo, splitting it into
                  separate packages: the{" "}
                  <span className="text-ink">puzzle logic</span>, the{" "}
                  <span className="text-ink">vision</span>, the shared{" "}
                  <span className="text-ink">types</span> and the{" "}
                  <span className="text-ink">interface</span>, each building and
                  testing on its own.
                </p>
                <p className="leading-relaxed">
                  It showed the vision approach generalises beyond one game, and
                  left a structure a team could keep building on rather than a
                  one-off prototype.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Under the hood ───────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="shell">
          <motion.div {...reveal} className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">06 — Under the hood</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              For the curious.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The main tools and technologies I used to build and train it.
            </p>
          </motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mandatory documents ─────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">07 — Documentation</p>
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-ink">
              Internship documents.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The official documents for the internship assignment. Each opens
              as a PDF in a new tab.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <DocLink
              href="/internship/docs/project-plan.pdf"
              label="Project Plan"
              description="Scope, goals & approach"
            />
            <DocLink
              href="/internship/docs/realization-thesis.pdf"
              label="Realization (Thesis)"
              description="Full 5W1H write-up"
            />
            <DocLink
              href="/internship/docs/reflection.pdf"
              label="Reflection"
              description="What I learned & take away"
            />
          </motion.div>
        </div>
      </section>

      {/* ── CTA / footer ─────────────────────────────────────── */}
      <section className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="grain card glow-warm relative overflow-hidden p-10 text-center md:p-16">
            <h2 className="display relative z-10 mx-auto max-w-2xl text-[clamp(1.9rem,4vw,3.25rem)] text-ink">
              Want the full breakdown?
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m happy to walk through how IQ Noodles works, or talk about
              what to build next.
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
              <a href="/#contact" className="btn btn-solid">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/" className="btn btn-outline">
                Back to portfolio
              </a>
            </div>
          </motion.div>

          <p className="mt-12 text-center font-mono text-xs text-muted">
            Internship at Smart NV · Neerveld 14, 2550 Kontich · 23 Feb – 22 May 2026
          </p>
        </div>
      </section>
    </main>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold-solid/10 text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="block truncate text-ink">{value}</span>
      </span>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-6 py-4">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
        {k}
      </span>
      <span className="text-right text-sm text-ink">{v}</span>
    </div>
  );
}

function Fact({ big, small }: { big: string; small: string }) {
  return (
    <div className="flex items-baseline gap-4 px-6 py-5">
      <span className="w-28 flex-shrink-0 font-display text-3xl text-gold md:text-4xl">
        {big}
      </span>
      <span className="text-sm leading-relaxed text-muted">{small}</span>
    </div>
  );
}
