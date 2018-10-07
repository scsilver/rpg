import { observable, action, computed, autorun, get } from "mobx";
import { biomes, characters } from "../../../assets/characters.js";
import emojis from "../../../assets/emojis.js";
import Position from "./../../../assets/Utils/Position";

const initialGameState = {
  biomes,
  characters,
  fullScreenPane: {
    visible: false,
    display: ""
  },
  effectsPane: {
    playerHealthHit: null,
    characterHealthHit: null,
    characterDied: null,
    red: false
  },
  newGameWizard: {
    visible: false
  },
  world: {},
  player: {
    position: {
      x: 1,
      y: 1
    }
  }
};
const initialWorldState = args => {
  return {
    time: 0,
    options: {
      baseHeight: 1,
      heightVariance: 0.3,
      amount: 400,
      side: 20,
      jobs: ["Ranger", "Wizard", "Knight"],
      races: ["Human", "Mage", "Elf"],
      orePicker: () =>
        oreOptions[Math.floor(Math.random() * oreOptions.length)],
      biomePicker: () => {
        var newBiomes = biomes;
        delete newBiomes.mountain;
        return objectToArray(newBiomes).getRandomFromObject();
      }
    },
    cells: [],
    characters: []
  };
};

const addGameActions = state => {
  state.initializeGame = action(() => {
    state.game = initialGameState;
    state.initializeWorld();
    state.initializePlayer();
  });
  state.initializeWorld = action(() => {
    state.updateWorld(initialWorldState());
    state.defaultCellsStateRecipie();
    // state.initializeCharacters();
    // state.initializeIntro();
    // state.initializeSavedGame();
  });
  state.initializeIntro = action(() => {
    state.updateGame({
      fullScreenPane: {
        visible: true,
        type: "start",
        display:
          "You awake on a new world. There are beaches, forests and mountains full of new friends, adventures, and unspeakable dangers. Proceed with wonder and caution."
      }
    });
  });
  state.initializeSavedGame = action(() => {
    state.saveGame;
  });
  state.saveGame = action(() => {
    state.updateState({
      saves: [...state.saves, game]
    });
  });

  state.updateGame = action(function(game) {
    state.game = { ...state.game, ...game };
  });
  state.updateWorld = action(function(world) {
    state.updateGame({ world: { ...state.game.world, ...world } });
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
};
export default addGameActions;
