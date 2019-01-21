import React from "react";
import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [600, 600],
  animate: true,
  fps: 60
};

class segment {
  _x: 0;
  _y: 0;
  length = 5 + Math.random() * 20;
  speed = 2 + Math.random() * 10;
}

const line = (x, y, angle, length) => {
  let newX = x + Math.sin(angle) * length;
  let newY = y + Math.cos(angle) * length;
  return { x: newX, y: newY };
};

export default class Sketch5 extends React.Component {
  constructor(props) {
    super(props);
    const dotCount = 50;
    let segments = Array.from(Array(dotCount), () => new segment());
    segments[0].length = 100;
    this.state = {
      dotCount: dotCount,
      segments: segments,
      ref: React.createRef()
    };
  }

  componentDidMount() {
    const sketch = () => {
      return ({ context, width, height, frame }) => {
        context.fillStyle = "rgba(255,255,255,0.001)";
        context.fillRect(0, 0, width, height);

        let pos = { x: width * 0.5, y: height * 0.5 };

        this.state.segments.forEach((segment, i) => {
          if (frame === 0) {
            return;
          }
          pos = line(
            pos.x,
            pos.y,
            segment.speed * frame * 0.002 * (1 - (i % 2) * 2),
            segment.length
          );

          context.fillStyle = `hsl(${Math.floor(
            255 - (255 / this.state.dotCount) * i
          )}, 100%, 50%)`;

          context.beginPath();
          context.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
          context.fill();
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
