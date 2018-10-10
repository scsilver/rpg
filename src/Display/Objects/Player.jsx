import React, { Component } from "react";
import colors from "../../../styling/theme.js";
const degToRad = deg => Math.PI * deg / 180;
export default class Player extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    this.ref.current &&
      this.ref.current.scrollIntoView(
        {
          // behavior: "instant",
          // inline: "center",
          // block: "center"
        }
      );
    const {
      player,
      size,
      world: { cells, options, options: { side } }
    } = this.props;
    const orientationRad = degToRad(player.orientationDeg);
    return (
      <div
        ref={this.ref}
        style={{
          position: "relative",
          maxHeight: `${size / side}` + `em`,
          transform: `translate3d(${size /
            side *
            (player.position.x + 0.5)}em,${size /
            side *
            (player.position.y - 0.5) +
            size /
              side}em,2em) rotateX(-90deg) rotateY(${-player.orientationDeg}deg)`,
          transformOrigin: `50% 50%`,
          textAlign: "center",
          verticalAlign: "center",
          transformStyle: "preserve-3d"
        }}
      >
        {player.emoji}
      </div>
    );
  }
}
