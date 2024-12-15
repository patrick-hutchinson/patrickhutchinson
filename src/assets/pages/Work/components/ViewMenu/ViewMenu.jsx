import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./ViewMenu.module.css";

import gsap from "gsap";

export default function ViewMenu({ projectView, setProjectView, setShowFiltering, projectSelection, setProjectSelection }) {
  let projectSelections = ["Selected Work", "All Work"];
  let projectViews = ["Grid View", "List View"];

  let viewMenuRef = useRef();
  let filteringRef = useRef();

  function toggleView(target) {
    setProjectView(target);
  }

  function toggleProjectView(target) {
    setProjectSelection(target);
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
    if (projectSelection === "All Work") {
      gsap.fromTo(
        viewMenuRef.current, // Handle Enter and Exit Animation for every button press
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(viewMenuRef.current, { opacity: 0, y: 5, stagger: 0.1, duration: 0.3, ease: "power2.in" });
    }
  }, [projectSelection]);

  useEffect(() => {
    gsap.set(filteringRef.current, { opacity: 0, y: 5 }); // Initially hide Filters
  }, []);
  useEffect(() => {
    if (projectSelection === "All Work") {
      gsap.fromTo(
        filteringRef.current, // Handle Enter and Exit Animation for every button press
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(filteringRef.current, { opacity: 0, y: 5, stagger: 0.1, duration: 0.3, ease: "power2.in" });
    }
  }, [projectSelection]);

  return (
    <div className={styles.projectsNav}>
      <div className={styles.projectView}>
        {projectSelections.map((view, index) => {
          return (
            <button
              key={index}
              className={`${projectSelection === view ? "active" : ""} button`}
              onClick={() => toggleProjectView(view)}
            >
              <div className="button-front">{view}</div>
              <div className="button-back">
                <div className="button-back-inner"></div>
              </div>
            </button>
          );
        })}
      </div>

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

      <div className={styles.filterButton} ref={filteringRef}>
        <button className="button" onClick={showFiltering}>
          <div className="button-front">Filtering</div>
          <div className="button-back">
            <div className="button-back-inner"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
