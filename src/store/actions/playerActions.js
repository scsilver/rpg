import { observable, action, computed, autorun, get } from "mobx";
import { biomes, characters } from "../../../assets/characters.js";
import emojis from "../../../assets/emojis.js";
import Position from "./../../../assets/Utils/Position";

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
  position: { x: 9, y: 9 },
  orientationDeg: 0,
  cellsAhead: [{}]
};
const addPlayerActions = state => {
  state.initializePlayer = action(() => {
    state.updatePlayer({ ...initialPlayerState });
  });
  state.updatePlayerHealth = action(newHealth => {
    state.updatePlayer({ health: newHealth });
  });
  state.updatePlayer = action(function(player) {
    state.updateGame({ player: { ...state.game.player, ...player } });
  });
};
export default addPlayerActions;
