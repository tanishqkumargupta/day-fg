import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard.jsx";
import { REASONS } from "../data/reasons.js";

export default function Reasons() {
  const [spotlightIndex, setSpotlightIndex] = useState(() =>
    Math.floor(Math.random() * REASONS.length)
  );
  const [revealAll, setRevealAll] = useState(false);

  const shuffle = () => {
    let next = Math.floor(Math.random() * REASONS.length);
    if (REASONS.length > 1 && next === spotlightIndex) {
      next = (next + 1) % REASONS.length;
    }
    setSpotlightIndex(next);
  };

  return (
    <div className="page-shell">
      <section className="text-center">
        <p className="eyebrow mb-3">Reason #{spotlightIndex + 1} of {REASONS.length}</p>
        <h1 className="heading-display text-4xl sm:text-5xl">100 Reasons I Love You</h1>
        <p className="mx-auto mt-4 max-w-md font-body text-plum/70">
          I promise I tried to keep this short. I failed almost immediately.
        </p>
      </section>

      <section className="mt-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={spotlightIndex}
            initial={{ opacity: 0, y: 16, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -16, rotate: 1 }}
            transition={{ duration: 0.35 }}
            className="glass-strong w-full max-w-md rounded-3xl p-8 text-center"
          >
            <span className="mb-3 block text-3xl" aria-hidden="true">💗</span>
            <p className="font-display text-xl italic leading-relaxed text-plum">
              {REASONS[spotlightIndex]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={shuffle} className="btn-primary">
            Give me another reason
          </button>
          <button type="button" onClick={() => setRevealAll((v) => !v)} className="btn-secondary">
            {revealAll ? "Hide the full list" : "See all 100"}
          </button>
        </div>
      </section>

      <AnimatePresence>
        {revealAll && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 overflow-hidden"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {REASONS.map((reason, i) => (
                <GlassCard key={reason} delay={Math.min(i * 0.01, 0.3)} className="!p-4">
                  <p className="font-body text-sm text-plum/80">
                    <span className="mr-2 font-display font-semibold text-berry">
                      {i + 1}.
                    </span>
                    {reason}
                  </p>
                </GlassCard>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
