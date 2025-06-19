import styles from "../project.module.css";

import { motion } from "framer-motion";

import { formatMonth } from "@utils/formatMonth";
import { formatYear } from "@utils/formatYear";

import MaskSplitContainer from "@animations/MaskSplitContainer";

import FlipText from "@animations/FlipText";

export default function ProjectHeader({ project }) {
  return (
    <div className={styles.projectHeader}>
      <div>
        <div className={styles["section-header"]}>
          <FlipText string="Title" />
        </div>
        <h2>
          <FlipText string={project.name} />
        </h2>
      </div>

      <div>
        <div className={styles["section-header"]}>
          <FlipText string="Date" />
        </div>
        <h2>
          <FlipText string={`${formatMonth(project.month)}`} />
          <FlipText string={`${formatYear(project.year)}`} />
        </h2>
      </div>
    </div>
  );
}
