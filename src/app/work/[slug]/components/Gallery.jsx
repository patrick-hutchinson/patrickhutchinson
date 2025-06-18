import MaskSplitImage from "@animations/MaskSplitImage";
import styles from "../project.module.css";
import RenderMedia from "@components/RenderMedia";

export default function Gallery({ project }) {
  let index = 0;

  return (
    <div className={styles.gallery}>
      <h5 className={styles["section-header"]}>More Images</h5>
      {project.gridStructure.map((columnsInRow, rowIndex) => {
        const rowImages = project.imagegallery.slice(index, index + columnsInRow);
        index += columnsInRow;

        const rowStyles = {
          gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`,
        };

        return (
          <div key={rowIndex} className={styles.galleryRow} style={rowStyles}>
            {rowImages.map((image, index) => (
              <div key={index}>{<RenderMedia medium={image} />}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
