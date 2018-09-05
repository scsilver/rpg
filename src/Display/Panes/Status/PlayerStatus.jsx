import React from 'react';

const PlayerStatus = (props) => {
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
        position: { cell, movementCell }
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
            </div>
            <div
                style={{ display: "flex", padding: "10px", flexDirection: "column" }}
            >
                <h1 style={{ margin: 0, display: "flex", flexBasis: "min0height" }}>
                    Near
          </h1>
                {cell.x && (
                    <div
                        className={`cell x: ${cell.x} y: ${cell.y}`}
                        style={{
                            color: "white",
                            backgroundColor: colors[cell.biome.name],
                            minWidth: `80%`,
                            maxWidth: `auto`,
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            textAlign: "center",
                            overflow: "hidden",
                            alignSelf: "right"
                        }}
                    >
                        <div> {cell.biome.emoji != "" && cell.biome.emoji}</div>
                        <div> {cell.character.emoji != "" && cell.character.emoji}</div>
                    </div>
                )}
            </div>
            <div
                style={{ display: "flex", padding: "10px", flexDirection: "column" }}
            >
                <h1 style={{ margin: 0, display: "flex", flexBasis: "min0height" }}>
                    Ahead
          </h1>
                {movementCell.x && (
                    <div
                        className={`movementCell x: ${movementCell.x} y: ${movementCell.y}`}
                        style={{
                            color: "white",
                            backgroundColor: colors[movementCell.biome.name],
                            minWidth: `80%`,
                            maxWidth: `auto`,
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            textAlign: "center",
                            overflow: "hidden",
                            alignSelf: "right"
                        }}
                    >
                        <div>
                            {" "}
                            {movementCell.biome.emoji != "" && movementCell.biome.emoji}
                        </div>
                        <div>
                            {" "}
                            {movementCell.character.emoji != "" &&
                                movementCell.character.emoji}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerStatus;