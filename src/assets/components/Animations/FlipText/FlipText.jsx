import { motion } from "framer-motion";

export default function FlipText({ string }) {
  const letterVariants = {
    initial: { rotateX: 90 },
    animate: (i) => ({
      rotateX: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.05 * Math.random() },
    }),
    exit: (i) => ({
      rotateX: -90,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.05 * Math.random() }, // Added delay here
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
        animate="animate"
        exit="exit"
        key={letterindex}
      >
        {letter}
      </motion.span>
    );
  };

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
