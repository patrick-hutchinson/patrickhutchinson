import React, { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageTrail.module.css";
import { getPointerPos, getMouseDistance, lerp, getNewPosition } from "./utils/utils";

import { DataContext } from "assets/context/DataContext";
import RenderMedia from "../../utils/RenderMedia";

const ImageTrail = () => {
  const { data } = useContext(DataContext);
  const containerRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const threshold = 40;
  let scaleRange = { min: 1.8, max: 2.2 };
  let rotationRange = { min: -10, max: 10 };

  let [imageCounter, setImageCounter] = useState(0);
  let [imageArray, setImageArray] = useState([]);

  const handleMouseMove = (event) => {
    const containerRect = containerRef.current.getBoundingClientRect();

    let x, y;

    if (event.touches) {
      const pos = getPointerPos(event.touches[0]);
      x = pos.x - containerRect.left;
      y = pos.y - containerRect.top;
    } else {
      x = event.clientX - containerRect.left;
      y = event.clientY - containerRect.top;
    }

    mousePos.current = { x, y };

    const distance = getMouseDistance(mousePos.current, lastMousePos.current);

    if (distance > threshold) {
      setImageCounter((prevCounter) => (prevCounter + 1) % data.length);
      lastMousePos.current = { ...mousePos.current };

      const randomScale = Math.random() * (scaleRange.max - scaleRange.min) + scaleRange.min;
      const randomRotation = Math.random() * (rotationRange.max - rotationRange.min) + rotationRange.min;

      setImageArray((prevImages) => {
        const newImage = {
          x,
          y,
          zIndex: prevImages.length + 1,
          index: imageCounter,
          randomScale,
          randomRotation,
          uniqueId: Date.now(),
        };

        return prevImages.length >= data.length ? [...prevImages.slice(1), newImage] : [...prevImages, newImage];
      });
    }
  };

  const variants = {
    initial: { scale: 0, rotateZ: -1 },
    animate: ({ scale, rotation }) => ({
      scale: scale,
      rotateZ: rotation,
      transition: { duration: 0.2, ease: "easeInOut" },
    }),
    exit: { scale: 0, rotateZ: -1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  if (!data) return;

  return (
    <div className={styles.container} onMouseMove={handleMouseMove} ref={containerRef}>
      <AnimatePresence>
        {imageArray.map((image) => {
          return (
            <motion.div
              key={image.uniqueId}
              className={styles["content__img"]}
              style={{
                x: image.x - (180 * image.randomScale) / 2,
                y: image.y - ((180 / 1.59) * image.randomScale) / 2,
                zIndex: image.zIndex,
              }}
              variants={variants}
              custom={{ scale: image.randomScale, rotation: image.randomRotation }} // Pass an object
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles["content__img-inner"]}>
                <RenderMedia medium={data[image.index].coverimage} />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className={styles["project-info"]}>
        <div>{data[imageCounter].name}</div>
        <div>{data[imageCounter].year}</div>
      </div>
    </div>
  );
};

export default ImageTrail;
