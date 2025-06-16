import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [news, setNews] = useState(null);
  const [ongoing, setOngoing] = useState(null);
  const [experience, setExperience] = useState(null);
  const [home, setHome] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{ _id, name, coverimage {
  "type": type,
  "url": select(
    type == "image" && defined(image.asset) => image.asset->url,
    true => null
  ),
  "lqip": select(
    type == "image" && defined(image.asset) => image.asset->metadata.lqip,
    true => null
  ),
  "playbackId": select(
    type == "video" && defined(video.asset) => video.asset->playbackId,
    true => null
  ),
  "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
  "assetId": select(
    type == "video" && defined(video.asset) => video.asset->assetId,
    true => null
  ),
  "status": select(
    type == "video" && defined(video.asset) => video.asset->status,
    true => null
  ),
  "_id": select(
    type == "video" && defined(video.asset) => video.asset->_id,
    type == "image" && defined(image.asset) => image.asset->_id,
    true => null
  )
}, coverimage_mobile, textcolor, imagegallery[]{
  "type": select(defined(image) => "image", defined(video) => "video"),
  "_id": select(
    defined(image.asset) => image.asset->_id,
    defined(video.asset) => video.asset->_id,
    true => null
  ),
  "url": select(defined(image.asset) => image.asset->url, true => null),
  "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
  "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
  "status": select(defined(video.asset) => video.asset->status, true => null),
  "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
  "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null)
}, gridStructure, month, year, url, categories, projectType, credits, showOnHomepage, slug }`
      )
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "home"]{
      _id,
      featuredProjects[]->{
        _id, name,
        coverimage {
  "type": type,
  "url": select(
    type == "image" && defined(image.asset) => image.asset->url,
    true => null
  ),
  "lqip": select(
    type == "image" && defined(image.asset) => image.asset->metadata.lqip,
    true => null
  ),
  "playbackId": select(
    type == "video" && defined(video.asset) => video.asset->playbackId,
    true => null
  ),
  "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
  "assetId": select(
    type == "video" && defined(video.asset) => video.asset->assetId,
    true => null
  ),
  "status": select(
    type == "video" && defined(video.asset) => video.asset->status,
    true => null
  ),
  "_id": select(
    type == "video" && defined(video.asset) => video.asset->_id,
    type == "image" && defined(image.asset) => image.asset->_id,
    true => null
  )
}, coverimage_mobile, thumbnail, textcolor, imagegallery[]{
  "type": select(defined(image) => "image", defined(video) => "video"),
  "_id": select(
    defined(image.asset) => image.asset->_id,
    defined(video.asset) => video.asset->_id,
    true => null
  ),
  "url": select(defined(image.asset) => image.asset->url, true => null),
  "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
  "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
  "status": select(defined(video.asset) => video.asset->status, true => null),
  "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
  "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null)
}, gridStructure, month, year, url, categories, projectType, credits, showOnHomepage, slug
      }
    }`
      )
      .then((fetchedData) => {
        setHome(fetchedData);
      })
      .catch(console.error);
  }, []);

  const fetchData = async (type, setter) => {
    sanityClient
      .fetch(
        `*[_type=="${type}"]{
              _id,
              name,
              "thumbnail": {
  "type": "image",
  "url": thumbnail.asset->url,
  "lqip": thumbnail.asset->metadata.lqip,
  "width": thumbnail.asset->metadata.dimensions.width,
  "height": thumbnail.asset->metadata.dimensions.height,
  "_id": thumbnail.asset->_id
},
              month,
              year, 
              url,
              ${type === "news" ? "imagegallery" : ""}
            }`
      )
      .then((fetchedData) => {
        setter(fetchedData); // Use the setter function passed in
      })
      .catch((error) => {
        console.error(`Failed to fetch ${type}:`, error);
      });
  };

  useEffect(() => {
    fetchData("news", setNews);
    fetchData("experience", setExperience);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "ongoing"]{ _id, name, month, year, projectType, location }`)
      .then((fetchedData) => {
        setOngoing(fetchedData);
      })
      .catch(console.error);
  }, []);

  return <DataContext.Provider value={{ data, experience, news, home, ongoing }}>{children}</DataContext.Provider>;
};
