import React from "react";
import colors from "../../../../styling/theme.js";
import Cell from "../../Structures/Cell.jsx";
import { ProgressBar, Typography } from "../../../../ui/layout/Grid.jsx";
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
        {[
          { label: "Player", value: false, color: "green" },
          { label: "Name", value: name, color: "lightorange" },
          { label: "Job", value: job, color: "red" },
          { label: "Race", value: race, color: "purple" },
          { label: "Age:", value: age, color: "purple" }
        ]
          .map(bio => {
            return {
              tag: bio.label == "Player" ? "h1" : "h3",
              text: !!bio.value ? `${bio.label + ": " + bio.value}` : bio.label
            };
          })
          .map(({ tag, text } = typeography) => {
            return <Typography tag={tag}>{text}</Typography>;
          })}
      </div>
      <div
        style={{ display: "flex", padding: "10px", flexDirection: "column" }}
      >
        <h1 style={{ margin: 0 }}>Skills</h1>

        <ProgressBar percent={xp} />
        {[
          { label: "XP", value: xp, color: "green" },
          { label: "Agility", value: agility, color: "lightorange" },
          { label: "Attack", value: attack, color: "red" },
          { label: "Defence", value: defense, color: "purple" }
        ].map(stat => {
          return (
            <React.Fragment>
              <Typography
                tag="h3"
                fontWeight="bold"
                fontSize={1.2}
                lineHeight={1}
              >
                {stat.label}: {stat.value}
              </Typography>
              <ProgressBar barColor={stat.color} percent={stat.value} />
            </React.Fragment>
          );
        })}
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
