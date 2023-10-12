import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { deleteCharacter, loadCharacter, updateCharacterList } from 'src/app/state-characters/actions';
import { getcharcter } from 'src/app/state-characters/characters-selectors';
import { Character } from '../characters';


@Component({
  selector: 'app-detail-personage',
  templateUrl: './detail-personage.component.html',
  styleUrls: ['./detail-personage.component.scss']
 
})
export class DetailPersonageComponent implements OnInit,OnDestroy {
  

  characters: Character;
  
  constructor (private route: ActivatedRoute, private router: Router, private store: Store){}
  ngOnDestroy(): void {
    this.store.dispatch(deleteCharacter());
  }


  ngOnInit() {
    this.route.params.pipe(
      filter((params) => params?.['id'] != null),
    ).subscribe((params) => {
      console.log(params['id'])
      this.store.dispatch(loadCharacter({
        characterId: parseInt(params['id'])
      }))
    })
    this.store.select(getcharcter)
      .pipe(
        filter(characters => !!characters),
        take(1))
      .subscribe(characters => {
        this.characters = characters;
        console.log(this.characters);
        
      });
    
  }
    goToStarWarsList(){
      this.router.navigate(['/starwars']);
    }
    deletecharacter(character: Character) {
      this.store.dispatch(updateCharacterList({ character }));
      this.router.navigate(['/starwars']);
    }
    goToEditcharacter(character: Character) {
      this.router.navigate(['/edit/starwars', character.id]);
    }
}