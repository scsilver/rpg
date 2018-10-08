import { action } from "mobx";
import { biomes } from "../../../assets/biomeAssets";

const addBiomeActions = state => {
  state.getBiomeRandom = () => {
    return state.percentPicker(
      state
        .objectToArray(biomes)
        .map(biome => ({ ...biome, chance: 1, name: biome.name }))
    );
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
        console.log("instructionSet Biome", " else, no limited movement");
        break;
    }
  });
};
export default addBiomeActions;
