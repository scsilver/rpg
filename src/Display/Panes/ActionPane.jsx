import React, { Component } from "react";
import Grid from "../Structures/Grid.jsx";
import colors from "../../../styling/theme.js";
import { observer, Observer } from "mobx-react";

export default class ActionPane extends Component {
  render() {
    const { player } = this.props;

    return <Grid {...this.props} player={this.props.player.get()} />;
  }
}
