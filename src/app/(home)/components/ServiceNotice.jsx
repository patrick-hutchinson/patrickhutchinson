import styles from "../home.module.css";
import MaskSplitContainer from "@animtaions/MaskSplitContainer";
import MaskSplitText from "@animations/MaskSplitText";

const ServiceNotice = () => (
  <div>
    <MaskSplitContainer>
      <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px", width: "50%" }}>
        <div className="col-span-2">Approach and Services</div>
      </div>
    </MaskSplitContainer>
    <div className={styles["running-notice"]}>
      <MaskSplitText>
        <h2>
          Looking for details about tools, workflow, or included services? <br />
          This <a href="#">roadmap</a> outlines each step, including relevant competencies and software used. For any
          further inquiries, feel free to reach out via email.
        </h2>
      </MaskSplitText>
    </div>
  </div>
);

export default ServiceNotice;
