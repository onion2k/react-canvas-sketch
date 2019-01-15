import React from "react";
import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [400, 400],
  animate: true,
  fps: 30
};

class segment {
  length = 5 + Math.random() * 30;
  speed = 2 + Math.random() * 30;
}

const line = (context, x, y, angle, length) => {
  context.beginPath();
  context.moveTo(x, y);
  let newX = x + Math.sin(angle) * length;
  let newY = y + Math.cos(angle) * length;
  context.lineTo(newX, newY);
  context.stroke();
  return { x: newX, y: newY };
};

export default class Sketch3 extends React.Component {
  constructor(props) {
    super(props);
    let segments = Array.from(Array(25), () => new segment());
    this.state = {
      segments: segments,
      ref: React.createRef()
    };
  }

  componentDidMount() {
    const sketch = () => {
      return ({ context, width, height, time }) => {
        context.fillStyle = "rgba(255,255,255,0.05)";
        context.fillRect(0, 0, width, height);

        let angle = 0;
        let lineLength = 60;
        time = time * -2;

        context.strokeStyle = `rgb(128,128,192)`;
        context.lineWidth = 1;

        let pos = { x: width * 0.5, y: height * 0.5 };

        this.state.segments.forEach(segment => {
          pos = line(
            context,
            pos.x,
            pos.y,
            segment.speed * time * 0.1,
            segment.length
          );
        });
      };
    };

    settings.canvas = this.state.ref.current;
    canvasSketch(sketch, settings);
  }

  render() {
    return <canvas ref={this.state.ref} />;
  }
}
