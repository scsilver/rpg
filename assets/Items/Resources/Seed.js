import Resource from "./Resource";
import Specie from "../../Category/Specie";
import emojis from "../../emojis";
export default class Seed extends Resource {
  constructor({ name = "", specie = "" } = {}) {
    const seedName = (specie.name || name) + " seed";
    super({ name: seedName });
    this.name = seedName;
    this.specie = specie || new Specie({ name });
    this.plantedTime = null;
    this.emoji = emojis["seed"];
  }
  plant = position => {
    if (!this.plantedTime) {
      this.position = position;
      this.plantedTime = new Date();
    }
  };
}
