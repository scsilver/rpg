import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Tooltop extends Component {
  render() {
    const { x, y, cell } = this.props;
    return (
      <div
        style={{
          top: y + "px",
          left: x + "px",
          position: "absolute",
          minWidth: "100px",
          minHeight: "50px",
          backgroundColor: "white",
          outline: "1px solid black",
          zIndex: "99"
        }}
      >
        {cell &&
          Object.keys(cell).map(key => <div>{`${key}: ${cell[key]}`}</div>)}
      </div>
    );
  }
}
