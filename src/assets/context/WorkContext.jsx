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
    if (!data) {
      // Only fetch if there is no cached data
      sanityClient
        .fetch(
          `*[_type == "project"]{ id, name, coverimage, thumbnail, imagegallery, gridStructure, month, year, url, categories, credits, slug }`
        )
        .then((fetchedData) => {
          localStorage.setItem("projects", JSON.stringify(fetchedData));
          setData(fetchedData);
        })
        .catch(console.error);
    }
  }, [data]); // Effect only runs if 'data' is not already set

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
