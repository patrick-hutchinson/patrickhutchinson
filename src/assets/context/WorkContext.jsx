import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem("projects");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      sanityClient
        .fetch(
          `*[_type == "project"]{ id,
      name,
      coverimage,
      thumbnail,
      imagegallery,
      gridStructure,
      month,
      year, 
      url,
      categories,
      credits,
      slug }`
        )
        .then((fetchedData) => {
          localStorage.setItem("projects", JSON.stringify(fetchedData));
          setData(fetchedData);
        })
        .catch(console.error);
    }
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
