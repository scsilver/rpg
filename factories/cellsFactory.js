import _ from "lodash";
import { biomes, characters } from "../assets/characters.js";
import { percentTrue } from "../src/Helpers/helpers.js";
const baseHeight = 10;
const getSqrt = amount => Math.floor(Math.sqrt(amount));

const getCellByPosition = (cell, cells, sideCells, { x, y }) => {
  const id = x + sideCells * y;
  return cells[id];
};
const getAdjacentCells = {
  all: (cell, cells, sideCells) => {
    const { x, y } = cell;
    let adjacentCells = [];
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
          const adjacentCell = getCellByPosition(cell, cells, sideCells, {
            x: x + xOffset,
            y: y + yOffset
          });

          adjacentCells.push(adjacentCell);
        }
      });
    });
    return adjacentCells;
  },
  perpendicular: (cell, cells, sideCells) => {
    const { x, y } = cell;
    let adjacentCells = [];
    let offsetArray = [-1, 0, 1];
    offsetArray.map(xOffset => {
      offsetArray.map(yOffset => {
        if (
          (xOffset == 0 && yOffset == 0) ||
          x + xOffset < 0 ||
          x + xOffset >= sideCells ||
          y + yOffset < 0 ||
          y + yOffset >= sideCells ||
          (yOffset != 0 && xOffset != 0)
        ) {
        } else {
          const adjacentCell = getCellByPosition(cell, cells, sideCells, {
            x: x + xOffset,
            y: y + yOffset
          });

          adjacentCells.push(adjacentCell);
        }
      });
    });
    return adjacentCells;
  },
  corners: (cell, cells, sideCells) => {
    const { x, y } = cell;
    let adjacentCells = [];
    let offsetArray = [-1, 0, 1];
    offsetArray.map(xOffset => {
      offsetArray.map(yOffset => {
        if (
          (xOffset == 0 && yOffset == 0) ||
          x + xOffset < 0 ||
          x + xOffset >= sideCells ||
          y + yOffset < 0 ||
          y + yOffset >= sideCells ||
          (yOffset != 0 && xOffset == 0) ||
          (xOffset != 0 && yOffset == 0)
        ) {
        } else {
          const adjacentCell = getCellByPosition(cell, cells, sideCells, {
            x: x + xOffset,
            y: y + yOffset
          });

          adjacentCells.push(adjacentCell);
        }
      });
    });
    return adjacentCells;
  }
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
      getAdjacentCells.all(cell, cells, sideCells).map(cell => {
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

const islandMaker = (cell, cells, options) => {
  if (
    cell.x == 0 ||
    cell.x == options.side - 1 ||
    cell.y == 0 ||
    cell.y == options.side - 1
  ) {
    return { ...cell, height: baseHeight - 0.1, biome: biomes.water };
  }
  return cell;
};
const cellsPropertyGenerator = (cells, options) => {
  return cells
    .map((cell, i, cells) => cellPropertyGenerator(cell, cells, options))
    .map((cell, i, cells) => heightMaker(cell, cells, options))
    .map((cell, i, cells) => islandMaker(cell, cells, options))
    .map((cell, i, cells) => heightAverager(cell, cells, options))
    .map((cell, i, cells) => waterFiller(cell, cells, options))
    .map((cell, i, cells) => beachComber(cell, cells, options));
  // .map((cell, i, cells) => resourceFiller(cell, cells, options))
  // .map((cell, i, cells) => creatureFiller(cell, cells, options));
};
const cellPropertyGenerator = (cell, cells, options) => {
  return {
    ...cell,
    ...cellLandscapeGenerator(cell, cells, options)
  };
};
const cellLandscapeGenerator = (cell, cells, options) => {
  const landscapeSideCellCount = getSqrt(options.amount);
  const biome = options.biomePicker();
  return {
    x: cell.id % landscapeSideCellCount,
    y: Math.floor(cell.id / landscapeSideCellCount),
    height: options.baseHeight || 0,
    biome
  };
};

const heightMaker = (cell, cells, options) => {
  return {
    ...cell,
    height:
      options.baseHeight * options.heightVariance * (Math.random() - 0.4) +
      options.baseHeight
  };
};

const waterFiller = (cell, cells, options) => {
  if (cell.height < options.baseHeight) {
    return { ...cell, biome: biomes.water };
  }
  return cell;
};

const heightAverager = (cell, cells, options) => {
  const adjacentCells = getAdjacentCells.all(cell, cells, options.side);
  return {
    ...cell,
    height:
      adjacentCells.map(cell => cell.height).reduce((curr, prev) => {
        return prev + curr;
      }, 0) / adjacentCells.length
  };
};

const beachComber = (cell, cells, options) => {
  if (
    getAdjacentCells
      .perpendicular(cell, cells, options.side)
      .map(cell => cell.biome)
      .filter(biome => biome == biomes.water) > 0 &&
    cell.biome != biomes.water
  ) {
    return { ...cell, biome: biomes.beach };
  }
  return cell;
};
const resourceFiller = (cell, cells, options) => {
  return {
    ...cell,
    resources: options.resourcesPicker(cell.biome)
  };
};
const characterFiller = (cell, characters, options) => {
  const charactersInCell = characters.filter(
    character =>
      character.position &&
      cell.x == character.position.x &&
      cell.y == character.position.y
  );
  return {
    ...cell,
    character: charactersInCell.length > 0 ? charactersInCell[0] : {}
  };
};
const charactersFiller = (cells, characters, options) => {
  return cells.map(cell => characterFiller(cell, characters, options));
};
export { getCellByPosition, percentTrue, charactersFiller };
//height->water->beach->forrest
