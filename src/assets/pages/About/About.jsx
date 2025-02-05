import React, { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import styles from "./About.module.css";
import ImageTrail from "../Home/components/About/components/ImageTrail/ImageTrail";

export default function About() {
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parentRef = useRef();
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

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  useEffect(() => {
    let animationDuration = 0.2;
    let animationDelay = animationDuration * 0.7;

    let hoverRadius = 50;

    aboutRef?.current?.querySelectorAll(`.${styles.letterContainer}`).forEach((letter) => {
      let letterFront = letter.querySelector(`.${styles.letterFront}`);
      let letterBack = letter.querySelector(`.${styles.letterBack}`);

      let centerX = letter.getBoundingClientRect().left + letter.getBoundingClientRect().width / 2;
      let centerY = letter.getBoundingClientRect().top + letter.getBoundingClientRect().height / 2;

      let distanceLeft = mousePosition.x - centerX;
      let distanceTop = mousePosition.y - centerY;

      const playEnterAnimation = (letterFront, letterBack) => {
        letter.setAttribute("isplayingenter", "true");
        letterFront.style.animation = `flipFrontOut ${animationDuration}s ease-in-out 0s 1 forwards`;
        letterBack.style.animation = `flipBackIn ${animationDuration}s ease-in-out ${animationDelay}s 1 forwards`;

        const onAnimationEnd = () => {
          letterBack.removeEventListener("animationend", onAnimationEnd); // Clean up listener
          letter.setAttribute("isplayingenter", "false");
        };

        letterBack.addEventListener("animationend", onAnimationEnd);
      };

      const playExitAnimation = (letterFront, letterBack) => {
        letter.setAttribute("isplayingexit", "true");
        letterFront.style.transform = "rotateX(90deg)";
        letterFront.style.animation = `flipFrontIn ${animationDuration}s ease-in-out ${animationDelay}s 1 forwards`;
        letterBack.style.animation = `flipBackOut ${animationDuration}s ease-in-out 0s 1 forwards`;

        const onAnimationEnd = () => {
          letterFront.removeEventListener("animationend", onAnimationEnd); // Clean up listener
          letter.setAttribute("isplayingexit", "false");
        };

        letterFront.addEventListener("animationend", onAnimationEnd);
      };

      if (distanceLeft > -hoverRadius && distanceLeft < hoverRadius && distanceTop > -hoverRadius && distanceTop < hoverRadius) {
        const isExitPlaying = letter.getAttribute("isplayingexit") === "true";
        const isEnterPlaying = letter.getAttribute("isplayingenter") === "true";

        // If an animation is playing, wait for it to finish before triggering the next one
        if (!isEnterPlaying && !isExitPlaying) {
          playEnterAnimation(letterFront, letterBack);
        } else if (!isEnterPlaying && isExitPlaying) {
          // If exit animation is playing, wait for it to finish
          setTimeout(() => {
            playEnterAnimation(letterFront, letterBack);
          }, animationDuration * 1000);
        }
      } else if (
        distanceLeft < -hoverRadius ||
        distanceLeft > hoverRadius ||
        distanceTop < -hoverRadius ||
        distanceTop > hoverRadius
      ) {
        const isEnterPlaying = letter.getAttribute("isplayingenter") === "true";
        const isExitPlaying = letter.getAttribute("isplayingexit") === "true";

        // If an animation is playing, wait for it to finish before triggering the next one
        if (!isExitPlaying && !isEnterPlaying) {
          playExitAnimation(letterFront, letterBack);
        } else if (!isExitPlaying && isEnterPlaying) {
          // If enter animation is playing, wait for it to finish
          setTimeout(() => {
            playExitAnimation(letterFront, letterBack);
          }, animationDuration * 1000);
        }
      }
    });
  }, [aboutData, mousePosition]);

  // Handle loading or error state
  if (!aboutData || aboutData.length === 0) {
    return <p>Error Loading Component</p>;
  }

  // Split text into words for individual animation
  const text = aboutData[0]?.biography[0]?.children[0]?.text || ""; // Example: Accessing the first block
  const words = text.split(" ");

  return (
    <div className={styles.container} ref={parentRef}>
      <div className={styles.biographyText} ref={aboutRef}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`${styles.wordContainer}`} ref={(el) => (wordsRef.current[wordIndex] = el)}>
            {word.split("").map((letter, letterIndex) => (
              <span key={`letter-${wordIndex}-${letterIndex}`} className={`${styles.letterContainer}`}>
                <span className={`${styles.letterFront}`}>{letter}</span>
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
