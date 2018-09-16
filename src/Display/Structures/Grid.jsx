import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Cell from "./Cell.jsx";
import Player from "../Objects/Player.jsx";
import { observer, Observer } from "mobx-react";
import { observable, action, computed, autorun, get } from "mobx";

@observer
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
    return (
      <div
        className="grid"
        style={{
          maxWidth: `70vh`,
          minHeight: `70vh`
        }}
      >
        {this.props.cells.map((cell, i) => {
          return (
            <Cell
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
        <Player {...this.props.game} options={this.props.game.world.options} />
      </div>
    );
  }
}
