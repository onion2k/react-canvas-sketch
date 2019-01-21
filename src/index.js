import React from "react";
import ReactDOM from "react-dom";
import Sketch from "./Sketch4";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <p>Simple sketch 3</p>
      <Sketch />
      <p>Sketch</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
