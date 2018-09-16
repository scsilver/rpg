import Character from "./Character";
export default class Person extends Character {
  constructor(props = { name: "" }) {
    super(props);
    const { name } = props;
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
