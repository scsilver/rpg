//variable amount of instances, Character

import Character from "./Character";
import emojis from "../emojis";
import Meat from "../Items/Resources/Meat.js";
import Specie from "../Category/Specie";

export default class Animal extends Character {
  constructor({ name = "", specie = "", spawn } = {}) {
    super({ name, specie, spawn });
    this.name = name || specie;
    this.emoji = emojis[this.name];
    this.spawn = spawn;
    this.meat = new Meat({ specie });
    this.inventory = [this.meat];

    this.playerInteraction = state => state.interaction({ name: this.name }); //name instead of specie allows for individul interactions special variations
    this.playerDistantView = state => state.distantView({ name: this.name });
  }
  health = 3;
  defense = 1;
  attack = 1;
  agility = 1;
}
