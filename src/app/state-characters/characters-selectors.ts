import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './character-reducer';


const selectCharacterRoot = createFeatureSelector<State>('characters');

export const getCharctersList = createSelector(
  selectCharacterRoot,
  (state: State) => state?.charactersList
);
export const getcharcter = createSelector(
  selectCharacterRoot,
  (state: State) => state?.character
);