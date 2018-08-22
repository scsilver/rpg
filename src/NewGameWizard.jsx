import React, { Component } from "react";

export default class NewGameWizard extends Component {
  render() {
    const {
      newGameWizard: { visible },
      inputHandler,
      handleClick,
      world: { options },
      player
    } = this.props;
    const xpLeft =
      options.startXp - player.agility - player.attack - player.defense >= 0
        ? options.startXp - player.agility - player.attack - player.defense
        : 0;
    debugger;

    return (
      visible && (
        <div
          onClick={handleClick}
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
              <h5 style={{ margin: 0 }}>Name</h5>
              <h5 style={{ margin: 0 }}>Race</h5>
              <h5 style={{ margin: 0 }}>Job</h5>
              <h5 style={{ margin: 0 }}>Age</h5>
              <h5 style={{ margin: 0 }}>Strength</h5>
              <h5 style={{ margin: 0 }}>Attack</h5>
              <h5 style={{ margin: 0 }}>Agility</h5>
            </div>

            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <input
                label="player name"
                value={player.name}
                onChange={e => this.props.inputHandler(e, "name")}
              />
              <input
                label="player race"
                value={player.race}
                onChange={e => this.props.inputHandler(e, "race")}
              />
              <input
                label="player job"
                value={player.job}
                onChange={e => this.props.inputHandler(e, "job")}
              />
              <input
                label={"age"}
                type={"range"}
                defaultValue={player.age}
                min={1}
                max={254}
                onRange={e => this.props.inputHandler(e, "age")}
              />
              <input
                label={"defense"}
                type={"range"}
                defaultValue={player.defense}
                min={1}
                max={Number.parseInt(player.defense + xpLeft)}
                step={1}
                onMouseUp={e => this.props.inputHandler(e, "defense")}
              />
              <input
                label={"attack"}
                type={"range"}
                defaultValue={player.attack}
                min={1}
                max={Number.parseInt(player.attack + xpLeft)}
                step={1}
                onChange={e => this.props.inputHandler(e, "attack")}
              />
              <input
                label={"agility"}
                type={"range"}
                defaultValue={player.agility}
                min={1}
                max={Number.parseInt(player.agility + xpLeft)}
                step={1}
                onChange={e => this.props.inputHandler(e, "agility")}
              />
            </div>
          </div>
        </div>
      )
    );
  }
}
