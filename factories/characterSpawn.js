import { objectToArray, percentTrue } from "../src/helpers.js";
import { characters, biomes } from "../assets/characters.js";
const characterSpawn = (cells, options) => {
  let spawnedCharacters = [];
  cells.map(cell => {
    const newCharacter = percentTrue(10)
      ? objectToArray(characters).getRandomFromObject()
      : {};
    const positionedCharacter = !!newCharacter.position
      ? {
          ...newCharacter,
          position: {
            ...newCharacter.position,
            cell: cell,
            x: cell.x,
            y: cell.y
          }
        }
      : {};
    spawnedCharacters = [...spawnedCharacters, positionedCharacter];
  });
  return spawnedCharacters;
};

export { characterSpawn };
