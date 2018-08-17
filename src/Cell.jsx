import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Cell extends Component {
  render() {
    const { cell, cell: { x, y } } = this.props;
    const hue = 0;
    const sat = 100;
    const lum = Math.ceil((this.props.cell.height * 0.8) % 100);
    return (
      <div
        onMouseOver={e => this.props.handleMouseMove(e, cell)}
        className={`cell x: ${x} y: ${y}`}
        style={{
          color: "white",
          backgroundColor: `hsl(${hue},${sat}%,${lum}%)`,
          width: "20px",
          height: "20px",
          display: "inline-block"
        }}
      >
        {this.props.cell.hasOre ? "O" : "N"}
      </div>
    );
  }
}
