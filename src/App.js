import React, { useState, useEffect } from "react";
import APOD from "./components/APOD";
import Typist from "react-typist";

import "./App.css";

function App() {
  const [renderAopd, setRenderAopd] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setRenderAopd((prev) => !prev);
    }, 5000);
  }, []);

  return (
    <div className="App">
      <div className="bg">
        <Typist avgTypingDelay={100}>
          <div className="landing-text-container">
            <h1 className="landing-title">WELCOME TO</h1>
            <h2 className="landing-subtitle">NASA Image and Video Library</h2>
          </div>
        </Typist>
        <APOD render={renderAopd} />
      </div>
    </div>
  );
}

export default App;
