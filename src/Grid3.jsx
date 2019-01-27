import React from "react";
import canvasSketch from "canvas-sketch";

const colors = ["rgba(0,0,0,0.1)", "#ff0000", "#000000", "#EA8F3C"];

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
  dist(sx, sy, dx, dy) {
    return Math.sqrt((sx - dx) * (sx - dx) + (sy - dy) * (sy - dy));
  }
  componentDidMount() {
    const sketch = () => {
      const cells = 30;
      const halfCells = cells * 0.5;

      return ({ context, width, height, frame }) => {
        const xPos = width / cells;
        const yPos = height / cells;

        context.fillStyle = colors[0];
        context.fillRect(0, 0, width, height);

        const c = {
          x: cells * 0.5 - Math.sin(frame * 0.02) * 6,
          y: cells * 0.5 - Math.cos(frame * 0.02) * 6
        };

        for (let i = 0; i < cells * cells; i++) {
          const x = i % cells;
          const y = Math.floor(i / cells);

          let a = this.dist(x, y, c.x, c.y);

          a = Math.sin(a + frame * -0.03);

          context.beginPath();
          context.arc(
            x * xPos + xPos * 0.5,
            y * yPos + yPos * 0.5,
            (Math.PI - a) * 3,
            0,
            Math.PI * 2
          );
          context.fillStyle = `hsl(${frame % 360},100%,50%)`;
          context.fill();
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
