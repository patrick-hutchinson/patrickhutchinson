import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [news, setNews] = useState(null);
  const [experience, setExperience] = useState(null);
  const [home, setHome] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{ _id, name, coverimage, coverimage_mobile, textcolor, thumbnail, imagegallery, gridStructure, month, year, url, categories, projectType, credits, showOnHomepage, slug }`
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
        _id, name, coverimage, coverimage_mobile, thumbnail, textcolor, imagegallery, gridStructure, month, year, url, categories, projectType, credits, showOnHomepage, slug
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
              thumbnail,
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

  return <DataContext.Provider value={{ data, experience, news, home }}>{children}</DataContext.Provider>;
};
