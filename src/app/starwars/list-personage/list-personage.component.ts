import { Character } from './../characters';
import { Router } from '@angular/router';
import { Component,  Input,  OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';
import { of, map, withLatestFrom } from 'rxjs';
import { Root, Species } from '../interface';

@Component({
  selector: 'app-list-personage',
  templateUrl: './list-personage.component.html',
  styleUrls: ['./list-personage.component.scss']

})

export class ListPersonageComponent implements OnInit {
  @Input() carracters : Character;
  starwars: Character[];
  charactersselected: Character|undefined;
  
  constructor(private router: Router, private starwarsService: StarwarsService ){}

  ngOnInit(){
    this.starwarsService.getSpeciesList().subscribe((speciesL) => {
      console.log(speciesL)
    })
    // this.starwarsService.getStarwarsList().pipe(
    //   withLatestFrom(this.starwarsService.getSpeciesList().pipe(
    //     map((root: Root) => (root.results))
    //   )),
    //   map((([characterList, speciesList]: [Character[],Species[]]):Character[] => {
    //     const characterListToReturn:Character[]= characterList.map((character: Character) => {
    //       const speciesUrl:string = character.species[0];
    //       const matchingSpecies:Species = speciesList.find((species: Species) => species.url === speciesUrl);
    //       return { ...character, speciesName: matchingSpecies?.name };
    //     });
    //     console.log(speciesList);
    //     console.log(characterListToReturn);
    //     return characterListToReturn;
    //   }))
    //   )
    //   .subscribe((charactersList : any) => {this.starwars = charactersList});
    

    this.starwarsService.getSpeciesList()
    .subscribe((speciesList)=> {
      console.log(speciesList)
    })
  }



  selctecharacters(charactersid: string){
    
  const characters: Character|undefined = this.starwars.find(characters => characters.id == +charactersid)
  if(characters){
    console.log(`vous avez demandé le presonage ${characters.name}`);
    this.charactersselected = characters;
  }
  else{

    console.log(`vous avez demandé un personnage qui n'existe pas.`)
    this.charactersselected = characters;}
  }


  goTocharacters(characters: Character){
    this.router.navigate(['/starwars', characters.id])
  }

  goToAddStarWarsCharacters(){
    this.router.navigate(['starwars-add-charracter']);
  }
}