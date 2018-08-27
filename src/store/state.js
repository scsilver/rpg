import { observable } from 'mobx';
import { objectToArray, percentTrue } from "../../src/helpers";
import { biomes, characters } from "../../assets/characters.js";
import {
    cellsFactory,
    getCellByPosition,
    charactersFiller
} from "../../factories/cellsFactory.js";

import { characterSpawn } from "../../factories/characterSpawn.js";
import emojis from "../../assets/emojis.js";
import {
    gameControls,
    handleMoveCharacters,
    handleKeyPress
} from "../gameWindowHandlers.js";
const state = observable({
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
})
state.updateGame = function (game) {
    debugger
    this.game = game
}
module.exports = state;

