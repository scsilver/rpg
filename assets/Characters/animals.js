import Animal from "./Animal";
import { animalNames } from "../lists.js";
import biomes from "../Environment/Biomes/biomes";

class Bird extends Animal {
  constructor(props) {
    super({ name: "bird" });
  }
  spawn = { biomes: ["mountains", "plains", "forest"] };
}
class Crab extends Animal {
  constructor(props) {
    super({ name: "crab" });
  }
  spawn = { biomes: ["beach"] };
}
class Snake extends Animal {
  constructor(props) {
    super({ name: "snake" });
  }
  spawn = { biomes: ["forest", "plains"] };
}
class Fish extends Animal {
  constructor(props) {
    super({ name: "fish" });
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
