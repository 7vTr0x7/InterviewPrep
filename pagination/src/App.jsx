import React, { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");

      const result = await res.json();
      if (result) {
        setData(result.products);
      }
    } catch (error) {
      console.log("failed to fetch", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const prev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (page < data.length / 10) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}>
        <button onClick={() => prev()}>Prev</button>
        <div
          style={{
            maxWidth: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {page} <p>/{data.length / 10}</p>
        </div>

        <button onClick={() => next()}>next</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {data.length &&
          data?.slice(page * 10 - 10, page * 10).map((prod, index) => (
            <div key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
            </div>
          ))}
      </div>
    </>
  );
};

export default App;
