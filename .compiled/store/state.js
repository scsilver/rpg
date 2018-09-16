"use strict"; var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; var _mobx = require("mobx");
var _helpers = require("../../src/Helpers/helpers");
var _characters = require("../../assets/characters.js");
var _cellsFactory = require("../../factories/cellsFactory.js");





var _characterSpawn = require("../../factories/characterSpawn.js");
var _emojis = require("../../assets/emojis.js"); var _emojis2 = _interopRequireDefault(_emojis);
var _lodash = require("lodash"); var _lodash2 = _interopRequireDefault(_lodash); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
console.log('hi');
var state = (0, _mobx.observable)({
    game: {
        biomes: _characters.biomes,
        characters: _characters.characters,
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
                orePicker: function orePicker() {
                    return (
                        oreOptions[Math.floor(Math.random() * oreOptions.length)]);
                },
                biomePicker: function biomePicker() {
                    var newBiomes = _characters.biomes;
                    delete newBiomes.mountain;
                    return (0, _helpers.objectToArray)(newBiomes).getRandomFromObject();
                }
            },

            cells: [],
            characters: []
        },

        player: {},
        cellHistory: [],
        saves: []
    });


//COMPUTED
//Cell Helpers
var cellList = function cellList(cell, character, offSetArray) {
    var callList = [];
    xOffsets.map(function (xOffset) {
        return yOffsets.map(function (yOffset) {
            callList.push((0, _cellsFactory.getCellByPosition)({ x: cell.position.x + xOffset, y: cell.position.y + yOffset }));
        });
    });
    return cellList;
}
////Basic Computed
state.charaters = (0, _mobx.computed)(function () {
    return state.game.world.characters;
});
state.player = (0, _mobx.computed)(function () {
    return state.game.player;
});
state.world = (0, _mobx.computed)(function () {
    return state.game.world;
});
state.time = (0, _mobx.computed)(function () {
    return state.game.world.time;
});
state.playerMentalState = (0, _mobx.computed)(function () {
    return state.game.player.mentalState;
});
state.playerPosition = (0, _mobx.computed)(function () {
    return state.game.player.position;
});

//Updaters
state.updateState = (0, _mobx.action)(function (state) {
    state.game = state.game;
    state.cellHistory = state.cellHistory;
    state.saves = state.saves;
});

state.updateGame = (0, _mobx.action)(function (game) {
    state.game = _extends({}, state.game, game);
});
state.updateWorld = (0, _mobx.action)(function (world) {
    state.updateGame({ world: _extends({}, state.game.world, world) });
});
state.updatePlayer = (0, _mobx.action)(function (player) {
    state.updateGame({ player: _extends({}, state.game.player, player) });
});
//Game Controls
state.saveGame = (0, _mobx.action)(function (game) {
    state.saves = [].concat(_toConsumableArray(state.saves), [game]);
});
state.loadGame = (0, _mobx.action)(function (gameIndex) {
    state.game = state.saves[gameIndex];
});
state.newGame = (0, _mobx.action)(function (player) {
    state.updateGame({
        world: _extends({},
            state.game.world, {
                cells: (0, _cellsFactory.cellsFactory)(state.game.world.options),
                time: 0
            })
    });


});
state.newWorld = (0, _mobx.action)(function (player) {
    state.clearGameInterval();

    var cells = (0, _cellsFactory.cellsFactory)(state.game.world.options);
    var characters = (0, _characterSpawn.characterSpawn)(cells, state.game.world.options);
    var characterCells = (0, _cellsFactory.charactersFiller)(
        cells,
        characters,
        state.game.world.options);

    state.updateGame({
        fullScreenPane: {
            visible: true,
            type: "start",
            display:
            "You awake on a new world. There are beaches, forests and mountains full of new friends, adventures, and unspeakable dangers. Proceed with wonder and caution."
        },

        world: _extends({},
            state.game.world, {
                cells: characterCells,
                characters: characters,
                time: 0
            })
    });


});
//Time Managment
state.gameTimeHandler = (0, _mobx.action)(function () {
    // const hungerRate = 0.01;
    // const newHunger = (state.game.player.hunger - hungerRate)
    //   .toString()
    //   .slice(
    //   0,
    //   Math.ceil(Math.log10(state.game.player.hunger)) -
    //   Math.log10(hungerRate) +
    //   1
    //   );
    // const isStarved = newHunger < 0;
    // isStarved ? clearInterval(state.gameInterval) : null;
    // 
    // state.updateGame(
    //   {
    //     ...state.game,
    //     world: {
    //       ...state.game.world,
    //       time: state.game.world.time + 0.5
    //     },
    //     player: {
    //       ...state.game.player,
    //       hunger: newHunger
    //     },
    //     fullScreenPane: {
    //       visible: isStarved,
    //       display: isStarved ? "You starved to death!" : null
    //     },
    //     effectsPane: {
    //       hit: false
    //     }
    //   });
    state.updateWorld({ time: state.world.time + 1000 });
});
state.startGameInterval = (0, _mobx.action)(function () {
    return (
        state.gameInterval = setInterval(state.gameTimeHandler, 1000));
});


