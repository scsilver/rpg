import Biome from "./Biomes/Biome";
import Plant from "./Plant";
import Earth from "./Earth";
import Position from "../Utils/Position";
export default class Cell {
  constructor(
    {
      biome = { name: "" },
      index = 0,
      side = 30,
      position = { x: 0, y: 0 }
    } = {}
  ) {
    this.biome = biome || new Biome({});
    this.earth = new Earth({ biome });
    this.plant = new Plant({ biome });
    this.position = new Position(position);
  }

  setBiome = (biome = {}) => {
    this.biome = biome || new Biome();
    this.earth = new Earth({ biome });
    this.plant = new Plant({ biome });
  };
}
