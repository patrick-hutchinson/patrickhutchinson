import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "/src/client.js"; // Adjust this based on your file structure

const builder = imageUrlBuilder(sanityClient);

export function renderMedia(file) {
  // !! Retrieve the Source of the Image from Sanity's Database
  const getFileSource = (file) => {
    const projectID = builder.options.projectId;
    const dataset = builder.options.dataset;

    const type = file._type;

    if (type === "file") {
      const [_prefix, fileId, extension] = file.asset._ref.split("-");
      return {
        src: `https://cdn.sanity.io/files/${projectID}/${dataset}/${fileId}.${extension}`,
        extension: extension,
      };
    } else if (type === "image") {
      const [_prefix, fileId, resolution, extension] = file.asset._ref.split("-");
      return {
        src: `https://cdn.sanity.io/images/${projectID}/${dataset}/${fileId}-${resolution}.${extension}`,
        extension: extension,
      };
    }
    return null; // Handle cases where `file._type` is neither "file" nor "image"
  };

  // !! Render an Image or a Video Element depending on the Media's type
  const renderFile = (fileInfo) => {
    if (!fileInfo) return null; // Handle null or undefined `fileInfo`

    const { src, extension } = fileInfo;

    const imageExtensions = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp", "svg"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

    return imageExtensions.includes(extension) ? (
      <img src={src} alt="Uploaded content" className="media" />
    ) : videoExtensions.includes(extension) ? (
      <video autoPlay loop muted playsInline className="media">
        <source src={src} type={`video/${extension}`} />
      </video>
    ) : null;
  };

  const fileInfo = getFileSource(file); // Generate `fileInfo` here
  return renderFile(fileInfo); // Pass `fileInfo` into `renderFile` and return the result
}
