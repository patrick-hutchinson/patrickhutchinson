import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { getFileSrc } from "assets/utils/getFileSrc";

import MaskSplitImage from "assets/components/Animations/MaskSplitImage/MaskSplitImage";

import styles from "./Selected.module.css";

export default function Selected() {
  const { data } = useContext(DataContext);
  if (!data) return;

  console.log(data);

  return (
    <div>
      {data.map((project, index) => {
        return (
          <div key={index}>
            <div>{project.name}</div>

            <div className={styles.coverimage}>
              {project.thumbnail && <img src={getFileSrc(project.thumbnail)} />}
              {/* <video>
                <source src={getFileSrc(project.coverimage)} />
              </video> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
