import _ from "lodash";
const baseHeight = 10;
const getSqrt = amount => Math.floor(Math.sqrt(amount));
const percentTrue = percent => {
  return Math.random() <= percent;
};
const getAdjacentCells = (cell, cells, sideCells) => {
  let adjacentCells = [];
  let offsetArray = [-1, 0, 1];
  offsetArray.map(xOffset => {
    offsetArray.map(yOffset => {
      if (
        (xOffset == 0 && yOffset == 0) ||
        cell.x + xOffset < 0 ||
        cell.x + xOffset >= sideCells ||
        cell.y + yOffset < 0 ||
        cell.y + yOffset >= sideCells
      ) {
      } else {
        adjacentCells.push(cells[cell.x + xOffset][cell.y + yOffset]);
      }
    });
  });
  return adjacentCells;
};
const landScapeModules = {
  a: (cell, cells, sideCells) => {
    const adjacentCellAverageHeight = cell => {
      const { x, y } = cell;
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
    const landscape = cell => {
      const landscape = { height: baseHeight, avg: baseHeight };
      if (
        cell.x == 0 ||
        cell.x == sideCells - 1 ||
        cell.y == 0 ||
        cell.y == sideCells - 1
      ) {
        landscape.height = baseHeight;
      } else {
        landscape.avg = adjacentCellAverageHeight(cell);
        landscape.height =
          adjacentCellAverageHeight(cell) * 1 +
          baseHeight * 1 * (Math.random() - 0.5);
      }
      return landscape;
    };
    return landscape(cell);
  },
  b: (cell, cells, sideCells) => {
    const oreContent = (cell, cells, sideCells) => {
      var sum = 0;
      var multiple = 1;
      var chancePerAdjacent = 0.7;
      var chanceNoneAdjacent = 0.2;
      getAdjacentCells(cell, cells, sideCells).map(cell => {
        if (cell.hasOre) {
          sum = sum + chancePerAdjacent;
          multiple = multiple * chancePerAdjacent;
        } else {
          sum = sum + chanceNoneAdjacent;
          multiple = multiple * chanceNoneAdjacent;
        }
      });
      return { hasOre: percentTrue(sum - multiple) };
    };
    return oreContent(cell, cells, sideCells);
  }
};
const xcellsFactory = amount => {
  const sideCells = Math.floor(Math.sqrt(amount));
  const cells = _.times(sideCells, n => []);
  const seed = Math.random();
  _.times(amount, cellId => {
    const x = cellId % sideCells;
    const y = Math.floor(cellId / sideCells);

    const biome = () => {};
    const resources = () => {};

    cells[x][y] = {
      ...landScapeModules.b({ x, y }, cells, sideCells),
      x: "a"
    };
  });

  return cells;
};

const cellFactory = id => {
  return { id };
};

const cellsFactory = options => {
  let cells = [];
  _.times(options.amount, id => {
    cells = [...cells, cellFactory(id)];
  });
  return cellsPropertyGenerator(cells, options);
};

const cellsPropertyGenerator = (cells, options) => {
  return cells.map(cell => cellPropertyGenerator(cell, cells, options));
};
const cellPropertyGenerator = (cell, cells, options) => {
  return {
    ...cell,
    ...cellLandscapeGenerator(cell, cells, options)
  };
};
const cellLandscapeGenerator = (cell, cells, options) => {
  const landscapeSideCellCount = getSqrt(options.amount);
  return {
    x: cell.id % landscapeSideCellCount,
    y: Math.floor(cell.id / landscapeSideCellCount),
    height: options.baseHeight || 0,
    ore: options.orePicker() || "none",
    biome: options.biomePicker() || "none"
  };
};
export default cellsFactory;
