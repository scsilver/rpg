import {
  objectToArray,
  getRandomFromArray,
  percentTrue
} from "../src/Helpers/helpers.js";
import { characters, biomes } from "../assets/characters.js";
const characterSpawn = (cells, options) => {
  let spawnedCharacters = [];
  let characterIdCount;
  let positionedCharacter = null;
  spawnedCharacters = [...spawnedCharacters];
  cells.map((cell, cellIndex) => {
    const newCharacter = percentTrue(10)
      ? objectToArray(characters).getRandomFromObject()
      : {};
    if (!!newCharacter.position) {
      positionedCharacter = {
        ...newCharacter,
        id: characterIdCount,
        position: {
          ...newCharacter.position,
          cell: cell,
          x: cell.x,
          y: cell.y,
          orientationDeg: getRandomFromArray([0, 90, 180, 270])
        }
      };
      spawnedCharacters = [...spawnedCharacters, positionedCharacter];
    } else {
    }
    characterIdCount = characterIdCount + 1;
  });
  return spawnedCharacters;
};

export { characterSpawn };
