import Source from "./Source";
import Ore from "../Items/Resources/Ore";
export default class Earth extends Source {
  inventory = [new Ore()];
}
