import React, { useEffect, useRef, useState } from "react";
import styles from "./News.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import sanityClient from "/src/client.js";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

export default function News() {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [news, setNews] = useState();
  const [experience, setExperience] = useState();
  const timerRef = useRef(null); // Reference to store the interval timer

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

  if (!news || news.length === 0 || !experience || experience.length === 0) {
    return <p>Error Loading Component</p>;
  }

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (newsItem) => {
    setHoveredItemId(newsItem._id);
    setCursorPosition({ x: 0, y: 0 }); // Reset cursor position
    setCurrentImageIndex(0); // Reset image index
    // Start alternating images
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        newsItem.imagegallery && prevIndex < newsItem.imagegallery.length - 1 ? prevIndex + 1 : 0
      );
    }, 500); // Change image every 1 second
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
    clearInterval(timerRef.current); // Stop the timer
  };

  return (
    <section className={styles.newsSection} ref={newsSectionRef}>
      <div className={styles.newsContainer}>
        <h2>News</h2>
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
                {renderMedia(newsItem.imagegallery[currentImageIndex])}
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
