import React, { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import styles from "./About.module.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
  const aboutRef = useRef(null);
  const wordsRef = useRef([]);

  const [aboutData, setAboutData] = useState();

  // Fetch data from Sanity
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="about"]{
        biography,
      }`
      )
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  useGSAP(() => {
    if (wordsRef.current.length > 0) {
      console.log(wordsRef.current); // This will log all the elements in the wordsRef array

      gsap.from(wordsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [aboutData]); // Re-run animation when projects changes

  useEffect(() => {
    if (aboutRef.current !== null) {
      aboutRef.current.querySelectorAll(`.${styles.wordOuter}`).forEach((word) => {
        word.addEventListener("mouseenter", (e) => {
          console.log("in");
          word.querySelector(`.${styles.wordInner}`).style.transform = "rotateX(90deg)";
          word.querySelector(`.${styles.wordAlternative}`).style.transform = "rotateX(0deg)";
        });

        word.addEventListener("mouseleave", () => {
          console.log("out");
          word.querySelector(`.${styles.wordInner}`).style.transform = "rotateX(0deg)";
          word.querySelector(`.${styles.wordAlternative}`).style.transform = "rotateX(-90deg)";
        });
      });
    }
  }, [aboutData]);

  // Handle loading or error state
  if (!aboutData || aboutData.length === 0) {
    return <p>Error Loading Component</p>;
  }

  // Split text into words for individual animation
  const text = aboutData[0]?.biography[0]?.children[0]?.text || ""; // Example: Accessing the first block
  const words = text.split(" ");

  return (
    <section className={styles.aboutSection} ref={aboutRef}>
      <div className={styles.biographyText}>
        {words.map((word, index) => (
          <span key={index} className={`${styles.wordOuter}`} ref={(el) => (wordsRef.current[index] = el)}>
            <span className={`${styles.wordInner}`}>{word}</span>
            <span className={`${styles.wordAlternative}`}>{word}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
