import React from "react";
import ReactDOM from "react-dom";
import Sketch2 from "./Sketch2";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <p>Simple sketch</p>
      <Sketch2 />
      <p>Sketch</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
