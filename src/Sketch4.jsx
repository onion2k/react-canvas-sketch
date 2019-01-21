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

export default class Sketch4 extends React.Component {
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

        context.lineWidth = 5;

        let pos = { x: width * 0.5, y: height * 0.5 };

        this.state.segments.forEach((segment, i) => {
          if (frame === 0) {
            return;
          }
          pos = line(
            pos.x,
            pos.y,
            segment.speed * frame * 0.0025,
            segment.length
          );

          let x = segment._x;
          let y = segment._y;

          segment._x = pos.x;
          segment._y = pos.y;

          context.strokeStyle = `hsl(${Math.floor(
            (255 / this.state.dotCount) * i
          )}, 100%, 50%)`;

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(pos.x, pos.y);
          context.stroke();
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
