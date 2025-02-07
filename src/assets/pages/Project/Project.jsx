import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import styles from "./Project.module.css";

import sanityClient from "/src/client.js";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { creditsMapping } from "assets/context/creditsMapping";
import { categoriesMapping } from "assets/context/categoriesMapping";
import randomColorScheme from "assets/context/colorSchemes";

import { renderMedia } from "assets/utils/renderMedia";
import MoreProjects from "./MoreProjects/MoreProjects";

export default function Project() {
  let linkRef = useRef(null);
  let [projects, setProjects] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
        _id,
      name,
      coverimage,
      thumbnail,
      imagegallery,
      gridStructure,
      month,
      year, 
      url,
      categories,
      credits,
      slug
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

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
  }, [projects]);

  const { slug } = useParams();

  // Early return if Projects is undefined
  if (!projects) return; // Or some other loading state or message

  const project = projects.find((projectfound) => projectfound.slug?.current === slug);

  let randomColorSchemes = randomColorScheme();

  document.querySelector(":root").style.setProperty("--randomBackgroundColor", randomColorSchemes.background);
  document.querySelector(":root").style.setProperty("--randomFontColor", randomColorSchemes.font);

  let Gallery = () => {
    let index = 0; // Initialize the index for slicing images

    return (
      project.gridStructure &&
      project.gridStructure.map((columnsInRow, rowIndex) => {
        const rowImages = project.imagegallery.slice(index, index + columnsInRow); // Slice the images for each row
        index += columnsInRow; // Update the index for the next row

        const rowStyles = {
          gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`, // Use the value from gridStructure for this row
        };

        return (
          <div key={rowIndex} className={styles.galleryRow} style={rowStyles}>
            {rowImages.map((image, index) => (
              <div key={index}> {renderMedia(image)} </div>
            ))}
          </div>
        );
      })
    );
  };

  let ProjectInfo = () => {
    return (
      <div className={styles.projectText}>
        <div className={styles.projectHeader}>
          <div>
            <div className={styles["info-title"]}>Title</div>
            <div>{project.name}</div>
          </div>
          <br />
          <br /> <br />
          <div>
            {formatMonth(project.month)} {formatYear(project.year)}
          </div>
        </div>
        <div className={styles.projectInfo}>
          {/* Categories */}
          <ul className={styles.categories}>
            <div className={styles["info-title"]}>Involvement</div>
            {project.categories &&
              categoriesMapping.map(
                ({ key, title }) =>
                  project.categories.includes(key) && (
                    <li key={key} className={styles.category}>
                      {title}
                    </li>
                  )
              )}
            <br />
          </ul>

          {/* Credits */}
          <ul className={styles.credits}>
            <div className={styles["info-title"]}>Credits</div>
            {project.credits &&
              creditsMapping.map(
                ({ key, title }) =>
                  project.credits[key] && (
                    <div className={styles.creditcontainer} key={key}>
                      <div className={styles["creditcontainer-inner"]}>
                        <li className={`${styles.credit}`}>{title}:</li>
                        <li>{project.credits[key].join(", ")}</li>
                      </div>
                    </div>
                  )
              )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <motion.div className={styles.projectContainer}>
      {renderMedia(project.coverimage)}

      <ProjectInfo />

      <Gallery />

      <div className={styles.link} ref={linkRef}>
        <a href={project.url} target="_blank">
          {project.url}
        </a>
      </div>

      <MoreProjects projects={projects} />
    </motion.div>
  );
}
