import Plant from "./Plant";
import Specie from "../Category/Specie";
import emojis from "../emojis";

class AppleTree extends Plant {
  constructor({ specie = new Specie({ name: "apple" }) } = {}) {
    super({ specie });
    this.name = "apple tree";
  }
  spawn = { biomes: ["forest"] };
}
class CornPlant extends Plant {
  constructor({ specie = new Specie({ name: "corn" }) } = {}) {
    super({ specie });
    this.name = "corn plant";
  }
  spawn = { biomes: ["plain"], interaction: {} };
}
class StrawberryBush extends Plant {
  constructor({ specie = new Specie({ name: "strawberry" }) } = {}) {
    super({ specie });
    this.name = "strawberry bush";
  }

  spawn = { biomes: ["mountain"], interaction: {} };
}
const plantFactory = ({ specie }) => {
  switch (specie.name) {
    case "apple":
      return new AppleTree({ specie });
    case "corn":
      return new CornPlant({ specie });
    case "strawberry":
      return new StrawberryBush({ specie });

    default:
      return new Plant({ specie });
      break;
  }
};
export { plantFactory };
