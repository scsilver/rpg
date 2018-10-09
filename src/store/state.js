import { observable, action, computed, autorun, get } from "mobx";

import { addActions, addAct } from "./actions";
import addComputed from "./computed";
const store = observable({});
const state = observable({
  world: {},
  positions: [],
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
  saves: [],
  ...addActions
});
addComputed(state);
addAct(state);
//state.initializePositions();
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
