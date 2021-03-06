//fixed amount 5 species

//product class
import Specie from "./Specie";

//factory
const speciesFactory = ({ name = "" } = {}) => {
  switch (name) {
    case "corn":
      return new Specie({ name, spawn: { biomes: ["plain"] } });
      break;
    case "apple":
      return new Specie({ name, spawn: { biomes: ["forest"] } });
      break;
    case "strawberry":
      return new Specie({ name, spawn: { biomes: ["mountain"] } });
      break;
    case "iron":
      return new Specie({ name, spawn: { biomes: ["mountain"] } });
    case "copper":
      return new Specie({ name, spawn: { biomes: ["mountain"] } });
    default:
      break;
  }
};

//production
const Apple = speciesFactory({ name: "apple" });
const Corn = speciesFactory({ name: "corn" });
const Strawberry = speciesFactory({ name: "strawberry" });
const Iron = speciesFactory({ name: "iron" });
const Copper = speciesFactory({ name: "copper" });

//packaging
const species = {
  plants: {
    object: { Apple, Corn, Strawberry },
    array: [Apple, Corn, Strawberry]
  },
  metals: {
    object: { Iron, Copper },
    array: [Iron, Copper]
  }
};

//export
export { species };
