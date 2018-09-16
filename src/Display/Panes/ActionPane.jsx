import React, { Component } from "react";
import Grid from "../Structures/Grid.jsx";
import colors from "../../../styling/theme.js";
import { observer, Observer } from "mobx-react";

@observer
export default class ActionPane extends Component {
  render() {
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
        <Grid {...this.props} />
      </div>
    );
  }
}
