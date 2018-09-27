import { action } from "mobx";
import { biomes } from "../../../assets/biomeAssets";
const addBiomeActions = state => {
  state.getBiomeRandom = () => {
    return state.getRandomFromObject(biomes);
  };
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
