import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import styles from "./Index.module.css";

import { motion } from "framer-motion";

import Link from "next/link";
import { getFileSrc } from "assets/utils/getFileSrc";
import { sortByDate } from "assets/utils/sortByDate";

import FlipText from "assets/components/Animations/FlipText";

import Thumbnail from "assets/components/Animations/Thumbnail";
import Categories from "assets/components/Categories/Categories";

export default function Index() {
  const { data } = useContext(DataContext);
  if (!data) return null;

  const zIndex = useRef(100);

  function handleZIndex() {
    zIndex.current += 1;
  }

  const projectTypes = [...new Set(data.map((project) => project.projectType[0]))];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["project-container"]}>
      <h1 className={styles["container-title"]}>
        <FlipText string="Index" />
      </h1>
      {projectTypes.map((type) => {
        const filteredProjects = data.filter((project) => project.projectType[0] === type);

        return (
          <section key={type}>
            <h2 className={styles.sectionHeading}>
              <FlipText string={type} />
            </h2>

            {filteredProjects.sort(sortByDate).map((project, index) => (
              <Link href={`/${project.slug.current}`} key={index}>
                <motion.div
                  className={`${styles.project} link`}
                  key={index}
                  initial="initialThumbnail"
                  whileHover="animateThumbnail"
                  exit="exitThumbnail"
                  onMouseEnter={() => handleZIndex()}
                >
                  <FlipText string={`0${index + 1}`} />

                  <div className={styles["title-container"]}>
                    <div className={styles.title}>
                      <FlipText string={project.name} />
                    </div>
                    {project.thumbnail && (
                      <Thumbnail source={getFileSrc(project.thumbnail, { width: 300 })} index={0} />
                    )}
                    {project.imagegallery?.map((image, imageindex) => {
                      return (
                        <Thumbnail source={getFileSrc(image, { width: 300 })} key={imageindex} index={imageindex + 1} />
                      );
                    })}
                  </div>

                  <span className={styles.year}>
                    <FlipText string={`${project.year}`} />
                  </span>

                  <ul className={styles.categories}>
                    <Categories project={project} />
                  </ul>
                </motion.div>
              </Link>
            ))}
            <br />
            <br />
          </section>
        );
      })}
    </div>
  );
}
