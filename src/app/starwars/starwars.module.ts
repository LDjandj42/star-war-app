import { DetailPersonageComponent } from './detail-personage/detail-personage.component';
import { ListPersonageComponent } from './list-personage/list-personage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StarwarsService } from './starwars.service';
import { SearchcharactersComponent } from './search-characters/search-characters.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CharacterFormComponent } from './character-form/character-form.component';
import { AddCharacterComponent } from './add-character/add-character.component';
import { MaterialModule } from '../material.module';
import { EditcharacterComponent } from './edit-characters/edit-characters.component';


const charactersroutes: Routes = [
  {path: 'edit/starwars/:id', component: EditcharacterComponent},
  {path: 'starwars', component: ListPersonageComponent},
  {path: 'starwars-add-charracter', component: AddCharacterComponent},
  {path: 'starwars/:id', component: DetailPersonageComponent},

];

@NgModule({
  declarations: [
    ListPersonageComponent,
    DetailPersonageComponent,
    SearchcharactersComponent,
    CharacterFormComponent,
    AddCharacterComponent,
    EditcharacterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(charactersroutes)
   
  ],
  providers:[StarwarsService]
})
export class StarwarsModule { }