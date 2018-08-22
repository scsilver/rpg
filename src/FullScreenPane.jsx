import React, { Component } from "react";

export default class FullScreenPane extends Component {
  render() {
    const { visible, display, handleClick } = this.props;
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
              flexDirection: "column",
              textAlign: "center",
              fontSize: "1.4em",
              lineHeight: "1.4"
            }}
          >
            {display
              .split(".")
              .map((sentence, i, d) => [
                <div>{sentence}</div>,
                i > d.length - 3 ? null : <div>»»————-　　————-««</div>
              ])}
          </div>
        </div>
      )
    );
  }
}
