import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/sorry", label: "I'm Sorry" },
  { to: "/reasons", label: "100 Reasons" },
  { to: "/if-no", label: "If You Say No" },
  { to: "/if-yes", label: "If You Say Yes" },
  { to: "/chat", label: "Talk To Me" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 pt-4 sm:px-8">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 font-display text-base font-semibold text-berry"
        >
          <span aria-hidden="true">💗</span>
          Girlfriend Day
        </NavLink>

        {/* desktop links */}
        <nav className="glass-strong hidden items-center gap-1 rounded-full p-1.5 sm:flex">
          {LINKS.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-rose text-white shadow-glass"
                    : "text-plum/70 hover:bg-white/60 hover:text-berry"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-berry sm:hidden"
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="relative block h-3.5 w-4">
            <span className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-berry transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-berry transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-berry transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-4 mt-2 flex flex-col gap-1 rounded-3xl p-3 sm:hidden"
          >
            {LINKS.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 font-body text-sm font-semibold transition-colors ${
                    isActive ? "bg-rose text-white" : "text-plum/70 hover:bg-white/60 hover:text-berry"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
