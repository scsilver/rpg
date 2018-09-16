import Biome from "./Biomes/Biome";
import Plant from "./Plant";
import Earth from "./Earth";
import Position from "../Utils/Position.ts";
export default class Cell {
  constructor(props = {}) {
    const { biome, index, side, position: { x, y } } = props;
    this.biome = new Biome();
    this.earth = new Earth({ biome });
    this.plant = new Plant({ biome });
    this.position = new Position({ x, y });
  }
}
