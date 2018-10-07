import { action, computed } from "mobx";
import Cell from "../../../assets/Environment/Cell.js";
import _ from "lodash";
import plants from "../../../assets/Environment/plants";
const addCellUtilityActions = state => {
  state.updateCell = action((cell, id) => {
    const cells = state.game.world.cells;
    cells[cell.id] = cell;
    state.updateCells(cells);
  });

  state.updateCells = action(cells => {
    state.game.world.cells = cells;
  });

  state.checkOneAheadCell = () => {
    const { biome, character } = state.playerCellsAhead.get()[1];
    return { biome, character };
  };

  state.checkTwoAheadCell = () => {
    const { biome, character } = state.playerCellsAhead.get()[2];
    return { biome, character };
  };

  state.updateCellHistory = action(function(cell) {
    state.cellHistory = [...state.cellHistory, ...cell];
  });
  //Locators
  state.getCellByPosition = ({ x, y }) => {
    const id = x + Math.sqrt(state.game.world.options.amount) * y;
    return state.cells.get()[id];
  };

  state.cellsToBeChecked = (character, offsetArray) => {
    const cellsToBeChecked = [];
    if (!!character.position) {
      const { orientationDeg, position: { x, y } } = character;
      offsetArray.map(offset => {
        const directionalx =
          offset.xOffset *
            Math.floor(Math.sin(orientationDeg * Math.PI / 180)) +
          offset.yOffset * Math.floor(Math.sin(orientationDeg * Math.PI / 180));
        const directionaly =
          offset.yOffset *
            Math.floor(Math.cos(orientationDeg * Math.PI / 180)) -
          offset.xOffset * Math.floor(Math.cos(orientationDeg * Math.PI / 180));
        cellsToBeChecked.push(
          state.getCellByPosition({ x: x + directionalx, y: y + directionaly })
        );
      });
    }
    return cellsToBeChecked;
  };

  state.patternToOffsetArray = args => {
    const { rOffsets, xOffsets, yOffsets } = args;
    const offSetArray = [];
    rOffsets.map(rOffset =>
      xOffsets.map(xOffset =>
        yOffsets.map(yOffset =>
          offSetArray.push({
            xOffset: rOffset * xOffset,
            yOffset: rOffset * yOffset
          })
        )
      )
    );
    return offSetArray;
  };

  state.patternedOffsetArray = (r, pattern) => {
    switch (pattern) {
      case "lineFront":
        return state.patternToOffsetArray({
          rOffsets: _.times(r, radialOffset => radialOffset),
          xOffsets: [1],
          yOffsets: [0]
        });
      case "radar":
        return state.patternToOffsetArray({
          rOffsets: _.times(r, radialOffset => radialOffset),
          xOffsets: [-1, 0, 1],
          yOffsets: [-1, 0, 1]
        });
      case "view":
        return state.patternToOffsetArray({
          rOffsets: _.times(r, radialOffset => radialOffset),

          xOffsets: [0, 1],
          yOffsets: [-1, 0, 1]
        });
      case "front":
        return state.patternToOffsetArray({
          rOffsets: _.times(r, radialOffset => radialOffset),
          xOffsets: [1],
          yOffsets: [-1, 0, 1]
        });

      default:
        break;
    }
  };

  state.getCellsByPattern = (character, r, pattern) =>
    state.cellsToBeChecked(character, state.patternedOffsetArray(r, pattern));

  state.getDistanceBetween = (a, b) => {
    const deltaX = a.position.x - b.position.x;
    const deltaY = a.position.y - b.position.y;
    return Math.sqrt(deltaX * deltaX * deltaY * deltaY);
  };

  state.binarySearchIndex = ({ value, array }) => {
    let arrayA = array;
    let arrayB = [];
    let length = arrayA.length;
    let ogLength = array.length;
    let halfIndex = Math.floor(length / 2);
    let centerValue = array[halfIndex];

    while (halfIndex < ogLength) {
      console.log(arrayA, arrayB, length, halfIndex, centerValue);

      if (value < centerValue) {
        arrayB = arrayA.slice(halfIndex + 1);
        arrayA = arrayA.slice(0, halfIndex + 1);
        length = arrayA.length;
        halfIndex = Math.floor(length / 2);
        centerValue = arrayA[halfIndex];
        console.log("halfIndex", halfIndex, ogLength);
      } else if (value > centerValue) {
        arrayA = arrayB.slice(halfIndex + 1);
        arrayB = arrayB.slice(0, halfIndex + 1);
        length = arrayB.length;
        halfIndex = Math.floor(length / 2);
        centerValue = arrayB[halfIndex];
      } else {
        return halfIndex;
      }
    }
    return false;
  };

  state.binaryObjectSearchIndex = ({ value, arrayOfObjects, key }) => {
    let arrayA = arrayOfObjects;
    let arrayB = [];
    let length = arrayA.length;
    let ogLength = arrayOfObjects.length;
    let halfIndex = Math.floor(length / 2);
    let centerValue = arrayOfObjects[halfIndex][key];

    while (halfIndex < ogLength) {
      console.log(arrayA, arrayB, length, halfIndex, centerValue);

      if (value < centerValue) {
        arrayB = arrayA.slice(halfIndex + 1);
        arrayA = arrayA.slice(0, halfIndex + 1);
        length = arrayA.length;
        halfIndex = Math.floor(length / 2);
        centerValue = arrayA[halfIndex][key];
      } else if (value > centerValue) {
        arrayA = arrayB.slice(halfIndex + 1);
        arrayB = arrayB.slice(0, halfIndex + 1);
        length = arrayB.length;
        halfIndex = Math.floor(length / 2);
        centerValue = arrayB[halfIndex][key];
      } else {
        return { centerValue, halfIndex };
      }
    }
    return false;
  };
};

export default addCellUtilityActions;
