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
    world: { cells: [] },
    player: { position: { x: 0, y: 0 }, orientationDeg: 0 }
  };

  handleMouseMoveOver = _.debounce((event, cell) => {
    const mouse = { x: event.clientX, y: event.clientY };
    this.setState({ mouse, tooltip: true, cell: cell });
  }, 500);
  render() {
    const { player } = this.props;
    const cellCount = this.props.game.world.options.amount;
    const sideCellCount = this.props.game.world.options.side;
    const side = this.props.game.world.options.side;

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
          transformOrigin: `${size /
            side *
            (player.position.x + 0.5)}em ${size /
            side *
            (player.position.y - 0.5) +
            size / side}em 1em`,
          transform: `perspective(1em) scaleX(20) scaleY(20) rotateX(80deg) rotateZ(-${player.orientationDeg}deg) `,
          transition: "transform 1s"
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            height: "0em"
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
              player={player}
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
