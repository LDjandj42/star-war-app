import { StarwarsService } from './../starwars.service';
import { Character } from '../characters';
import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-detail-personage',
  templateUrl: './detail-personage.component.html',
  styleUrls: ['./detail-personage.component.scss']
 
})
export class DetailPersonageComponent implements OnInit {
  
  characterslist: Character[];
  characters: Character;
  
  constructor (private route: ActivatedRoute, private router: Router, private charactersService: StarwarsService){}

  ngOnInit() {

    const charactersid: string|null= this.route.snapshot.paramMap.get('id');
    
    if(charactersid){
      this.charactersService.getcharactersById(+charactersid)
      .subscribe(characters => (this.characters =characters));
    }
  }
    goToStarWarsList(){
      this.router.navigate(['/starwars']);
    }
    deletecharacter(character: Character){
      this.charactersService.deleteCharacterById(character.id)
      .subscribe(()=> this.goToStarWarsList());
    }
    goToEditcharacter(character: Character) {
      this.router.navigate(['/edit/starwars', character.id]);
    }
}