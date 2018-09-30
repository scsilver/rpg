import React, { Component } from "react";
import colors from "../../../styling/theme.js";
const degToRad = deg => Math.PI * deg / 180;
export default class Player extends Component {
  render() {
    const { player, size, world: { cells, options } } = this.props;
    const orientationRad = degToRad(player.orientationDeg);
    return (
      <div
        style={{
          position: "relative",
          maxHeight: "0" + `em`,
          transform: `translate(${4 * player.position.x}em,${4 *
            player.position.y}em) scale(3) rotate(${player.orientationDeg +
            180}deg)`,
          textAlign: "center",
          verticalAlign: "center"
        }}
      >
        {player.emoji}
      </div>
    );
  }
}
