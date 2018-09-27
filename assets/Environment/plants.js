import Plant from "./Plant";
import { floraNames } from "../../lists";

const plants = {};
floraNames.map(floraName => {
  plants[floraName] = new Plant({ name: floraName });
});
export default plants;
