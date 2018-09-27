import Source from "./Source";
import Specie from "../Category/Specie";
import resources from "../Items/Resources/resources";
export default class Plant extends Source {
  constructor({ name = "", specie = "" } = {}) {
    super();
    this.name = name;
    this.specie = specie || new Specie({ name });
    this.spawnTime = new Date();
  }
  inventory = [resources.fruits[name] || resources.seeds[name]];
}
