import { observable, action, computed, autorun, get } from "mobx";

const addComputed = state => {
  ////Basic Computed
  state.characters = computed(() => {
    return state.game.world.characters;
  });
  state.player = computed(() => {
    return state.game.player;
  });
  state.state = computed(() => {
    return state;
  });

  state.options = computed(() => {
    return state.game.world.options;
  });
  state.cells = computed(() => {
    const cells = state.game.world.cells.map(cell => {
      return {
        ...cell,
        character: state.game.world.characters.filter(
          character => character.position == cell.position
        )[0]
      };
    });

    return cells;
  });
  state.world = computed(() => {
    return state.game.world;
  });
  state.time = computed(() => {
    return state.game.world.time;
  });
  state.playerMentalState = computed(() => {
    return state.game.player.mentalState;
  });
  state.playerPosition = computed(() => {
    return state.game.player.position;
  });
  state.playerCellsAhead = computed(() => {
    return state.getCellsByPattern(state.player.get(), 4, "lineFront");
  });
};
export default addComputed;
