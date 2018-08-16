import _ from "lodash";
const cellsFactory = amount => {
  const sideCells = Math.floor(Math.sqrt(amount));
  const cells = _.times(sideCells, n => []);
  const seed = Math.random();
  _.times(amount, cellId => {
    const x = cellId % sideCells;
    const y = Math.floor(cellId / sideCells);
    const adjacentCellAverageHeight = position => {
      let sum = 0;
      let count = 0;
      let offsetArray = [-1, 0, 1];
      offsetArray.map(xOffset => {
        offsetArray.map(yOffset => {
          if (
            (xOffset == 0 && yOffset == 0) ||
            x + xOffset < 0 ||
            x + xOffset >= sideCells ||
            y + yOffset < 0 ||
            y + yOffset >= sideCells
          ) {
          } else {
            sum =
              sum +
              ((cells &&
                cells[x + xOffset] &&
                cells[x + xOffset][y + yOffset] &&
                cells[x + xOffset][y + yOffset].height) ||
                baseHeight) *
                (cells &&
                cells[x + xOffset] &&
                cells[x + xOffset][y + yOffset] &&
                cells[x + xOffset][y + yOffset].height > baseHeight
                  ? 2
                  : 1);
            count = count + 1;
          }
        });
      });
      return sum / count;
    };
    const landscape = positionObj => {
      const landscape = { height: baseHeight, avg: baseHeight };
      if (
        positionObj.x == 0 ||
        positionObj.x == sideCells - 1 ||
        positionObj.y == 0 ||
        positionObj.y == sideCells - 1
      ) {
        landscape.height = baseHeight;
      } else {
        landscape = {
          avg: adjacentCellAverageHeight(positionObj),
          height:
            adjacentCellAverageHeight(positionObj) * 1 +
            baseHeight * 1 * (Math.random() - 0.5)
        };
      }
      console.log(landscape);
      return landscape;
    };
    const biome = () => {};
    const resources = () => {};

    cells[x][y] = { x, y, ...landscape({ x, y }), ...biome(), ...resources() };
  });
  return { cells: cells };
};
export default cellsFactory;
