import React, { useEffect, useRef, useState, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { GlobalStateContext } from "assets/context/GlobalStateContext";

import styles from "./Public.module.css";

import FlipText from "assets/components/Animations/FlipText";

import { sortByDate } from "assets/utils/sortByDate";
import DesktopListItem from "./components/DesktopListItem";
import MobileListItem from "./components/MobileListItem";

export default function Public() {
  const { experience } = useContext(DataContext);
  const { news } = useContext(DataContext);
  const { isMobile } = useContext(GlobalStateContext);

  const data = [
    { title: "Public", items: news },
    { title: "Experience", items: experience },
  ];

  if (!data) return;

  return (
    <main>
      <div className={styles.container}>
        {data.map((section, sectionIndex) => (
          <div className={styles.wrapper} key={sectionIndex}>
            <h2>
              <FlipText string={section.title} />
            </h2>
            <br />

            {section.items
              .sort(sortByDate)
              .map((item, itemIndex) =>
                isMobile ? (
                  <MobileListItem key={itemIndex} item={item} itemIndex={itemIndex} />
                ) : (
                  <DesktopListItem key={itemIndex} item={item} itemIndex={itemIndex} />
                )
              )}
          </div>
        ))}
      </div>
    </main>
  );
}
