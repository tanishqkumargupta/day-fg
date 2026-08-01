import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard.jsx";
import { Link } from "react-router-dom";

const DOOM = [
  { emoji: "🌧️", title: "It will start raining. Indoors.", body: "Meteorologists will be baffled. Only you can stop this." },
  { emoji: "🍕", title: "Pizza will lose all flavor.", body: "Every slice, forever, will taste like sadness and cardboard." },
  { emoji: "🎵", title: "Every song will become a sad song.", body: "Even the happy ones. Especially the happy ones." },
  { emoji: "🔋", title: "My phone battery will die at 47% for no reason.", body: "Every single day. It's already started, honestly." },
  { emoji: "🐢", title: "WiFi will drop to dial-up speeds.", body: "Only in my house. The universe is very specific about this." },
  { emoji: "☕", title: "Coffee will stop working.", body: "I will drink three cups and still fall asleep at my desk." },
  { emoji: "📉", title: "My rizz, what little remains, will disappear entirely.", body: "Scientists will study the sudden decline for decades." },
  { emoji: "🧦", title: "I will lose one sock from every pair I own.", body: "Simultaneously. It has already been foretold." },
];

export default function SayNo() {
  const [meter, setMeter] = useState(78);

  const shake = () => setMeter((m) => Math.max(2, m - 12));

  return (
    <div className="page-shell">
      <section className="text-center">
        <p className="eyebrow mb-3">A Very Serious Warning</p>
        <h1 className="heading-display text-4xl sm:text-5xl">
          Before You Say No...
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-plum/70">
          Let me paint you a picture of the sheer, unnecessary chaos that
          would follow. This is scientifically accurate. Probably.
        </p>
      </section>

      <section className="mt-8">
        <GlassCard strong>
          <div className="flex items-center justify-between font-body text-sm font-semibold text-plum/70">
            <span>World Happiness Level</span>
            <span>{meter}%</span>
          </div>
          <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-white/60">
            <motion.div
              animate={{ width: `${meter}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={`h-full rounded-full ${meter < 20 ? "bg-plum/60" : "bg-gradient-to-r from-rose to-berry"}`}
            />
          </div>
          <button
            type="button"
            onClick={shake}
            className="mt-3 font-body text-xs font-semibold text-berry underline underline-offset-2"
          >
            tap to simulate you saying no
          </button>
        </GlassCard>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {DOOM.map((d, i) => (
          <GlassCard key={d.title} delay={i * 0.05}>
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">{d.emoji}</span>
              <div>
                <h2 className="font-display text-base font-semibold text-plum">{d.title}</h2>
                <p className="mt-1 font-body text-sm text-plum/60">{d.body}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      <section className="mt-10 flex flex-col items-center text-center">
        <p className="font-body text-plum/70">
          Anyway. No pressure. (There is immense, dramatic pressure.)
        </p>
        <Link to="/if-yes" className="btn-primary mt-4">
          Okay fine, show me what "yes" looks like
        </Link>
      </section>
    </div>
  );
}
