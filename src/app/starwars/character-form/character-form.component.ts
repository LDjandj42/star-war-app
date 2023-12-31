import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../characters';
import { StarwarsService } from '../starwars.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Species } from '../interface';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent  implements OnInit{
  @Input() character: Character;
  isAddForm: boolean;
  speciesList: Species[]
  characterForm = this.fb.group({
    name:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')
    ]],
    height: new FormControl<number>(150,[
      Validators.required,
      Validators.minLength(2),
      Validators.min(0),
      Validators.max(999),
    ]),
    mass: new FormControl<number>(70,[
      Validators.required,
      Validators.minLength(2),
      Validators.min(0),
      Validators.max(999),
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
    picture:['lien par defaud',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9àéèç :/.-]{1,9999}$')
    ]],
  });


  constructor(
    private starwarsService: StarwarsService,
    private router: Router,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add');
    this.starwarsService.getSpeciesList()
    .subscribe((speciesList)=> {
      console.log(speciesList)
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
      picture: this.isAddForm ? this.characterForm.value.picture : this.character.picture
    };

    console.log(this.characterForm.errors);
    
    if(this.characterForm.invalid){
      this.characterForm.markAllAsTouched();
      
      return;
    }
    if(this.isAddForm) {
      
      this.starwarsService.addcharacters(characterToEdit)
        .subscribe((character: Character) => this.router.navigate(['/starwars', character.id]));
        console.log(characterToEdit);
    } else {
      this.starwarsService.updatecharacter(characterToEdit)
        .subscribe(() => this.router.navigate(['/starwars', this.character.id]));
        console.log(characterToEdit);
    }
  }
  
    
}
