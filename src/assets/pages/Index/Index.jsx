import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import styles from "./Index.module.css";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { getFileSrc } from "assets/utils/getFileSrc";
import { sortByDate } from "assets/utils/sortByDate";

import FlipText from "assets/components/Animations/FlipText";

import Thumbnail from "assets/components/Animations/Thumbnail";
import Categories from "assets/components/Categories/Categories";

export default function Index() {
  const { data } = useContext(DataContext);
  if (!data) return null;

  const projectTypes = [...new Set(data.map((project) => project.projectType[0]))];

  return (
    <main>
      <div className={styles["project-container"]}>
        <h2 className={styles["container-title"]}>
          <FlipText string="INDEX" />
        </h2>
        {projectTypes.map((type) => {
          const filteredProjects = data.filter((project) => project.projectType[0] === type);

          return (
            <section key={type}>
              <div className={styles.sectionHeading}>
                <FlipText string={type} />
              </div>

              {filteredProjects.sort(sortByDate).map((project, index) => (
                <Link to={`/work/${project.slug.current}`}>
                  <motion.div className={`${styles.project} link`} key={index} animate="initial" whileHover="animate">
                    <FlipText string={`0${index + 1}`} />

                    <div className={styles["title-container"]}>
                      <FlipText string={project.name} />
                      {project.thumbnail && <Thumbnail source={getFileSrc(project.thumbnail, { width: 30 })} />}
                      {project.imagegallery?.map((image) => {
                        return <Thumbnail source={getFileSrc(image, { width: 30 })} />;
                      })}
                    </div>

                    <FlipText string={`${project.year}`} />

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
    </main>
  );
}
