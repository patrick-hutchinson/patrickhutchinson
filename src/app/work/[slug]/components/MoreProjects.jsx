import React from "react";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import MaskSplitContainer from "@animations/MaskSplitContainer";
import styles from "../project.module.css";

import RenderMedia from "@components/RenderMedia";

import Image from "next/image";

export default function MoreProjects({ projects }) {
  const moreprojectsRef = useRef(null);

  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setVideoHeight(300 * 0.56);
    };

    updateHeight(); // set initial value
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  function handlePan(direction) {
    if (direction === "left") {
      moreprojectsRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
    if (direction === "right") {
      moreprojectsRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  }

  const BlurVideo = ({ medium }) => {
    return (
      <Image
        src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=500`}
        fill
        alt="placeholder image"
        unoptimized
        style={{
          objectFit: "cover",
          filter: "blur(13px)",
          zIndex: 0,
          position: "absolute",
          transform: "scale(1.5)",
        }}
      />
    );
  };

  const BlurImage = ({ medium }) => {
    return (
      <Image
        unoptimized
        src={medium.url}
        alt="image"
        // width={medium.width ? medium.width : 800}
        // height={medium.height ? medium.height : 800}
        fill
        // fill
        placeholder="blur"
        blurDataURL={medium.lqip}
        style={{
          objectFit: "cover",
          filter: "blur(13px)",
          zIndex: 0,
          position: "absolute",
          transform: "scale(1.5)",
        }}
      />
    );
  };

  const ProjectList = () => (
    <div className={styles["moreprojects-wrapper"]}>
      <div className={styles["moreprojects"]} ref={moreprojectsRef}>
        {projects.map((project, index) => {
          return (
            <Link href={`/work/${project.slug.current}`} key={index}>
              <MaskSplitContainer>
                <div
                  style={{
                    height: "400px",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: project.coverimage ? "300px" : 0,
                  }}
                >
                  {project?.coverimage?.type === "video"
                    ? project.coverimage && <BlurVideo medium={project.coverimage} />
                    : project.coverimage && <BlurImage medium={project.coverimage} />}
                  <div
                    style={{
                      height: videoHeight + "px",
                      position: "relative",
                      top: "50%",
                      transform: "translateY(-50%) ",
                    }}
                  >
                    {project.coverimage && <RenderMedia medium={project.coverimage} />}
                  </div>
                </div>
              </MaskSplitContainer>
            </Link>
          );
        })}
      </div>

      <div className={`${styles["navigation-wrapper"]}`}>
        <div className={`${styles.panButton}`} onClick={() => handlePan("left")}>
          <img src="/assets/images/arrow-left.svg" alt="arrow-left" />
        </div>
        <div className={`${styles.panButton}`} onClick={() => handlePan("right")}>
          <img src="/assets/images/arrow-right.svg" alt="arrow-right" />
        </div>
      </div>
    </div>
  );
  return (
    <section>
      <ProjectList />
    </section>
  );
}
