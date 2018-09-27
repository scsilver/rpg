import Resource from "./Resource";
import Specie from "../../Category/Specie";

export default class Ore extends Resource {
  constructor({ name = "", specie = "" } = {}) {
    super();
    this.name = name + " ore";
    this.specie = specie || new Specie({ name });
  }
  value = 1;
}
