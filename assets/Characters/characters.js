import Human from "./Human";
import Wizard from "./Wizard";
import animals from "./animals";

const characters = {
  human: new Human(),
  wizard: new Wizard(),
  ...animals
};

export default characters;
