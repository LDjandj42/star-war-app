import { Character } from '../characters';
import { Observable,Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-search-characters',
  templateUrl: './search-characters.component.html',
  styleUrls: ['./search-characters.component.scss']

})
export class SearchcharactersComponent implements OnInit {
  searchTerms= new Subject<string>();
  characters$: Observable<Character[]>;



  constructor(private router: Router, private starwarsService: StarwarsService){}

  ngOnInit(): void {
   
  }

  search(term: string){
    console.log(term)
  }
  


  

  goTodetail(characters: Character){
    const link =['/starwars', characters.id];
    this.router.navigate(link);
  }
}