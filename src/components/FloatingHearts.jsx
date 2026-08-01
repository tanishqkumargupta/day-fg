import { useMemo } from "react";

const HEART_COLORS = ["#FFB6D0", "#E85D8A", "#F3D7E8", "#C93B67"];

function makeHearts(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 18,
    duration: 9 + Math.random() * 10,
    delay: Math.random() * 12,
    drift: (Math.random() - 0.5) * 120,
    color: HEART_COLORS[i % HEART_COLORS.length],
    opacity: 0.35 + Math.random() * 0.4,
  }));
}

/**
 * Ambient, decorative, non-interactive floating hearts.
 * Fixed to viewport so it drifts gently behind every page.
 */
export default function FloatingHearts({ count = 16 }) {
  const hearts = useMemo(() => makeHearts(count), [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-10vh] animate-floatUp"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            "--drift": `${h.drift}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          <svg viewBox="0 0 32 29" width="100%" height="100%" fill={h.color}>
            <path d="M16 29 C6 21 0 15 0 8.5 C0 3.8 3.8 0 8.5 0 C11.6 0 14.2 1.7 16 4.2 C17.8 1.7 20.4 0 23.5 0 C28.2 0 32 3.8 32 8.5 C32 15 26 21 16 29Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
