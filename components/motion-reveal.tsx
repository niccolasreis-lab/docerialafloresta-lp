"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function MotionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
