"use client";

import React from "react";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
// import "@mux/mux-player/dist/styles.css";

import { useState } from "react";

const RenderMedia = React.memo(function RenderMedia({ medium }) {
  let [isLoaded, setIsLoaded] = useState(false);

  if (!medium) return; // Handle early return

  //Render

  // Handle Sanity Image
  if (medium.type === "image") {
    return (
      <div style={{ position: "relative", width: "auto", height: "100%", maxWidth: "100%" }}>
        <Image
          unoptimized
          src={medium.url}
          alt="image"
          width={medium.width ? medium.width : 800}
          height={medium.height ? medium.height : 800}
          // fill
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  // Handle Mux Video
  if (medium.type === "video") {
    if (medium.status !== "ready") {
      return <p>Video is processing, please wait!</p>;
    }

    return (
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {!isLoaded && (
            <Image
              src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=20`}
              fill
              alt="placeholder image"
              unoptimized
              style={{
                objectFit: "cover",
                filter: "blur(3px)",
                opacity: isLoaded ? 0 : 1,
                zIndex: 1,
              }}
            />
          )}
          <MuxPlayer
            playbackId={medium.playbackId}
            autoPlay
            loop
            muted
            controls={false}
            onLoadedMetadata={() => setIsLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
        </div>
      </div>
    );
  }
});

export default RenderMedia;
