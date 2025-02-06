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
  if (!data) return <Loading />;

  function handleMouseEnter(event, project) {
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
        <img src="" alt="" ref={mediaOutlet} />
      </div>

      <div className={styles["project-container"]} ref={projectContainer}>
        {data.map((project, index) => {
          return (
            <motion.div
              key={index}
              className={styles.project}
              initial={{ animation: "flipFrontOut 0.4s ease-in-out 0s 1 forwards" }}
              animate={{ animation: "flipFrontIn 0.4s ease-in-out 0s 1 forwards" }}
              exit={{ animation: "flipFrontOut 0.4s ease-in-out 0s 1 forwards" }}
            >
              <Link to={`/work/${project.slug.current}`}>
                <span
                  onMouseEnter={(event) => handleMouseEnter(event, project)}
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
