import React, { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import { motion } from "framer-motion";

import styles from "./About.module.css";
import ImageTrail from "assets/components/ImageTrail/ImageTrial";

import { useNavigate } from "react-router-dom";

export default function About() {
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parentRef = useRef();
  const aboutRef = useRef(null);
  const wordsRef = useRef([]);

  const navigate = useNavigate();

  const [about, setAbout] = useState(() => {
    // Check localStorage once during initial state setup
    const cachedData = localStorage.getItem("about");
    return cachedData ? JSON.parse(cachedData) : 0;
  });

  // Fetch data from Sanity
  useEffect(() => {
    if (!about) {
      sanityClient
        .fetch(
          `*[_type=="about"]{
        biography,
      }`
        )
        .then((fetchedData) => {
          localStorage.setItem("about", JSON.stringify(fetchedData));
          setAbout(fetchedData);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  // Handle loading or error state
  if (!about) return;

  // Split text into words for individual animation
  const text = about[0]?.biography[0]?.children[0]?.text || ""; // Example: Accessing the first block
  const words = text.split(" ");

  const letterVariants = {
    initial: { rotateX: 90 },
    animate: (i) => ({
      rotateX: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.1 * Math.random() },
    }),
    exit: (i) => ({
      rotateX: -90,
      transition: { duration: 0.4, ease: "easeInOut", delay: i * 0.1 * Math.random() }, // Added delay here
    }),
  };

  return (
    <div className={styles.container} ref={parentRef}>
      <div className={styles.biographyText} ref={aboutRef}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word" ref={(el) => (wordsRef.current[wordIndex] = el)}>
            {word.split("").map((letter, letterIndex) => (
              <span key={`letter-${wordIndex}-${letterIndex}`} className="letter">
                <motion.span
                  className={styles.letterFront}
                  custom={letterIndex} // pass the index to the variant
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {letter}
                </motion.span>
                <motion.span className={styles.letterBack}>{letter}</motion.span>
              </span>
            ))}
          </span>
        ))}
      </div>

      <ImageTrail parentRef={parentRef} />
    </div>
  );
}
