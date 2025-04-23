import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "/src/client.js";

const builder = imageUrlBuilder(sanityClient);

export function getFileSrc(file, dimensions) {
  const type = file._type;

  if (type === "file") {
    const [_prefix, fileId, extension] = file.asset._ref.split("-");
    const projectID = builder.options.projectId;
    const dataset = builder.options.dataset;
    return `https://cdn.sanity.io/files/${projectID}/${dataset}/${fileId}.${extension}`;
  }

  if (type === "image") {
    let image = builder.image(file);
    if (dimensions?.width) {
      image = image.width(dimensions.width);
    }
    return image.url();
  }

  return null;
}
