import {
  cellsFactory,
  getCellByPosition,
  charactersFiller
} from "../factories/cellsFactory.js";
import { characterSpawn } from "../factories/characterSpawn.js";
import { biomes, characters } from "../assets/assets";
class gameWindowHandlers {
  handleMovePlayer(xOffset, yOffset) {
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
        const newMovementCell = getCellByPosition(
          {},
          this.state.game.world.cells,
          options.side,
          {
            x: x + xOffset,
            y: y + yOffset
          }
        );
        const newState = this.checkMovementCell({
          orientationDeg: movementOrientation,
          movementCell: newMovementCell,
          forwardMovementCell,
          biomes,
          characters
        });
        this.setState(newState);
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
      const newState = {
        ...this.state,
        game: {
          ...this.state.game,
          player: {
            ...this.state.game.player,
            position: {
              ...this.state.game.player.position,
              forwardMovementCell: turnMovementCell,
              orientationDeg: movementOrientation
            }
          }
        },
        cellHistory: [...this.state.cellHistory, this.state.game.player.cell]
      };
      const newMovementCell = getCellByPosition(
        {},
        newState.game.world.cells,
        options.side,
        {
          x: x,
          y: y
        }
      );
      const newForwardMovementCell = getCellByPosition(
        {},
        this.state.game.world.cells,
        options.side,
        {
          x: x + xOffset,
          y: y + yOffset
        }
      );
      const finalState = this.checkMovementCell({
        orientationDeg: movementOrientation,
        movementCell: newMovementCell,
        forwardMovementCell: newForwardMovementCell,
        biomes,
        characters
      });
      this.setState(finalState);
    }
  }
  handleDig = () => {
    const { player, player: { position: { cell: { ore } } } } = this.state.game;
    if (oreOptions.includes(ore)) {
      this.setState({
        game: {
          ...this.state.game,
          player: {
            ...player,
            inventory: [...player.inventory]
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

    setState({
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

  gameControls = {
    saveGame: this.saveGame,
    loadGame: this.load,
    newGame: this.newGame,
    newWorld: this.newWorld
  };
}

const newGameWindowHandlers = new gameWindowHandlers();
function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowRight":
      newGameWindowHandlers.handleMovePlayer.call(this, 1, 0);
      break;

    case "ArrowLeft":
      newGameWindowHandlers.handleMovePlayer.call(this, -1, 0);
      break;

    case "ArrowUp":
      newGameWindowHandlers.handleMovePlayer.call(this, 0, -1);
      break;

    case "ArrowDown":
      newGameWindowHandlers.handleMovePlayer.call(this, 0, 1);
      break;
    case "h":
      newGameWindowHandlers.handleAction.call(this, "harvest");
      break;
    case "d":
      newGameWindowHandlers.handleAction.call(this, "dig");
      break;
    case "r":
      newGameWindowHandlers.handleAction.call(this, "read");
      break;
    case "g":
      newGameWindowHandlers.handleAction.call(this, "gather");
      break;

    default:
      break;
  }
}
const handleMovePlayer = newGameWindowHandlers.handleMovePlayer;
const gameControls = newGameWindowHandlers.gameControls;
export { gameControls, handleMovePlayer, handleKeyPress };
