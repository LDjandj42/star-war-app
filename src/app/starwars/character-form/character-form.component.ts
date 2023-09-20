import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../characters';
import { StarwarsService } from '../starwars.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent  implements OnInit{
  @Input() character: Character;
  isAddForm: boolean;
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
    hair_color:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    skin_color:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    eye_color:['',[
      Validators.required,
      Validators.pattern('^[a-zA-Zàéèç]{1,30}$')
    ]],
    birth_year:['',[
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
    
    
  }

  onSubmit() {
    const characterToEdit:Character ={
      ...this.character,
      name: this.characterForm.value.name,
      height: this.characterForm.value.height,
      mass: this.characterForm.value.mass,
      hair_color: this.characterForm.value.hair_color,
      skin_color: this.characterForm.value.skin_color,
      eye_color: this.characterForm.value.eye_color,
      birth_year: this.characterForm.value.birth_year,
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
