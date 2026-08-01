import GlassCard from "../components/GlassCard.jsx";
import { Link } from "react-router-dom";
import { CONFIG } from "../data/config.js";

const PLANS = [
  { emoji: "🍳", title: "Lazy Sunday breakfasts", body: "Just us, bad coffee, and no plans until noon." },
  { emoji: "🎬", title: "A ridiculous movie marathon", body: "Your picks, my snacks, zero judgment either way." },
  { emoji: "✈️", title: "That trip we keep talking about", body: "The one with the place you keep sending me photos of." },
  { emoji: "🏡", title: "A home that actually feels like ours", body: "Even if it's tiny. Even if the WiFi is bad." },
  { emoji: "🎂", title: "Never missing a birthday again", body: "Cake, candles, and me being annoyingly extra about it." },
  { emoji: "🐾", title: "Getting a pet we'll both spoil", body: "And then argue lovingly about who they love more." },
  { emoji: "📸", title: "A wall covered in our photos", body: "The blurry ones too. Especially the blurry ones." },
  { emoji: "🌙", title: "A thousand more ordinary nights", body: "Nothing special happening — just you, me, and that's enough." },
];

export default function SayYes() {
  return (
    <div className="page-shell">
      <section className="text-center">
        <p className="eyebrow mb-3">If You Say Yes</p>
        <h1 className="heading-display text-4xl sm:text-5xl">
          Here's Everything I'm Planning For Us
        </h1>
        <p className="mx-auto mt-4 font-body text-plum/70 max-w-md">
          No pressure, no drama this time — just the honest, soft version of
          what I want our future to look like, {CONFIG.partnerName}.
        </p>
      </section>

      <section className="relative mt-12">
        <div
          aria-hidden="true"
          className="absolute left-5 top-2 hidden h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-petal via-rose to-berry/40 sm:block"
        />
        <div className="space-y-4 sm:pl-14">
          {PLANS.map((plan, i) => (
            <div key={plan.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-14 top-6 hidden h-4 w-4 rounded-full border-2 border-white bg-rose shadow-glass sm:block"
              />
              <GlassCard delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">{plan.emoji}</span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-plum">{plan.title}</h2>
                    <p className="mt-1 font-body text-sm text-plum/60">{plan.body}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col items-center text-center">
        <GlassCard strong className="max-w-md">
          <p className="font-display text-xl italic text-berry">
            "So — yes?"
          </p>
          <p className="mt-2 font-body text-sm text-plum/60">
            Come tell me in person. Or through the chat, if you're shy. 💗
          </p>
          <Link to="/chat" className="btn-primary mt-5 inline-flex">
            Talk to me
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
