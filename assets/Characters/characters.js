import Animal from "./Animal";
import Human from "./Human";
import Wizard from "./Wizard";
const animals = {
  snake: new Animal({ name: "snake" }),
  fish: new Animal({ name: "fish" }),
  bird: new Animal({ name: "bird" }),
  crab: new Animal({ name: "crab" })
};
const characters = {
  human: new Human(),
  wizard: new Wizard(),
  ...animals
};

export default characters;
