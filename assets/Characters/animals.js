import Animal from "./Animal";
import { animalNames } from "../lists.js";
import biomes from "../Environment/Biomes/biomes";

class Bird extends Animal {
  constructor(props) {
    super({ specie: "bird" });
  }
  spawn = { biomes: ["mountains", "plains", "forest"] };
}
class Crab extends Animal {
  constructor(props) {
    super({ specie: "crab" });
  }
  spawn = { biomes: ["beach"] };
}
class Snake extends Animal {
  constructor(props) {
    super({ specie: "snake" });
  }
  spawn = { biomes: ["forest", "plains"] };
}
class Fish extends Animal {
  constructor(props) {
    super({ specie: "fish" });
  }
  spawn = { biomes: ["water"] };
}
const animals = {
  Fish,
  Snake,
  Bird,
  Crab
};

export default animals;
