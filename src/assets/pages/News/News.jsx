import React, { useEffect, useRef, useState } from "react";
import styles from "./News.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import sanityClient from "/src/client.js";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { gsap } from "gsap";

export default function News() {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [news, setNews] = useState();
  const [experience, setExperience] = useState();
  const timerRef = useRef(null); // Reference to store the interval timer
  const imageRef = useRef(null); // Ref for the alternating image

  const newsSectionRef = useRef();

  const fetchData = async (type, setter) => {
    try {
      const data = await sanityClient.fetch(
        `*[_type=="${type}"]{
          _id,
          name,
          thumbnail,
          month,
          year, 
          url,
          ${type === "news" ? "imagegallery" : ""}
        }`
      );
      setter(data);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
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
  const handleMouseEnter = (newsItem) => {
    setHoveredItemId(newsItem._id);
    setCursorPosition({ x: 0, y: 0 }); // Reset cursor position
    setCurrentImageIndex(0); // Reset image index

    // Start alternating images
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        newsItem.imagegallery && prevIndex < newsItem.imagegallery.length - 1 ? prevIndex + 1 : 0
      );
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

  if (!news || news.length === 0 || !experience || experience.length === 0) {
    return <p>Error Loading Component</p>;
  }

  return (
    <section className={styles.newsSection} ref={newsSectionRef}>
      <div className={styles.newsContainer}>
        <h2>Public</h2>
        {news.map((newsItem, index) => (
          <div
            key={index}
            className={styles.newsItem}
            onMouseEnter={() => handleMouseEnter(newsItem)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.thumbnail}>{newsItem.thumbnail && renderMedia(newsItem.thumbnail)}</div>
            <div className={styles.date}>
              {formatMonth(newsItem.month)} {formatYear(newsItem.year)}
            </div>
            <h3 className={styles.name}>{newsItem.name}</h3>
            {/* Conditionally render the image gallery */}
            {hoveredItemId === newsItem._id && newsItem.imagegallery && (
              <div
                className={styles.alternatingImage}
                style={{
                  top: cursorPosition.y,
                  left: cursorPosition.x,
                }}
              >
                {/* Render the current image */}
                <div ref={imageRef}>{renderMedia(newsItem.imagegallery[currentImageIndex])}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.experienceContainer}>
        <h2>Experience</h2>
        {experience.map((experienceItem, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.thumbnail}>{experienceItem.thumbnail && renderMedia(experienceItem.thumbnail)}</div>
            <div className={styles.date}>
              {formatMonth(experienceItem.month)} {formatYear(experienceItem.year)}
            </div>
            <h3 className={styles.name}>{experienceItem.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
