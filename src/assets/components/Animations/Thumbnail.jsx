import { motion } from "framer-motion";
import MaskSplitImage from "./MaskSplitImage";

import { GlobalStateContext } from "assets/context/GlobalStateContext";
import { useContext } from "react";

export default function Thumbnail({ source, zIndex }) {
  const { isMobile } = useContext(GlobalStateContext);

  const thumbnailVariants = {
    initialThumbnail: { scale: 1 },
    animateThumbnail: {
      zIndex: zIndex,
      scale: isMobile ? 5 : 12,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exitThumbnail: {
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <motion.div className="thumbnail" variants={thumbnailVariants}>
      <MaskSplitImage source={source} />
    </motion.div>
  );
}
