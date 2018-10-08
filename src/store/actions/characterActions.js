import { observable, action, computed, autorun, get } from "mobx";
import Character from "../../../assets/Characters/Character";
import { characters } from "../../../assets/characterAssets";

const addCharacterActions = state => {
  state.moveCharacters = action(() => {
    const newCharacters = state.characters.get().map(character => {
      const cellsAhead = state.getCellsByPattern(character, 2, "lineFront");
      const newCell = cellsAhead && cellsAhead[1];
      const newPosition = (newCell && newCell.position) || character.position;
      if (newPosition && newCell) {
        switch (character.name) {
          case "fish":
            if (newCell.biome.name == "water") {
              character.position = newPosition;
            }
            break;

          case "bird":
            if (
              newCell.biome.name == "forest" ||
              newCell.biome.name == "plain" ||
              newCell.biome.name == "mountain" ||
              newCell.biome.name == "beach" ||
              newCell.biome.name == "water"
            ) {
              character.position = newPosition;
            }
            break;
          case "crab":
            if (
              newCell.biome.name == "beach" ||
              newCell.biome.name == "water" ||
              newCell.biome.name == "plain"
            ) {
              character.position = newPosition;
            }
            break;
          case "snake":
            if (
              newCell.biome.name == "forest" ||
              newCell.biome.name == "plain"
            ) {
              character.position = newPosition;
            }
            break;
          default:
            character.position = newPosition;
            break;
        }
      }
      character.orientationDeg = [0, 90, 180, 270][
        Math.floor(Math.random() * 4)
      ];
      return character;
    });
    state.updateCharacters(newCharacters);
  });
  state.characterInteraction = action(({ cell }) => {
    if (cell.character && cell.character.health > 0) {
      switch (cell.character.name) {
        case "crab":
        case "bird":
        case "snake":
          state.instructionSet = {
            ...state.instructionSet,
            movePlayerForward: false
          };
          break;

        default:
          break;
      }
    }
  });

  state.getCharacterRandom = ({ cell } = {}) => {
    const character = state.percentPicker(state.objectToArray(characters))({
      cell,
      position: cell.position
    });
    character.position = cell.position;
    return character;
  };

  state.updateCharacters = action(characters => {
    state.game.world.characters = characters;
  });

  state.updateCharacter = action(character => {
    const characters = state.game.world.characters;
    characters[characters.findIndex(char => char.id == character)] = character;
    state.updateCharacters(characters);
  });
  state.characterSpawn = ({ cell }) => {
    const characterBiomeFilter = new state.objectToArray(
      characters
    ).filter(character => {
      const characterInstance = new character({
        cell,
        position: cell.position
      });

      return state
        .objectToArray(characterInstance.spawn.biomes)
        .map(biome => biome)
        .includes(cell.biome.name);
    });

    if (!!characterBiomeFilter.length) {
      const character =
        characterBiomeFilter[
          Math.floor(characterBiomeFilter.length * Math.random())
        ];
      const characterInstance = new character({
        cell,
        position: cell.position
      });
      characterInstance.position = cell.position;
      return characterInstance;
    }
    return null;
  };

  state.updateCharacterHealth = action(({ character, newCharacterHealth }) => {
    character.health = newCharacterHealth;
    state.updateCharacter(character);
  });

  state.characterGetResource = action(keyAction => {
    Object.keys(state).includes(keyAction) && state[keyAction]();
  });

  state.getCharacterResource = action(() => {});
};

export default addCharacterActions;
