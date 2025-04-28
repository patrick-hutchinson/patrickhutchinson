import { useRef, useState } from "react";

import { motion } from "framer-motion";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { getFileSrc } from "assets/utils/getFileSrc";

import FlipText from "assets/components/Animations/FlipText";
import Thumbnail from "assets/components/Animations/Thumbnail";

import styles from "../Public.module.css";

export default function MobileListItem({ item, itemIndex }) {
  const zIndex = useRef(100);

  const [clicked, setClicked] = useState(false);
  function handleZIndex() {
    zIndex.current += 1;
    console.log("toggling size");
    setClicked((prevClicked) => {
      return !prevClicked;
    });
  }

  return (
    <motion.div
      key={itemIndex}
      className={styles.listItem}
      onClick={() => {
        handleZIndex();
      }}
    >
      <div className={styles.date}>
        <FlipText string={`${formatMonth(item.month)}`} />
        <FlipText string={`${formatYear(item.year)}`} />
      </div>

      <motion.div
        initial="initialThumbnail"
        animate={clicked ? "animateThumbnail" : "initialThumbnail"}
        exit="exitThumbnail"
      >
        <Thumbnail source={getFileSrc(item.thumbnail, { width: 300 })} zIndex={zIndex.current} />
      </motion.div>

      <div className={styles.name}>
        <FlipText string={item.name} />
      </div>
    </motion.div>
  );
}
