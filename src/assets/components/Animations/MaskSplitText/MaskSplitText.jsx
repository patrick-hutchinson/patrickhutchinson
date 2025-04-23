import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./MaskSplitText.module.css";

export default function MaskSplitText({ content, href }) {
  let variants = {
    initial: { y: "100%" },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exit: {
      y: "100%",
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ margin: "-100px 0px -100px 0px" }}
      className={styles.textcontainer}
    >
      <motion.div variants={variants}>{content}</motion.div>
    </motion.div>
  );
}
