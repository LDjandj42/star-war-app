import { Character } from './../characters';
import { Router } from '@angular/router';
import { Component,  Input,  OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';


@Component({
  selector: 'app-list-personage',
  templateUrl: './list-personage.component.html',
  styleUrls: ['./list-personage.component.scss']

})

export class ListPersonageComponent implements OnInit {
  @Input() carracters : Character;
  starwars: Character[];
  charactersselected: Character|undefined;
  
  constructor(private router: Router, private charactersservice: StarwarsService ){}

  ngOnInit(){
    this.charactersservice.getStarwarsList()
    .subscribe(characterslist => this.starwars = characterslist);
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