import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import styles from "./ProjectNavigation.module.css";
import { Link } from "react-router-dom";

import { renderMedia } from "../../../../utils/renderMedia";

export default function ProjectNavigation({ projects }) {
  // 3D-Perspecitve Thumbnail Effect
  useEffect(() => {
    let constrain = 20;
    let mouseOverContainer = document.querySelector("body");
    let thumbnailImages = document.querySelectorAll(`${`.${styles.projectNavigation}`} .media`);

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

  // Early return if data is undefined or empty
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  return (
    <div className={styles.projectNavigation}>
      {projects.map((project) => (
        <Link to={project.slug} key={project.slug}>
          {renderMedia(project.coverimage)}
        </Link>
      ))}
    </div>
  );
}
