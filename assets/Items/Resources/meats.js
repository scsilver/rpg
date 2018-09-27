import Meat from "./Meat";
import animalNames from "../../lists";

const meats = {};
animalNames.map(
  animalName => (meats[animalName] = new Meat({ name: animalName }))
);
export default meats;
