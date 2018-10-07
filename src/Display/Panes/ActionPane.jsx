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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          overflow: "scroll"
        }}
      >
        <Grid {...this.props} />
      </div>
    );
  }
}
