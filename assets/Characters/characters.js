import Human from "./Human";
import Wizard from "./Wizard";
import animals from "./animals";

const characters = {
  Human,
  Wizard,
  ...animals
};

export default characters;
