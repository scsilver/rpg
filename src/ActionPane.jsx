import React, { Component } from "react";
import Grid from "./Grid.jsx";
import colors from "../styling/theme.js";
export default class ActionPane extends Component {
  render() {
    const { game } = this.props;
    return (
      <div
        style={{
          backgroundColor: colors.quaternary,
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
          position: "fixed",
          top: 0
        }}
      >
        <Grid game={game} />
      </div>
    );
  }
}
