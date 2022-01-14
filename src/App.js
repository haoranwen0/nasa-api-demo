import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";
import CustomLink from "./components/CustomLink";
import NotFound from "./components/NotFound";
import GitHubIcon from "@mui/icons-material/GitHub";
import Tooltip from "@mui/material/Tooltip";

import "./App.css";
import "./css/scrollbar.css";

function App() {
  const myRef = useRef(null);

  const [apiUrl, setApiUrl] = useState("");

  const refresh = (url) => {
    setApiUrl(url);
    myRef.current.scrollIntoView();
  };

  return (
    <div className="App-bg">
      <div ref={myRef} />
      <Router>
        <div className="github-icon">
          <a
            href="https://github.com/haoranwen0/nasa-api-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip title="View GitHub" placement="top-end">
              <GitHubIcon fontSize="large" />
            </Tooltip>
          </a>
        </div>
        <Header refresh={refresh} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:query" element={<SearchPage url={apiUrl} />} />
          <Route path="/shareable/:link" element={<CustomLink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
