import { observable, action, computed, autorun, get } from "mobx";
import { objectToArray, percentTrue } from "../../src/Helpers/helpers";
import { biomes, characters } from "../../assets/characters.js";
import {
  cellsFactory,
  getCellByPosition,
  charactersFiller
} from "../../factories/cellsFactory.js";

import { characterSpawn } from "../../factories/characterSpawn.js";
import emojis from "../../assets/emojis.js";
import _ from "lodash";
import addActions from "./actions/actions";
import addComputed from "./computed";
const state = observable({
  fullScreenPane: {
    playerDied: false,
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
  game: { player: {} },
  cellHistory: [],
  saves: []
});
state.__defineGetter__("acells", function() {
  return this.game.world.cells;
});
addActions(state);
addComputed(state);
autorun(() => {
  console.log("autorun", state); // get can track not yet existing properties
});
state.updatePlayerCellsAhead = action(() => {
  state.updatePlayer({
    cellsAhead: state.getCellsByPattern(state.game.player, 4, "lineFront")
  });
});

module.exports = state;
