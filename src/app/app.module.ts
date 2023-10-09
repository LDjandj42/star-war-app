import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StarwarsModule } from './starwars/starwars.module';
import { charactersReducer } from './state-characters/character-reducer';
import { AppCharactersEffects } from './state-characters/characters-effects';
import { AppSpeciesEffects } from './state-species/species-effects';
import { speciesReducer } from './state-species/species-reducer';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    ReactiveFormsModule,
    StarwarsModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ species: speciesReducer, characters: charactersReducer}, {
      runtimeChecks: {
        strictActionTypeUniqueness: true,
        strictActionImmutability: true,
    }}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AppSpeciesEffects , AppCharactersEffects]),
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
