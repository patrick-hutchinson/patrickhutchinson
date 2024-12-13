import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./ViewMenu.module.css";

export default function ViewMenu({ currentView, setCurrentView, setShowFiltering }) {
  let views = ["Grid View", "List View"];

  function toggleView(target) {
    setCurrentView(target);
  }

  function showFiltering() {
    setShowFiltering((prevShowFiltering) => {
      return !prevShowFiltering;
    });
  }

  return (
    <div className={styles.projectsNav}>
      <button className={`active button`}>
        <div className="button-front">Selected Works</div>
        <div className="button-back">
          <div className="button-back-inner"></div>
        </div>
      </button>

      <ul className={styles.viewMenu}>
        {views.map((view, index) => {
          return (
            <li key={index} onClick={() => toggleView(view)}>
              <button className={`${currentView === view ? "active" : ""} button`}>
                <div className="button-front">{view}</div>
                <div className="button-back">
                  <div className="button-back-inner"></div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.filterButton}>
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