state.clearGameInterval = (0, _mobx.action)(function () { return clearInterval(state.gameInterval); });

//Human Interaction
state.handleNewGameWizardClick = (0, _mobx.action)(function () {
    if (
        !(0, _helpers.objectToArray)(state.game.player).values.includes("") ||
        !(0, _helpers.objectToArray)(state.game.player).values.includes(0)) {
        state.startGameInterval();
        state.updateGame({
            newGameWizard: {
                visible: false
            }
        });


    }
});
state.handleFullScreenDisplayClick = (0, _mobx.action)(function () {
    state.updateGame({
        fullScreenPane: {
            visible: false,
            display: null
        },

        newGameWizard: {
            visible: true
        }
    });



});

state.inputHandler = (0, _mobx.action)(function (e, inputKey, inputType) {
    var
        player = state.game.player, options = state.options;
    var targetValueNumber = null;
    if (inputType == "range") {
        targetValueNumber = Number.parseInt(e.target.value);
    }

    state.updatePlayer(_defineProperty({}, "" +
        inputKey, targetValueNumber || e.target.value));

});
state.handleKeyPress = (0, _mobx.action)(function (event) {

    if (!state.game.newGameWizard.visible) {
        switch (event.key) {
            case "ArrowRight":
                state.movePlayer(1, 0);
                break;

            case "ArrowLeft":
                state.movePlayer(-1, 0);
                break;

            case "ArrowUp":
                state.movePlayer(0, -1);
                break;

            case "ArrowDown":
                state.movePlayer(0, 1);
                break;
            default:
                break;
        }

    }
});
state.handleKeyPressThrottled = (0, _mobx.action)(function () {
    return _lodash2.default.throttle(state.handleKeyPress, 100, {
        leading: true
    });
});


//Player Movement
state.movePlayerForward = (0, _mobx.action)(function () {

});
state.movePlayer = (0, _mobx.action)(function (xOffset, yOffset) {
    var _state$game =



        state.game, _state$game$world = _state$game.world, options = _state$game$world.options, cells = _state$game$world.cells, _state$game$player$po = _state$game.player.position, x = _state$game$player$po.x, y = _state$game$player$po.y, orientationDeg = _state$game$player$po.orientationDeg, movementCell = _state$game$player$po.movementCell;
    var movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
        if (
            0 <= xOffset + x && xOffset + x < options.side &&
            0 <= yOffset + y && yOffset + y < options.side) {
            var forwardMovementCell = (0, _cellsFactory.getCellByPosition)({}, cells, options.side, { x: x + xOffset * 2, y: y + yOffset * 2 });
            var newMovementCell = (0, _cellsFactory.getCellByPosition)({}, cells, options.side, { x: x + xOffset, y: y + yOffset });
            var newState = checkMovementCell({
                state: state,
                orientationDeg: movementOrientation,
                movementCell: newMovementCell,
                forwardMovementCell: forwardMovementCell,
                biomes: _characters.biomes,
                characters: _characters.characters
            });

            state.updateState(newState);
        }
    } else {
        var turnMovementCell = (0, _cellsFactory.getCellByPosition)({}, cells, options.side, { x: x + xOffset, y: y + yOffset });
        var _newMovementCell = (0, _cellsFactory.getCellByPosition)({}, cells, options.side, { x: x, y: y });
        var newForwardMovementCell = (0, _cellsFactory.getCellByPosition)({}, cells, options.side, { x: x + xOffset, y: y + yOffset });
        var finalState = checkMovementCell({
            state: state,
            orientationDeg: movementOrientation,
            movementCell: _newMovementCell,
            forwardMovementCell: newForwardMovementCell,
            biomes: _characters.biomes,
            characters: _characters.characters
        });

        state.updateState(finalState);
    }
});
//  handleMoveCharacters = that => {
//     const {
//       options,
//       game,
//       game: { world, world: { cells, characters } }
//     } = that.state;
//     var nextPositionCharacters = [];
//     characters.map(character => {
//       const { position, position: { x, y, orientationDeg } } = character;
//       const nextCharacter = {
//         ...character,
//         position: {
//           ...position,
//           x: x + Math.floor(Math.sin(orientationDeg * Math.PI / 180)),
//           y: y + Math.floor(Math.cos(orientationDeg * Math.PI / 180))
//         }
//       };
//       nextPositionCharacters = [...nextPositionCharacters, nextCharacter];
//     });
//     const newCells = charactersFiller(cells, nextPositionCharacters, options);

//     that.setState({
//       ...that.state,
//       game: {
//         ...game,
//         world: { ...world, cells: newCells, characters: nextPositionCharacters }
//       }
//     });
//   };
(0, _mobx.autorun)(function () {
    console.log('autorun', state); // get can track not yet existing properties
});

module.exports = state;