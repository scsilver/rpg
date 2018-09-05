import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Cell from "./Cell.jsx";
import Player from "../Objects/Player.jsx";

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

  handleMouseOutCell = e => this.setState({ tooltip: false });

  render() {
    const {
      tooltip,
      mouse,
      game,
      game: { world },
      game: { world: { cells, options } }
    } = this.props;
    const cellCount = options.amount;
    const sideCellCount = options.side;
    return (
      <div
        className="grid"
        style={{
          maxWidth: `70vh`,
          minHeight: `70vh`
        }}
      >
        {cells.map(cell => {
          return (
            <Cell
              handleMouseMove={(e, cell) => {
                e.persist();
                return this.handleMouseMoveOver(e, cell);
              }}
              handleMouseOut={this.handleMouseOutCell}
              mouse={this.props.mouse}
              cell={cell}
              options={options}
            />
          );
        })}
        {tooltip && <Tooltip {...mouse} cell={cell} />}
        <Player {...game} options={options} />
      </div>
    );
  }
}
