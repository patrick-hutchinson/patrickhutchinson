import { motion } from "framer-motion";
import MaskSplitImage from "./MaskSplitImage";

import { StateContext } from "assets/context/StateContext";
import { useContext, useMemo } from "react";

export default function Thumbnail({ source, zIndex, index }) {
  const { isMobile } = useContext(StateContext);

  const randomScale = useMemo(() => Math.random() * (12 - 9) + 9, []);
  const randomRotation = useMemo(() => Math.random() * 20 - 10, []);

  const thumbnailVariants = {
    initialThumbnail: { scale: 1, rotate: 0 },
    animateThumbnail: {
      zIndex: index + 100,
      scale: isMobile ? 5 : randomScale,
      rotate: randomRotation,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: index * 0.025, // <-- half a second offset per index
      },
      left: index * 100,
    },
    exitThumbnail: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
      left: 0,
    },
  };

  return (
    <motion.div className="thumbnail" variants={thumbnailVariants}>
      <MaskSplitImage source={source} />
    </motion.div>
  );
}
