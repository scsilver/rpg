//variable amount of instances, Person, Character

import Character from "./Character";
import Specie from "../Category/Specie";
import species from "../Category/species";
export default class Person extends Character {
  constructor({ name = "" } = {}) {
    super();
    this.name = name;
    this.playerInteraction = state => state.interaction({ name });
    this.playerDistantView = state => state.distantView({ name });
  }
  emoji = "";
  race = "";
  job = "";
  inventory = [];
  height = 67;
  age = 27;
}
