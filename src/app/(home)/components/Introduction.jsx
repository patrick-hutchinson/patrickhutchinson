import styles from "../home.module.css";
import ImageTrail from "../../../assets/components/ImageTrail/ImageTrail";

import MaskSplitText from "../../../assets/components/Animations/MaskSplitText";

export default function Introduction() {
  return (
    <div>
      <div style={{ background: "#000", width: "50%", padding: "5px", color: "#fff" }}>Introduction:</div>
      <div className={`grid-12 ${styles["introduction-container"]}`}>
        {/* <ImageTrail /> */}
        <div className={`${styles["running-notice"]} col-span-10`}>
          <MaskSplitText>
            <h2>
              Patrick Hutchinson (GER) is a graphic designer and front-end developer based in Amsterdam (NED). He
              specializes in web-, interaction- and type design and mostly uses code, visual programming, and
              animation-based tools to build his work.
            </h2>
          </MaskSplitText>
        </div>
        <div className="col-span-2" style={{ marginTop: "25px" }}>
          <ul>
            <li>
              <MaskSplitText>
                <a href="">Instagram</a>
              </MaskSplitText>
            </li>
            <li>
              <MaskSplitText>
                <a href="">LinkedIn</a>
              </MaskSplitText>
            </li>
            <li>
              <MaskSplitText>
                <a href="">Email</a>
              </MaskSplitText>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
