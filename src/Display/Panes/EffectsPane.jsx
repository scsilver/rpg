import React, { Component } from "react";

export default class EffectsPane extends Component {
  render() {
    const { playerHealthHit } = this.props;
    return playerHealthHit ? (
      <div
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: "rgba(255,0,0,0.5)",
          position: "fixed",
          top: 0,
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        {playerHealthHit}
      </div>
    ) : null;
  }
}
