import { observable, action, computed, autorun, get } from "mobx";
import Character from "../../../assets/Characters/Character";
import { characters } from "../../../assets/characterAssets";

const addCharacterActions = state => {
  state.moveCharacters = action(() => {
    const newCharacters = state.characters.get().map(character => {
      const cellsAhead = state.getCellsByPattern(character, 2, "lineFront");
      character.position =
        (cellsAhead && cellsAhead[1] && cellsAhead[1].position) ||
        character.position;
      debugger;
      character.orientationDeg = [0, 90, 180, 270][
        Math.floor(Math.random() * 4)
      ];
      return character;
    });
    state.updateCharacters(newCharacters);
  });
  state.characterInteraction = action(({ cell }) => {
    if (cell.character && cell.character.health > 0) {
      debugger;
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
    const character = state.getRandomFromObject(characters)({
      cell,
      position: cell.position
    });
    character.position = cell.position;
    return character;
  };

  state.updateCharacters = action(characters => {
    debugger;
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
