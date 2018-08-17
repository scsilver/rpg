import React, { Component } from "react";
import PropTypes from "prop-types";
import colors from "../styling/theme.js";
const resourceList = {
  iron: { ore: true, food: false, material: false },
  diamond: { ore: true, food: false, material: false },
  copper: { ore: true, food: false, material: false },
  apple: { ore: false, food: true, material: false },
  strawberry: { ore: false, food: true, material: false },
  corn: { ore: false, food: true, material: false },
  wood: { ore: false, food: false, material: true },
  sand: { ore: false, food: false, material: true },
  fish: { ore: false, food: true, material: false },
  water: { ore: false, food: true, material: false }
};
export default class Cell extends Component {
  render() {
    const { cell, cell: { x, y, biome, resources }, options } = this.props;
    const hue = 0;
    const sat = 100;
    const lum = Math.ceil((this.props.cell.height * 0.8) % 100);
    return (
      <div
        onMouseOver={e => this.props.handleMouseMove(e, cell)}
        className={`cell x: ${x} y: ${y}`}
        style={{
          color: "white",
          backgroundColor: colors[biome],
          minWidth: `${70 / options.side}vh`,
          maxWidth: `${70 / options.side}vh`,
          minHeight: `${70 / options.side}vh`,
          maxHeight: `${70 / options.side}vh`,
          display: "inline-block",
          textAlign: "center"
        }}
      >
        {biome == "water" ? `~` : "__"}
      </div>
    );
  }
}

//  {/*resources.filter(
//             resource =>
//               resourceList[resource].ore || resourceList[resource].food
//           )[0]*/}
