import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./ImageTrail.module.css";
import { getPointerPos, getMouseDistance, getNewPosition, lerp } from "./utils/utils";
import ImageComponent from "./utils/ImageComponent";

import { getFileSrc } from "/src/assets/utils/getFileSrc";

const ImageTrail = ({ projects }) => {
  const containerRef = useRef(null); // Reference to the container div
  const imagesRef = useRef([]); // Use a ref to store images
  const mousePos = useRef({ x: 0, y: 0 }); // Mouse position
  const lastMousePos = useRef({ x: 0, y: 0 }); // Last position where an image was triggered
  const cacheMousePos = useRef({ x: 0, y: 0 }); // Smoothed mouse position
  const [zIndexVal, setZIndexVal] = useState(1); // Tracks z-index for image stacking
  const [visibleImagesCount, setVisibleImagesCount] = useState(0);
  const threshold = 200; // Distance to trigger the next image
  const visibleImagesTotal = 5; // Max visible images at a time
  const animationRefs = useRef([]); // Store GSAP animations for cleanup
  const imgPositionRef = useRef(0);

  useEffect(() => {
    const handlePointerMove = (ev) => {
      if (ev.touches) {
        mousePos.current = getPointerPos(ev.touches[0]);
      } else {
        mousePos.current = getPointerPos(ev);
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const imageElements = Array.from(container.querySelectorAll(".content__img"));
      imagesRef.current = imageElements;

      const render = () => {
        const distance = getMouseDistance(mousePos.current, lastMousePos.current);

        cacheMousePos.current.x = lerp(cacheMousePos.current.x || mousePos.current.x, mousePos.current.x, 0.3);
        cacheMousePos.current.y = lerp(cacheMousePos.current.y || mousePos.current.y, mousePos.current.y, 0.3);

        if (distance > threshold) {
          showNextImage();
          lastMousePos.current = { ...mousePos.current };
        }

        requestAnimationFrame(render);
      };

      render();
    }
  }, []);

  const showNextImage = () => {
    setZIndexVal((prev) => prev + 1);

    imgPositionRef.current = imgPositionRef.current < imagesRef.current.length - 1 ? imgPositionRef.current + 1 : 0;
    const img = imagesRef.current[imgPositionRef.current];

    setVisibleImagesCount((prev) => prev + 1);

    if (img) {
      const rect = img.getBoundingClientRect();
      const scaleValue = gsap.utils.random(0.8, 1.2);

      const animation = gsap
        .timeline({
          onStart: () => onImageActivated(),
          onComplete: () => onImageDeactivated(),
        })
        .fromTo(
          img,
          {
            scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
            rotationZ: 0,
            opacity: 1,
            zIndex: zIndexVal,
            x: cacheMousePos.current.x - rect.width / 2,
            y: cacheMousePos.current.y - rect.height / 2,
          },
          {
            duration: 0.4,
            ease: "power3",
            scale: scaleValue,
            rotationZ: gsap.utils.random(-3, 3),
            x: mousePos.current.x - rect.width / 2,
            y: mousePos.current.y - rect.height / 2,
          },
          0
        );

      animationRefs.current.push(animation);
    }
  };

  useEffect(() => {
    if (visibleImagesCount > visibleImagesTotal) {
      const lastInQueue = getNewPosition(imgPositionRef.current, visibleImagesTotal, imagesRef.current);
      const lastImage = imagesRef.current[lastInQueue];

      if (lastImage) {
        console.log("There's a last image");
        gsap.to(lastImage, {
          duration: 0.4,
          ease: "power4",
          opacity: 0,
          scale: 0.7,
        });
      }
    }
  }, [visibleImagesCount]);

  const onImageActivated = () => {
    // Handle activation logic if needed
  };

  const onImageDeactivated = () => {
    console.log("deactivating image!");
    setVisibleImagesCount((prev) => prev - 1);
  };

  return (
    <div ref={containerRef} className="content">
      {projects.map((project, index) => {
        console.log(getFileSrc(project.thumbnail)); // Log the value here
        return (
          <ImageComponent
            key={index}
            imgSrc={getFileSrc(project.thumbnail)}
            ref={(el) => {
              if (el) imagesRef.current[index] = el;
            }}
          />
        );
      })}
    </div>
  );
};

export default ImageTrail;
