import React from "react";
import canvasSketch from "canvas-sketch";

const colors = ["#B4D3AA", "#84D2DE", "#EA8F3C", "#B24629"];

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
      const cells = 6;
      const margin = 5;
      const lineWidth = 4;

      let r = 0;

      return ({ context, width, height, frame }) => {
        const xPos = width / cells;
        const yPos = height / cells;

        context.fillStyle = colors[3];
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < cells * cells; i++) {
          const x = i % cells;
          const y = Math.floor(i / cells);

          // if (Math.floor(frame / (60 / 3)) % (60 / 3) === 0) {
          //   r = frame;
          // }

          context.beginPath();
          context.translate(x * xPos + xPos * 0.5, y * yPos + yPos * 0.5);
          context.rotate((frame * 0.5 * Math.PI) / 180);
          context.rect(
            (xPos - margin) * -0.5,
            (yPos - margin) * -0.5,
            xPos - margin,
            yPos - margin
          );
          context.fillStyle = "#FFFFFF";
          context.fill();
          context.strokeStyle = colors[0];
          context.lineWidth = lineWidth;
          context.stroke();
          context.resetTransform();

          context.beginPath();
          let offset = x * y * 10;
          context.translate(x * xPos + xPos * 0.5, y * yPos + yPos * 0.5);
          context.rotate((offset + (360 - frame * 2) * Math.PI) / 180);
          context.rect(
            xPos * -0.4 + xPos * 0.2,
            yPos * -0.4 + yPos * 0.2,
            xPos * 0.4,
            yPos * 0.4
          );
          context.fillStyle = colors[1];
          context.fill();
          context.strokeStyle = colors[2];
          context.stroke();
          context.resetTransform();
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
