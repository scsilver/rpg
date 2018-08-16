import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Cell extends Component {
  render() {
    const hue = 0;
    const sat = 100;
    const lum = Math.ceil((this.props.cell.height * 0.8) % 100);
    return (
      <div
        onMouseOver={e => this.props.handleMouseMove(e, this.props.cell)}
        className={`cell hsl(${hue},${sat},${lum})`}
        style={{
          color: "white",
          backgroundColor: `hsl(${hue},${sat}%,${lum}%)`
        }}
      />
    );
  }
}
