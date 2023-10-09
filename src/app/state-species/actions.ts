import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Species } from '../starwars/interface';


export const loadSpeciesList = createAction(
    '[Species API] load species list',
  );
export const loadSpeciesListSuccess = createAction(
  '[Species API] load species list success',
  props<{ ListSpecies: Species[] }>()
);
export const loadSpeciesListFailure = createAction(
    '[Species API] load species list failure',
    props<{ error: HttpErrorResponse | Error }>()
);
export const deleteSpeciesList = createAction(
  '[Species API] delete species List',
);
  

export const loadSpecies = createAction(
  '[Species API] load species',
    props<{ speciesId: number }>() 
);
export const loadSpeciesSuccess = createAction(
'[Species API] load species success',
props<{ Species: Species }>()
);
export const loadSpeciesFailure = createAction(
  '[Species API] load species failure',
  props<{ error: HttpErrorResponse | Error }>()
);
export const deleteSpecies = createAction(
  '[Species API] delete species',
);