export default class Biome {
  constructor(props = { name: "", emoji: "" }) {
    const { name, emoji } = props;
    this.name = name;
    this.emoji = emoji;
    this.playerInteraction = state => state.interaction({ name });
    this.playerDistantView = state => state.distantView({ name });
    //  this.setEmoji(name);
  }
  setEmoji = name => {
    switch (name) {
      case "water":
        //this.emoji = emojis['wave'];;
        break;
      case "forest":
        this.emoji = emojis["tree"];
        break;
      case "beach":
        //this.emoji = emojis["tree"];
        break;
      case "plain":
        //this.emoji = emojis["tree"];
        break;
      case "mountain":
        this.emoji = emojis[name];
        break;

      default:
        this.emoji = emojis[name];
        break;
    }
  };
  emoji = "";
  inventory = [];
}
