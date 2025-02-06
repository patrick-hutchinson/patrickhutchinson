import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import sanityClient from "/src/client.js";
import { renderMedia } from "assets/utils/renderMedia";

import ImageTrail from "assets/components/ImageTrail/ImageTrial";

import styles from "./Work.module.css";
import Loading from "assets/components/Loading/Loading";
import { getFileSrc } from "assets/utils/getFileSrc";

import { Link } from "react-router-dom";

export default function Work() {
  let [data, setData] = useState();
  let parentRef = useRef();

  let mediaContainer = useRef();
  let mediaOutlet = useRef();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          coverimage,
          thumbnail,
          url,
          name,
          slug
        }`
      )
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch(console.error);
  }, []);

  // Early return if data is undefined or empty
  if (!data) return <Loading />;

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
        <img src="" alt="" ref={mediaOutlet} />
      </div>

      <div className={styles["project-container"]}>
        {data.map((project, index) => {
          return (
            <div key={index} className={styles.project}>
              <Link to={`/work/${project.slug.current}`}>
                <span
                  onMouseEnter={() => handleMouseEnter(project)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  className={styles["project-title"]}
                >
                  {project.name}
                </span>
              </Link>
              <span className="thumbnail">{renderMedia(project.coverimage)}</span>
              {index !== data.length - 1 && ","}
            </div>
          );
        })}
      </div>

      {/* <ImageTrail parentRef={parentRef} /> */}
    </div>
  );
}
