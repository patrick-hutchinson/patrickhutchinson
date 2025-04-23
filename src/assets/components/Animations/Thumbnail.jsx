import { motion } from "framer-motion";
import MaskSplitImage from "./MaskSplitImage";

export default function Thumbnail({ source, zIndex }) {
  const thumbnailVariants = {
    initialThumbnail: { scale: 1 },
    animateThumbnail: {
      zIndex: zIndex,
      scale: 12,
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
