import React from "react";
import canvasSketch from "canvas-sketch";

const colors = [
  "rgba(255,255,255,1)",
  "#5dff00",
  "#fbff12",
  "#ff00f6",
  "#ff0000"
];

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
      const points = 150;
      const TAU = Math.PI * 2;
      const segment = TAU / points;
      return ({ context, width, height, frame }) => {
        const x = width * 0.5;
        const y = height * 0.5;

        context.fillStyle = colors[0];
        context.fillRect(0, 0, width, height);

        for (let pointCounter = 0; pointCounter < points; pointCounter++) {
          const f = frame * -0.02;

          const c = segment * pointCounter;
          const sinc = Math.sin(c);
          const cosc = Math.cos(c);

          context.beginPath();
          context.strokeStyle = colors[1 + (pointCounter % 4)];
          context.lineWidth = 4;

          const offset = Math.sin(((TAU * 7) / points) * pointCounter + f) * 40;

          context.moveTo(
            x + sinc * (100 + offset * -1),
            y + cosc * (100 + offset * -1)
          );

          context.lineTo(x + sinc * (200 + offset), y + cosc * (200 + offset));
          context.stroke();

          context.beginPath();
          context.strokeStyle = "#000000";
          context.lineWidth = 3;

          const offset2 =
            Math.sin(((TAU * 7) / points) * pointCounter + f) * -40;

          context.moveTo(x + sinc * (60 + offset2), y + cosc * (60 + offset2));

          context.lineTo(
            x + sinc * (100 + offset2),
            y + cosc * (100 + offset2)
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
