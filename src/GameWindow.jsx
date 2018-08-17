import React, { Component } from "react";
import Grid from "./Grid.jsx";
import PropTypes from "prop-types";
import ActionPane from "./ActionPane.jsx";
import InfoPane from "./InfoPane.jsx";
import cellsFactory from "../factories/cellsFactory.js";
const oreOptions = ["iron", "diamond", "copper"];
const biomeOptions = ["mountain", "desert", "plain", "beach", "water"];
export default class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        world: {
          options: {
            amount: 400,
            side: 20,
            orePicker: () =>
              oreOptions[Math.floor(Math.random() * oreOptions.length)],
            biomePicker: () =>
              biomeOptions[Math.floor(Math.random() * biomeOptions.length)]
          },
          cells: []
        },
        player: {
          name: "Scott",
          race: "jewBorne",
          height: 67,
          age: 27,
          agility: 1,
          attack: 1,
          defense: 1,
          health: 100,
          position: { x: 0, y: 1, orientationDeg: "0" }
        }
      },

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
    const { position: { x, y, orientationDeg } } = this.state.game.player;
    const { options } = this.state.game.world;
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
      if (
        0 <= xOffset + x &&
        xOffset + x < options.side &&
        0 <= yOffset + y &&
        yOffset + y < options.side
      ) {
        this.setState({
          game: {
            ...this.state.game,
            player: {
              ...this.state.game.player,
              position: {
                x: x + xOffset,
                y: y + yOffset,
                orientationDeg: movementOrientation
              }
            }
          }
        });
      } else {
        console.log("Player cannot move out of bounds");
      }
    } else {
      this.setState({
        game: {
          ...this.state.game,
          player: {
            ...this.state.game.player,
            position: {
              ...this.state.game.player.position,
              orientationDeg: movementOrientation
            }
          }
        }
      });
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
