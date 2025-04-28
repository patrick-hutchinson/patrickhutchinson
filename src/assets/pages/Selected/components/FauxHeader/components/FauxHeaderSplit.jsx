import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FauxHeaderSplit({ string }) {
  const [shouldExit, setShouldExit] = useState(false);

  const letterVariants = {
    initial: { rotateX: 90 },
    animate: (i) => ({
      rotateX: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.05 * Math.random() },
      PointerEvent: "visible",
    }),
    exit: (i) => ({
      rotateX: -90,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.05 * Math.random() },
      PointerEvent: "none",
    }),
  };

  let Word = ({ children }) => {
    return <span className="word">{children}</span>;
  };

  let Letter = ({ letter, letterindex }) => {
    return (
      <motion.span
        className="letter"
        custom={letterindex}
        variants={letterVariants}
        initial="initial"
        animate={shouldExit ? "exit" : "animate"} // 👈 switch animation when scroll > 200px
        key={letterindex}
      >
        {letter}
      </motion.span>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShouldExit(true);
      } else {
        setShouldExit(false); // Optional: Reset if user scrolls back up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("unmounting FauxHeaderSplit");
    };
  }, []);

  return (
    <span>
      {string.split(" ").map((word, wordIndex) => (
        <Word key={wordIndex}>
          {word.split("").map((letter, letterindex) => (
            <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
          ))}
        </Word>
      ))}
    </span>
  );
}
