import React, { useEffect, useRef, useState } from "react";
import styles from "./Public.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { gsap } from "gsap";

export default function Public({ data }) {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const timerRef = useRef(null); // Reference to store the interval timer
  const imageRef = useRef(null); // Ref for the alternating image

  const containerRef = useRef();

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

  if (!data) return <p>Error Loading Component</p>;

  return (
    <div className={styles.public} ref={containerRef}>
      {data.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.thumbnail}>{item.thumbnail && renderMedia(item.thumbnail)}</div>
          {/* <div className={styles.date}>
            {formatMonth(item.month)} {formatYear(item.year)}
          </div> */}
          <h3 className={styles.name}>{item.name}</h3>
          {/* Conditionally render the image gallery */}
          {hoveredItemId === item._id && item.imagegallery && (
            <div
              className={styles.alternatingImage}
              style={{
                top: cursorPosition.y,
                left: cursorPosition.x,
              }}
            >
              {/* Render the current image */}
              <div ref={imageRef}>{renderMedia(item.imagegallery[currentImageIndex])}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
