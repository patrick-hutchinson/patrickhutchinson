import React, { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageTrail.module.css";
import { getPointerPos, getMouseDistance, lerp, getNewPosition } from "./utils/utils";

import { DataContext } from "assets/context/WorkContext";
import { getFileSrc } from "/src/assets/utils/getFileSrc";

const ImageTrail = () => {
  const data = useContext(DataContext);
  const containerRef = useRef();

  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const threshold = 40;

  const maxImagesVisible = 7;
  const [visibleImageCount, setVisibleImagesCount] = useState(0);

  let [imageCounter, setImageCounter] = useState(0);
  let [imageArray, setImageArray] = useState([]);

  const handleMouseMove = (event) => {
    if (event.touches) {
      mousePos.current = getPointerPos(event.touches[0]);
    } else {
      mousePos.current = { x: event.clientX, y: event.clientY };
    }

    const distance = getMouseDistance(mousePos.current, lastMousePos.current);

    if (distance > threshold) {
      setImageCounter((prevCounter) => (prevCounter + 1) % data.length);

      lastMousePos.current = { ...mousePos.current };

      let randomScale = Math.random() * (1.3 - 0.7) + 0.7;
      let randomRotation = Math.random() * (4 - -4) + -4;
      setImageArray((prevImages) => {
        const newImage = {
          x: mousePos.current.x,
          y: mousePos.current.y,
          zIndex: prevImages.length + 1,
          index: imageCounter,
          randomScale: randomScale,
          randomRotation: randomRotation,
          uniqueId: Date.now(), // Generate a unique key
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
    <div ref={containerRef} className={styles.container} onMouseMove={handleMouseMove}>
      <AnimatePresence>
        {imageArray.map((image) => {
          console.log(image.index); // Now it will log properly

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
              <img className={styles["content__img-inner"]} src={getFileSrc(data[image.index].thumbnail)} alt="" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ImageTrail;
