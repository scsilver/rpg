import Animal from "./Animal";
import { animalNames } from "../lists.js";
import biomes from "../Environment/Biomes/biomes";

const animals = {};
animalNames.map(animalName => {
  const animal = {
    factory: props => {
      return new Animal({
        name: animalName,
        spawn: { rate: 20, biomes: biomes },
        ...props
      });
    },
    spawn: { biomes: ["forest"] }
  };
  animals[animalName] = animal;
});

export default animals;
