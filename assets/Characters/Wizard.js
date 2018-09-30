import Person from "./Person";
import emojis from "../emojis";

export default class Wizard extends Person {
  name = "Gandolf";
  emoji = emojis.wizard;
  job = "wizard";
  magic = 70;
  spawns = { biomes: ["mountains"] };
  playerInteraction = state => state.interaction({ name: "Gandolf" });
  playerDistantView = state => state.distantView({ name: "Gandolf" });
}
