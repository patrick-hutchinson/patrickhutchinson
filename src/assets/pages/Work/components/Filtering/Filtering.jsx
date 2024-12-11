import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Filtering.module.css";

import { gsap } from "gsap";

export default function Filtering() {
  // This should come from Sanity
  let [filters, setFilters] = useState([
    "Web Design",
    "Development",
    "Interaction Design",
    "Motion Design",
    "Poster",
    "Type Design",
  ]);
  let [showFilters, prevShowFilters] = useState(false);
  let [activeFilters, setActiveFilters] = React.useState([]);
  const filtersRef = useRef([]); // Store filters as refs to animate individually

  function handleFiltering(filter) {
    setActiveFilters((prevActiveFilters) => {
      return prevActiveFilters.includes(filter)
        ? prevActiveFilters.filter((activeFilter) => activeFilter !== filter)
        : [...prevActiveFilters, filter];
    });
  }

  function showFiltering() {
    prevShowFilters((prevShowFilters) => {
      return !prevShowFilters;
    });
  }

  // Filtering Animation
  useEffect(() => {
    if (showFilters) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(
        filtersRef.current, //
        { opacity: 0, y: 5, stagger: 0.1, duration: 0.3, ease: "power2.in" }
      );
    }
  }, [showFilters]);

  return (
    <>
      <button className="button" onClick={showFiltering}>
        <div className="button-front">Filters</div>
        <div className="button-back">
          <div className="button-back-inner"></div>
        </div>
      </button>

      <ul className={styles.filterMenu}>
        {filters.map((filter, index) => {
          return (
            <li key={index} onClick={() => handleFiltering(filter)} ref={(el) => (filtersRef.current[index] = el)}>
              <button className={`${activeFilters.includes(filter) ? "active" : ""} button`}>
                <div className="button-front">{filter}</div>
                <div className="button-back">
                  <div className="button-back-inner"></div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
