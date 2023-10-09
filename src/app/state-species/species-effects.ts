import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { Species } from "../starwars/interface";
import { StarwarsService } from "../starwars/starwars.service";
import { loadSpecies, loadSpeciesList, loadSpeciesListSuccess, loadSpeciesSuccess } from "./actions";

@Injectable()
export class AppSpeciesEffects{

    loadSpeciesList$ = createEffect(() =>
        this.action$.pipe(
        ofType(loadSpeciesList),
        mergeMap(action => this.starwarService.getSpeciesList().pipe(
            map((species: Species[]) => loadSpeciesListSuccess({ ListSpecies: species })),
        )),
    ),
);
    loadSpecies$ = createEffect(() =>
    this.action$.pipe(
        ofType(loadSpecies),
        mergeMap(action => {
            const speciesId = action.speciesId;
            return this.starwarService.getSpeciesIdByUrl(speciesId).pipe(
                map((species: Species) => loadSpeciesSuccess({ Species: species })),
            );
        }),
    ),
    );
    constructor(private action$: Actions, private starwarService: StarwarsService) {}
}