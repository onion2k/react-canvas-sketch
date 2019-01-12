import React from "react";
import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [400, 400],
  animate: true,
  fps: 24
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let nScale = 4;
    let h = 8;
    let v = Math.floor(h * (height / width));

    let rx = width / h;
    let ry = height / v;

    const i = h * v;
    const lineLength = 20.0;
    context.lineWidth = 2.0;
    context.strokeStyle = `rgb(64,64,64)`;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      const angle = (1 + x) * time * 0.01;

      context.beginPath();
      context.moveTo(
        _x * rx + rx * 0.5 - Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 - Math.cos(angle) * lineLength
      );

      context.lineTo(
        _x * rx + rx * 0.5 + Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 + Math.cos(angle) * lineLength
      );
      context.stroke();

      context.fillStyle = "#000000";
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5 + Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 + Math.cos(angle) * lineLength,
        2.5,
        0,
        Math.PI * 2
      );
      context.fill();

      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5 - Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 - Math.cos(angle) * lineLength,
        2.5,
        0,
        Math.PI * 2
      );
      context.fill();
    }
  };
};

export default class Sketch2 extends React.Component {
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