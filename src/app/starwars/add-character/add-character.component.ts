import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../characters';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})

export class AddCharacterComponent implements OnInit{
  
  character: Character;
  
  constructor (private route: ActivatedRoute, private router: Router){}
  
  ngOnInit() {
    this.character = new Character();


  }
  goToStarWarsList(){
    this.router.navigate(['/starwars']);
  }
}
