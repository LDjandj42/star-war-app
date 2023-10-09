
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, withLatestFrom } from 'rxjs';
import { Character } from './starwars/characters';
import { Species } from './starwars/interface';
import { loadCharacterList } from './state-characters/actions';
import { getCharctersList } from './state-characters/characters-selectors';
import { loadSpeciesList } from './state-species/actions';
import { getSpeciesList } from './state-species/species-selectors';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
  })


export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
    
  }


  

  charactersList$: Observable<Character[]>
  speciesList$: Observable<Species[]>
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadSpeciesList());
    this.store.dispatch(loadCharacterList());
    this.charactersList$ = this.store.select(getCharctersList).pipe(
      withLatestFrom(this.store.select(getSpeciesList)),
      map((([characterList, speciesList]: [Character[],Species[]]):Character[] => {
        const characterListToReturn:Character[]= characterList.map((character: Character) => {
          const speciesUrl:string = character.species[0];
          const matchingSpecies:Species = speciesList.find((species: Species) => species.url === speciesUrl);
          if (character.species.length === 0) { //this logic is because characterList can be empty
            return { ...character, speciesName: 'Human' };
          };
          return { ...character, speciesName: matchingSpecies?.name };
          
        });
        return characterListToReturn;
      }))
      );

    
  }
  }
  

