import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard.jsx";
import { CONFIG } from "../data/config.js";

const NAV_CARDS = [
  { to: "/sorry", emoji: "🥺", title: "I'm Sorry", blurb: "A few things I needed to say properly." },
  { to: "/reasons", emoji: "📜", title: "100 Reasons I Love You", blurb: "I tried to stop at ten. I couldn't." },
  { to: "/if-no", emoji: "🎭", title: "If You Say No", blurb: "A completely dramatic, unserious warning." },
  { to: "/if-yes", emoji: "🌸", title: "If You Say Yes", blurb: "Here's everything I'm planning for us." },
  { to: "/chat", emoji: "💬", title: "Talk To Me", blurb: "For when reading isn't enough — ask me anything." },
];

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="page-shell">
      <section className="flex flex-col items-center text-center">
        <p className="eyebrow mb-4">Happy Girlfriend Day</p>

        {/* Signature moment: a wax-sealed love note that opens on tap */}
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          disabled={opened}
          className="group relative mb-8 h-40 w-56 sm:h-48 sm:w-64"
          style={{ perspective: 800 }}
          aria-label="Open the letter"
        >
          <motion.div
            className="glass-strong absolute inset-0 rounded-2xl"
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            animate={{ rotateX: opened ? -165 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-2xl bg-gradient-to-b from-petal to-rose"
          />
          <motion.div
            initial={false}
            animate={{ scale: opened ? 1.1 : 1, opacity: opened ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-berry text-lg text-white shadow-glass"
          >
            💌
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-base italic text-berry"
          >
            "Every version of today, I'd still pick you."
          </motion.p>
          {!opened && (
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-body text-xs font-semibold text-berry/70">
              tap to open
            </span>
          )}
        </motion.button>

        <h1 className="heading-display text-4xl leading-tight sm:text-5xl">
          For {CONFIG.partnerName}, <br className="sm:hidden" />
          on Girlfriend Day
        </h1>
        <p className="mt-4 max-w-md font-body text-plum/70">
          I made you a whole little website because a text felt too small for
          how much I love you. Take your time here — every page is for you.
        </p>
        {CONFIG.sinceDate && (
          <p className="mt-2 font-body text-sm text-berry/70">
            Together since {CONFIG.sinceDate} 💗
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/reasons" className="btn-primary">
            See 100 reasons I love you
          </Link>
          <Link to="/chat" className="btn-secondary">
            Talk to me instead
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2">
        {NAV_CARDS.map((card, i) => (
          <GlassCard key={card.to} delay={i * 0.06} as={Link} to={card.to} className="group block">
            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">{card.emoji}</span>
              <div>
                <h2 className="font-display text-lg font-semibold text-plum group-hover:text-berry">
                  {card.title}
                </h2>
                <p className="mt-1 font-body text-sm text-plum/60">{card.blurb}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
