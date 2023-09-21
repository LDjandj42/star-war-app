import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from './characters';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of } from 'rxjs';
import { Root, Species } from './interface';


@Injectable()

export class StarwarsService {

  constructor(private http: HttpClient){}
  
  getSpeciesList(): Observable<Root>{
    return this.http.get<Root>('https://swapi.dev/api/species/').pipe(
      tap((Response)=> this.log(Response)),
      catchError((error) =>this.handleError(error, [])));
  };
  
  getStarwarsList (): Observable <Character[]> {
    return this.http.get<Character[]>('api/characters').pipe(
      tap((Response)=> this.log(Response)),
      catchError((error) =>this.handleError(error, []))
        
    );
  }
  getcharactersId(charactersId: number): Observable <Character|undefined>{
    return this.http.get<Character>(`api/characters/${charactersId}`).pipe(
    tap((Response)=> this.log(Response)),
    catchError((error) =>this.handleError(error, undefined))

    );
  }

  updatecharacter(character: Character): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('', character, httpOptions).pipe(
      catchError((error) => this.handleError(error, null)),
      tap((response) => this.log(response))
    );
  }


  addcharacters(characters: Character): Observable<Character>{
    const httpOptions= {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    }
    return this.http.post<Character>('api/starwars', characters, httpOptions).pipe(
      catchError((error) =>this.handleError(error, undefined)),
      tap((Response) => this.log(Response))
    );
  }

  deleteCharacterById(characterid: number): Observable<null>{
    return this.http.delete(`api/characters/${characterid}`).pipe(
      catchError((error) =>this.handleError(error, undefined)),
      tap((res) => console.log(res))
    );
  }


  searchcharacterslist(term: string): Observable<Character[]>{
    return this.http.get<Character[]>(`api/characters/?name=${term}`).pipe(
      tap((Response)=> this.log(Response)),
      catchError((error) =>this.handleError(error, []))
    );
  }
  
  private log(response: any){
    console.table(response);
  }

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

}
