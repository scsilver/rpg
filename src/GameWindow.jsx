import React, { Component } from "react";
import Grid from "./Grid.jsx";
import PropTypes from "prop-types";
import ActionPane from "./ActionPane.jsx";
import InfoPane from "./InfoPane.jsx";
import { cellsFactory, getCellByPosition } from "../factories/cellsFactory.js";
const resourceList = {
  iron: { ore: true, food: false, material: false },
  diamond: { ore: true, food: false, material: false },
  copper: { ore: true, food: false, material: false },
  apple: { ore: false, food: true, material: false },
  strawberry: { ore: false, food: true, material: false },
  corn: { ore: false, food: true, material: false },
  wood: { ore: false, food: false, material: true },
  sand: { ore: false, food: false, material: true },
  fish: { ore: false, food: true, material: false },
  water: { ore: false, food: true, material: false }
};

const oreOptions = ["iron", "diamond", "copper"];
const resourceOptions = ["apple", "strawberry", "corn"];
const biomeOptions = [
  "tundra",
  "mountain",
  "forrest",
  "desert",
  "plain",
  "beach",
  "water"
];
const biomeObjects = {
  tundra: { resources: [] },
  mountain: { resources: ["iron", "copper", "strawberry"] },
  forrest: { resources: ["wood", "apple"] },
  desert: { resources: [] },
  plain: { resources: ["corn"] },
  beach: { resources: ["sand"] },
  water: { resources: ["fish", "water"] }
};
export default class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        world: {
          options: {
            baseHeight: 1,
            heightVariance: 0.3,
            amount: 400,
            side: 20,
            orePicker: () =>
              oreOptions[Math.floor(Math.random() * oreOptions.length)],
            biomePicker: () =>
              biomeOptions[Math.floor(Math.random() * biomeOptions.length)],
            resourcesPicker: biome => biomeObjects[biome].resources
          },
          cells: []
        },
        player: {
          inventory: [],
          name: "Scott",
          race: "jewBorne",
          height: 67,
          age: 27,
          agility: 1,
          attack: 1,
          defense: 1,
          health: 100,
          hunger: 100,
          position: { x: 1, y: 1, orientationDeg: "0", cell: {}, cellAhead: {} }
        }
      },
      cellHistory: [],
      saves: []
    };
  }
  componentDidMount() {
    this.newWorld();
  }

  newWorld = () =>
    this.setState({
      game: {
        ...this.state.game,
        world: {
          ...this.state.game.world,
          cells: cellsFactory(this.state.game.world.options)
        }
      }
    });
  newGame = player =>
    this.setState({
      game: {
        world: {
          ...this.state.game.world,
          cells: cellsFactory(this.state.game.world.options)
        },
        player
      }
    });
  saveGame = () =>
    this.setState({ saves: [...this.state.saves, this.state.game] });
  loadGame = index => this.setState({ game: this.state.saves[index] });
  gameControls = {
    newWorld: this.newWorld,
    newGame: this.newGame,
    saveGame: this.saveGame,
    loadGame: this.loadGame
  };

  handleMovePlayer = (xOffset, yOffset) => {
    const {
      position: { x, y, orientationDeg, movementCell }
    } = this.state.game.player;
    const { options } = this.state.game.world;
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;

    if (movementOrientation == orientationDeg) {
      if (
        0 <= xOffset + x &&
        xOffset + x < options.side &&
        0 <= yOffset + y &&
        yOffset + y < options.side
      ) {
        const forwardMovementCell = getCellByPosition(
          {},
          this.state.game.world.cells,
          options.side,
          {
            x: x + xOffset * 2,
            y: y + yOffset * 2
          }
        );
        const cellBiome = movementCell.biome;
        if (["water", "mountain"].includes(cellBiome)) {
          console.log("you cannot swim");
        } else {
          this.setState({
            cellHistory: [
              ...this.state.cellHistory,
              this.state.game.player.cell
            ],
            game: {
              ...this.state.game,
              player: {
                ...this.state.game.player,
                hunger: this.state.game.player.hunger - 1,
                position: {
                  x: x + xOffset,
                  y: y + yOffset,
                  orientationDeg: movementOrientation,
                  movementCell: forwardMovementCell,
                  cell: movementCell
                }
              }
            }
          });
        }
      } else {
        console.log("Player cannot move out of bounds");
      }
    } else {
      const turnMovementCell = getCellByPosition(
        {},
        this.state.game.world.cells,
        options.side,
        {
          x: x + xOffset,
          y: y + yOffset
        }
      );
      this.setState({
        game: {
          ...this.state.game,
          player: {
            ...this.state.game.player,
            position: {
              ...this.state.game.player.position,
              movementCell: turnMovementCell,
              orientationDeg: movementOrientation
            }
          }
        },
        cellHistory: [...this.state.cellHistory, this.state.game.player.cell]
      });
    }
  };
  handleDig = () => {
    const { player, player: { position: { cell: { ore } } } } = this.state.game;
    if (oreOptions.includes(ore)) {
      this.setState({
        game: {
          ...this.state.game,
          player: {
            ...player,
            inventory: [
              ...player.inventory,
              ...resources.filter(resource => resourceList[resource].ore)
            ]
          }
        }
      });
    }
  };
  handleHarvest = () => {
    const {
      player,
      player: { position: { cell: { resources } } }
    } = this.state.game;

    this.setState({
      game: {
        ...this.state.game,
        player: {
          ...player,
          inventory: [
            ...player.inventory,
            ...resources.filter(resource => resourceList[resource].food)
          ]
        }
      }
    });
  };
  handleGather = () => {
    const {
      player,
      player: { position: { cell: { resources } } }
    } = this.state.game;
    this.setState({
      game: {
        ...this.state.game,
        player: {
          ...player,
          inventory: [
            ...player.inventory,
            ...resources.filter(resource => resourceList[resource].material)
          ]
        }
      }
    });
  };

  handleAction = type => {
    switch (type) {
      case "dig":
        this.handleDig();
        break;
      case "harvest":
        this.handleHarvest();
        break;
      case "gather":
        this.handleGather();
        break;
      default:
        break;
    }
  };

  handleKeyPress = event => {
    switch (event.key) {
      case "ArrowRight":
        this.handleMovePlayer(1, 0);
        break;

      case "ArrowLeft":
        this.handleMovePlayer(-1, 0);
        break;

      case "ArrowUp":
        this.handleMovePlayer(0, -1);
        break;

      case "ArrowDown":
        this.handleMovePlayer(0, 1);
        break;
      case "h":
        this.handleAction("harvest");
        break;
      case "d":
        this.handleAction("dig");
        break;
      case "r":
        this.handleAction("read");
        break;
      case "g":
        this.handleAction("gather");
        break;

      default:
        break;
    }
  };
  render() {
    const { data } = this.state;
    return (
      <div class="GameWindow" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <ActionPane {...this.state} gameControls={this.gameControls} />
        <InfoPane {...this.state} gameControls={this.gameControls} />
      </div>
    );
  }
}
