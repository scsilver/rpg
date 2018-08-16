import React, { Component } from "react";
import PropTypes from "prop-types";

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
  handleMouseMove = _.debounce((event, cell) => {
    const mouse = { x: event.clientX, y: event.clientY };
    this.setState({ mouse, tooltip: true, cell: cell });
  }, 500);
  render() {
    return (
      <div className="grid">
        {data.cells.map(xSets =>
          xSets.map(yCell => (
            <Cell
              handleMouseMove={(e, cell) => {
                e.persist();
                return this.handleMouseMove(e, cell);
              }}
              mouse={this.state.mouse}
              cell={yCell}
            />
          ))
        )}
        {this.state.tooltip && (
          <Tooltip {...this.state.mouse} cell={this.state.cell} />
        )}
      </div>
    );
  }
}
