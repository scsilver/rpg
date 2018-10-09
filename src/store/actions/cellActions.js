import { action, computed } from "mobx";
import Cell from "../../../assets/Environment/Cell.js";
import _ from "lodash";
import { plantFactory } from "../../../assets/Environment/plants";
import { species } from "../../../assets/Category/species";
const addCellActions = state => {
  state.initializeCells = action(() => {
    const { side } = state.game.world.options;
    const cells = [];
    _.times(side, y =>
      _.times(side, x => cells.push(new Cell({ position: { x, y } })))
    );
    const newCells = new Map(Object.entries(cells));

    state.updateCells(cells);
  });

  state.defaultCellsStateRecipie = action(() => {
    state.initializeCells();
    // state.applyRandomAndAveragedCellHeights();
    state.applyBiomes();
    state.applyPlants();
    state.applyCharacters();
  });

  state.applyPlants = action(() => {
    const nextCells = state.game.world.cells.map(cell => {
      const viableSpecies = species.plants.array.filter(specie => {
        return specie.spawn.biomes.includes(cell.biome.name);
      });
      const specie =
        viableSpecies[Math.floor(Math.random() * viableSpecies.length)];

      return {
        ...cell,
        plant: state.percentTrue(30) && specie ? plantFactory({ specie }) : null
      };
    });
    state.updateCells(nextCells);
  });

  state.applyBiomes = action(() => {
    const nextCells = state.game.world.cells.map(cell => {
      return { ...cell, biome: state.getBiomeRandom() };
    });
    state.updateCells(nextCells);
  });

  state.applyCharacters = action(() => {
    const nextCharacters = state.cells
      .get()
      .map(cell => {
        return state.percentTrue(10) ? state.characterSpawn({ cell }) : null;
      })
      .filter(character => !!character);

    state.updateCharacters(nextCharacters);
  });
};

export default addCellActions;
