import { createReducer, on } from '@ngrx/store';
import { Species } from '../starwars/interface';
import * as RootAction from './actions';

export interface State{
  speciesList: Species[];
  species: Species;

}
const initialState: State = {
  speciesList: [],
  species: null,
};
const _speciesReducer = createReducer(
  initialState,
  on(RootAction.loadSpeciesListSuccess, (state, { ListSpecies }) => ({ ...state, speciesList: ListSpecies })),
  on(RootAction.deleteSpeciesList, (state) => ({ ...state, speciesList: [] })),
  on(RootAction.loadSpeciesSuccess, (state, { Species }) => ({ ...state, species: Species })),
  on(RootAction.deleteSpecies, (state) => ({ ...state, species: null })),
);
  export function speciesReducer(state: State | undefined, action: any) {
    return _speciesReducer(state, action);
  }