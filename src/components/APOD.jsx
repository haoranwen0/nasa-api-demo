import React, { useEffect, useState } from "react";
import Typist from "react-typist";

import "../css/APOD.css";

function APOD(props) {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    const apod_url =
      "https://api.nasa.gov/planetary/apod?api_key=YZO8bSCWckdIM8fEyfZ0LbQ3OWkIDP4VfXh1D9lw";
    async function fetchAPODApi() {
      const response = await fetch(apod_url);
      const data = await response.json();
      setApod(data);
    }

    fetchAPODApi();
  }, []);

  return (
    <div className={props.render ? "apod fade-in" : "apod fade-out"}>
      <div className="apod-img-wrapper">
        {apod ? <img src={apod.url} alt="" /> : null}
        {apod ? <span className="apod-img-title">{apod.title}</span> : null}
        <h1 className="apod-title">
          Here's the Astronomy Picture of the Day to get you started!
        </h1>
      </div>
    </div>
  );
}

export default APOD;
