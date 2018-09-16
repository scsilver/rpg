import React, { Component } from "react";
import colors from "../../../styling/theme.js";
const degToRad = deg => Math.PI * deg / 180;
export default class Player extends Component {
  render() {
    const { player, world: { cells, options } } = this.props;
    const orientationRad = degToRad(player.orientationDeg);
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
          transform: `matrix(${Math.cos(orientationRad)}, ${Math.sin(
            orientationRad
          )}, ${Math.sin(orientationRad)}, ${-Math.cos(orientationRad)},0,0)`,
          textAlign: "center",
          verticalAlign: "center"
        }}
      >
        {player.emoji}
      </div>
    );
  }
}
