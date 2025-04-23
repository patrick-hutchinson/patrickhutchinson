import React, { useEffect, useRef, useState, useContext } from "react";

import { DataContext } from "assets/context/DataContext";

import styles from "./Public.module.css";
import { motion } from "framer-motion";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { getFileSrc } from "assets/utils/getFileSrc";

import FlipText from "assets/components/Animations/FlipText";
import Thumbnail from "assets/components/Animations/Thumbnail";

export default function Public() {
  const { experience } = useContext(DataContext);
  const { news } = useContext(DataContext);

  const data = [
    { title: "Public", items: news },
    { title: "Experience", items: experience },
  ];

  if (!data) return;

  const zIndex = useRef(100);

  const sortByDate = (a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year; // Sort by year (descending)
    }
    return b.month - a.month; // Sort by month (descending)
  };

  function handleZIndex() {
    zIndex.current += 1;
  }

  return (
    <main>
      <div className={styles.container}>
        {data.map((section, sectionIndex) => (
          <div className={styles.wrapper} key={sectionIndex}>
            <h2>
              <FlipText string={section.title} />
            </h2>
            <br />

            {section.items.sort(sortByDate).map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className={styles.listItem}
                initial="initialThumbnail"
                whileHover="animateThumbnail"
                exit="exitThumbnail"
                onMouseEnter={() => handleZIndex()}
              >
                <div className={styles.date}>
                  <FlipText string={`${formatMonth(item.month)}`} />
                  <FlipText string={`${formatYear(item.year)}`} />
                </div>
                <div className={styles.name}>
                  <FlipText string={item.name} />
                  <Thumbnail source={getFileSrc(item.thumbnail, { width: 300 })} zIndex={zIndex.current} />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
