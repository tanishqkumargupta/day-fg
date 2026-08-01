import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { isGeminiConfigured, sendMessageToGemini } from "../lib/gemini.js";
import { CONFIG } from "../data/config.js";

const OPENING_LINE = `Hii ${CONFIG.partnerName} 💗 I set this up so you could talk to "me" anytime you want. What's up?`;

export default function Chat() {
  const configured = isGeminiConfigured();
  const [messages, setMessages] = useState([
    { role: "model", text: OPENING_LINE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const reply = await sendMessageToGemini(nextMessages);
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="page-shell !pb-40">
      <section className="text-center">
        <p className="eyebrow mb-3">Talk To Me</p>
        <h1 className="heading-display text-4xl sm:text-5xl">Chat With {CONFIG.yourName}</h1>
        <p className="mx-auto mt-4 max-w-md font-body text-plum/70">
          For the days you want a reply right now, not just a page you scroll
          through.
        </p>
      </section>

      {!configured && (
        <div className="glass-strong mt-8 rounded-3xl p-6 text-center">
          <p className="font-display text-lg font-semibold text-berry">Chat isn't set up yet</p>
          <p className="mt-2 font-body text-sm text-plum/70">
            Add a <code className="rounded bg-white/60 px-1.5 py-0.5">VITE_GEMINI_API_KEY</code> to
            your <code className="rounded bg-white/60 px-1.5 py-0.5">.env</code> file (get a free key
            from Google AI Studio) and restart the dev server or redeploy. See the README for the
            two-minute setup.
          </p>
        </div>
      )}

      <section
        ref={scrollRef}
        className="glass-strong mt-8 flex h-[55vh] min-h-[360px] flex-col gap-3 overflow-y-auto rounded-3xl p-4 sm:p-6"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed sm:text-base ${
                m.role === "user"
                  ? "bg-rose text-white"
                  : "bg-white/70 text-plum"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-white/70 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-berry/60"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-white/70 px-4 py-2.5 font-body text-sm text-berry">
            {error}
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-blush via-blush/95 to-transparent px-4 pb-6 pt-8 sm:px-8">
        <div className="glass-strong mx-auto flex max-w-3xl items-end gap-2 rounded-3xl p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={!configured}
            placeholder={configured ? "Type something..." : "Chat needs an API key first"}
            className="max-h-28 flex-1 resize-none bg-transparent px-3 py-2.5 font-body text-sm text-plum placeholder:text-plum/40 focus:outline-none sm:text-base"
          />
          <button
            type="button"
            onClick={send}
            disabled={!configured || loading || !input.trim()}
            className="btn-primary !px-5 !py-3 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
