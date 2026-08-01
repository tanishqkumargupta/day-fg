/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FFF7FA",
        petal: "#FFB6D0",
        rose: "#E85D8A",
        berry: "#C93B67",
        lavenderpink: "#F3D7E8",
        plum: "#3B2438",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Quicksand'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(201, 59, 103, 0.15)",
      },
      backdropBlur: {
        glass: "16px",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-110vh) translateX(var(--drift, 20px)) rotate(20deg)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floatUp: "floatUp linear infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
