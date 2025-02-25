import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { DataContext } from "assets/context/WorkContext";
import { getFileSrc } from "assets/utils/getFileSrc";
import { renderMedia } from "assets/utils/renderMedia";

import { randomRotation } from "assets/utils/randomRotation";

import styles from "./Work.module.css";

export default function Work() {
  const data = useContext(DataContext);
  const projectContainer = useRef();
  const parentRef = useRef();

  const mediaContainer = useRef();
  const mediaOutlet = useRef();
  const videoRef = useRef();

  const thumbnailRef = useRef([]);

  // Early return if data is undefined or empty
  if (!data) return;

  function handleMouseEnter(e, project) {
    mediaContainer.current.style.display = "block";
    mediaOutlet.current.setAttribute("src", `${getFileSrc(project.coverimage)}`);

    videoRef.current.load();
    videoRef.current.play();
  }

  function handleMouseLeave(e) {
    mediaContainer.current.style.display = "none";
    mediaOutlet.current.setAttribute("src", "");

    videoRef.current.pause();
  }

  useEffect(() => {
    thumbnailRef.current.forEach((item) => {
      item.firstElementChild.style.transform = `rotate(${randomRotation()}deg)`;
    });
  }, []);

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

  let MediaContainer = () => {
    return (
      <div className={styles.mediaContainer} ref={mediaContainer}>
        <video autoPlay muted loop ref={videoRef}>
          <source src="" alt="" ref={mediaOutlet}></source>
        </video>
      </div>
    );
  };

  let Thumbnail = ({ project, projectindex }) => {
    return (
      <motion.span
        className="thumbnail"
        variants={letterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        ref={(el) => (thumbnailRef.current[projectindex] = el)}
      >
        {renderMedia(project.thumbnail)}
        {projectindex !== data.length - 1 && ","}
      </motion.span>
    );
  };

  return (
    <div ref={parentRef} className={styles.container}>
      <MediaContainer />

      <div className={styles["project-container"]} ref={projectContainer}>
        {data.map((project, projectindex) => {
          return (
            <div key={projectindex} className={styles.project}>
              <Link
                to={`/work/${project.slug.current}`}
                onMouseEnter={(e) => handleMouseEnter(e, project)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                {project.name.split(" ").map((word, wordIndex) => (
                  <Word key={wordIndex}>
                    {word.split("").map((letter, letterindex) => (
                      <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                    ))}
                  </Word>
                ))}
              </Link>
              <Thumbnail project={project} projectindex={projectindex} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
