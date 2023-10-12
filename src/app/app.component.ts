
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCharacterList } from './state-characters/actions';
import { loadSpeciesList } from './state-species/actions';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
  })


export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
    
  }

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadSpeciesList());
    this.store.dispatch(loadCharacterList());
    
  }
  }
  

