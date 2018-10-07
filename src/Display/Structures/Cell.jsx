import React, { Component } from "react";
import PropTypes from "prop-types";
import colors from "../../../styling/theme.js";
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
import { observer, Observer } from "mobx-react";
@observer
export default class Cell extends Component {
  static defaultProps = {
    options: { side: 30 }
  };

  render() {
    const {
      cell,
      cell: { plant, position: { x, y }, biome, resources, character },
      options,
      size
    } = this.props;
    if (character) {
    }
    const hue = 0;
    const sat = 100;
    const lum = Math.ceil((this.props.cell.height * 0.8) % 100);
    return (
      <div
        style={{
          minWidth: size / 20 + `em`,
          maxWidth: size / 20 + `em`,
          minHeight: size / 20 + `em`,
          maxHeight: size / 20 + `em`,
          color: "white",
          borderRadius: biome.name == "water" ? "10px" : "3px",
          backgroundColor: colors[biome.name],
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          onMouseOver={e => this.props.handleMouseMove(e, cell)}
          className={`cell x: ${x} y: ${y}`}
          style={{
            display: "flex",
            justifyContent: "center",
            overflow: "hidden"
            //transform: "rotate3d(2, 0, 0, 45deg)"
          }}
        />
        <div
          style={{
            top: "0",
            left: "0",
            marginTop: -size * 0.2 / 20 + "em",
            marginLeft: -size * 0.5 / 20 + "em",
            fontSize: size * 0.7 / 10 + "em",
            maxHeight: "0px",
            maxWidth: "0px"
          }}
        >
          {(biome.emoji == "⛰️" && biome.emoji) ||
            (plant &&
              plant.inventory &&
              plant.inventory.length > 0 &&
              plant.getLifeStageEmoji()) ||
            biome.emoji}
        </div>

        <div
          style={{
            left: 0,
            top: 0,
            display: "inline-flex",
            fontSize: size * 0.5 / 20 + "em",
            maxHeight: "0px",
            maxWidth: "0px"
          }}
        >
          {character && character.health > 0 && character.emoji}
        </div>
      </div>
    );
  }
}

//  {/*resources.filter(
//             resource =>
//               resourceList[resource].ore || resourceList[resource].food
//           )[0]*/}
