import React, { useState } from "react";
import Logo from "../images/icon - header.png";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { setResults } from "../actions";
import { useNavigate } from "react-router-dom";

import "../css/Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, updateSearch] = useState("");

  async function fetchNasa() {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${search}`
    );
    const data = await response.json();
    console.log(data.collection.items);
    dispatch(setResults(data.collection.items));
    navigate(`/search/${search}`);
  }

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-title-container">
          <img src={Logo} alt="logo" />
          <a href="/">
            <h1>Spacestagram</h1>
          </a>
        </div>
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              placeholder="search anything NASA"
              onChange={(e) => updateSearch(e.target.value)}
            />
            <div className="search-icon">
              <SearchIcon style={{ color: "#160040" }} onClick={fetchNasa} />
            </div>
          </div>
        </div>
        <div className="navigation-container">
          <Tooltip title="All liked" placement="right-start">
            <BookmarkIcon />
          </Tooltip>
        </div>
      </div>
      <div className="credit-container">
        <span className="credit-message">
          Powered by NASA Image and Library API
        </span>
        <span>Design inspired by Instagram</span>
      </div>
    </div>
  );
}

export default Header;
