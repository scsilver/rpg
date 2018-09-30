import Character from "./Character";
import emojis from "../emojis";
import Meat from "../Items/Resources/Meat.js";
import Specie from "../Category/Specie";

export default class Animal extends Character {
  constructor({ name = "", specie = "" } = {}) {
    super();
    this.name = name;
    this.speceis = specie || new Specie({ name });
    this.emoji = emojis[name];
    this.meat = new Meat({ name });
    this.inventory = [this.meat];
    this.playerInteraction = state => state.interaction({ name });
    this.playerDistantView = state => state.distantView({ name });
  }
  health = 3;
  defense = 1;
  attack = 1;
  agility = 1;
}
