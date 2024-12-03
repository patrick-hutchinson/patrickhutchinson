import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "/src/client.js"; // Adjust this based on your file structure

const builder = imageUrlBuilder(sanityClient);

export function getFileSrc(file) {
  const projectID = builder.options.projectId;
  const dataset = builder.options.dataset;

  const type = file._type;

  if (type === "file") {
    const [_prefix, fileId, extension] = file.asset._ref.split("-");
    return `https://cdn.sanity.io/files/${projectID}/${dataset}/${fileId}.${extension}`;
  } else if (type === "image") {
    const [_prefix, fileId, resolution, extension] = file.asset._ref.split("-");
    return `https://cdn.sanity.io/images/${projectID}/${dataset}/${fileId}-${resolution}.${extension}`;
  }
  return null; // Handle cases where `file._type` is neither "file" nor "image"
}
