import React, { useEffect, useRef } from "react";

import styles from "../Project.module.css";
import FlipText from "assets/components/Animations/FlipText";

export default function StyledLink({ project, data }) {
  let linkRef = useRef(null);

  // Scroll Link from left to right
  useEffect(() => {
    const refElement = linkRef.current;
    if (!refElement) return;

    let direction = 1; // 1 for right, -1 for left
    const speed = 2; // Speed of scrolling (pixels per interval)
    const interval = 10; // Interval for updating scroll position (milliseconds)

    const scrollInterval = setInterval(() => {
      // Update the scroll position
      refElement.scrollLeft += direction * speed;

      // Check if we've hit the edges
      if (refElement.scrollLeft + refElement.clientWidth >= refElement.scrollWidth || refElement.scrollLeft <= 0) {
        direction *= -1; // Reverse direction
      }
    }, interval);

    return () => clearInterval(scrollInterval); // Clean up on component unmount
  }, [data]);

  return (
    <div>
      <div className={styles.link} ref={linkRef}>
        <a href={project.url} target="_blank">
          <FlipText string={project.url} />
        </a>
      </div>
    </div>
  );
}
