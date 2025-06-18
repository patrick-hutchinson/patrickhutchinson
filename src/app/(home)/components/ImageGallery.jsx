import styles from "../home.module.css";

import ImageTrail from "@components/ImageTrail/ImageTrail";

export default function ImageGallery() {
  return (
    <div className={styles["imagetrail-section-container"]}>
      <div style={{ background: "#000", width: "50%", padding: "5px", color: "#fff" }}>Image Gallery:</div>
      <div className={styles["imagetrail-container"]}>
        <div className={styles["running-notice"]}>Swipe the Page!</div>
        <ImageTrail />
      </div>
    </div>
  );
}
