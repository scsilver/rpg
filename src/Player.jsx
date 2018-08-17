import React, { Component } from "react";
import colors from "../styling/theme.js";
export default class Player extends Component {
  render() {
    const { player, world: { cells, options } } = this.props;
    return (
      <div
        style={{
          position: "relative",
          top: `${-options.amount + player.position.y * options.side}px`,
          left: `${player.position.x * options.side}px`,
          width: "20px",
          height: "20px",
          backgroundColor: colors.primary,
          transform: `rotate(${player.position.orientationDeg}deg)`,
          textAlign: "center"
        }}
      >
        ^
      </div>
    );
  }
}
