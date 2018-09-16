import { observable, action, computed, autorun, get } from "mobx";

const addComputed = state => {
  ////Basic Computed
  state.__defineGetter__("characters", () => {
    return state.game.world.characters;
  });
  state.__defineGetter__("player", () => {
    return state.game.player;
  });
  state.__defineGetter__("state", () => {
    return state;
  });
  state.__defineGetter__("game", () => {
    return state.game;
  });
  state.__defineGetter__("options", () => {
    return state.game.world.options;
  });
  state.__defineGetter__("cells", () => {
    return state.game.world.cells.map(cell => {
      return {
        ...cell,
        character:
          state.characters.filter(
            character => character.position == cell.position
          )[0] || {}
      };
    });
  });
  state.__defineGetter__("world", () => {
    return state.game.world;
  });
  state.__defineGetter__("time", () => {
    return state.game.world.time;
  });
  state.__defineGetter__("playerMentalState", () => {
    return state.game.player.mentalState;
  });
  state.__defineGetter__("playerPosition", () => {
    return state.game.player.position;
  });
};
export default addComputed;
