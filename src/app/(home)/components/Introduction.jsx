import styles from "../home.module.css";

export default function Introduction() {
  return (
    <div>
      <div style={{ background: "#000", width: "50%", padding: "5px", color: "#fff" }}>Introduction:</div>
      <div className="grid-12">
        <p className={`${styles["running-notice"]} col-span-10`}>
          Patrick Hutchinson (GER) is a graphic designer and front-end developer based in Amsterdam (NED). He
          specializes in web-, interaction- and type design and mostly uses code, visual programming, and
          animation-based tools to build his work.
        </p>
        <div className="col-span-2" style={{ marginTop: "25px" }}>
          <ul>
            <li>
              <a href="">Instagram</a>
            </li>
            <li>
              <a href="">LinkedIn</a>
            </li>
            <li>
              <a href="">Email</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
