import React from "react";
import { useEffect, useState, useRef } from "react";

import sanityClient from "/src/client.js";

import styles from "./Opening.module.css";
import { renderMedia } from "assets/utils/renderMedia";
import ImageTrail from "../Home/components/About/components/ImageTrail/ImageTrail";

export default function Opening() {
  let [work, setWork] = useState();

  let containerRef = useRef();
  let thumbnailsRef = useRef([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
        thumbnail,
        coverimage
    }`
      )
      .then((data) => setWork(data))
      .catch(console.error);
  }, []);

  let constrain = 200;

  const mouseOverContainer = document.querySelector("body");
  const thumbnailImages = thumbnailsRef.current;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    thumbnailsRef.current.forEach((image, index) => {
      if (image) {
        console.log(image.parentElement);
        image.parentElement.style.top = `${Math.max(150, Math.random() * window.innerHeight - 200)}px`;
        image.parentElement.style.left = `${Math.max(150, Math.random() * window.innerWidth - 200)}px`;
      }
    });
  }, [work]);

  if (!work) return <p>Loading...</p>;

  let ImageContainer = () => {
    return (
      <>
        {work.map((project, index) => {
          return (
            <div className={styles.thumbnailContainer}>
              <div className={styles.thumbnailImage} ref={(el) => (thumbnailsRef.current[index] = el)} key={index}>
                {renderMedia(project.coverimage)}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <section className={styles.openingSection} ref={containerRef}>
      <ImageTrail data={work} parentRef={containerRef} />
      {/* <ImageContainer /> */}
    </section>
  );
}
