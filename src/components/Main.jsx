import React, { useEffect, useState } from "react";
import Card from "./Card";

import "../css/Main.css";

function Main() {
  const [apod, updateApod] = useState({
    date: "",
    explanation: "",
    title: "",
    url: "",
  });

  useEffect(() => {
    fetchApod();
  }, []);

  async function fetchApod() {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=wejlWNwNuLFmWqdr2f1RIW4OpJMD4I5ThUcxzfqn"
    );
    const data = await response.json();
    updateApod(data);
  }

  return (
    <div className="main">
      <div className="main-wrapper">
        <Card
          title={`Astronomy Picture of the Day: ${apod.title}`}
          description={apod.explanation}
          image={apod.url}
          date={apod.date}
        />
      </div>
    </div>
  );
}

export default Main;
