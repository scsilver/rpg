import { action, computed } from "mobx";
import Cell from "../../../assets/Environment/Cell.js";
import _ from "lodash";
const addCellActions = state => {
  state.checkOneAheadCell = () => {
    const { biome, character } = state.playerCellsAhead()[1];
    return { biome, character };
  };
  state.checkTwoAheadCell = () => {
    const { biome, character } = state.playerCellsAhead()[2];
    return { biome, character };
  };
  state.interactionHandler = action(cell => {
    state.instructionSet = {
      movePlayerForward: false
    };
    state.biomeInteraction({ cell });
    state.characterInteraction({ cell });
    state.executedInstructionSet();
  });
  state.executedInstructionSet = action(() => {
    Object.keys(state.instructionSet)
      .filter(
        (key, i, keys) =>
          !!state.instructionSet[key] && typeof state[key] == "function"
      )
      .map((key, i, keys) => {
        state[key](state.instructionSet[key]);
      });
  });
  state.defaultCellsStateRecipie = action(() => {
    state.instantiatCells();
    state.applyRandomAndAveragedCellHeights();
    state.applyBiomes();
    state.applyCharacters();
  });
  state.initializeCells = action(() => {
    const cells = [];
    _.times(state.game.world.options.side, x =>
      _.times(state.game.world.options.side, y =>
        cells.push(new Cell({ position: { x, y } }))
      )
    );
    state.updateCells(cells);
  });

  state.cellsToBeChecked = (character, offsetArray) => {
    const cellsToBeChecked = [];
    const { orientationDeg, position: { x, y } } = character;
    offsetArray.map(offset => {
      const directionalx =
        offset.xOffset * Math.floor(Math.sin(orientationDeg * Math.PI / 180)) +
        offset.yOffset * Math.floor(Math.sin(orientationDeg * Math.PI / 180));
      const directionaly =
        offset.yOffset * Math.floor(Math.cos(orientationDeg * Math.PI / 180)) -
        offset.xOffset * Math.floor(Math.cos(orientationDeg * Math.PI / 180));

      cellsToBeChecked.push(
        state.getCellByPosition({ x: x + directionalx, y: y + directionaly })
      );
    });
    return cellsToBeChecked;
  };
  state.checkCell = (
    categoryName,
    categoryOptions,
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return (
      objectToArray(categoryOptions)
        .values.map(
          categoryOption =>
            movementCell[categoryName].name == categoryOption.name
              ? categoryOption.playerInteraction(
                  state,
                  movementCell,
                  forwardMovementCell,
                  orientationDeg
                )
              : false
        )
        .filter(option => option)[0] || state
    );
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

  state.playerCellsAhead = () =>
    state.getCellsByPattern(state.game.player, 4, "lineFront");

  // state.charactersCellsAhead = computed(() =>
  //   state.game.world.characters.map(charactr => {
  //     return {
  //       id: character.id,
  //       cellsAhead: state.characterCellsAhead(character)
  //     };
  //   })
  // );

  state.characterCellsAhead = character =>
    state.getCellsByPattern(state.game.player, 4, "lineFront");
  state.updateCells = action(cells => {
    state.game.world.cells = cells;
  });
  state.updateCell = action((cell, id) => {
    state.game.world.cells[id] = cell;
  });
};

export default addCellActions;
