
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, withLatestFrom } from 'rxjs';
import { loadCharacterList } from 'src/app/state-characters/actions';
import { getCharctersList } from 'src/app/state-characters/characters-selectors';
import { loadSpeciesList } from 'src/app/state-species/actions';
import { getSpeciesList } from 'src/app/state-species/species-selectors';
import { Character } from '../characters';
import { Species } from '../interface';

@Component({
  selector: 'app-list-personage',
  templateUrl: './list-personage.component.html',
  styleUrls: ['./list-personage.component.scss']

})

export class ListPersonageComponent implements OnInit {
  @Input() carracters : Character;
  starwars: Character[];
  charactersselected: Character;
  charactersList$: Observable<Character[]>
  speciesList$: Observable<Species[]>
  constructor(private router: Router, private store: Store ){}

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


  goToAddStarWarsCharacters(){
    this.router.navigate(['starwars-add-charracter'])
  }

  goToSpeciesList(){
    this.router.navigate(['starwars-species-list']);
}
  onCharacterSelected(characterId: number) {
    this.router.navigateByUrl(`/starwars/${characterId}`);
  }

}


