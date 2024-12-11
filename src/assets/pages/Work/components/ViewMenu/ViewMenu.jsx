import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./ViewMenu.module.css";

export default function ViewMenu({ currentView, setCurrentView }) {
  let views = ["3D View", "List View"];

  function toggleView(target) {
    setCurrentView(target);
  }

  return (
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
  );
}
