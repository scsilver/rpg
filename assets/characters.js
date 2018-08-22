import Proptypes from "prop-types";
import emojis from "./emojis.js";
import { objectToArray } from "../src/helpers";

const person = {
  emoji: "",
  name: "",
  race: "",
  job: "",
  inventory: [],
  height: 67,
  age: 27,
  agility: 1,
  attack: 1,
  defense: 1,
  magic: 0,
  health: 100,
  hunger: 100,
  position: { x: 1, y: 1, orientationDeg: "0", cell: {}, cellAhead: {} },
  playerInteraction: (
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return {
      ...state,
      cellHistory: [...state.cellHistory, state.game.player.cell],
      game: {
        ...state.game,
        player: {
          ...state.game.player,
          mentalState: {
            ...state.game.player.mentalState,
            interaction: `Hey!`
          },
          hunger: state.game.player.hunger - 1,
          position: {
            ...state.game.player.position,
            x: movementCell.x,
            y: movementCell.y,
            movementCell: forwardMovementCell,
            cell: movementCell,
            orientationDeg
          }
        }
      }
    };
  },
  playerDistantView: (state, movementCell, forwardMovementCell) => {
    return {
      ...state,
      game: {
        ...state.game,
        player: {
          ...state.game.player,
          mentalState: {
            ...state.game.player.mentalState,
            environment: "There is a man."
          }
        }
      }
    };
  }
};
const human = {
  ...person,
  name: "bob",
  emoji: emojis.human,
  race: "human",
  job: "ranger",
  magic: 5
};

const player = {
  name: "steve",
  mentalState: {
    interaction: "Feeling fine...",
    environment: "Blissful..."
  }
};
const wizard = {
  ...person,
  name: "Gandolf",
  emoji: emojis.wizard,
  race: "human",
  job: "wizard",
  magic: 70,
  playerInteraction: (state, movementCell, forwardMovementCell) => {
    return {
      ...state,
      game: {
        ...state.game,
        player: {
          ...state.game.player,
          mentalState: {
            ...state.game.player.mentalState,
            interaction: "Ah, a wizard, what a silly hat!"
          }
        }
      }
    };
  }
};
const meats = {
  snake: { name: "snake meat", satiation: { raw: 10, cooked: 20 } },
  bird: { name: "bird meat", satiation: { raw: 4, cooked: 16 } },
  crab: { name: "crab meat", satiation: { raw: 3, cooked: 15 } },
  fish: { name: "fish meat", satiation: { raw: 5, cooked: 10 } }
};
const animal = {
  race: "animal",
  health: 10,
  position: { x: 1, y: 1, orientationDeg: "0", cell: {}, cellAhead: {} },
  playerDistantView: (
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return {
      ...state,
      game: {
        ...state.game,
        player: {
          ...state.game.player,
          mentalState: {
            ...state.game.player.mentalState,
            environment: "Hey look! An Animal!"
          }
        }
      }
    };
  },
  playerInteraction: (
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return {
      ...state,
      game: {
        ...state.game,
        player: {
          ...state.game.player,
          mentalState: {
            ...state.game.player.mentalState,
            interaction: "I've never been this close to one of these!"
          }
        }
      }
    };
  }
};

const animals = {
  snake: {
    ...animal,
    name: "snake",
    emoji: emojis.snake,
    attack: 5,
    killedItem: [meats.snake],

    playerInteraction: function(
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) {
      const newHealth = state.game.player.health - this.attack * Math.random();
      const panelDisplay =
        newHealth <= 0 ? "You have left this mortal coil" : null;
      const fullScreenPaneNewState = display => {
        debugger;
        newHealth <= 0 && clearInterval(this.gameInterval);
        return {
          visible: !!display,
          display,
          types: "end"
        };
      };
      return {
        ...state,
        game: {
          ...state.game,
          fullScreenPane: fullScreenPaneNewState(panelDisplay),
          effectsPane: { hit: true },
          player: {
            ...state.game.player,
            health: newHealth,

            mentalState: {
              ...state.game.player.mentalState,
              interaction: "Ouch, he bit me!"
            }
          }
        }
      };
    },
    playerDistantView: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              environment: "Hey look! A snoot!"
            }
          }
        }
      };
    }
  },
  fish: {
    ...animal,
    name: "fish",
    emoji: emojis.fish,
    killedItem: [meats.fish],
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              interaction: "Hey look! A fish!"
            }
          }
        }
      };
    }
  },
  bird: {
    ...animal,
    name: "bird",
    emoji: emojis.bird,

    killedItem: [meats.bird],
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              interaction: "Hey look! A bird!"
            }
          }
        }
      };
    }
  },

  crab: {
    ...animal,
    name: "crab",
    emoji: emojis.crab,
    killedItem: [meats.crab],
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      console.log("Hey look a snoot!");
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              interaction: "Hey look! A crab!"
            }
          }
        }
      };
    }
  }
};
const characters = {
  human,
  wizard,
  ...animals
};

const humanType = Proptypes.shape({
  emoji: Proptypes.string,
  name: Proptypes.string,
  race: Proptypes.oneOf(races),
  job: Proptypes.oneOf(jobs),
  inventory: Proptypes.arrayOf(Proptypes.oneOf(items)),
  height: 67,
  age: 27,
  agility: 1,
  attack: 1,
  defense: 1,
  health: 100,
  hunger: 100,
  position: { x: 1, y: 1, orientationDeg: "0", cell: {}, cellAhead: {} }
});
const races = ["elven", "human"];
const jobs = ["ranger", "wizard", "knight"];

