import Source from "./Source";
import Ore from "../Items/Resources/Ore";
import Biome from "./Biomes/Biome";
export default class Earth extends Source {
  constructor({ biome = new Biome("forest") } = {}) {
    super();
    this.state = {};
    this.inventory = [new Ore({ biome })];
  }
}
