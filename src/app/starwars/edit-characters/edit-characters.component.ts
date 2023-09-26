import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from './../characters';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-edit-characters',
  templateUrl: './edit-characters.component.html',
  styleUrls: ['./edit-characters.component.scss']
})


export class EditcharacterComponent implements OnInit {



  character: Character|undefined;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private router: Router
  ) { }

  ngOnInit() {
    const characterId: string|null = this.route.snapshot.paramMap.get('id');
    if(characterId) {
      this.starwarsService.getcharactersById(+characterId)
        .subscribe(Character => this.character = Character);
    } else {
      this.character= undefined;
    }
  }
  goToStarWarsList(){
    this.router.navigate(['/starwars']);
  }
}
