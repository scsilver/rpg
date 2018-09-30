import { emojiMap } from "../../lists";

export default class Biome {
  constructor({ name = "", emoji = "" } = {}) {
    this.name = name;
    this.emoji = emojiMap[name];
    this.playerInteraction = state => state.interaction({ name });
    this.playerDistantView = state => state.distantView({ name });
  }
  inventory = [];
}
