import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./Public.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import sanityClient from "/src/client.js";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

import { motion } from "framer-motion";

import { getFileSrc } from "assets/utils/getFileSrc";

import { randomRotation } from "assets/utils/randomRotation";
import FlipText from "assets/components/Animations/FlipText/FlipText";
import MaskSplitImage from "assets/components/Animations/MaskSplitImage/MaskSplitImage";

import { DataContext } from "assets/context/DataContext";

export default function Public() {
  const { experiences } = useContext(DataContext);
  const zIndex = useRef(100);

  const [news, setNews] = useState(() => {
    const cachedData = localStorage.getItem("news");
    return cachedData ? JSON.parse(cachedData) : 0;
  });
  const [experience, setExperience] = useState(() => {
    const cachedData = localStorage.getItem("experience");
    return cachedData ? JSON.parse(cachedData) : 0;
  });

  const fetchData = async (type, setter) => {
    // Check if data is cached in localStorage
    const cachedData = localStorage.getItem(type);

    if (cachedData) {
      // If data is cached, use it
      setter(JSON.parse(cachedData));
    } else {
      // Only fetch if there is no cached data
      sanityClient
        .fetch(
          `*[_type=="${type}"]{
            _id,
            name,
            thumbnail,
            month,
            year, 
            url,
            ${type === "news" ? "imagegallery" : ""}
          }`
        )
        .then((fetchedData) => {
          // Cache the fetched data in localStorage
          localStorage.setItem(type, JSON.stringify(fetchedData));
          setter(fetchedData); // Use the setter function passed in
        })
        .catch((error) => {
          console.error(`Failed to fetch ${type}:`, error);
        });
    }
  };

  useEffect(() => {
    fetchData("news", setNews);
    fetchData("experience", setExperience);
  }, []);

  if (!experiences) return;

  console.log(experiences, "new data");

  if (!news || !experience) return;

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

  let Date = ({ item }) => {
    return (
      <motion.div className={styles.date} variants={letterVariants} initial="initial" animate="animate" exit="exit">
        {formatMonth(item.month)} {formatYear(item.year)}
      </motion.div>
    );
  };

  const sortByDate = (a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year; // Sort by year (descending)
    }
    return b.month - a.month; // Sort by month (descending)
  };

  const thumbnailVariants = {
    initialThumbnail: { scale: 1 },
    animateThumbnail: {
      zIndex: zIndex.current,
      scale: 12,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exitThumbnail: {
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  function handleZIndex(e) {
    zIndex.current += 1;
    e.currentTarget.style.zIndex = zIndex.current;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>
          <FlipText string="PUBLIC" />
        </h2>
        <br />

        {news.sort(sortByDate).map((news, newsindex) => (
          <motion.div
            key={newsindex}
            className={`${styles.listItem}`}
            initial="initialThumbnail"
            whileHover="animateThumbnail"
            exit="exitThumbnail"
            onMouseEnter={() => handleZIndex()}
          >
            <Date item={news} />
            <div className={`${styles.name} ${news.imagegallery ? styles.link : ""}`}>
              {news.name.split(" ").map((word, wordIndex) => (
                <Word key={wordIndex}>
                  {word.split("").map((letter, letterindex) => (
                    <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                  ))}
                </Word>
              ))}
              <motion.div className="thumbnail" variants={thumbnailVariants}>
                <MaskSplitImage source={getFileSrc(news.thumbnail, { width: 300 })} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.wrapper}>
        <h2>
          <FlipText string="EXPERIENCE" />
        </h2>
        <br />
        {experience.sort(sortByDate).map((experience, experienceindex) => (
          <motion.div
            key={experienceindex}
            className={styles.listItem}
            initial="initialThumbnail"
            whileHover="animateThumbnail"
            exit="exitThumbnail"
            onMouseEnter={() => handleZIndex()}
          >
            <Date item={experience} />
            <div className={styles.name}>
              {experience.name.split(" ").map((word, wordIndex) => (
                <Word key={wordIndex}>
                  {word.split("").map((letter, letterindex) => (
                    <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                  ))}
                </Word>
              ))}
              <motion.div className="thumbnail" variants={thumbnailVariants}>
                <MaskSplitImage source={getFileSrc(experience.thumbnail, { width: 300 })} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
