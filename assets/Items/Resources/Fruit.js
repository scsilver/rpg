import Resource from "./Resource";
import Specie from "../../Category/Specie";
import emojis from "../../emojis";

export default class Fruit extends Resource {
  constructor({ name = "", specie = null } = {}) {
    super();

    this.name = name;
    this.specie = specie || new Specie({ name });
    this.emoji =
      (emojis.species[this.specie.name] &&
        emojis.species[this.specie.name].fruit) ||
      "";
  }
  satiation = { raw: 2, cooked: 4 };
}
