import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Filtering.module.css";

import { gsap } from "gsap";

export default function Filtering({ filters, activeFilters, setActiveFilters }) {
  // This should come from Sanity
  let [allSelected, setAllSelected] = useState(true); // Track if "All" is selected

  let [showFilters, prevShowFilters] = useState(false);

  const filtersRef = useRef([]); // Store filters as refs to animate individually

  function handleFiltering(e, filter) {
    setActiveFilters((prevActiveFilters) => {
      // If "All" is currently selected, clear it and start fresh with the clicked filter
      if (allSelected) {
        setAllSelected(false);
        return [filter]; // Return only the clicked filter
      }

      // If the clicked filter is already active, remove it
      if (prevActiveFilters.includes(filter)) {
        const updatedFilters = prevActiveFilters.filter((f) => f !== filter);

        // Use ternary for the conditional return
        return updatedFilters.length === 0
          ? (setAllSelected(true), filters) // If no filters left, set "All" and return all filters
          : updatedFilters; // Otherwise, return the updated filters
      }

      // Otherwise, add the new filter
      return [...prevActiveFilters, filter];
    });
  }

  function showFiltering() {
    prevShowFilters((prevShowFilters) => {
      return !prevShowFilters;
    });
  }

  // Filtering Animation
  useEffect(() => {
    gsap.set(filtersRef.current, { opacity: 0, y: 5 }); // Initially hide Filters
  }, []);

  useEffect(() => {
    if (showFilters) {
      gsap.fromTo(
        filtersRef.current, // Handle Enter and Exit Animation for every button press
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(filtersRef.current, { opacity: 0, y: 5, stagger: 0.1, duration: 0.3, ease: "power2.in" });
    }
  }, [showFilters]);

  function formatText(filter) {
    return filter.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  // Handle clicking "All"
  function handleAllFilter(e) {
    setActiveFilters(filters); // Activate all filters
    setAllSelected(true); // Mark "All" as selected
  }

  return (
    <div className={styles.filterMenu}>
      <button className="button" onClick={showFiltering}>
        <div className="button-front">Filters</div>
        <div className="button-back">
          <div className="button-back-inner"></div>
        </div>
      </button>

      <ul className={styles.filterWrapper}>
        {/* Add "All" filter to the filtersRef array at index 0 */}
        <li onClick={(e) => handleAllFilter(e)} ref={(el) => (filtersRef.current[0] = el)}>
          <span className={`${allSelected ? "active" : ""} activeIndicator`}>
            <div className="activeIndicator-inner"></div>
          </span>

          <button className={`${allSelected ? "active" : ""} button`}>All</button>
        </li>
        {filters.map((filter, index) => {
          return (
            // Adjust the index to account for "All" filter at index 0
            <li
              key={index}
              onClick={(e) => handleFiltering(e, filter)}
              ref={(el) => (filtersRef.current[index + 1] = el)} // Store other filters starting from index 1
            >
              <span className={`${activeFilters.includes(filter) && !allSelected ? "active" : ""} activeIndicator`}>
                <div className="activeIndicator-inner"></div>
              </span>

              <button className={`${activeFilters.includes(filter) ? "active" : ""} button`}>{formatText(filter)}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
