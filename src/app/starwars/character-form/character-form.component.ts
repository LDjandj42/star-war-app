import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateCharacter } from 'src/app/state-characters/actions';
import { Character } from '../characters';
import { Species } from '../interface';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent  implements OnInit{
  @Input() character: Character;
  isAddForm: boolean;
  touched: boolean = false;
  speciesList: Species[];
  external = "";
  characterForm = this.fb.group({
    name:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9àéèç-]{1,25}$')
    ]],
    height: new FormControl<string>('',[
      Validators.required,
      Validators.pattern('^[0-9]{1,3}$')
    ]),
    mass: new FormControl<string>('',[
      Validators.required,
      Validators.pattern('^[0-9]{1,3}$')
    ]),
    hairColor:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    skinColor:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    eyeColor:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    birthYear:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9àéèç]{1,10}$')
    ]],
    homeworld:['https://swapi.dev/api/planets/xxx/',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç1-9 :/.-]{1,9999}$')
    ]],
    speciesName:[''],
  });
  


  constructor(
    private starwarsService: StarwarsService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
  ){}

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add');
    this.starwarsService.getSpeciesList()
    .subscribe((speciesList)=> {
      this.speciesList = speciesList;
    })

    
  }

  onSubmit() {
    const characterToEdit:Character ={
      ...this.character,
      name: this.characterForm.value.name,
      height: this.characterForm.value.height,
      mass: this.characterForm.value.mass,
      hair_color: this.characterForm.value.hairColor,
      skin_color: this.characterForm.value.skinColor,
      eye_color: this.characterForm.value.eyeColor,
      birth_year: this.characterForm.value.birthYear,
      homeworld: this.characterForm.value.homeworld,
      speciesName: this.characterForm.value.speciesName,
    };


    
    if(this.characterForm.invalid){
      this.characterForm.markAllAsTouched();
      this.touched = true;
      return;
    }
    if(this.isAddForm) {
      
      this.starwarsService.addcharacters(characterToEdit)
        .subscribe((character: Character) => this.router.navigate(['/starwars', character.id]));
    } else {
      this.store.dispatch(updateCharacter({ updatedCharacter: characterToEdit }));
      this.router.navigateByUrl(`/starwars/${this.character.id}`);
    }
  }
  
    
}
