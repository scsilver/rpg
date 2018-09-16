import { observable, action, computed, autorun, get } from "mobx";
import { biomes, characters } from "../../../assets/characters.js";
import emojis from "../../../assets/emojis.js";
import { objectToArray, percentTrue } from "../../../src/Helpers/helpers";
import { characterSpawn } from "../../../factories/characterSpawn.js";

import {
  cellsFactory,
  getCellByPosition
} from "../../../factories/cellsFactory.js";
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
      amount: 900,
      side: 30,
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
    cells: []
  };
};
const initialPlayerState = {
  mentalState: {
    interaction: "Feeling fine...",
    environment: "Blissful..."
  },
  emoji: emojis.player,
  inventory: [],
  name: "Scott",
  race: "jewBorne",
  job: "none",
  height: 67,
  age: 27,
  agility: 3,
  attack: 3,
  defense: 1,
  health: 100,
  hunger: 100,
  xp: 5,
  position: {
    x: 1,
    y: 1
  },
  orientationDeg: "0",
  cellsAhead: [{}]
};

const addGameActions = state => {
  state.initializeGame = action(() => {
    state.game = initialGameState;
    state.initializeWorld();
    state.initializePlayer();
  });
  state.initializeWorld = action(() => {
    state.updateWorld(initialWorldState());
    state.initializeCells();
    state.initializeCharacters();
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

  state.initializePlayer = action(() => {
    state.updatePlayer({ ...initialPlayerState });
  });

  state.getCellByPosition = ({ x, y }) => {
    const id = x + Math.sqrt(state.game.world.options.amount) * y;
    return state.game.world.cells[id];
  };

  state.updateCell = action(cell => {
    state.game.world.cells[cell.id] = cell;
  });

  state.updateCharacters = action(characters => {
    state.game.world.characters = characters;
    // state.playerCellsAhead();
  });
};
export default addGameActions;
