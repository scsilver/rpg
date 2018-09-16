import Character from "./Character";
import emojis from "../emojis";
import Meat from "../Items/Resources/Meat.js";
export default class Animal extends Character {
  constructor(props = { name: {} }) {
    super(props);
    const { name } = props;
    this.name = name;
    this.emoji = emojis[name];
    const meat = new Meat({ name });
    this.inventory = [meat];
    this.meat = meat;
    this.playerInteraction = state => state.interaction({ name });
    this.playerDistantView = state => state.distantView({ name });
  }
  race = "animal";
  health = 3;
  defense = 1;
  attack = 1;
  agility = 1;
  position = { x: 1, y: 1, orientationDeg: "0", cell: {}, cellAhead: {} };
}
