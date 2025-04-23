import FlipText from "../Animations/FlipText";

export default function Categories({ project }) {
  let categoriesMapping = [
    { key: "WebDesign", title: "Web Design" },
    { key: "Development", title: "Development" },
    { key: "MotionDesign", title: "Motion Design" },
    { key: "InteractionDesign", title: "Interaction Design" },
    { key: "Poster", title: "Poster" },
    { key: "TypeDesign", title: "Type Design" },
    { key: "Editorial", title: "Editorial" },
  ];
  return (
    project.categories &&
    categoriesMapping.map(
      ({ key, title }) =>
        project.categories.includes(key) && (
          <li key={key} className="category">
            <FlipText string={title} />
          </li>
        )
    )
  );
}
