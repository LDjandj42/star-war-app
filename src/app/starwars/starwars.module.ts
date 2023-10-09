import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '../material.module';
import { AddCharacterComponent } from './add-character/add-character.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterThumbnailComponent } from './components/character-thumbnail/character-thumbnail.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { DetailPersonageComponent } from './detail-personage/detail-personage.component';
import { DetailSpeciesComponent } from './detail-species/detail-species.component';
import { EditcharacterComponent } from './edit-characters/edit-characters.component';
import { ListPersonageComponent } from './list-personage/list-personage.component';
import { ListSpeciesComponent } from './list-species/list-species.component';
import { SearchcharactersComponent } from './search-characters/search-characters.component';
import { StarwarsService } from './starwars.service';


const charactersroutes: Routes = [
  {path: 'edit/starwars/:id', component: EditcharacterComponent},
  {path: 'starwars', component: ListPersonageComponent},
  {path: 'starwars-species-list', component: ListSpeciesComponent},
  {path: 'starwars-species-list/:id', component: DetailSpeciesComponent},
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
    ListSpeciesComponent,
    DetailSpeciesComponent,
    CharacterThumbnailComponent,
    CustomInputComponent,

    
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(charactersroutes),
   
   
  ],
  providers:[StarwarsService]
})
export class StarwarsModule { }