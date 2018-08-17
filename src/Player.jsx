import React, { Component } from "react";
import colors from "../styling/theme.js";
export default class Player extends Component {
  render() {
    const { player, world: { cells, options } } = this.props;
    return (
      <div
        style={{
          position: "relative",
          top: `${70 / options.side * (player.position.y - options.side)}vh`,
          left: `${70 / options.side * player.position.x}vh`,
          minWidth: `${70 / options.side}vh`,
          maxWidth: `${70 / options.side}vh`,
          minHeight: `${70 / options.side}vh`,
          maxHeight: `${70 / options.side}vh`,
          backgroundColor: "purple",
          transform: `rotate(${player.position.orientationDeg}deg)`,
          textAlign: "center"
        }}
      >
        ^
      </div>
    );
  }
}
