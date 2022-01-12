import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import parse from "html-react-parser";

import "../css/Card.css";

function Card(props) {
  const [liked, updateLiked] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [copied, updateCopied] = useState(false);

  useEffect(() => {
    if (props.id === "apod") {
      if (localStorage.getItem("apod-like")) {
        updateLiked(JSON.parse(localStorage.getItem("apod-like")));
      } else {
        localStorage.setItem("apod-like", JSON.stringify(false));
      }
    }
    let cardObj = {
      title: props.title,
      url: props.url,
      description: props.description,
      date: props.date,
      id: props.id,
      mediaType: props.mediaType,
    };
    // console.log(cardObj);
    const link = `https://dev.d5qur4zg5iofv.amplifyapp.com/shareable/${btoa(
      unescape(encodeURIComponent(JSON.stringify(cardObj)))
    )}`;
    // console.log(link);
    setShareableLink(link);
    //eslint-disable-next-line
  }, []);

  const handleUpdateLiked = (e) => {
    if (props.id === "apod") {
      localStorage.setItem("apod-like", JSON.stringify(!liked));
    }
    updateLiked((prev) => !prev);
    navigator.clipboard.writeText("Copy this text to clipboard");
  };

  return (
    <div className="card">
      <div className="card-title">
        <h1>{props.title}</h1>
      </div>
      <div className="card-media">
        {props.mediaType === "video" ? (
          <iframe src={props.url} frameBorder="0" title="video" />
        ) : (
          <img src={props.url} alt="" />
        )}
      </div>
      <div className="card-selection">
        <div className="card-like" onClick={handleUpdateLiked}>
          <Tooltip title="Like" placement="top-start">
            <FavoriteIcon style={liked ? { color: "#9a0680" } : null} />
          </Tooltip>
        </div>
        {props.share && (
          <div className="card-share">
            <CopyToClipboard
              text={shareableLink}
              onCopy={() => updateCopied((prev) => !prev)}
            >
              <Tooltip
                title={copied ? "Copied" : "Share"}
                placement="top-start"
              >
                <ShareIcon />
              </Tooltip>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div className="card-description">
        {/* {console.log(props.description, props.title)} */}
        <p>{props.description ? parse(props.description) : null}</p>
      </div>
      <div className="card-date">
        <span>{props.date}</span>
      </div>
    </div>
  );
}

export default Card;
