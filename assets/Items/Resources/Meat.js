import Resource from "./Resource";
import Specie from "../../Category/Specie";
export default class Meat extends Resource {
  constructor({ name = "", specie = "name" } = {}) {
    super();
    this.name = name + " meat";
    this.specie = specie || new Specie({ name });
  }
  satiation = { raw: 4, cooked: 10 };
}
