import { observable, action, computed, autorun, get } from "mobx";
import Plant from "../../../assets/Environment/Plant";
const addInteractionActions = state => {
  //Player Movement
  state.movePlayerForward = action(() => {
    state.updatePlayer({
      position: state.playerCellsAhead.get()[1].position
    });
    state.moveCharacters();
  });

  state.turnPlayer = action(movementOrientation => {
    state.updatePlayer({
      orientationDeg: movementOrientation
    });
    state.moveCharacters();
  });
  //Character Interaction
  state.fight = action(() => {
    const cell = state.playerCellsAhead.get()[1];
    if (
      cell &&
      cell.character &&
      cell.character.interaction &&
      cell.character.health > 0
    ) {
      cell.character.interaction(state);
    } else if (cell.character.health < 0) {
      console.log("dead animal");
    }
    console.log("on Gaurd", state.player.get(), cell);
  });
  state.plantHarvest = action(() => {
    const cellsAhead = state.playerCellsAhead.get();
    const harvest = cellsAhead[0].plant && cellsAhead[0].plant.inventory.pop();
    debugger;
    state.updatePlayer({
      inventory: [...state.player.get().inventory, harvest]
    });
  });
  state.harvest = action(() => {
    const cell = state.playerCellsAhead.get()[0];
    debugger;
    if (
      cell &&
      cell.plant &&
      cell.plant.interaction &&
      cell.plant.inventory.length > 0
    ) {
      cell.plant.interaction(state);
    } else if (cell && cell.plant && cell.plant.inventory.length < 0) {
      console.log("dead animal");
    }
  });
  state.chop = action(({ player, plant }) => {
    state.updateCell({ ...state.playerCellsAhead[0], plant: null });
    state.updatePlayer({ inventory: [...state.player.inventory, plant.wood] });
  });
  state.plant = action(() => {
    const seed = state.player
      .get()
      .inventory.find(item => item.__proto__.constructor.name == "Seed");
    const newInventory = state.player
      .get()
      .inventory.filter(item => item != seed);
    state.updateCell({
      ...state.playerCellsAhead.get()[0],
      plant: new Plant({ specie: seed.specie })
    });
    state.updatePlayer({ inventory: newInventory });
  });
  state.move = action(() => {
    state.instructionSet = {
      movePlayerForward: true
    };
    const cellsAhead = state.playerCellsAhead.get();
    state.biomeInteraction({ cell: cellsAhead[1] });
    state.characterInteraction({ cell: cellsAhead[1] });
  });
  state.movePlayer = action((xOffset, yOffset) => {
    const {
      world: { options },
      player: { orientationDeg, position: { x, y } }
    } = state.game;
    state.updateEffectsPane({ playerHealthHit: null });
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (
      0 <= xOffset + x &&
      xOffset + x < options.side &&
      0 <= yOffset + y &&
      yOffset + y < options.side
    ) {
      state.interactionProcess(state.move);
    }
  });
  state.moveCharacter = action((character, xOffset, yOffset) => {
    const {
      world: { options },
      character: { orientationDeg, position: { x, y } }
    } = state.game;
    state.updateEffectsPane({ playerHealthHit: null });
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
      if (
        0 <= xOffset + x &&
        xOffset + x < options.side &&
        0 <= yOffset + y &&
        yOffset + y < options.side
      ) {
        state.moveCharacter(character);
      }
    } else {
      state.turnCharacter(character, movementOrientation);
    }
  });
  state.interactionProcess = action(actionToExec => {
    state.instructionSet = {
      movePlayerForward: false
    };
    debugger;
    actionToExec();
    state.executedInstructionSet();
  });

  state.executedInstructionSet = action(() => {
    console.log("instructionSet", state.instructionSet);

    Object.keys(state.instructionSet)
      .filter(
        (key, i, keys) =>
          !!state.instructionSet[key] && typeof state[key] == "function"
      )
      .map((key, i, keys) => {
        state[key](state.instructionSet[key]);
      });
  });
  //Human Interaction
  state.handleNewGameWizardClick = action(() => {
    if (
      !state.objectToArray(state.game.player).includes("") ||
      !state.objectToArray(state.game.player).includes(0)
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

  state.handleInteractionKey = action(key => {
    switch (key) {
      case "f":
        state.interactionProcess(state.fight);
        break;

      case "c":
        state.interactionProcess(state.chop);
        break;
      case "h":
        state.interactionProcess(state.harvest);
        break;
      case "p":
        state.interactionProcess(state.plant);
        break;
      // state.fight({
      //   player: state.player.get(),
      //   cell: state.playerCellsAhead.get()[1]
      // });
      // state.harvest({
      //   player: state.player.get(),
      //   cell: state.playerCellsAhead.get()[1].plant
      // });

      default:
        break;
    }
  });

  state.handleKeyPress = action(event => {
    const orientationDeg = state.player.get().orientationDeg;
    if (!state.game.newGameWizard.visible) {
      switch (event.key) {
        case "d":
        case "ArrowRight":
          state.turnPlayer(orientationDeg + 90);
          break;
        case "a":

        case "ArrowLeft":
          state.turnPlayer(orientationDeg - 90);
          break;

        case "w":

        case "ArrowUp":
          state.movePlayer(0, -1);
          break;
        case "s":

        case "ArrowDown":
          state.turnPlayer(orientationDeg - 180);
          break;

        default:
          state.handleInteractionKey(event.key);
          break;
      }
    }
  });
  state.handleKeyPressThrottled = action(() =>
    _.throttle(state.handleKeyPress, 100, {
      leading: true
    })
  );
};
export default addInteractionActions;
