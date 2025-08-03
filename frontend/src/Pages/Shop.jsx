import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const backend_url = "http://localhost:4000";

const Shop = () => {
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(`${backend_url}/popularinwomen`);
        const data1 = await res1.json();
        setPopular(data1);

        const res2 = await fetch(`${backend_url}/newcollections`);
        const data2 = await res2.json();
        setNewCollection(data2);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
