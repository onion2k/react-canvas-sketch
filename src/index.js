import React from "react";
import ReactDOM from "react-dom";
import Sketch from "./Sketch";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <p>A simple sketch</p>
      <Sketch />
      <p>Sketch</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
