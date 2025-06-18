import { motion } from "framer-motion";
import { useState } from "react";

export default function MaskSplitContainer({ children }) {
  const [isAnimating, setIsAnimating] = useState(true);

  const variants = {
    initial: { y: "150%" },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exit: {
      y: "150%",
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ margin: "-30px 0px -30px 0px", once: true }}
      className="mask-split-container"
      style={{ overflow: isAnimating ? "hidden" : "visible" }}
    >
      <motion.div
        variants={variants}
        style={{ position: "relative" }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
