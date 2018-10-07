import Cell from "./Cell";
class Cells {
  constructor({ width = 20, height = 20 } = {}) {
    super(props);
    new Array(width).fill[0].map(x => {
      new Array(height).fill[0].map(y => {
        const cell = new Cell({ position: { x, y } });
        this[x][y] = cell;
        !!this.cellList ? this.cellList.push(cell) : (this.cellList = [cell]);
      });
    });
  }
  cellById = id => this.cellList[id];
  cellByPosition = ({ x, y }) => this[x][y];
}
