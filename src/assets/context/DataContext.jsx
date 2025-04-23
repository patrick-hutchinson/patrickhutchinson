import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check localStorage once during initial state setup
    const cachedData = localStorage.getItem("projects");
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

  return <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>;
};
