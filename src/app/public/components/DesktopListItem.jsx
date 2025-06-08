import { useRef } from "react";

import { motion } from "framer-motion";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { getFileSrc } from "assets/utils/getFileSrc";

import FlipText from "assets/components/Animations/FlipText";
import Thumbnail from "assets/components/Animations/Thumbnail";

import styles from "../Public.module.css";

export default function DesktopListItem({ item, itemIndex }) {
  const zIndex = useRef(100);

  function handleZIndex() {
    zIndex.current += 1;
  }

  return (
    <motion.div
      key={itemIndex}
      className={styles.listItem}
      initial="initialThumbnail"
      whileHover="animateThumbnail"
      exit="exitThumbnail"
      onMouseEnter={() => handleZIndex()}
    >
      <div className={styles.date}>
        <FlipText string={`${formatMonth(item.month)}`} />
        <FlipText string={`${formatYear(item.year)}`} />
      </div>
      <div className={styles.name}>
        <FlipText string={item.name} />
        <Thumbnail source={getFileSrc(item.thumbnail, { width: 300 })} zIndex={zIndex.current} />
      </div>
    </motion.div>
  );
}
