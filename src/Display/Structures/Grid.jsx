import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Cell from "./Cell.jsx";
import Player from "../Objects/Player.jsx";
import { observer, Observer } from "mobx-react";
import { observable, action, computed, autorun, get } from "mobx";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static defaultProps = {
    world: { cells: [] }
  };

  handleMouseMoveOver = _.debounce((event, cell) => {
    const mouse = { x: event.clientX, y: event.clientY };
    this.setState({ mouse, tooltip: true, cell: cell });
  }, 500);
  render() {
    const cellCount = this.props.game.world.options.amount;
    const sideCellCount = this.props.game.world.options.side;
    const side = this.props.game.world.options.side;
    const player = this.props.player.get();
    const size = 50;
    return (
      <div
        className="grid"
        style={{
          maxWidth: size + `em`,
          minHeight: size + `em`,
          display: "flex",
          flexWrap: "wrap",
          transformStyle: "preserve-3d",
          transformOrigin: `${size / side * player.position.x}em ${size /
            side *
            player.position.y -
            size / side}em`,
          transform: `scaleX(2) scaleY(2)  rotate3D(1,0,0, 60deg) rotateZ(-${player.orientationDeg}deg)`,
          transition: "transform 1s"
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start"
          }}
        >
          <Player
            {...this.props.game}
            size={size}
            options={this.props.game.world.options}
          />
        </div>
        {this.props.cells.get().map((cell, i) => {
          return (
            <Cell
              {...this.props}
              size={size}
              key={i}
              handleMouseMove={(e, cell) => {
                {
                  /*e.persist();
                return this.handleMouseMoveOver(e, cell);*/
                }
              }}
              handleMouseOut={this.handleMouseOutCell}
              mouse={this.props.mouse}
              cell={cell}
              options={this.props.game.world.options}
            />
          );
        })}
      </div>
    );
  }
}
