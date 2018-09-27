import Resource from "./Resource";
import Specie from "../../Category/Specie";
export default class Seed extends Resource {
  constructor({ name = "", specie = "" } = {}) {
    super();
    this.name = name + " seed";
    this.specie = specie || new Specie({ name });
    this.plantedTime = null;
  }
  plant = position => {
    if (!this.plantedTime) {
      this.position = position;
      this.plantedTime = new Date();
    }
  };
}