const ores = {
  iron: {
    name: "iron ore"
  },
  copper: {
    name: "copper ore"
  }
};

const metals = {
  iron: {
    ores: [ores.iron]
  },

  copper: {
    ores: [ores.copper]
  }
};

const fruits = {
  apple: {
    name: "apple"
  },
  strawberry: {
    name: "strawberry"
  }
};
const seeds = {
  corn: {
    name: "corn"
  }
};

const plants = {
  tree: {
    harvestedItem: [fruits.apple]
  },
  bush: {
    harvestedItem: [fruits.strawberry]
  },
  cornStalk: {
    harvestedItem: [seeds.corn]
  },
  none: {
    harvestedItem: null
  }
};
const resources = { ...fruits, ...seeds, ...meats, ...ores, ...metals };
const items = [
  ...objectToArray(animals).values.map(animal => animal.killedItem)
];

const biomes = {
  water: {
    name: "water",
    emoji: emojis.water,
    plant: plants.none,
    ore: ores.none,
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      console.log("I don't know how to swim");
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            position: {
              ...state.game.player.position,
              orientationDeg
            },
            mentalState: {
              ...state.game.player.mentalState,
              interaction: "I don't know how to swim"
            }
          }
        }
      };
    },
    playerDistantView: (state, movementCell, forwardMovementCell) => {
      if (movementCell.biome.name != "mountain") {
        return {
          ...state,
          game: {
            ...state.game,
            player: {
              ...state.game.player,

              mentalState: {
                ...state.game.player.mentalState,
                environment: "I see water in the distances."
              }
            }
          }
        };
      }
    }
  },
  beach: {
    name: "beach",
    emoji: "",
    plant: plants.none,
    ore: ores.none,
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        cellHistory: [...state.cellHistory, state.game.player.cell],
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              interaction: `${emojis.wave}Wavvy Vibes${emojis.wave}`
            },
            hunger: state.game.player.hunger - 1,
            position: {
              ...state.game.player.position,
              x: movementCell.x,
              y: movementCell.y,
              movementCell: forwardMovementCell,
              cell: movementCell,
              orientationDeg
            }
          }
        }
      };
    },
    playerDistantView: (state, movementCell, forwardMovementCell) => {
      if (movementCell.biome.name == "water") {
        return {
          ...state,
          game: {
            ...state.game,
            player: {
              ...state.game.player,
              mentalState: {
                ...state.game.player.mentalState,
                environment: "I see the shore in the distances."
              }
            }
          }
        };
      }
    }
  },
  plain: {
    name: "plain",
    emoji: "",
    plant: plants.cornStalk,
    ore: ores.none,
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        cellHistory: [...state.cellHistory, state.game.player.cell],
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            hunger: state.game.player.hunger - 1,
            position: {
              ...state.game.player.position,
              x: movementCell.x,
              y: movementCell.y,
              movementCell: forwardMovementCell,
              cell: movementCell,
              orientationDeg
            },
            mentalState: {
              ...state.game.player.mentalState,
              interaction: player.mentalState.interaction
            }
          }
        }
      };
    },
    playerDistantView: (state, movementCell, forwardMovementCell) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              environment: player.mentalState.environment
            }
          }
        }
      };
    }
  },
  mountain: {
    name: "mountain",
    emoji: emojis.mountain,
    plant: plants.bush,
    ore: ores.iron,
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            hunger: state.game.player.hunger - 1,
            position: {
              ...state.game.player.position,
              orientationDeg
            },
            mentalState: {
              ...state.game.player.mentalState,
              interaction:
                "That mountain is so tall, it's peak is hidden in the clouds. I'll die if I climb it!"
            }
          }
        }
      };
    },
    playerDistantView: (state, movementCell, forwardMovementCell) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              environment: `I see mountains rising over the ${movementCell.biome
                .name}`
            }
          }
        }
      };
    }
  },
  forest: {
    name: "forest",
    emoji: emojis.tree,
    plant: plants.tree,
    ore: ores.copper,
    playerInteraction: (
      state,
      movementCell,
      forwardMovementCell,
      orientationDeg
    ) => {
      return {
        ...state,
        cellHistory: [...state.cellHistory, state.game.player.cell],
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            hunger: state.game.player.hunger - 1,
            position: {
              ...state.game.player.position,
              x: movementCell.x,
              y: movementCell.y,
              movementCell: forwardMovementCell,
              cell: movementCell,
              orientationDeg
            },
            mentalState: {
              ...state.game.player.mentalState,
              interaction: `The forest is dark and quiet. Only a rustling of leaves fills the air.`
            }
          }
        }
      };
    },
    playerDistantView: (state, movementCell, forwardMovementCell) => {
      return {
        ...state,
        game: {
          ...state.game,
          player: {
            ...state.game.player,
            mentalState: {
              ...state.game.player.mentalState,
              environment: `A forrest is up ahead`
            }
          }
        }
      };
    }
  }
};

// const biomeType = {
//   emoji: Proptypes.string.oneOf(emojis),
//   plant: Proptypes.object.oneOf(plants),
//   ore: Proptypes.object.oneOf(ores)
// };
export { biomes, characters };
