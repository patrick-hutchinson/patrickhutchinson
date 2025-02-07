import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { DataContext } from "assets/context/WorkContext";
import { getFileSrc } from "assets/utils/getFileSrc";
import { renderMedia } from "assets/utils/renderMedia";

import Loading from "assets/components/Loading/Loading";
import ImageTrail from "assets/components/ImageTrail/ImageTrial";

import styles from "./Work.module.css";

export default function Work() {
  const data = useContext(DataContext);
  const projectContainer = useRef();
  let parentRef = useRef();

  let mediaContainer = useRef();
  let mediaOutlet = useRef();

  // Early return if data is undefined or empty
  if (!data) return;

  function handleMouseEnter(project) {
    mediaContainer.current.style.display = "block";
    mediaOutlet.current.src = getFileSrc(project.coverimage);
  }

  function handleMouseLeave(e) {
    mediaContainer.current.style.display = "none";
    mediaOutlet.current.src = "";
  }

  return (
    <div ref={parentRef} className={styles.container}>
      <div className={styles.mediaContainer} ref={mediaContainer}>
        <video autoPlay muted loop>
          <source src="" alt="" ref={mediaOutlet} type="mp4"></source>
        </video>
      </div>

      <div className={styles["project-container"]} ref={projectContainer}>
        {data.map((project, index) => {
          return (
            <motion.div
              key={index}
              className={styles.project}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              exit={{ rotateX: -90, transition: { duration: 0.4, ease: "easeInOut" } }}
            >
              <Link to={`/work/${project.slug.current}`}>
                <span
                  onMouseEnter={() => handleMouseEnter(project)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className={styles["project-title"]}
                >
                  {project.name}
                </span>
              </Link>
              <span className="thumbnail">{renderMedia(project.thumbnail)}</span>
              {index !== data.length - 1 && ","}
            </motion.div>
          );
        })}
      </div>

      {/* <ImageTrail parentRef={parentRef} /> */}
    </div>
  );
}
