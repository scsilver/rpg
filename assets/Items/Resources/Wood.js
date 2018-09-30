import Resource from "./Resource";
export default class Wood extends Resource {
  constructor({ specie = "" } = {}) {
    const woodName = specie.name + " wood";
    super({ name: woodName });
    this.name = woodName;
  }
}
