import Animal from "./Animal";
import { animalNames } from "../lists.js";
const animals = {};
animalNames.map(animalName => {
  animals[animalName] = new Animal({ name: animalName });
});

export default animals;
