//variable amount of instances, Person, Character

import Person from "./Person";
import emojis from "../emojis";
export default class Human extends Person {
  emoji = emojis.human;
  spawn = { biomes: ["plains"] };
  race = "human";
  job = "ranger";
  magic = 5;
  constructor(props) {
    super(props);
  }
}
