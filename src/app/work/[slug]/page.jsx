import Project from "./project";
import sanityClient from "/src/client";

export async function generateStaticParams() {
  const projects = await sanityClient.fetch(`*[_type=="project"]{ slug }`);
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default function ProjectPage({ params }) {
  return <Project slug={params.slug} />;
}
