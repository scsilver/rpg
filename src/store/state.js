import { observable, action, computed, autorun, get } from "mobx";
import { objectToArray, percentTrue } from "../../src/Helpers/helpers";
import { biomes, characters } from "../../assets/characters.js";

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

addActions(state);
addComputed(state);

autorun(() => {
  console.log("autorun", state.get()); // get can track not yet existing properties
  console.log("cells", state.cells.get()); // get can track not yet existing properties
  console.log("characters", state.characters.get()); // get can track not yet existing properties
  console.log("player", state.player.get());
  console.log("playerCellsAhead", state.playerCellsAhead.get()); // get can track not yet existing properties
});

var disposer = state.playerCellsAhead.observe(change => {
  const cellsAhead = change.newValue.map(
    cell => (cell && cell.position) || null
  );

  console.log("playerCellsAhead", [change, cellsAhead[1], cellsAhead[2]]);
});
var disposer2 = state.cells.observe(change => {
  const cells = change.newValue.map(cell => (cell && cell.character) || null);

  console.log("cells", { change, cells });
});
var disposer3 = state.characters.observe(change => {
  const characters = change.newValue.map(character => character || null);

  console.log("characters", { change, characters });
});
var disposer4 = state.state.observe(change => {
  console.log("state", { change });
});
module.exports = state;
