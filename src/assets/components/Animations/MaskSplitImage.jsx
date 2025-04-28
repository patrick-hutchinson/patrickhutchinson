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

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ margin: "-100px 0px -50px 0px" }}
      className="imagecontainer"
    >
      {/* <picture> */}
      <motion.img src={source} alt="" variants={variants} />
      {/* </picture> */}
    </motion.div>
  );
}
