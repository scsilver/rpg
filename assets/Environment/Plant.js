import Source from "./Source";
import resources from "../Items/Resources/resources";
export default class Plant extends Source {
  inventory = [resources.fruits[0] || resources.seeds[0] || resources.wood];
}
