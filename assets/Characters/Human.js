import Person from "./Person";
import emojis from "../emojis";
export default class Human extends Person {
  name = "Billy";
  emoji = emojis.human;
  race = "human";
  job = "ranger";
  magic = 5;
}
