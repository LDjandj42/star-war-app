import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StarwarsModule } from './starwars/starwars.module';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{dataEncapsulation: false}),
    StarwarsModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
