import React from "react";
import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [400, 400],
  animate: true,
  fps: 30
};

const line = (context, x, y, angle, length) => {
  context.beginPath();
  context.moveTo(x, y);
  let newX = x + Math.sin(angle) * length;
  let newY = y + Math.cos(angle) * length;
  context.lineTo(newX, newY);
  context.stroke();
  return { x: newX, y: newY };
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    context.fillStyle = "rgba(255,255,255,1)";
    context.fillRect(0, 0, width, height);

    let angle = 45;
    let lineLength = 30;

    context.strokeStyle = `rgb(64,64,64)`;

    let pos = { x: width * 0.5, y: height * 0.5 };

    pos = line(context, pos.x, pos.y, angle + time * 0.5, lineLength);
    line(context, pos.x, pos.y, angle + time * 0.25, lineLength);

    // let radius = 3;

    // context.fillStyle = "#000000";
    // context.beginPath();
    // context.arc(
    //   midX + Math.sin(angle) * lineLength,
    //   midY + Math.cos(angle) * lineLength,
    //   radius,
    //   0,
    //   Math.PI * 2
    // );
    // context.fill();
  };
};

export default class Sketch3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ref: React.createRef()
    };
  }

  componentDidMount() {
    settings.canvas = this.state.ref.current;
    canvasSketch(sketch, settings);
  }

  render() {
    return <canvas ref={this.state.ref} />;
  }
}
