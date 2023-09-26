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
import { HttpClientModule } from '@angular/common/http';
import { ListSpeciesComponent } from './list-species/list-species.component';
import { AgGridModule } from 'ag-grid-angular';
import { DetailSpeciesComponent } from './detail-species/detail-species.component';
import { CharacterThumbnailComponent } from './components/character-thumbnail/character-thumbnail.component';



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

    
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(charactersroutes)
   
  ],
  providers:[StarwarsService]
})
export class StarwarsModule { }