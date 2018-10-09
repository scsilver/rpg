import { observable, action, computed, autorun, get } from "mobx";
import Position from "../../assets/Utils/Position";
import emojis from "../../assets/emojis.js";
import addCharacterActions from "./actions/characterActions";
import addPlayerActions from "./actions/playerActions";
import addBiomeActions from "./actions/biomeActions";
import addGameActions from "./actions/gameActions";
import addCellActions from "./actions/cellActions";
import addCellUtilityActions from "./actions/cellUtilityActions";
import addProbabilityActions from "./actions/probabilityActions";
import addInteractionActions from "./actions/interactionActions";

class addActions {
  objectToArray = obj => Object.keys(obj).map(key => obj[key]);
  initializePosition = () => this.world.options.side;
  initializeCells = action(() => {
    const { side } = this.game.world.options;
    const cells = [];
    _.times(side, y =>
      _.times(side, x => cells.push(new Cell({ position: { x, y } })))
    );
    const newCells = new Map(Object.entries(cells));

    state.updateCells(cells);
  });
}
const addAct = state => {
  state.getRandomFromObject = obj => {
    return state.getRandomFromArray(state.objectToArray(obj));
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
export { addActions, addAct };
