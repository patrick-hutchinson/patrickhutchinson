import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import styles from "./Index.module.css";

import { motion } from "framer-motion";
import { categoriesMapping } from "assets/context/categoriesMapping";

import { Link } from "react-router-dom";
import { getFileSrc } from "assets/utils/getFileSrc";

import FlipText from "assets/components/Animations/FlipText/FlipText";
import MaskSplitImage from "assets/components/Animations/MaskSplitImage/MaskSplitImage";

export default function Index() {
  const { data } = useContext(DataContext);
  if (!data) return null;

  let variants = {
    // initial: { opacity: 1 },
    // animate: { color: "#F765AE" },
  };

  const projectTypes = [...new Set(data.map((project) => project.projectType[0]))];

  return (
    <div className={styles["project-container"]}>
      {projectTypes.map((type) => {
        const filteredProjects = data.filter((project) => project.projectType[0] === type);

        return (
          <section key={type}>
            <div className={styles.sectionHeading}>
              <FlipText string={type} />
            </div>

            {filteredProjects.map((project, index) => (
              <Link to={`/work/${project.slug.current}`}>
                <motion.div
                  className={`${styles.project} link`}
                  key={index}
                  animate="initial"
                  whileHover="animate"
                  variants={variants}
                >
                  <FlipText string={`0${index + 1}`} />

                  <div className={styles["title-container"]}>
                    <FlipText string={project.name} />
                    {project.thumbnail && (
                      // <img className={styles.thumbnail} src={getFileSrc(project.thumbnail, { width: 30 })} alt="" />
                      <div className="thumbnail">
                        <MaskSplitImage source={getFileSrc(project.thumbnail, { width: 30 })} />
                      </div>
                    )}
                    {project.imagegallery?.map((image) => {
                      return (
                        <div className="thumbnail">
                          <MaskSplitImage source={getFileSrc(image, { width: 30 })} />
                        </div>
                      );
                    })}
                  </div>

                  <FlipText string={`${project.year}`} />

                  <ul className={styles.categories}>
                    {project.categories &&
                      categoriesMapping.map(
                        ({ key, title }) =>
                          project.categories.includes(key) && (
                            <li key={key} className={styles.category}>
                              <FlipText string={title} />
                            </li>
                          )
                      )}
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
