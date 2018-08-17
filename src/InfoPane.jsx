import React, { Component } from "react";
import colors from "../styling/theme.js";
export default class InfoPane extends Component {
  static defaultProps = {
    player: {}
  };
  render() {
    const { player, selectedCell } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: colors.tertiary,
          color: colors.quinary,
          fontFamily: "Helvetica",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        <div style={{ flex: 1 }}>
          <h1>Player</h1>
          <ul>
            {Object.keys(player).map(key => (
              <li>
                {key}: {player[key]}
              </li>
            ))}
          </ul>
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
