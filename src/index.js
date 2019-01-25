import React from "react";
import ReactDOM from "react-dom";
import Sketch from "./Circle1";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Sketch />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
