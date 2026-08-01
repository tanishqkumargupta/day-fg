import { useMemo } from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", delay = 0, strong = false, as, ...rest }) {
  const MotionComp = useMemo(() => (as ? motion(as) : motion.div), [as]);
  return (
    <MotionComp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className={`${strong ? "glass-strong" : "glass"} rounded-3xl p-6 sm:p-8 ${className}`}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}
