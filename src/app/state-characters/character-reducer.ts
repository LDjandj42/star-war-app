
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
  on(RootAction.loadCharacterListSuccess, (state, { ListCharacter } ):State => ({ ...state, charactersList: ListCharacter })),
  on(RootAction.updateCharacterList, (state, { character }):State => {
    const updatedCharacters = state.charactersList.filter(c => c.id !== character.id);
    return { ...state, charactersList: updatedCharacters };
  }),
  on(RootAction.deleteCharacterList, (state):State => ({ ...state, charactersList: [] })),
  on(RootAction.loadCharacterSuccess, (state, { character }):State => ({ ...state, character: character })),
  on(RootAction.updateCharacter, (state, { updatedCharacter }):State => {
    const updatedList = state.charactersList.map(character =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    return { ...state, charactersList: updatedList };
  }),
  on(RootAction.deleteCharacter, (state):State => ({ ...state, character: null })),
);
  export function charactersReducer(state: State | undefined, action: any) {
    return _charactersReducer(state, action);
  }