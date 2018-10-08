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
const Sprite = ({ emoji, options, size, sizer }) => {
  debugger;
  return (
    <div
      style={{
        top: sizer * -size / 4 / options.side + "em",

        left: -size / 4 / options.side + "em",
        position: "relative",
        textAlign: "center",
        fontSize: sizer * size / options.side / 2 + "em",
        maxHeight: "0em",
        maxWidth: "0em"
      }}
    >
      {emoji}
    </div>
  );
};

export default class Cell extends Component {
  static defaultProps = {
    options: { side: 30 }
  };

  render() {
    const {
      cell,
      cell: { plant, position: { x, y }, biome, resources, character },
      options,
      options: { side },
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
          minWidth: size / side + `em`,
          maxWidth: size / side + `em`,
          minHeight: size / side + `em`,
          maxHeight: size / side + `em`,
          color: "white",
          borderRadius: biome.name == "water" ? "10px" : "3px",
          backgroundColor: colors[biome.name],
          alignItems: "center",
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

        <Sprite size={size} sizer={2} options={options} emoji={biome.emoji} />
        <Sprite
          size={size}
          options={options}
          emoji={
            plant &&
            plant.inventory &&
            plant.inventory.length > 0 &&
            plant.getLifeStageEmoji()
          }
        />
        <Sprite
          size={size}
          options={options}
          emoji={
            character && character.health > 0 && character.emoji ? (
              character.emoji
            ) : (
              ""
            )
          }
        />
      </div>
    );
  }
}

//  {/*resources.filter(
//             resource =>
//               resourceList[resource].ore || resourceList[resource].food
//           )[0]*/}
