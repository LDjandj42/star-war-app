import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { deleteCharacter, loadCharacter } from 'src/app/state-characters/actions';
import { getcharcter } from 'src/app/state-characters/characters-selectors';
import { Character } from './../characters';

@Component({
  selector: 'app-edit-characters',
  templateUrl: './edit-characters.component.html',
  styleUrls: ['./edit-characters.component.scss']
})


export class EditcharacterComponent implements OnInit, OnDestroy {



  character: Character|undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.store.dispatch(deleteCharacter());
  }

  ngOnInit() {
    this.store.dispatch(deleteCharacter());
    this.route.params.pipe(
      filter((params) => params?.['id'] != null)
    ).subscribe((params)=>this.store.dispatch(loadCharacter({ characterId: parseInt(params['id'])})))
    
    this.store.select(getcharcter)
    .pipe(
      filter(character => !! character ),
      take(1))
    .subscribe(character  => {
      this.character  = character ;
    });
}

  goToStarWarsList(){
    this.router.navigate(['/starwars']);
  }
}
