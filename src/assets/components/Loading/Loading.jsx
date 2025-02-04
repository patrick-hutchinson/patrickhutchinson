import React, { useEffect, useState, useRef } from "react";

import styles from "./Loading.module.css";

export default function Loading() {
  let [counter, setCounter] = useState(0);
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const wordsRef = useRef([]);
  const aboutRef = useRef();

  const text = "Loading the content, please wait!";
  const words = text.split(" ");

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  let intervalCounter = 0;

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
  }, [mousePosition]);

  // setInterval(() => {
  //   setCounter((prevCount) => {
  //     return prevCount + 1;
  //   });
  // }, 1000);

  // useEffect(() => {
  //   console.log(counter, "counter");
  // }, [counter]);
  return (
    <main ref={aboutRef}>
      <div className={styles.textContainer}>
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
    </main>
  );
}
