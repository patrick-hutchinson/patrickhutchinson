import React from "react";
import { motion } from "framer-motion";

export default function MaskSplitText({ children }) {
  const stagger = 0.0;

  const variants = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * stagger,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
    exit: (i) => ({
      y: "100%",
      transition: {
        duration: 0.8,
        delay: i * stagger,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  let renderText = (node, wordIndex = 0) => {
    if (typeof node === "string") {
      return node.split(" ").map((word, wIdx) => (
        <span className="word" key={`${wordIndex}-${wIdx}`}>
          {word.split("").map((letter, lIdx) => (
            <motion.span
              key={`${wordIndex}-${wIdx}-${lIdx}`}
              initial="initial"
              whileInView="animate"
              exit="exit"
              viewport={{ margin: "-10px 0px -10px 0px", once: true }}
              className="textcontainer"
              custom={lIdx}
              variants={variants}
            >
              <motion.div variants={variants}>
                <span className="letter">{letter}</span>
              </motion.div>
            </motion.span>
          ))}
        </span>
      ));
    }

    if (React.isValidElement(node)) {
      if (node.type === "br") {
        return <br key={`br-${wordIndex}`} />;
      }

      return React.cloneElement(node, {
        key: `jsx-${wordIndex}`,
        children: React.Children.map(node.props.children, (child) => renderText(child, wordIndex + 1)),
      });
    }

    // If it's something else (like null, boolean, number), just return it
    return node;
  };

  return <div>{React.Children.map(children, (child) => renderText(child))}</div>;
}
