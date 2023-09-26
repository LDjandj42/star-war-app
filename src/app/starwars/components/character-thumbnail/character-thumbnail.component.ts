import { ChangeDetectionStrategy, Component, Input, Output, ViewEncapsulation, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { StarwarsService } from '../../starwars.service';
import { Character } from '../../characters';
import { Species } from '../../interface';

@Component({
  selector: 'app-character-thumbnail',
  templateUrl: './character-thumbnail.component.html',
  styleUrls: ['./character-thumbnail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterThumbnailComponent implements OnInit{
  @Input() character : Character;
  @Output() characterIdSelected = new EventEmitter<number>();
  starwars: Character[];
  charactersselected: Character;

  constructor(private router: Router, private starwarsService: StarwarsService ){}


  ngOnInit(){
    
    
    
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
  
  onCharacterClick(characterId: number){
    this.characterIdSelected.emit(characterId)
  }
  randomColor(species: string[]){
    const speciesId= this.starwarsService.extractSpeciesIdsFromUrls(species);
    const speciesIdNumber = Number(speciesId); 

    return this.starwarsService.generateRandomColor(speciesIdNumber)
  }
}
