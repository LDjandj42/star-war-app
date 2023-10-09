
import { createReducer, on } from '@ngrx/store';
import { Character } from '../starwars/characters';
import * as RootAction from './actions';

export interface State{
  charactersList: Character[];
  character: Character;

}
const initialState: State = {
  charactersList: [],
  character: null,
};
const _charactersReducer = createReducer(
  initialState,
  on(RootAction.loadCharacterListSuccess, (state, { ListCharacter }) => ({ ...state, characterList: ListCharacter })),
  on(RootAction.deleteCharacterList, (state) => ({ ...state, characterList: [] })),
  on(RootAction.loadCharacterSuccess, (state, { character }) => ({ ...state, character: character })),
  on(RootAction.deleteCharacter, (state) => ({ ...state, character: null })),
);
  export function charactersReducer(state: State | undefined, action: any) {
    return _charactersReducer(state, action);
  }