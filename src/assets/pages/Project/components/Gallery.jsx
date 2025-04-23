import styles from "../Project.Module.css";
import { renderMedia } from "assets/utils/renderMedia";

export default function Gallery({ project }) {
  let index = 0;

  return (
    project.gridStructure &&
    project.gridStructure.map((columnsInRow, rowIndex) => {
      const rowImages = project.imagegallery.slice(index, index + columnsInRow); // Slice the images for each row
      index += columnsInRow; // Update the index for the next row

      const rowStyles = {
        gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`, // Use the value from gridStructure for this row
      };

      return (
        <div key={rowIndex} className={styles.galleryRow} style={rowStyles}>
          {rowImages.map((image, index) => (
            <div key={index}> {renderMedia(image)} </div>
          ))}
        </div>
      );
    })
  );
}
