import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Tooltip from "@mui/material/Tooltip";

import "../css/Card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-title">
        <h1>{props.title}</h1>
      </div>
      <div className="card-img">
        <img src={props.image} alt="" />
      </div>
      <div className="card-selection">
        <div className="card-img-like">
          <Tooltip title="Like" placement="top-start">
            <FavoriteIcon />
          </Tooltip>
        </div>
        {/* <div className="card-img-bookmark">
          <Tooltip title="Bookmark" placement="top-start">
            <BookmarkAddIcon />
          </Tooltip>
        </div> */}
      </div>
      <div className="card-description">
        <p>{props.description}</p>
      </div>
      <div className="card-date">
        <span>{props.date}</span>
      </div>
    </div>
  );
}

export default Card;
