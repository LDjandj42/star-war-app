
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './species-reducer';

const selectSpeciesRoot = createFeatureSelector<State>('species');

export const getSpeciesList = createSelector(
  selectSpeciesRoot,
  (state: State) => state?.speciesList
);
export const getSpecies = createSelector(
  selectSpeciesRoot,
  (state: State) => state?.species
);