import Item from "./Item";
import Specie from "../../Category/Specie";
import resources from "./Resources/resources";
export default class Metal extends Item {
  constructor({ name = "", specie = " " } = {}) {
    super();
    this.name = name;
    this.specie = specie || new Specie({ name });
  }
  inventory = [resources.ores[this.specie]];
  value = 1;
}
