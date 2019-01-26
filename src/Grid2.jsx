import React from "react";
import canvasSketch from "canvas-sketch";

const colors = ["rgba(255,255,255,1)", "#ff0000", "#000000", "#EA8F3C"];

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
      const cells = 30;
      const halfCells = cells * 0.5;
      const lineWidth = 1;

      return ({ context, width, height, frame }) => {
        const xPos = width / cells;
        const yPos = height / cells;

        context.fillStyle = colors[0];
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < cells * cells; i++) {
          const x = i % cells;
          const y = Math.floor(i / cells);

          let a = Math.sqrt(
            (x - halfCells) * (x - halfCells) +
              (y - halfCells) * (y - halfCells)
          );

          a = Math.sin(a + frame * -0.03);

          context.beginPath();
          context.arc(
            x * xPos + xPos * 0.5,
            y * yPos + yPos * 0.5,
            0 + (Math.PI - a) * 2,
            0,
            Math.PI * 2
          );
          context.strokeStyle = colors[1];
          context.lineWidth = lineWidth;
          context.fillStyle = colors[2];
          context.fill();
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
