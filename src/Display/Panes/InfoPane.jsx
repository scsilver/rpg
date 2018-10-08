import React, { Component } from "react";
import colors from "../../../styling/theme.js";
import WorldStatus from "./Status/WorldStatus.jsx";
import PlayerStatus from "./Status/PlayerStatus.jsx";
import { Box, Column } from "../../../ui/layout/Grid.jsx";
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
export default class InfoPane extends Component {
  static defaultProps = {
    player: {}
  };
  render() {
    const { game: { player, world }, selectedCell } = this.props;
    return (
      <React.Fragment>
        <Column width={9}>
          <PlayerStatus {...player} />
        </Column>
        <Column width={3}>
          <WorldStatus {...world} />
        </Column>
      </React.Fragment>
    );
  }
}
