import { observable, action, computed, autorun, get } from "mobx";

import emojis from "../../../assets/emojis.js";
import _ from "lodash";
import addCharacterActions from "./characterActions";
import addPlayerActions from "./playerActions";
import addBiomeActions from "./biomeActions";
import addGameActions from "./gameActions";
import addCellActions from "./cellActions";
import addCellUtilityActions from "./cellUtilityActions";
import addProbabilityActions from "./probabilityActions";
import addInteractionActions from "./interactionActions";
const addActions = state => {
  state.getRandomFromArray = array => {
    return array[Math.floor(Math.random() * array.length)];
  };
  state.objectToArray = obj => Object.keys(obj).map(key => obj[key]);
  state.getRandomFromObject = obj => {
    return state.getRandomFromArray(state.objectToArray(obj));
  };

  //Time Managment
  state.gameTimeHandler = action(() => {
    state.updateWorld({ time: state.game.world.time + 1000 });
    state.updateEffectsPane({ playerHealthHit: null });
  });

  state.startGameInterval = action(
    () => (state.gameInterval = setInterval(state.gameTimeHandler, 1000))
  );

  state.clearGameInterval = action(() => clearInterval(state.gameInterval));

  addPlayerActions(state);
  addCharacterActions(state);
  addBiomeActions(state);
  addGameActions(state);
  addCellActions(state);
  addCellUtilityActions(state);
  addProbabilityActions(state);
  addInteractionActions(state);

  return state;
};
export default addActions;
