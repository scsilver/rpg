import { action } from "mobx";
const addProbabilityActions = state => {
  state.percentTrue = percent => {
    return Math.random() <= percent / 100;
  };
};
export default addProbabilityActions;
