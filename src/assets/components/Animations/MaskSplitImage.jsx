import { motion } from "framer-motion";

export default function MaskSplitImage({ source }) {
  let variants = {
    initial: { y: "150%" },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exit: {
      y: "150%",
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const RenderFile = () => {
    const extension = source.split(".").pop().split("?")[0].toLowerCase();

    const imageExtensions = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp", "svg"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

    return imageExtensions.includes(extension) ? (
      <motion.img src={source} alt="Uploaded content" variants={variants} />
    ) : videoExtensions.includes(extension) ? (
      <motion.video autoPlay loop muted playsInline variants={variants}>
        <source src={source} type={`video/${extension}`} />
      </motion.video>
    ) : null;
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      viewport={{ margin: "-100px 0px -50px 0px" }}
      className="imagecontainer"
    >
      <RenderFile />
    </motion.div>
  );
}
