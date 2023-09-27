
import { Router } from '@angular/router';
import { Component,  Input,  OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';
import { of, map, withLatestFrom } from 'rxjs';
import { ResponseSpeciesList, Species } from '../interface';
import { Character, ResponseCharacterList } from '../characters';

@Component({
  selector: 'app-list-personage',
  templateUrl: './list-personage.component.html',
  styleUrls: ['./list-personage.component.scss']

})

export class ListPersonageComponent implements OnInit {
  @Input() carracters : Character;
  starwars: Character[];
  charactersselected: Character;
  
  constructor(private router: Router, private starwarsService: StarwarsService ){}

  ngOnInit(){
    this.starwarsService.getStarwarsList().pipe(
      withLatestFrom(this.starwarsService.getSpeciesList()),
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
      )
      .subscribe((charactersList : any) => {this.starwars = charactersList;});
    
    

    this.starwarsService.getSpeciesList()
    .subscribe((speciesList)=> {
    })
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