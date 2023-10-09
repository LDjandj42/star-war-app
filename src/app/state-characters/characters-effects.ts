import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { Character } from "../starwars/characters";
import { StarwarsService } from "../starwars/starwars.service";
import { loadCharacter, loadCharacterList, loadCharacterListSuccess, loadCharacterSuccess } from "./actions";

@Injectable()
export class AppCharactersEffects{

    loadCharactersList$ = createEffect(() =>
        this.action$.pipe(
        ofType(loadCharacterList),
        mergeMap(action => this.starwarService.getCharactersList().pipe(
            map((character: Character[]) => loadCharacterListSuccess({ ListCharacter: character })),
        )),
    ),
    );
    loadCharacter$ = createEffect(() =>
    this.action$.pipe(
        ofType(loadCharacter),
        mergeMap(action => {
            const characterId = action.characterId;
            return this.starwarService.getcharactersById(characterId).pipe(
                map((character: Character) => loadCharacterSuccess({ character: character })),
            );
        }),
    ),
    );
    constructor(private action$: Actions, private starwarService: StarwarsService) {}
}
