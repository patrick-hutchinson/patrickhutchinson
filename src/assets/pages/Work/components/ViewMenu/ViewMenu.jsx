import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./ViewMenu.module.css";

import gsap from "gsap";

export default function ViewMenu({ projectView, setProjectView, setShowFiltering }) {
  let projectViews = ["Grid View", "List View"];

  let viewMenuRef = useRef();
  let filteringRef = useRef();

  function toggleView(target) {
    setProjectView(target);
  }

  function showFiltering() {
    setShowFiltering((prevShowFiltering) => {
      return !prevShowFiltering;
    });
  }

  useEffect(() => {
    gsap.set(viewMenuRef.current, { opacity: 0, y: 5 }); // Initially hide Filters
  }, []);

  useEffect(() => {
    // Animate Filters into view after the page loads
    gsap.to(viewMenuRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8, // Animation duration in seconds
      ease: "power3.out", // Easing function for a smooth animation
      delay: 0.2, // Optional: Add a small delay before the animation starts
    });
  }, [viewMenuRef]);

  return (
    <div className={styles.projectsNav}>
      <ul className={styles.viewMenu} ref={viewMenuRef}>
        {projectViews.map((view, index) => {
          return (
            <li key={index} onClick={() => toggleView(view)}>
              <button className={`${projectView === view ? "active" : ""} button`}>
                <div className="button-front">{view}</div>
                <div className="button-back">
                  <div className="button-back-inner"></div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* <div className={styles.filterButton} ref={filteringRef}>
        <button className="button" onClick={showFiltering}>
          <div className="button-front">Filtering</div>
          <div className="button-back">
            <div className="button-back-inner"></div>
          </div>
        </button>
      </div> */}
    </div>
  );
}
