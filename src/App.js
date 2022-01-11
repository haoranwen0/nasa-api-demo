import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";
import CustomLink from "./components/CustomLink";

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
        <Header refresh={refresh} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:query" element={<SearchPage url={apiUrl} />} />
          <Route path="/shareable/:link" element={<CustomLink />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
