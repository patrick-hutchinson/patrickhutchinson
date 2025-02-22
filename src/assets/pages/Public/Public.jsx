import React, { useEffect, useRef, useState } from "react";
import styles from "./Public.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import sanityClient from "/src/client.js";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function Public() {
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
  const timerRef = useRef(null); // Reference to store the interval timer
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
    fetchData("news", setNews);
    fetchData("experience", setExperience);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  let intervalDuration = 800;
  function formatIntervalDuration(intervalDuration) {
    return intervalDuration / 1000 / 2;
  }
  const handleMouseEnter = (item) => {
    setHoveredItemId(item._id);
    setCursorPosition({ x: 0, y: 0 }); // Reset cursor position
    setCurrentImageIndex(0); // Reset image index

    // Start alternating images
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (item.imagegallery && prevIndex < item.imagegallery.length - 1 ? prevIndex + 1 : 0));
    }, intervalDuration); // Change image every 1 second
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
    clearInterval(timerRef.current); // Stop the timer
  };

  // GSAP animation for the image gallery
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0 },
        { scale: 1, duration: formatIntervalDuration(intervalDuration), ease: "power2.out" }
      );

      gsap.to(imageRef.current, {
        scale: 0,
        duration: formatIntervalDuration(intervalDuration),
        delay: formatIntervalDuration(intervalDuration), // Halfway into the interval duration
        ease: "power2.in",
      });
    }
  }, [currentImageIndex]);

  if (!news || news.length === 0 || !experience || experience.length === 0) return;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {news.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.listItem}`}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ rotateX: 90, transition: { duration: 0.4, ease: "easeInOut" } }}
          >
            <div className={`${styles.name} ${item.imagegallery ? styles.link : ""}`}>{item.name}</div>
            <div className={styles.date}>
              {formatMonth(item.month)} {formatYear(item.year)}
            </div>
            <div className="thumbnail">{item.thumbnail && renderMedia(item.thumbnail)}</div>

            {/* Conditionally render the image gallery */}
            {hoveredItemId === item._id && item.imagegallery && (
              <div className={styles.alternatingImage} style={{ top: cursorPosition.y, left: cursorPosition.x }}>
                <div ref={imageRef}>{renderMedia(item.imagegallery[currentImageIndex])}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className={styles.wrapper}>
        {experience.map((experienceItem, index) => (
          <motion.div
            key={index}
            className={styles.listItem}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ rotateX: -90, transition: { duration: 0.4, ease: "easeInOut" } }}
          >
            <div className={styles.name}>{experienceItem.name}</div>
            <div className={styles.date}>
              {formatMonth(experienceItem.month)} {formatYear(experienceItem.year)}
            </div>
            <div className="thumbnail">{experienceItem.thumbnail && renderMedia(experienceItem.thumbnail)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
