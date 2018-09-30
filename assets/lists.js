const animalNames = ["snake", "fish", "bird", "crab"];
const floraNames = ["apple", "corn", "strawberry"];
const mineralNames = ["iron", "copper"];
const biomeNames = ["forest", "beach", "mountain", "plain", "water"];

import emojis from "./emojis";

const emojiMap = {
  forest: emojis["tree"],
  mountain: emojis["mountain"],
  beach: emojis["beach"],
  "": ""
};
const emojisMap = name => emojis[emojiMap[name]];

export { animalNames, floraNames, mineralNames, biomeNames, emojiMap };
