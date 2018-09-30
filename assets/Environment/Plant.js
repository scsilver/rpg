import Source from "./Source";
import Specie from "../Category/Specie";
import Seed from "../Items/Resources/Seed";
import Wood from "../Items/Resources/Wood";
import Fruit from "../Items/Resources/Fruit";
import resources from "../Items/Resources/resources";
export default class Plant extends Source {
  constructor({ name = "", specie = "" } = {}) {
    super(); //nothing in source constructor
    this.name = specie.name || name;
    this.specie = specie || new Specie({ name });

    this.seed = new Seed({ specie });
    this.fruit = new Fruit({ specie });
    this.wood = new Wood({ specie });
    this.spawnTime = new Date();
    this.inventory = [this.seed, this.fruit, this.wood];
    this.interaction = state => {
      state.instructionSet = {
        ...state.instructionSet,
        plantHarvest: true
      };
    };
  }
}
