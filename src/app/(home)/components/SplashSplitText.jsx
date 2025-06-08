import { motion } from "framer-motion";

import styles from "../Home.module.css";
import { coordinates } from "../utils/coordinates";
import { useRef, useEffect, useContext } from "react";
import { getFileSrc } from "assets/utils/getFileSrc";

import { StateContext } from "assets/context/StateContext";

export default function SplashSplitText({ string, thumbnails }) {
  const { isMobile } = useContext(StateContext);

  useEffect(() => {
    thumbnails.forEach((thumb) => {
      const img = new Image();
      img.src = getFileSrc(thumb);
    });
  }, [thumbnails]);

  let imageRefs = useRef({}); // Ref array to store image elements
  let hoverRadius = 100;

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      Object.values(imageRefs.current).forEach((letterPoint) => {
        if (!letterPoint) return;

        const rect = letterPoint.getBoundingClientRect();
        const distanceLeft = e.clientX - (rect.left + rect.width / 2);
        const distanceTop = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(distanceLeft ** 2 + distanceTop ** 2); // Calculate actual distance

        const isWithinRadius = distance < hoverRadius;

        if (isWithinRadius && !letterPoint.dataset.hovered) {
          letterPoint.dataset.hovered = "true"; // Mark as hovered
          letterPoint.style.transform = `scale(${Math.random() * 15 + 0.3}) rotate(${Math.random() * 20 - 10}deg)`;
        } else if (!isWithinRadius && letterPoint.dataset.hovered) {
          letterPoint.dataset.hovered = ""; // Mark as not hovered
          letterPoint.style.transform = "scale(0)";
        }
      });
    });
  };

  // useEffect(() => {
  //   const refKeys = Object.keys(imageRefs.current);
  //   if (refKeys.length === 0) return;

  //   let index = 0;
  //   const interval = 20; // Time between triggers
  //   const duration = 1000; // Time each pulse stays visible

  //   const intervalId = setInterval(() => {
  //     const el = imageRefs.current[refKeys[index]];
  //     if (el) {
  //       el.style.transition = "transform 0.3s ease-in-out";
  //       el.style.transform = `scale(${Math.random() * 15 + 0.3}) rotate(${Math.random() * 20 - 10}deg)`;

  //       // Reset after pulse duration
  //       setTimeout(() => {
  //         el.style.transform = "scale(0)";
  //       }, duration);
  //     }

  //     index = (index + 1) % refKeys.length;
  //   }, interval); // Fire every 100ms, regardless of previous one finishing

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  let ImageContainer = ({ letter, letterindex }) => {
    let letterCoordinates = coordinates.filter((set) => set.letter === letter);

    // console.log("lettercoordinates:", letterCoordinates[0].coordinates);
    return (
      <>
        {letterCoordinates[0] &&
          letterCoordinates[0].coordinates.map((image, imageindex) => {
            const refKey = `${letterindex}-${imageindex}`;
            const wrappedIndex = imageindex % thumbnails.length; // Ensure it loops back

            return (
              <img
                ref={(el) => (imageRefs.current[refKey] = el)}
                className={styles.image}
                src={getFileSrc(thumbnails[wrappedIndex], { width: 200 })} // Use wrapped index
                style={{ left: image.left + "px", top: image.top + "px" }}
                key={imageindex}
              />
            );
          })}
      </>
    );
  };
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
      <span className={`letter ${styles["letter-container"]}`} key={letterindex}>
        {letter}
        {!isMobile && <ImageContainer letter={letter} letterindex={letterindex}></ImageContainer>}
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
          // viewport={{ margin: "-100px 0px -100px 0px" }}
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
