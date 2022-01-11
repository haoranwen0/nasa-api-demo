import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

import "../css/CustomLink.css";

function CustomLink() {
  const { link } = useParams();

  const [cardObj, setCardObj] = useState(null);

  useEffect(() => {
    setCardObj(JSON.parse(decodeURIComponent(escape(atob(link)))));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="custom-link">
      <div className="custom-link-wrapper">
        {cardObj && (
          <Card
            title={cardObj.title}
            description={cardObj.description}
            url={cardObj.url}
            date={cardObj.date}
            mediaType={cardObj.mediaType}
            id={cardObj.id}
            share={true}
          />
        )}
        <div style={{ paddingBottom: "1px", height: "0px", width: "100%" }} />
      </div>
    </div>
  );
}

export default CustomLink;
