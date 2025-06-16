"use client";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";

export default function RenderThumbnail({ medium }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!medium) return null;

  if (medium.type === "image") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "40px",
          maxHeight: "22px",
          height: "auto",
          aspectRatio: `${medium.width} / ${medium.height}`,
        }}
      >
        <Image
          fill
          unoptimized
          src={medium.url}
          alt="thumbnail"
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  if (medium.type === "video") {
    if (medium.status !== "ready") {
      return <p style={{ fontSize: "10px" }}>Video processing...</p>;
    }

    const aspectRatio = medium.width && medium.height ? medium.width / medium.height : 16 / 9;

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "40px",
          aspectRatio,
          maxHeight: "22px",
        }}
      >
        {!isLoaded && (
          <Image
            src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=20`}
            fill
            alt="placeholder thumbnail"
            unoptimized
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isLoaded ? 0 : 1,
              zIndex: 1,
              filter: "blur(3px)",
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <MuxPlayer
          playbackId={medium.playbackId}
          autoPlay
          controls={false}
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
          onLoadedMetadata={() => setIsLoaded(true)}
        />
      </div>
    );
  }

  return null;
}
