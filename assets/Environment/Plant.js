import Source from "./Source";
import Specie from "../Category/Specie";
import Seed from "../Items/Resources/Seed";
import Wood from "../Items/Resources/Wood";
import Fruit from "../Items/Resources/Fruit";
import resources from "../Items/Resources/resources";
import emojis from "../emojis";
export default class Plant extends Source {
  constructor({ name = "", specie = "" } = {}) {
    super(); //nothing in source constructor
    this.name = specie.name || name;
    this.specie = specie || new Specie({ name });

    this.seed = new Seed({ specie });
    this.fruit = new Fruit({ specie });
    this.wood = new Wood({ specie });
    
    this.sapling = { emoji: emojis["sapling"] };
    this.emoji = emojis.species[specie.name].plant;
    this.spawnTime = new Date();
    this.inventory = [this.seed, this.fruit, this.wood];
    this.interaction = state => {
      state.instructionSet = {
        ...state.instructionSet,
        plantHarvest: true
      };
    };
  }
  getAge = () => {
    const age = Date.now() - this.spawnTime;
    if (age < 5000) {
      return "sapling";
    }
    if (10000 > age >= 5000) {
      return "growing";
    }
    if (age >= 10000) {
      return "fruiting";
    }
  };
  getLifeStageEmoji = () => {
    switch (this.getAge()) {
      case "sapling":
        return this.sapling.emoji;
        break;
      case "growing":
        return this.emoji;
        break;
      case "fruiting":
        return this.fruit.emoji;
        break;

      default:
        break;
    }
    return;
  };
}
