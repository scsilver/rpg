import skills from "./Skills";
import Position from "../Utils/Position";
import biomes from "../Environment/Biomes/biomes";
export default class Character {
  health = 100;

  constructor({ position, spawn } = {}) {
    if (!Character.instances) {
      Character.instances = [];
    }
    this.id = Character.instances.length;
    this.position = position || new Position({ x: 1, y: 1 });
    this.spawn = spawn || { rate: 20, biomes: biomes };
    this.interaction = state => {
      const { attack, agility, health } = state.player.get();
      if (this.health > 0) {
        const playerHealthHit = state.percentTrue(agility)
          ? 0
          : Math.abs(
              this.attack * Math.random() //- defense * 0.1 * Math.random()
            );
        const newPlayerHealth = health - playerHealthHit;
        const characterHealthHit = state.percentTrue(this.agility)
          ? 0
          : Math.abs(
              attack * Math.random() //- character.defense * 0.1 * Math.random()
            );
        const newCharacterHealth = this.health - characterHealthHit;
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
          updateCharacterHealth: { character: this, newCharacterHealth },
          updatePlayerHealth: newPlayerHealth,
          movePlayerForward: false
        };
      }
    };
    Character.instances.push(this);
  }
  skills = skills;
  magic = 0;
  hunger = 100;
  orientationDeg = 0;
  cell = {};
  cellAhead = {};
}
