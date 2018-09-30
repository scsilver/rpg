import { action, computed } from "mobx";
import Cell from "../../../assets/Environment/Cell.js";
import _ from "lodash";
import plants from "../../../assets/Environment/plants";
const addCellActions = state => {
  state.initializeCells = action(() => {
    const cells = [];
    _.times(state.game.world.options.side, y =>
      _.times(state.game.world.options.side, x =>
        cells.push(new Cell({ position: { x, y } }))
      )
    );
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
    const plantsClasses = Object.keys(plants)
      .filter(key => key != "initialized")
      .map(plantKey => plants[plantKey]);
    const nextCells = state.game.world.cells.map(cell => {
      const viablePlants = Object.keys(plants.initialized)
        .map(key => plants.initialized[key])
        .filter(plant => {
          return plant.spawn.biomes.includes(cell.biome.name);
        });
      return {
        ...cell,
        plant: state.percentTrue(30)
          ? new plantsClasses[
              (Math.floor(Math.random() * plantsClasses.length))
            ]()
          : null
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
        return state.percentTrue(30) ? state.characterSpawn({ cell }) : null;
      })
      .filter(character => !!character);

    state.updateCharacters(nextCharacters);
  });
};

export default addCellActions;
