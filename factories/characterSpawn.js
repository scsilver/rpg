import {
  objectToArray,
  getRandomFromArray,
  percentTrue
} from "../src/Helpers/helpers.js";
import { characters, biomes } from "../assets/characters.js";
const characterSpawn = (cells, options) => {
  let spawnedCharacters = [];
  let characterIdCount = 0;
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
        cellsAhead: [cell],
        orientationDeg: getRandomFromArray([0, 90, 180, 270]),
        position: {
          ...newCharacter.position,
          x: cell.x,
          y: cell.y
        }
      };
      spawnedCharacters = [...spawnedCharacters, positionedCharacter];
      characterIdCount = characterIdCount + 1;
    } else {
    }
  });

  return spawnedCharacters;
};

export { characterSpawn };
