import Fruit from "./Fruit";
import floraNames from "../../lists";

const fruits = {};
floraNames.map(
  floraName => (fruits[floraName] = new Fruit({ name: floraName }))
);
export default fruits;
