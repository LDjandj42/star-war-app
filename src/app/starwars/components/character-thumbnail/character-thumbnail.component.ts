import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { loadCharacter } from 'src/app/state-characters/actions';
import { getcharcter } from 'src/app/state-characters/characters-selectors';
import { Character } from '../../characters';
import { StarwarsService } from '../../starwars.service';


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
  charactersList$: Observable<Character[]>
  charactersselected: Character;

  constructor(private router: Router, private starwarsService: StarwarsService, private route: ActivatedRoute, private store: Store ){}


  ngOnInit() {
    this.route.params.pipe(
      filter((params) => params?.['id'] != null)
    ).subscribe((params)=>this.store.dispatch(loadCharacter({ characterId: parseInt(params['id'])})))

    this.store.select(getcharcter)
      .pipe(
        filter(character => !! character),
        take(1))
      .subscribe(character => {
        this.character = character;
      });
  }


  randomColor(species: string[]){
    const speciesId= this.starwarsService.extractSpeciesIdsFromUrls(species);
    const speciesIdNumber = Number(speciesId); 

    return this.starwarsService.generateRandomColor(speciesIdNumber)
  }

  onCharacterSelected(characterId: number) {
    this.router.navigateByUrl(`/starwars/${characterId}`);
  }
}
