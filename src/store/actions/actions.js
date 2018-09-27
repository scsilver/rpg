import { observable, action, computed, autorun, get } from "mobx";
import { objectToArray, percentTrue } from "../../../src/Helpers/helpers";
import { biomes, characters } from "../../../assets/characters.js";
import {
  cellsFactory,
  getCellByPosition,
  charactersFiller
} from "../../../factories/cellsFactory.js";

import { characterSpawn } from "../../../factories/characterSpawn.js";
import emojis from "../../../assets/emojis.js";
import _ from "lodash";
import addCharacterActions from "./characterActions";
import addBiomeActions from "./biomeActions";
import addGameActions from "./gameActions";
import addCellActions from "./cellActions";
import addProbabilityActions from "./probabilityActions";
const addActions = state => {
  state.getRandomFromArray = array => {
    return array[Math.floor(Math.random() * array.length)];
  };
  state.objectToArray = obj => Object.keys(obj).map(key => obj[key]);
  state.getRandomFromObject = obj => {
    return state.getRandomFromArray(state.objectToArray(obj));
  };
  state.updateCellHistory = action(function(cell) {
    state.cellHistory = [...state.cellHistory, ...cell];
  });
  state.updateGame = action(function(game) {
    state.game = { ...state.game, ...game };
  });
  state.updateWorld = action(function(world) {
    state.updateGame({ world: { ...state.game.world, ...world } });
  });
  state.updatePlayer = action(function(player) {
    state.updateGame({ player: { ...state.game.player, ...player } });
  });
  state.updateFullScreenPane = action(fullScreenPane => {
    state.updateGame({
      fullScreenPane: { ...state.game.fullScreenPane, ...fullScreenPane }
    });
  });
  state.updateEffectsPane = action(effectsPane => {
    state.updateGame({
      effectsPane: { ...state.game.effectsPane, ...effectsPane }
    });
  });
  //Game Controls
  state.saveGame = action(function(game) {
    state.saves = [...state.saves, game];
  });
  state.loadGame = action(function(gameIndex) {
    state.game = state.saves[gameIndex];
  });
  state.newGame = action(player => {
    state.initializeGame();
  });
  state.newWorld = action(() => {
    state.initializeWorld();
  });
  //Time Managment
  state.gameTimeHandler = action(() => {
    // const hungerRate = 0.01;
    // const newHunger = (state.game.player.hunger - hungerRate)
    //   .toString()
    //   .slice(
    //   0,
    //   Math.ceil(Math.log10(state.game.player.hunger)) -
    //   Math.log10(hungerRate) +
    //   1
    //   );
    // const isStarved = newHunger < 0;
    // isStarved ? clearInterval(state.gameInterval) : null;
    //
    // state.updateGame(
    //   {
    //     ...state.game,
    //     world: {
    //       ...state.game.world,
    //       time: state.game.world.time + 0.5
    //     },
    //     player: {
    //       ...state.game.player,
    //       hunger: newHunger
    //     },
    //     fullScreenPane: {
    //       visible: isStarved,
    //       display: isStarved ? "You starved to death!" : null
    //     },
    //     effectsPane: {
    //       hit: false
    //     }
    //   });
    state.updateWorld({ time: state.game.world.time + 1000 });
    state.updateEffectsPane({ playerHealthHit: null });
  });
  state.startGameInterval = action(
    () => (state.gameInterval = setInterval(state.gameTimeHandler, 1000))
  );

  state.clearGameInterval = action(() => clearInterval(state.gameInterval));

  //Human Interaction
  state.handleNewGameWizardClick = action(() => {
    if (
      !objectToArray(state.game.player).values.includes("") ||
      !objectToArray(state.game.player).values.includes(0)
    ) {
      //  state.startGameInterval();
      state.updateGame({
        newGameWizard: {
          visible: false
        }
      });
    }
  });
  state.handleFullScreenDisplayClick = action(() => {
    state.updateGame({
      fullScreenPane: {
        visible: false,
        display: null
      },
      newGameWizard: {
        visible: true
      }
    });
  });

  state.inputHandler = action((e, inputKey, inputType) => {
    const { game: { player }, options } = state;
    var targetValueNumber = null;
    if (inputType == "range") {
      targetValueNumber = Number.parseInt(e.target.value);
    }

    state.updatePlayer({
      [`${inputKey}`]: targetValueNumber || e.target.value
    });
  });
  state.handleKeyPress = action(event => {
    if (!state.game.newGameWizard.visible) {
      switch (event.key) {
        case "ArrowRight":
          state.movePlayer(1, 0);
          break;

        case "ArrowLeft":
          state.movePlayer(-1, 0);
          break;

        case "ArrowUp":
          state.movePlayer(0, -1);
          break;

        case "ArrowDown":
          state.movePlayer(0, 1);
          break;
        default:
          break;
      }
    }
  });
  state.handleKeyPressThrottled = action(() =>
    _.throttle(state.handleKeyPress, 100, {
      leading: true
    })
  );

  //Player Movement
  state.movePlayerForward = action(() => {
    const {
      orientationDeg,
      cellsAhead,
      position: { x, y }
    } = state.game.player;
    state.updatePlayer({
      position: state.playerCellsAhead()[1].position
    });
    state.updatePlayerCellsAhead();
  });
  state.turnPlayer = action(movementOrientation => {
    const { orientationDeg } = state.game.player;

    state.updatePlayer({
      orientationDeg: movementOrientation
    });
  });
  state.movePlayer = action((xOffset, yOffset) => {
    const {
      world: { options },
      player: { orientationDeg, position: { x, y } }
    } = state.game;
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
      if (
        0 <= xOffset + x &&
        xOffset + x < options.side &&
        0 <= yOffset + y &&
        yOffset + y < options.side
      ) {
        state.interactionHandler(state.playerCellsAhead()[0]);
      }
    } else {
      state.turnPlayer(movementOrientation);
    }
  });
  //  handleMoveCharacters = that => {
  //     const {
  //       options,
  //       game,
  //       game: { world, world: { cells, characters } }
  //     } = that.state;
  //     var nextPositionCharacters = [];
  //     characters.map(character => {
  //       const { position, position: { x, y, orientationDeg } } = character;
  //       const nextCharacter = {
  //         ...character,
  //         position: {
  //           ...position,
  //           x: x + Math.floor(Math.sin(orientationDeg * Math.PI / 180)),
  //           y: y + Math.floor(Math.cos(orientationDeg * Math.PI / 180))
  //         }
  //       };
  //       nextPositionCharacters = [...nextPositionCharacters, nextCharacter];
  //     });
  //     const newCells = charactersFiller(cells, nextPositionCharacters, options);

  //     that.setState({
  //       ...that.state,
  //       game: {
  //         ...game,
  //         world: { ...world, cells: newCells, characters: nextPositionCharacters }
  //       }
  //     });
  //   };
  addCharacterActions(state);
  addBiomeActions(state);
  addGameActions(state);
  addCellActions(state);
  addProbabilityActions(state);
  return state;
};
export default addActions;
