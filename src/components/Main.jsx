import React, { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";
import Card from "./Card";

import "../css/Main.css";

function Main() {
  const [loading, updateLoading] = useState(false);
  const [apod, updateApod] = useState({
    date: "",
    explanation: "",
    title: "",
    url: "",
    media_type: "",
  });

  useEffect(() => {
    fetchApod();
  }, []);

  async function fetchApod() {
    updateLoading((prev) => !prev);
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=wejlWNwNuLFmWqdr2f1RIW4OpJMD4I5ThUcxzfqn"
    );
    const data = await response.json();
    // console.log(data);
    updateApod(data);
    updateLoading((prev) => !prev);
  }

  return (
    <div className="main">
      <div className="main-wrapper">
        {loading ? (
          <Bars stroke="#160040" width="45" speed={1} />
        ) : (
          <>
            <Card
              title={`Astronomy Picture of the Day: ${apod.title}`}
              description={apod.explanation}
              url={apod.url}
              date={new Date().toString()}
              mediaType={apod.media_type}
              id={"apod"}
              share={true}
            />
            <div
              style={{ paddingBottom: "1px", height: "0px", width: "100%" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Main;
