import Biome from "./Biome";
import emojis from "../../emojis";
import { biomeNames } from "../../lists";
const biomes = {};
biomeNames.map(
  biomeName => (biomes[biomeName] = new Biome({ name: biomeName }))
);
export default biomes;
