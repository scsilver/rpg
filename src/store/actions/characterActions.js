import { observable, action, computed, autorun, get } from "mobx";
import Character from "../../../assets/Characters/Character";
import { characters } from "../../../assets/characterAssets";

const addCharacterActions = state => {
  state.getCharacterRandom = () => {
    return state.getRandomFromObject(characters);
  };
  state.initializeCharacters = action(() => {
    const characters = [];
    state.game.world.cells.map(cell => {
      characters.push(
        state.percentTrue(10)
          ? new Character({
              biome: cell.biome,
              position: cell.positon
            })
          : {}
      );
    });
    state.updateCharacters(characters);
  });
  state.updatePlayerHealth = action(newHealth => {
    state.updatePlayer({ health: newHealth });
  });
  state.updateCharacterHealth = action(({ character, newCharacterHealth }) => {
    const newCharacter = { ...character, health: newCharacterHealth };
    state.updateCell({
      ...character.cellsAhead[0],
      character: newCharacter
    });
    state.updateCharacters(
      state.game.world.characters.map((oldCharacter, index) => {
        return index == character.id ? newCharacter : oldCharacter;
      })
    );
  });
  state.characterGetResource = action(keyAction => {
    Object.keys(state).includes(keyAction) && state[keyAction]();
  });
  state.getCharacterResource = action(() => {});
  state.characterInteraction = action(({ cell }) => {
    const {
      mentalState,
      hunger,
      health,
      position,
      agility,
      defense,
      attack
    } = state.game.player;
    const { character } = cell;
    state.updateCellHistory(state.playerCellsAhead()[0]);
    switch (character.name) {
      case "snake":
      case "crab":
      case "wizard":
        if (character.health > 0) {
          const playerHealthHit = state.percentTrue(agility)
            ? 0
            : Math.abs(
                character.attack * Math.random() //- defense * 0.1 * Math.random()
              );
          const newPlayerHealth = health - playerHealthHit;
          const characterHealthHit = state.percentTrue(character.agility)
            ? 0
            : Math.abs(
                attack * Math.random() //- character.defense * 0.1 * Math.random()
              );
          const newCharacterHealth = character.health - characterHealthHit;
          const playerDied = newPlayerHealth <= 0;
          const characterDied = newCharacterHealth <= 0;
          state.instructionSet = {
            ...state.instructionSet,
            updateFullScreenPane: { playerDied },
            updateEffectsPane: {
              playerHealthHit,
              characterHealthHit,
              characterDied
            },
            updateCharacterHealth: { character, newCharacterHealth },
            updatePlayerHealth: newPlayerHealth,
            movePlayerForward:
              state.instructionSet.movePlayerForward && characterDied
          };
        }
        break;
      default:
        state.instructionSet = {
          ...state.instructionSet,
          subractHunger: true
        };
        break;
    }
  });

  state.distantView = action(type => {
    const { mentalState } = state.game.player;
    state.updatePlayer({
      mentalState: {
        ...mentalState,
        interaction: `Look a ${type.name}`
      }
    });
  });
};
export default addCharacterActions;
