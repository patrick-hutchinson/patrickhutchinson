import React, { useEffect, useState } from "react";

import styles from "../home.module.css";

import { formatMonth } from "../../../assets/utils/formatMonth";
import { formatYear } from "../../../assets/utils/formatYear";

import Categories from "src/assets/components/Categories/Categories";
import RenderThumbnail from "@animations/RenderThumbnail";

import { motion, AnimatePresence } from "framer-motion";
import MaskSplitContainer from "../../../assets/components/Animations/MaskSplitContainer";

export default function Index({ mergedContent }) {
  const [showAll, setShowAll] = useState(false);

  const [zIndex, setZIndex] = useState(10);
  const [rotation, setRotation] = useState(3);
  const [scale, setScale] = useState(10);

  const types = [...new Set(mergedContent.map((item) => item.type))];

  const [activeFilters, setActiveFilters] = useState(() => [...new Set(mergedContent.map((item) => item.type))]);

  const withDate = mergedContent.map((item) => ({
    ...item,
    date: new Date(item.year, item.month - 1), // JS months are 0-indexed
  }));

  const sortedContent = withDate.sort((a, b) => b.date - a.date);
  const filteredContent = sortedContent.filter((item) => activeFilters.includes(item.type));
  const visibleContent = showAll ? filteredContent : filteredContent.slice(0, 10);

  function handleFiltering(type) {
    setActiveFilters(
      (prevFilters) =>
        prevFilters.includes(type)
          ? prevFilters.filter((t) => t !== type) // remove
          : [...prevFilters, type] // add
    );
  }

  useEffect(() => {
    console.log(activeFilters, "activeFilters");
  }, [activeFilters]);

  let Filtering = () => {
    return (
      <div className={styles["filtering-container"]}>
        <ul>
          {types.map((type, index) => {
            let isActive = activeFilters.includes(type);
            return (
              <li
                key={index}
                className={`${styles["section-label"]} ${styles[`${type}`]} ${isActive ? styles["active"] : ""}`}
                onClick={() => handleFiltering(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  function generateRandomValues() {
    setZIndex((prevIndex) => prevIndex + 1);
    setScale(Math.random() * 5);
    setScale(Math.random() * (5 - 3) + 3);
    setRotation(Math.random() * 20 - 10);
  }

  const thumbnailVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: scale, // or whatever scale you want on hover
      transition: { duration: 0.3 },
      rotate: rotation,
      zIndex: zIndex,
    },
  };

  const listItemVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { duration: 0.3 } },
    exit: { scale: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className={styles["section-container"]}>
      <MaskSplitContainer>
        <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px", width: "50%" }}>
          <div className="col-span-2">Project Index</div>
          <div className="col-span-4" style={{ opacity: 0.8 }}>
            {`${mergedContent.length} Projects`}
          </div>
        </div>
      </MaskSplitContainer>
      <div className={`${styles.section}`}>
        <MaskSplitContainer>
          <Filtering />
        </MaskSplitContainer>
        <motion.div className={`${styles.index}`}>
          <AnimatePresence mode="popLayout">
            {visibleContent.map((item, index) => {
              let isProject = item.type === "project";

              return (
                <MaskSplitContainer key={index}>
                  <motion.div
                    key={index}
                    className={`${styles["section-item"]} ${styles[item.type]}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    variants={listItemVariants}
                    onMouseEnter={() => generateRandomValues()}
                  >
                    <div className={`${styles["section-label"]} ${styles["project-type-label"]}`}>{item.type}</div>

                    <div
                      className={`${styles["section-item-content"]} ${
                        isProject && styles["section-item-content-project"]
                      } ${styles["section-label"]}`}
                    >
                      <span className={styles["item-index"]}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                      {item.thumbnail ? (
                        <motion.div variants={thumbnailVariants}>
                          <RenderThumbnail medium={item.thumbnail} />
                        </motion.div>
                      ) : (
                        <span />
                      )}
                      <span>{item.name}</span>
                      {isProject && <Categories project={item} />}
                      {isProject && <span className="live">live!</span>}
                      <span>
                        {formatYear(item.year)} {formatMonth(item.month)}
                      </span>
                    </div>
                  </motion.div>
                </MaskSplitContainer>
              );
            })}
          </AnimatePresence>

          {sortedContent.length > 10 && (
            <MaskSplitContainer>
              <div className={styles["view-all-button"]} onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "View All"}
              </div>
            </MaskSplitContainer>
          )}
        </motion.div>
      </div>
      {/* <div style={{ background: "#ccc", width: "100vw", height: "30px" }}></div> */}
    </div>
  );
}
