import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard.jsx";
import { CONFIG } from "../data/config.js";

const POINTS = [
  {
    title: "What I got wrong",
    body:
      "I let my mood, my ego, or just plain carelessness get in the way of being the person you deserve in that moment. You didn't deserve that, and I'm not going to explain it away.",
  },
  {
    title: "What I promise",
    body:
      "I'll listen before I react, say sorry without turning it into an argument, and actually change the thing that hurt you — not just apologize and repeat it.",
  },
  {
    title: "What I need you to know",
    body:
      `You are still the best thing that has happened to me. Nothing about how I feel for you changed — I just handled it badly, and that's on me, not us.`,
  },
];

export default function Sorry() {
  const [forgiven, setForgiven] = useState(false);
  const [dodgeStyle, setDodgeStyle] = useState({});
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodge = () => {
    const x = (Math.random() - 0.5) * 220;
    const y = (Math.random() - 0.5) * 80;
    setDodgeStyle({ transform: `translate(${x}px, ${y}px)` });
    setDodgeCount((c) => c + 1);
  };

  return (
    <div className="page-shell">
      <section className="text-center">
        <p className="eyebrow mb-3">A Letter</p>
        <h1 className="heading-display text-4xl sm:text-5xl">I'm sorry, {CONFIG.partnerName}.</h1>
        <p className="mx-auto mt-4 max-w-md font-body text-plum/70">
          Not the quick, throwaway kind of sorry. The kind where I actually
          sat down and thought about what I need to say.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        {POINTS.map((p, i) => (
          <GlassCard key={p.title} delay={i * 0.08}>
            <h2 className="font-display text-xl font-semibold text-berry">{p.title}</h2>
            <p className="mt-2 font-body leading-relaxed text-plum/80">{p.body}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mt-12 flex flex-col items-center">
        {!forgiven ? (
          <>
            <p className="mb-5 font-body text-plum/70">Well... forgive me?</p>
            <div className="relative flex h-32 w-full max-w-sm items-center justify-center gap-4">
              <button type="button" onClick={() => setForgiven(true)} className="btn-primary">
                Yes, I forgive you 💗
              </button>
              <motion.button
                type="button"
                onMouseEnter={dodge}
                onClick={dodge}
                animate={dodgeStyle}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="btn-secondary"
              >
                Not yet
              </motion.button>
            </div>
            {dodgeCount > 2 && (
              <p className="mt-4 font-body text-xs text-berry/60">
                it's going to keep running, just so you know 🏃‍♂️
              </p>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl px-8 py-6 text-center"
          >
            <p className="font-display text-2xl text-berry">Thank you 🥹</p>
            <p className="mt-2 font-body text-plum/70">
              I love you. I'll keep earning that forgiveness, not just this
              once.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
