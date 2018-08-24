import React, { Component } from "react";
//  <select
//                 label="player race"
//                 value={player.race}
//                 onChange={e => this.props.inputHandler(e, "race")}
//               >
//                 {options.races.map(race => (
//                   <option value={race}>{race}</option>
//                 ))}
//               </select>
export default class NewGameWizard extends Component {
  getInput = key => {
    const { player } = this.props;
    switch (typeof player[key]) {
      case "string":
        return (
          <input
            label={key}
            value={player[key]}
            onChange={e => this.props.inputHandler(e, key, "textBox")}
          />
        );
        break;
      case "number":
        return [
          <input
            label={key}
            type={"range"}
            defaultValue={player[key]}
            min={1}
            max={
              key == "age" ? (
                254
              ) : (
                Number.parseInt(
                  player.xp +
                    player[key] -
                    (player.defense + player.attack + player.agility)
                )
              )
            }
            step={1}
            onChange={e => this.props.inputHandler(e, key, "range")}
          />,
          <h5 style={{ margin: 0 }}>{player[key]}</h5>
        ];

        break;

      default:
        return (
          <input
            label={key}
            value={player[key]}
            onChange={e => this.props.inputHandler(e, key, "textBox")}
          />
        );
        break;
    }
  };
  render() {
    const {
      newGameWizard: { visible },
      inputHandler,
      handleClick,
      world: { options },
      player
    } = this.props;
    return (
      visible && (
        <div
          style={{
            width: "100%",
            height: "80%",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontFamily: "Josefin Slab"
          }}
        >
          <div
            style={{
              backgroundImage:
                "url(https://images.template.net/wp-content/uploads/2017/01/07045821/White-Parchment-Paper-Texture.jpg)",
              width: "50%",
              height: "50%",
              backgroundColor: "white",
              position: "initial",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              padding: "20px",
              flexDirection: "row",
              textAlign: "center",
              fontSize: "1.4em",
              lineHeight: "1.4"
            }}
          >
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              {[
                "name",
                "race",
                "job",
                "age",
                "defense",
                "attack",
                "agility"
              ].map(key => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ margin: 0 }}>
                    {key[0].toUpperCase() + key.slice(1)}
                  </h5>
                  {this.getInput(key)}
                </div>
              ))}
            </div>
            <button onClick={handleClick}>Start</button>
          </div>
        </div>
      )
    );
  }
}
