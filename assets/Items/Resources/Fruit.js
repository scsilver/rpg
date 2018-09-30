import Resource from "./Resource";
import Specie from "../../Category/Specie";
import emojis from "../../emojis";

export default class Fruit extends Resource {
  constructor({ name = "", specie = "" } = {}) {
    super();
    this.name = name;
    this.specie = specie || new Specie({ name });
    this.emoji = emojis[this.name] || "";
  }
  satiation = { raw: 2, cooked: 4 };
}
