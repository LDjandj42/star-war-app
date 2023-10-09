import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Character } from '../starwars/characters';


export const loadCharacterList = createAction(
    '[Character API] load character list',
  );
export const loadCharacterListSuccess = createAction(
  '[Character API] load character list success',
  props<{ ListCharacter: Character[] }>()
);
export const loadCharacterListFailure = createAction(
    '[Character API] load character list failure',
    props<{ error: HttpErrorResponse | Error }>()
);
export const deleteCharacterList = createAction(
  '[Character API] delete character List',
);
  

export const loadCharacter = createAction(
  '[Character API] load character',
    props<{ characterId: number }>() 
);
export const loadCharacterSuccess = createAction(
'[Character API] load character success',
props<{ character: Character }>()
);
export const loadCharacterFailure = createAction(
  '[Character API] load character failure',
  props<{ error: HttpErrorResponse | Error }>()
);
export const deleteCharacter = createAction(
  '[Character API] delete character',
);