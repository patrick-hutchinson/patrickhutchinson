import React, { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import styles from "./About.module.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // useGSAP(() => {
  //   if (wordsRef.current.length > 0) {
  //     console.log(wordsRef.current); // This will log all the elements in the wordsRef array

  //     gsap.from(wordsRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       stagger: 0.1,
  //       duration: 1,
  //       ease: "power3.out",
  //     });
  //   }
  // }, [aboutData]); // Re-run animation when projects changes

  useEffect(() => {
    let animationDuration = 0.2;
    let animationDelay = animationDuration * 0.7;

    window.addEventListener("mousemove", (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    });

    aboutRef?.current?.querySelectorAll(`.${styles.wordContainer}`).forEach((word) => {
      let wordFront = word.querySelector(`.${styles.wordFront}`);
      let wordBack = word.querySelector(`.${styles.wordBack}`);

      let centerY = word.getBoundingClientRect().top + word.getBoundingClientRect().height / 2;
      let centerX = word.getBoundingClientRect().left + word.getBoundingClientRect().width / 2;

      word.addEventListener("mouseenter", () => {
        const isExitPlaying = word.getAttribute("isplayingexit") === "true";
        const isEnterPlaying = word.getAttribute("isplayingenter") === "true";

        // If an animation is playing, wait for it to finish before triggering the next one
        if (!isEnterPlaying && !isExitPlaying) {
          playEnterAnimation(wordFront, wordBack);
        } else if (!isEnterPlaying && isExitPlaying) {
          // If exit animation is playing, wait for it to finish
          setTimeout(() => {
            playEnterAnimation(wordFront, wordBack);
          }, animationDuration * 2000);
        }
      });

      word.addEventListener("mouseleave", () => {
        const isEnterPlaying = word.getAttribute("isplayingenter") === "true";
        const isExitPlaying = word.getAttribute("isplayingexit") === "true";

        // If an animation is playing, wait for it to finish before triggering the next one
        if (!isExitPlaying && !isEnterPlaying) {
          playExitAnimation(wordFront, wordBack);
        } else if (!isExitPlaying && isEnterPlaying) {
          // If enter animation is playing, wait for it to finish
          setTimeout(() => {
            playExitAnimation(wordFront, wordBack);
          }, animationDuration * 2000);
        }
      });

      const playEnterAnimation = (wordFront, wordBack) => {
        word.setAttribute("isplayingenter", "true");
        wordFront.style.animation = `flipFrontOut ${animationDuration}s ease-in-out 0s 1 forwards`;
        wordBack.style.animation = `flipBackIn ${animationDuration}s ease-in-out ${animationDelay}s 1 forwards`;

        const onAnimationEnd = () => {
          wordBack.removeEventListener("animationend", onAnimationEnd); // Clean up listener
          word.setAttribute("isplayingenter", "false");
        };

        wordBack.addEventListener("animationend", onAnimationEnd);
      };

      const playExitAnimation = (wordFront, wordBack) => {
        word.setAttribute("isplayingexit", "true");
        wordFront.style.transform = "rotateX(90deg)";
        wordFront.style.animation = `flipFrontIn ${animationDuration}s ease-in-out ${animationDelay}s 1 forwards`;
        wordBack.style.animation = `flipBackOut ${animationDuration}s ease-in-out 0s 1 forwards`;

        const onAnimationEnd = () => {
          wordFront.removeEventListener("animationend", onAnimationEnd); // Clean up listener
          word.setAttribute("isplayingexit", "false");
        };

        wordFront.addEventListener("animationend", onAnimationEnd);
      };
    });
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
          <span key={index} className={`${styles.wordContainer}`} ref={(el) => (wordsRef.current[index] = el)}>
            <span className={`${styles.wordFront}`}>{word}</span>
            <span className={`${styles.wordBack}`}>{word}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
