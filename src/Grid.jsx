import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Cell from "./Cell.jsx";
import Player from "./Player.jsx";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      mouse: { x: 0, y: 0 },
      cell: null,
      tooltip: false
    };
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
    const cellSide = 20;
    const cellCount = options.amount;
    const sideCellCount = options.side;
    return (
      <div
        className="grid"
        style={{
          width: cellSide * sideCellCount,
          height: cellSide * sideCellCount
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
            />
          );
        })}
        {tooltip && <Tooltip {...mouse} cell={cell} />}
        <Player {...game} />
      </div>
    );
  }
}
