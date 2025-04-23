import { motion } from "framer-motion";

export default function MaskSplitText({ string }) {
  let stagger = 0.05;

  let variants = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * stagger, // delay based on letter index
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
    exit: (i) => ({
      y: "100%",
      transition: {
        duration: 0.8,
        delay: i * stagger, // match delay on exit
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  let Word = ({ children }) => {
    return <span className="word">{children}</span>;
  };

  let Letter = ({ letter, letterindex }) => {
    return (
      <span className="letter" key={letterindex}>
        {letter}
      </span>
    );
  };

  return string.split(" ").map((word, wordIndex) => (
    <Word key={wordIndex}>
      {word.split("").map((letter, letterindex) => (
        <motion.div
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ margin: "-100px 0px -100px 0px" }}
          className="textcontainer"
          key={letterindex}
        >
          <motion.div variants={variants} custom={letterindex}>
            <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
          </motion.div>
        </motion.div>
      ))}
    </Word>
  ));
}
