import React, { useRef, useEffect } from "react";

import styles from "../ImageTrail.module.css";

const ImageComponent = React.forwardRef(({ imgSrc, innerRef }, ref) => {
  const innerImageRef = useRef(null); // Reference to the inner image element

  return (
    <div className={styles["content__img"]} ref={ref}>
      <img className={styles["content__img-inner"]} ref={innerRef || innerImageRef} src={imgSrc}></img>
    </div>
  );
});

export default ImageComponent;
