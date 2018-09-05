import { observable, action, computed } from 'mobx';
import { objectToArray, percentTrue } from "../../src/Helpers/helpers";
import { biomes, characters } from "../../assets/characters.js";
import {
    cellsFactory,
    getCellByPosition,
    charactersFiller
} from "../../factories/cellsFactory.js";

import { characterSpawn } from "../../factories/characterSpawn.js";
import emojis from "../../assets/emojis.js";
import _ from "lodash";

const state = observable({
    game: {
        biomes,
        characters,
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
})


state.updateState = action(function (state) {
    state.game = state.game
    state.cellHistory = state.cellHistory
    state.saves = state.saves
})

state.updateGame = action(function (game) {
    state.game = { ...state.game, game }
})
state.updateWorld = action(function (world) {
    state.updateGame({ world: { ...state.game.world, world } })
})
state.updatePlayer = action(function (player) {
    state.updateGame({ player: { ...state.game.player, player } })
})
state.saveGame = action(function (game) {
    state.saves = [...state.saves, game]
})
state.loadGame = action(function (gameIndex) {
    state.game = state.saves[gameIndex]
})
state.gameTimeHandler = action(() => {
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
    // debugger
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
    state.updateWorld({ time: state.world.time + 1000 })
})
state.startGameInterval = action(() =>
    state.gameInterval = setInterval(state.gameTimeHandler, 1000)
)
state.newGame = action(player => {
    state.updateGame({
        world: {
            ...state.game.world,
            cells: cellsFactory(state.game.world.options),
            time: 0
        }
    })
})
state.clearGameInterval = action(() => clearInterval(state.gameInterval))
state.newWorld = action(player => {
    state.clearGameInterval()

    const cells = cellsFactory(state.game.world.options);
    const characters = characterSpawn(cells, state.game.world.options);
    const characterCells = charactersFiller(
        cells,
        characters,
        state.game.world.options
    );

    state.updateGame({
        fullScreenPane: {
            visible: true,
            type: "start",
            display:
            "You awake on a new world. There are beaches, forests and mountains full of new friends, adventures, and unspeakable dangers. Proceed with wonder and caution."
        },
        world: {
            ...state.game.world,
            cells: characterCells,
            characters,
            time: 0
        }
    })
})

state.handleNewGameWizardClick = action(() => {
    if (
        !objectToArray(state.game.player).values.includes("") ||
        !objectToArray(state.game.player).values.includes(0)
    ) {
        stateGameInterval()
        state.updateGame({
            newGameWizard: {
                visible: false
            }
        })
    }
})
state.handleFullScreenDisplayClick = action(() => {
    state.updateGame({
        fullScreenPane: {
            visible: false,
            display: null
        },
        newGameWizard: {
            visible: true
        }

    })
})

state.inputHandler = action((e, inputKey, inputType) => {
    const { game: { player }, options } = state;
    var targetValueNumber = null;
    if (inputType == "range") {
        targetValueNumber = Number.parseInt(e.target.value);
    }

    state.updatePlayer({
        [`${inputKey}`]: targetValueNumber || e.target.value
    });
})
state.handleKeyPress = action(e => {
    if (!state.game.newGameWizard.visible) {
        switch (event.key) {
            case "ArrowRight":
                state.movePLayer(1, 0);
                break;

            case "ArrowLeft":
                state.movePLayer(-1, 0);
                break;

            case "ArrowUp":
                state.movePLayer(0, -1);
                break;

            case "ArrowDown":
                state.movePLayer(0, 1);
                break;
            default:
                break;
        }
    }
})
state.handleKeyPressThrottled = action(() => _.throttle(state.handleKeyPress, 100, {
    leading: true
}));
state.movePlayerForward = action(() => {

})
state.movePlayer = action((xOffset, yOffset) => {
    const {
        world: { options, cells },
        player: { position: { x, y, orientationDeg, movementCell } }
    } = state.game;
    const movementOrientation = Math.atan2(xOffset, -yOffset) * 180 / Math.PI;
    if (movementOrientation == orientationDeg) {
        if (
            0 <= xOffset + x && xOffset + x < options.side &&
            0 <= yOffset + y && yOffset + y < options.side
        ) {
            const forwardMovementCell = state.getCellByPosition({ x: x + xOffset * 2, y: y + yOffset * 2 })
            const newMovementCell = state.getCellByPosition({ x: x + xOffset, y: y + yOffset });
            const newState = state.checkMovementCell({
                orientationDeg: movementOrientation,
                movementCell: newMovementCell,
                forwardMovementCell,
                biomes,
                characters
            });
            state.updateState(newState);
        }
    } else {
        const turnMovementCell = state.getCellByPosition({ x: x + xOffset, y: y + yOffset });
        const newMovementCell = getCellByPosition({ x: x, y: y });
        const newForwardMovementCell = getCellByPosition({ x: x + xOffset, y: y + yOffset });
        const finalState = state.checkMovementCell({
            orientationDeg: movementOrientation,
            movementCell: newMovementCell,
            forwardMovementCell: newForwardMovementCell,
            biomes,
            characters
        });
        state.updateState(finalState)
    }
})
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


//COMPUTED
state.getCellByPosition = computed(({ x, y }) => {
    const index = x + state.get().game.world.options.sideCells * y;
    return state.get().game.world.cells[index];
})
state.checkCell = computed((
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
})
state.checkDistantCell = computed((
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
})

state.checkMovementCell = computed(args => {
    const distantBiomeCheckState = state.checkDistantCell(
        "biome",
        args.biomes,
        state,
        args.movementCell,
        args.forwardMovementCell,
        args.orientationDeg
    );
    const biomeCheckState = state.checkCell(
        "biome",
        args.biomes,
        distantBiomeCheckState,
        args.movementCell,
        args.forwardMovementCell,
        args.orientationDeg
    );
    const characterCheckState = state.checkCell(
        "character",
        args.characters,
        biomeCheckState,
        args.movementCell,
        args.forwardMovementCell,
        args.orientationDeg
    );
    const characterAheadCheckState = state.checkDistantCell(
        "character",
        args.characters,
        characterCheckState,
        args.movementCell,
        args.forwardMovementCell,
        args.orientationDeg
    );
    return characterAheadCheckState;
})
////Basic Computed
state.charaters = computed(() => {
    return state.game.world.characters
})
state.player = computed(() => {
    return state.game.player
})
state.world = computed(() => {
    return state.game.world
})
state.time = computed(() => {
    return state.game.world.time
})
state.playerMentalState = computed(() => {
    return state.game.player.mentalState
})
state.playerPosition = computed(() => {
    return state.game.player.position
})
module.exports = state;

