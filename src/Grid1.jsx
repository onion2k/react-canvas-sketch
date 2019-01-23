import React from "react";
import canvasSketch from "canvas-sketch";

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
      const cells = 10;
      return ({ context, width, height, frame }) => {
        const xPos = width / cells;
        const yPos = height / cells;

        context.fillStyle = "rgba(255,255,255,0.5)";
        context.fillRect(0, 0, width, height);

        context.strokeStyle = "rgb(0,0,0,0.5)";

        for (let i = 0; i < cells * cells; i++) {
          const x = i % cells;
          const y = Math.floor(i / cells);

          context.beginPath();
          context.translate(x * xPos + xPos * 0.5, y * yPos + yPos * 0.5);
          context.rotate((frame * Math.PI) / 180);
          context.rect(xPos * -0.5, yPos * -0.5, xPos, yPos);
          context.rotate(((360 - frame * 2) * Math.PI) / 180);
          context.rect(
            xPos * -0.4 + xPos * 0.2,
            yPos * -0.4 + yPos * 0.2,
            xPos * 0.4,
            yPos * 0.4
          );
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
