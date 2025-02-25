import React, { useEffect, useRef, useState } from "react";
import styles from "./Public.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import sanityClient from "/src/client.js";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

import { motion } from "framer-motion";

import { randomRotation } from "assets/utils/randomRotation";

export default function Public() {
  const thumbnailRef = useRef([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [news, setNews] = useState(() => {
    const cachedData = localStorage.getItem("news");
    return cachedData ? JSON.parse(cachedData) : 0;
  });
  const [experience, setExperience] = useState(() => {
    const cachedData = localStorage.getItem("experience");
    return cachedData ? JSON.parse(cachedData) : 0;
  });

  const imageRef = useRef(null); // Ref for the alternating image

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
    thumbnailRef.current.forEach((item) => {
      item.firstElementChild.style.transform = `rotate(${randomRotation()}deg)`;
    });
  }, []);

  useEffect(() => {
    fetchData("news", setNews);
    fetchData("experience", setExperience);
  }, []);

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

  let Thumbnail = ({ item, index }) => {
    return (
      <motion.span
        className="thumbnail"
        variants={letterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        ref={(el) => (thumbnailRef.current[index] = el)}
      >
        {item.thumbnail && renderMedia(item.thumbnail)}
        {index !== news.length - 1 && ","}
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {news.sort(sortByDate).map((news, newsindex) => (
          <div key={newsindex} className={`${styles.listItem}`}>
            <div className={`${styles.name} ${news.imagegallery ? styles.link : ""}`}>
              {news.name.split(" ").map((word, wordIndex) => (
                <Word key={wordIndex}>
                  {word.split("").map((letter, letterindex) => (
                    <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                  ))}
                </Word>
              ))}
            </div>
            <Date item={news} />
            <Thumbnail item={news} index={newsindex} />

            {/* Conditionally render the image gallery */}
            {hoveredItemId === news._id && news.imagegallery && (
              <div className={styles.alternatingImage} style={{ top: cursorPosition.y, left: cursorPosition.x }}>
                <div ref={imageRef}>{renderMedia(news.imagegallery[currentImageIndex])}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.wrapper}>
        {experience.sort(sortByDate).map((experience, experienceindex) => (
          <div key={experienceindex} className={styles.listItem}>
            <div className={styles.name}>
              {experience.name.split(" ").map((word, wordIndex) => (
                <Word key={wordIndex}>
                  {word.split("").map((letter, letterindex) => (
                    <Letter key={`letter-${wordIndex}-${letterindex}`} letter={letter} letterindex={letterindex} />
                  ))}
                </Word>
              ))}
            </div>
            <Date item={experience} />
            <Thumbnail item={experience} index={experienceindex} />
          </div>
        ))}
      </div>
    </div>
  );
}
