import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";

import "./App.css";
import "./css/scrollbar.css";

function App() {
  return (
    <div className="App-bg">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
