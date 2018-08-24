import React, { Component } from "react";
import Grid from "./Grid.jsx";
import PropTypes from "prop-types";
import ActionPane from "./ActionPane.jsx";
import InfoPane from "./InfoPane.jsx";
import FullScreenPane from "./FullScreenPane.jsx";
import EffectsPane from "./EffectsPane.jsx";
import NewGameWizard from "./NewGameWizard.jsx";
import { objectToArray, percentTrue } from "../src/helpers";
import { biomes, characters } from "../assets/characters.js";
import {
  cellsFactory,
  getCellByPosition,
  charactersFiller
} from "../factories/cellsFactory.js";

import { characterSpawn } from "../factories/characterSpawn.js";
import emojis from "../assets/emojis.js";
import {
  gameControls,
  handleMoveCharacters,
  handleKeyPress
} from "./gameWindowHandlers.js";
export default class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        fullScreenPane: {
          visible: false,
          display: ""
        },
        effectsPane: {
          red: false
        },
        newGameWizard: {
          visible: false
        },
        world: {
          time: 0,
          options: {
            baseHeight: 1,
            heightVariance: 0.3,
            amount: 900,
            side: 30,
            jobs: ["Ranger", "Wizard", "Knight"],
            races: ["Human", "Mage", "Elf"],
            orePicker: () =>
              oreOptions[Math.floor(Math.random() * oreOptions.length)],
            biomePicker: () => {
              var newBiomes = biomes;
              delete newBiomes.mountain;
              return objectToArray(newBiomes).getRandomFromObject();
            }
          },
          cells: [],
          characters: []
        },
        player: {
          mentalState: {
            interaction: "Feeling fine...",
            environment: "Blissful..."
          },
          emoji: emojis.player,
          inventory: [],
          name: "Scott",
          race: "jewBorne",
          job: "none",
          height: 67,
          age: 27,
          agility: 1,
          attack: 1,
          defense: 1,
          health: 100,
          hunger: 100,
          xp: 5,
          position: {
            x: 1,
            y: 1,
            orientationDeg: "0",
            cell: {},
            movementCell: {}
          }
        }
      },

      cellHistory: [],
      saves: []
    };
  }
  componentDidMount() {
    this.newWorld();
  }

  inputHandler = (e, inputKey, inputType) => {
    const { game, game: { player }, options } = this.state;
    var targetValueNumber = null;
    if (inputType == "range") {
      targetValueNumber = Number.parseInt(e.target.value);
    } else {
    }

    this.setState({
      game: {
        ...game,
        player: {
          ...player,
          [`${inputKey}`]: targetValueNumber || e.target.value
        }
      }
    });
  };
  gameTimeHandler = () => {
    const hungerRate = 0.01;
    const newHunger = (this.state.game.player.hunger - hungerRate)
      .toString()
      .slice(
        0,
        Math.ceil(Math.log10(this.state.game.player.hunger)) -
          Math.log10(hungerRate) +
          1
      );
    const isStarved = newHunger < 0;
    isStarved ? clearInterval(this.gameInterval) : null;
    this.setState({
      game: {
        ...this.state.game,
        world: {
          ...this.state.game.world,
          time: this.state.game.world.time + 0.5
        },
        player: {
          ...this.state.game.player,
          hunger: newHunger
        },
        fullScreenPane: {
          visible: isStarved,
          display: isStarved ? "You starved to death!" : null
        },
        effectsPane: {
          hit: false
        }
      }
    });
  };
  handleFullScreenDisplayClick = () => {
    this.setState({
      game: {
        ...this.state.game,

        fullScreenPane: {
          visible: false,
          display: null
        },
        newGameWizard: {
          visible: true
        }
      }
    });
  };
  handleNewGameWizardClick = () => {
    this.gameInterval = setInterval(this.gameTimeHandler, 500);
    if (
      !objectToArray(this.state.game.player).values.includes("") ||
      !objectToArray(this.state.game.player).values.includes(0)
    ) {
      this.setState({
        game: {
          ...this.state.game,
          newGameWizard: {
            visible: false
          }
        }
      });
    }
  };
  newWorld = () => {
    clearInterval(this.gameInterval);

    const cells = cellsFactory(this.state.game.world.options);
    const characters = characterSpawn(cells, this.state.game.world.options);
    const characterCells = charactersFiller(
      cells,
      characters,
      this.state.game.world.options
    );

    this.setState({
      game: {
        ...this.state.game,
        fullScreenPane: {
          visible: true,
          type: "start",
          display:
            "You awake on a new world. There are beaches, forests and mountains full of new friends, adventures, and unspeakable dangers. Proceed with wonder and caution."
        },
        world: {
          ...this.state.game.world,
          cells: characterCells,
          characters,
          time: 0
        }
      }
    });
  };
  newGame = player => {
    this.setState({
      game: {
        world: {
          ...this.state.game.world,
          cells: cellsFactory(this.state.game.world.options),
          time: 0
        },
        ...this.state.game
      }
    });
  };
  saveGame = () =>
    this.setState({ saves: [...this.state.saves, this.state.game] });
  loadGame = index => this.setState({ game: this.state.saves[index] });
  checkCell = (
    categoryName,
    categoryOptions,
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return (
      objectToArray(categoryOptions)
        .values.map(
          categoryOption =>
            movementCell[categoryName].name == categoryOption.name
              ? categoryOption.playerInteraction(
                  state,
                  movementCell,
                  forwardMovementCell,
                  orientationDeg
                )
              : false
        )
        .filter(option => option)[0] || state
    );
  };
  checkDistantCell = (
    categoryName,
    categoryOptions,
    state,
    movementCell,
    forwardMovementCell,
    orientationDeg
  ) => {
    return (
      objectToArray(categoryOptions)
        .values.map(
          categoryOption =>
            forwardMovementCell[categoryName].name == categoryOption.name
              ? categoryOption.playerDistantView(
                  state,
                  movementCell,
                  forwardMovementCell,
                  orientationDeg
                )
              : false
        )
        .filter(option => option)[0] || state
    );
  };

  checkMovementCell = args => {
    const distantBiomeCheckState = this.checkDistantCell(
      "biome",
      args.biomes,
      this.state,
      args.movementCell,
      args.forwardMovementCell,
      args.orientationDeg
    );
    const biomeCheckState = this.checkCell(
      "biome",
      args.biomes,
      distantBiomeCheckState,
      args.movementCell,
      args.forwardMovementCell,
      args.orientationDeg
    );
    const characterCheckState = this.checkCell(
      "character",
      args.characters,
      biomeCheckState,
      args.movementCell,
      args.forwardMovementCell,
      args.orientationDeg
    );
    const characterAheadCheckState = this.checkDistantCell(
      "character",
      args.characters,
      characterCheckState,
      args.movementCell,
      args.forwardMovementCell,
      args.orientationDeg
    );
    return characterAheadCheckState;
  };
  handleKeyPress = _.throttle(handleKeyPress.bind(this), 100, {
    leading: true
  });
  render() {
    const { data } = this.state;
    return (
      <div class="GameWindow" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <NewGameWizard
          {...this.state.game}
          inputHandler={this.inputHandler}
          handleClick={this.handleNewGameWizardClick}
        />
        <FullScreenPane
          {...this.state.game.fullScreenPane}
          handleClick={this.handleFullScreenDisplayClick}
        />

        <EffectsPane {...this.state.game.effectsPane} />
        <ActionPane
          {...this.state}
          gameControls={{ newWorld: this.newWorld }}
        />
        <InfoPane {...this.state} gameControls={{ newWorld: this.newWorld }} />
      </div>
    );
  }
}
