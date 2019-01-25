import React from "react";
import canvasSketch from "canvas-sketch";

const colors = ["#1be7ff", "#5dff00", "#fbff12", "#ff00f6", "#ff0000"];

const settings = {
  dimensions: [600, 600],
  animate: true,
  fps: 60
};

export default class Sketch5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ref: React.createRef()
    };
  }
  componentDidMount() {
    const sketch = () => {
      const points = 200;
      const TAU = Math.PI * 2;
      const segment = TAU / points;
      return ({ context, width, height, frame }) => {
        const x = width * 0.5;
        const y = height * 0.5;

        context.fillStyle = colors[0];
        context.fillRect(0, 0, width, height);

        for (let pointCounter = 0; pointCounter < points; pointCounter++) {
          const f = frame * -0.2;
          const c = segment * (pointCounter + f);
          const sinc = Math.sin(c);
          const cosc = Math.cos(c);

          context.beginPath();
          context.strokeStyle = colors[1 + (pointCounter % 4)];
          context.lineWidth = 2;

          context.moveTo(x + sinc * 100, y + cosc * 100);

          context.lineTo(
            x +
              sinc *
                (200 + Math.cos(((TAU * 12) / points) * pointCounter) * 10),
            y +
              cosc * (200 + Math.sin(((TAU * 12) / points) * pointCounter) * 10)
          );
          context.stroke();
        }
      };
    };

    settings.canvas = this.state.ref.current;
    canvasSketch(sketch, settings);
  }

  render() {
    return <canvas ref={this.state.ref} />;
  }
}
