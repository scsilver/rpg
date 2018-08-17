import React, { Component } from "react";
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
export default class InfoPane extends Component {
  static defaultProps = {
    player: {}
  };
  render() {
    const { game: { player }, selectedCell } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: colors.tertiary,
          color: colors.quinary,
          fontFamily: "Helvetica",
          padding: "10px",
          boxSizing: "border-box",
          display: "inline-flex",
          flexDirection: "row",
          overflow: "wrap"
        }}
      >
        <div
          style={{
            flex: 2,
            flexDirection: "row"
          }}
        >
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Status</h5>
            <div>Health {player.health}</div>
            <div>Hunger {player.hunger}</div>
          </div>
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Skills</h5>
            <div>Agility {player.agility}</div>
            <div>Attack {player.attack}</div>
            <div>Defense {player.defense}</div>
          </div>
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Location</h5>
            <div
              style={{
                flex: 1,
                flexDirection: "column",
                display: "inline-flex",
                padding: "10px"
              }}
            >
              <h5 style={{ margin: "0" }}>Cell</h5>
              <div>Biome {player.position.cell.biome}</div>
              <div>Orientation {player.position.orienationDeg}</div>
              <div>Resource {player.position.cell.resource}</div>
              <div>Ore {player.position.cell.ore}</div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Inventory</h5>
            {_.uniq(player.inventory).map((item, i, inventory) => {
              return (
                <div>
                  {player.inventory.filter(itemA => item == itemA).length} lbs
                  of {item}
                </div>
              );
            })}
          </div>
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              display: "inline-flex",
              padding: "10px"
            }}
          >
            <h5 style={{ margin: "0" }}>Actions</h5>
            {!!player.position.cell.resources &&
              player.position.cell.resources.map(resource => {
                return Object.keys(resourceList[resource])
                  .filter(key => resourceList[resource][key])
                  .map(action => {
                    return (
                      <div>
                        {resource} {action}
                      </div>
                    );
                  });
              })}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {Object.keys(this.props.gameControls).map(key => (
            <button onClick={this.props.gameControls[key]}>{key}</button>
          ))}
        </div>
      </div>
    );
  }
}
