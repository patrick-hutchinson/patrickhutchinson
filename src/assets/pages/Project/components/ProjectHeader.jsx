import styles from "../Project.module.css";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

import FlipText from "assets/components/Animations/FlipText";

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
      <h2>
        <FlipText string={`${formatMonth(project.month)}`} />
        <FlipText string={`${formatYear(project.year)}`} />
      </h2>
    </div>
  );
}
