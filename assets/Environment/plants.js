import Plant from "./Plant";
import Specie from "../Category/Specie";
import emojis from "../emojis";
class AppleTree extends Plant {
  constructor({ specie = new Specie({ name: "apple" }) } = {}) {
    super({ specie });
    this.name = "apple tree";
    this.emoji = emojis[this.name];
  }
  spawn = { biomes: ["forest"], interaction: {} };
}
class CornPlant extends Plant {
  constructor({ specie = new Specie({ name: "corn" }) } = {}) {
    super({ specie });
    this.name = "corn plant";
    this.emoji = emojis[this.name];
  }
  spawn = { biomes: ["plain"], interaction: {} };
}
class StrawberryBush extends Plant {
  constructor({ specie = new Specie({ name: "strawberry" }) } = {}) {
    super({ specie });
    this.name = "strawberry bush";
    this.emoji = emojis["bush"];
  }

  spawn = { biomes: ["mountain"], interaction: {} };
}
const plants = {
  AppleTree,
  CornPlant,
  StrawberryBush,
  initialized: {
    AppleTree: new AppleTree(),
    CornPlant: new CornPlant(),
    StrawberryBush: new StrawberryBush()
  }
};
export default plants;
