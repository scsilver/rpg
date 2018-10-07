import React from "react";
import colors from "../../../../styling/theme.js";
import Cell from "../../Structures/Cell.jsx";
import { observer, Observer } from "mobx-react";

const PlayerStatus = props => {
  const {
    name,
    age,
    job,
    race,
    attack,
    defense,
    agility,
    hunger,
    health,
    xp,
    inventory,
    cellsAhead
  } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{ display: "flex", padding: "10px", flexDirection: "column" }}
      >
        <h1 style={{ margin: 0 }}>Player</h1>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>{name}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>{job}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>{race}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>{age} y/o</h3>
      </div>
      <div
        style={{ display: "flex", padding: "10px", flexDirection: "column" }}
      >
        <h1 style={{ margin: 0 }}>Skills</h1>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>XP {xp}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>Attack {attack}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>Defense {defense}</h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>Agility {agility}</h3>
      </div>
      <div
        style={{ display: "flex", padding: "10px", flexDirection: "column" }}
      >
        <h1 style={{ margin: 0 }}>Status</h1>
        <h3
          style={{
            margin: 0,
            lineHeight: 1.2,
            justifyContent: "space-between"
          }}
        >
          Hunger {hunger.toString().split(".")[0]}
        </h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>
          Health {health.toString().split(".")[0]}
        </h3>
        <h3 style={{ margin: 0, lineHeight: 1.2 }}>
          Inventory
          {inventory.map(item => item.emoji)}
        </h3>
      </div>
      {/*<div style={{ display: "flex", padding: "10px", flexDirection: "row" }}>
        {cellsAhead.filter(cell => cell).map((cell, i) => {
          return (
            <div style={{ width: "30px" }}>
              <h1 style={{ margin: 0, display: "flex" }}>{i}</h1>
              <Cell cell={cell} />
              <div>{cell.character && cell.character.health}</div>
            </div>
          );
        })}
      </div>*/}
    </div>
  );
};

export default PlayerStatus;
