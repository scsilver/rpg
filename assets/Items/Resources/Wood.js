import Resource from "./Resource";
import emojis from "../../emojis";
export default class Wood extends Resource {
  constructor({ specie = "" } = {}) {
    const woodName = specie.name + " wood";
    super({ name: woodName });
    this.specie = specie;
    this.emoji =
      (emojis.species[this.specie.name] &&
        emojis.species[this.specie.name].wood) ||
      "";

    this.name = woodName;
  }
}
