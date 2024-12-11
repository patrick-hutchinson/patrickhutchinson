import React, { useState, useRef, useEffect, useMemo } from "react";

import { renderMedia } from "assets/utils/renderMedia";

import ImageTrail from "assets/pages/About/components/ImageTrail/ImageTrail";

import styles from "./View3D.module.css";

export default function View3D({ projects }) {
  const [maxProjects, setMaxProjects] = useState(70); // Max number of projects to display

  let parentRef = useRef();
  let projectsRef = useRef([]);
  let Thumbnail = ({ project, index }) => {
    // Generate a random left value between 0 and (window.innerWidth - 300px)
    const randomLeft = Math.random() * (window.innerWidth - 200) + 100;
    const randomTop = Math.random() * (window.innerHeight - 200) + 100;

    // Externalize the dynamic styles to a constant
    const styleSheet = {
      left: `${randomLeft}px`,
      top: `${randomTop}px`,
      position: "absolute", // Ensure it can be positioned freely
    };

    return (
      <div className={styles.projectWrapper} style={styleSheet}>
        <div
          className={styles.projectPreview} // Apply external CSS
          key={index}
          index={index}
          ref={(el) => (projectsRef.current[index] = el)}
        >
          {renderMedia(project.thumbnail)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    let constrain = 50;
    let mouseOverContainer = parentRef.current;
    let thumbnailImages = projectsRef.current;

    function thumbnailTransforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - box.height / 2) / constrain;
      let calcY = (x - box.x - box.width / 2) / constrain;

      return "perspective(100px) " + "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
    }

    function transformThumbnailElement(el, xyEl) {
      el.style.transform = thumbnailTransforms.apply(null, xyEl);
    }

    mouseOverContainer.addEventListener("mousemove", (e) => {
      let xy = [e.clientX, e.clientY];

      thumbnailImages.forEach(function (thumbnailImage) {
        let position = xy.concat([thumbnailImage]);
        window.requestAnimationFrame(function () {
          transformThumbnailElement(thumbnailImage, position);
        });
      });
    });
  }, [projects]);

  const repeatedProjects = useMemo(
    () => Array.from({ length: maxProjects }, (_, index) => projects[index % projects.length]),
    [projects, maxProjects]
  );

  // Early return if data is undefined or empty
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  return (
    <div className={styles.view3D} ref={parentRef}>
      {/* <ImageTrail projects={projects} parentRef={parentRef} /> */}

      <div className={styles["view3D-container"]}>
        {repeatedProjects.map((project, index) => {
          return <Thumbnail project={project} index={index} key={index} />;
        })}
      </div>
    </div>
  );
}
