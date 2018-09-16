import Item from "./Item";
import resources from "./Resources/resources";
export default class Metal extends Item {
  inventory = [resources.ores[this.name]];
  value = 1;
}
