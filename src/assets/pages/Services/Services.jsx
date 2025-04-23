import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";

import FlipText from "assets/components/Animations/FlipText/FlipText";

import styles from "./Services.module.css";

export default function Services() {
  let designCompetencies = [
    "FIGMA",
    "XD",
    "FRAMER",
    "ADOBE INDESIGN",
    "ADOBE PHOTOSHOP",
    "ADOBE AFTER EFFECTS",
    "TOUCHDESIGNER",
    "BLENDER",
  ];

  let developmentCompetencies = [
    { title: "Frameworks", competencies: ["NEXT.JS & REACT", "PHP"] },
    { title: "CMS", competencies: ["SANITY", "KIRBY", "SHOPIFY"] },
    { title: "MOTION & INTERACTION", competencies: ["FRAMER MOTION", "GSAP"] },
    { title: "LIBRARIES", competencies: ["THREE.JS", "P5.JS / PROCESSING", "WEBGL"] },
  ];

  let hostingCompetencies = ["VERCEL", "DIGITALOCEAN / CLOUDWAYS"];

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
    <section className={styles.content}>
      <p>
        <FlipText string="A FULL PRODUCTION CYCLE COVERING EVERY STEP OF THE WAY." />
      </p>

      <div className={styles["service-section"]}>
        <h2 className={styles.title}>
          <span className={styles.count}>
            <FlipText string="01" />
          </span>
          <FlipText string="DESIGN" />
        </h2>
        <ul className={styles.competencies}>
          {designCompetencies.map((competency, index) => {
            return (
              <li key={index}>
                <FlipText string={`${index + 1}`} />

                <span>
                  {competency.split(" ").map((word, wordIndex) => (
                    <Word key={wordIndex}>
                      {word.split("").map((letter, letterindex) => (
                        <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                      ))}
                    </Word>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles["service-section"]}>
        <h2 className={styles.title}>
          <span className={styles.count}>
            <FlipText string="02" />
          </span>
          <FlipText string="DEVELOPMENT" />
        </h2>

        <div className={styles["competencies-container"]}>
          {developmentCompetencies.map((competencies, index) => {
            return (
              <ul className={styles.competencies} key={index}>
                <FlipText string={competencies.title} />
                {competencies.competencies.map((competency, competencyindex) => (
                  <li key={competencyindex}>
                    <span className={styles.count}>
                      <FlipText string={`${competencyindex + 1}`} />
                    </span>
                    <span>
                      {competency.split(" ").map((word, wordIndex) => (
                        <Word key={wordIndex}>
                          {word.split("").map((letter, letterindex) => (
                            <Letter
                              key={`letter-${wordIndex}-${letterindex}`}
                              letter={letter}
                              letterindex={letterindex}
                            />
                          ))}
                        </Word>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>

      <div className={styles["service-section"]}>
        <h2 className={styles.title}>
          <span className={styles.count}>
            <FlipText string="03" />
          </span>
          <FlipText string="HOSTING AND PUBLISHING" />
        </h2>

        <ul className={styles.competencies}>
          {hostingCompetencies.map((competency, index) => {
            return (
              <li key={index}>
                <span className={styles.count}>
                  <FlipText string={`${index + 1}`} />
                </span>
                <span>
                  {competency.split(" ").map((word, wordIndex) => (
                    <Word key={wordIndex}>
                      {word.split("").map((letter, letterindex) => (
                        <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                      ))}
                    </Word>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
