import React, { Component } from "react";
import colors from "../../../styling/theme.js";
import WorldStatus from "./Status/WorldStatus.jsx";
import PlayerStatus from "./Status/PlayerStatus.jsx";
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
      <div
        style={{
          backgroundImage:
            "url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)",
          width: "100%",
          height: "20%",
          backgroundColor: colors.tertiary,
          color: colors.quinary,
          fontFamily: "Josefin Slab",
          weight: 500,
          padding: "10px",
          boxSizing: "border-box",
          display: "inline-flex",
          flexDirection: "row",
          overflow: "wrap",
          position: "fixed",
          bottom: 0
        }}
      >
        <div style={{ flex: 3 }}>
          <PlayerStatus {...player} />
        </div>
        <div style={{ flex: 1 }}>
          <WorldStatus {...world} />
        </div>
      </div>
    );
  }
}

{
  /*<div
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
            <h3>Status</h3>
            <h5>
              Health
              <div
                style={{
                  backgroundColor: "red",
                  width: `${player.health}%`,
                  height: "20px"
                }}
              />{" "}
            </h5>
            <div>
              Hunger
              <div
                style={{
                  backgroundColor: "green",
                  width: `${player.hunger}%`,
                  height: "20px"
                }}
              />
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
        </div>

        <div>
          {Object.keys(this.props.gameControls).map(key => (
            <button onClick={this.props.gameControls[key]}>{key}</button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {player.mentalState.interaction}
          {player.mentalState.environment}
        </div>
        <div style={{ flex: 1 }}>Time: {time}</div>*/
}
