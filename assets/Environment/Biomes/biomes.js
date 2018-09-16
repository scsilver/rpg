import Biome from "./Biome";
import emojis from "../../emojis";

const biomes = {
  forest: new Biome({ name: "forest", emoji: emojis["tree"] }),
  beach: new Biome({ name: "beach" }),
  mountain: new Biome({ name: "mountain", emoji: emojis["mountain"] }),
  plain: new Biome({ name: "plain" }),
  water: new Biome({ name: "water" })
};

export default biomes;
