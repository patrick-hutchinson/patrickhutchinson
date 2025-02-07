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

  return (
    <div className={styles.container} ref={parentRef}>
      <div className={styles.biographyText} ref={aboutRef}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`${styles.wordContainer}`} ref={(el) => (wordsRef.current[wordIndex] = el)}>
            {word.split("").map((letter, letterIndex) => (
              <span key={`letter-${wordIndex}-${letterIndex}`} className={`${styles.letterContainer}`}>
                <motion.span
                  className={`${styles.letterFront}`}
                  initial={{ rotateX: 90 }}
                  animate={{ rotateX: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                  exit={{ rotateX: -90, transition: { duration: 0.4, ease: "easeInOut" } }}
                >
                  {letter}
                </motion.span>
                <span className={`${styles.letterBack}`}>{letter}</span>
              </span>
            ))}
          </span>
        ))}
      </div>

      <ImageTrail parentRef={parentRef} />
    </div>
  );
}
