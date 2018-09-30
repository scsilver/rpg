import Person from "./Person";
import emojis from "../emojis";
export default class Human extends Person {
  name = "Billy";
  emoji = emojis.human;
  spawn = { biomes: ["plains"] };
  race = "human";
  job = "ranger";
  magic = 5;
}
