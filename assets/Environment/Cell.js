import Biome from "./Biomes/Biome";
import Plant from "./Plant";
import Earth from "./Earth";
import Position from "../Utils/Position";
import characters from "../Characters/characters";

export default class Cell {
  constructor(
    {
      biome = new Biome(),
      index = 0,
      side = 30,
      position = { x: 0, y: 0 },
      spawn = { spawn: characters }
    } = {}
  ) {
    if (!Cell.instances) {
      Cell.instances = [];
    }
    this.id = Cell.instances.length;
    this.biome = biome || new Biome({});
    this.earth = new Earth({ biome });

    this.position = new Position(position);
    this.spawn = spawn;
    Cell.instances.push(this);
  }

  setBiome = (biome = {}) => {
    this.biome = biome || new Biome();
    this.earth = new Earth({ biome });
  };
}
