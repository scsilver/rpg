import { action } from "mobx";
const addBiomeActions = state => {
  state.biomeInteraction = action(({ cell }) => {
    switch (cell.biome.name) {
      case "mountain":
      case "water":
        state.instructionSet = {
          ...state.instructionSet,
          movePlayerForward: false
        };
        break;

      default:
        state.instructionSet = {
          ...state.instructionSet,
          movePlayerForward: true
        };
        break;
    }
  });
};
export default addBiomeActions;
