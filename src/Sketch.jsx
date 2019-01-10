import React from "react";
import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [400, 400]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let nScale = 4;
    let h = 8;
    let v = Math.floor(h * (height / width));

    let rx = width / h;
    let ry = height / v;

    const i = h * v;
    const lineLength = 12.0;
    context.lineWidth = 2.0;
    context.strokeStyle = `rgb(64,64,64)`;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      const angle = Math.sin(x * 0.025); // n * Math.PI * 2;

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
    }

    context.fillStyle = `rgb(255,255,255)`;
    context.fillRect(width * 0.5 - 40, height - 2 - 5.5, 80, 7.5);

    // context.fillStyle = `rgb(0,0,0)`;
    // context.font = "5px Verdana";
    // context.textAlign = "center";
    // context.fillText("Hello world", width * 0.5, height - 2);
  };
};

export default class Sketch extends React.Component {
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
