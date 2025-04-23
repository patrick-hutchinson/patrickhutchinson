import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check localStorage once during initial state setup
    const cachedData = localStorage.getItem("projects");
    return cachedData ? JSON.parse(cachedData) : 0;
  });

  const [news, setNews] = useState(() => {
    const cachedData = localStorage.getItem("news");
    return cachedData ? JSON.parse(cachedData) : 0;
  });
  const [experience, setExperience] = useState(() => {
    const cachedData = localStorage.getItem("experience");
    return cachedData ? JSON.parse(cachedData) : 0;
  });

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{ id, name, coverimage, thumbnail, imagegallery, gridStructure, month, year, url, categories, projectType, credits, showOnHomepage, slug }`
      )
      .then((fetchedData) => {
        localStorage.setItem("projects", JSON.stringify(fetchedData));
        setData(fetchedData);
      })
      .catch(console.error);
  }, []);

  const fetchData = async (type, setter) => {
    // Check if data is cached in localStorage
    const cachedData = localStorage.getItem(type);

    if (cachedData) {
      // If data is cached, use it
      setter(JSON.parse(cachedData));
    } else {
      // Only fetch if there is no cached data
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
          // Cache the fetched data in localStorage
          localStorage.setItem(type, JSON.stringify(fetchedData));
          setter(fetchedData); // Use the setter function passed in
        })
        .catch((error) => {
          console.error(`Failed to fetch ${type}:`, error);
        });
    }
  };

  useEffect(() => {
    fetchData("news", setNews);
    fetchData("experience", setExperience);
  }, []);

  return <DataContext.Provider value={{ data, experience, news }}>{children}</DataContext.Provider>;
};
