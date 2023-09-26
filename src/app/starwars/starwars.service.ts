import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character, ResponseCharacterList, } from './characters';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of, map, filter } from 'rxjs';
import { ResponseSpeciesList, Species } from './interface';


@Injectable()

export class StarwarsService {

  constructor(private http: HttpClient){}
  
  getSpeciesList(): Observable<Species[]>{
    return this.http.get<ResponseSpeciesList>('https://swapi.dev/api/species/').pipe(
      filter((responseSpeciesList: ResponseSpeciesList)=> (responseSpeciesList!=null)),
      map((responseSpeciesList: ResponseSpeciesList) => {
        return responseSpeciesList.results;
      }),
      catchError((error) =>this.handleError(error, [])));
  };
  
  getStarwarsList (): Observable<Character[]> {
    return this.http.get<ResponseCharacterList>('https://swapi.dev/api/people').pipe(
      map((responseCharacterList: ResponseCharacterList) => (responseCharacterList.results)),
      map((characters: Character[])=>{
        return characters.map((character: Character)=> {
          const url:string =character.url;
          const match = url.match(/\/(\d+)\/$/);
          return  { ...character, id: match[1]};
        })
      }),
      catchError((error) =>this.handleError(error, []))
        
    );
  }
  getcharactersById(charactersId: number): Observable <Character|undefined>{
    return this.http.get<Character>(`https://swapi.dev/api/people/${charactersId}`).pipe(
    map((character: Character)=>{
      const url:string =character.url;
      const match = url.match(/\/(\d+)\/$/);
      return  { ...character, id: match[1] };
    }
    ),
    catchError((error) =>this.handleError(error, undefined))
    );
    
  }

  updatecharacter(character: Character): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('', character, httpOptions);
  }


  addcharacters(characters: Character): Observable<Character>{
    const httpOptions= {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    }
    return this.http.post<Character>('api/starwars', characters, httpOptions).pipe(
      catchError((error) =>this.handleError(error, undefined))
    );
  }

  deleteCharacterById(characterid: number): Observable<any>{
    return this.http.delete(`api/characters/${characterid}`).pipe(
      catchError((error) =>this.handleError(error, undefined))
    );
  }


  searchcharacterslist(term: string): Observable<Character[]>{
    return this.http.get<Character[]>(`api/characters/?name=${term}`).pipe(
      catchError((error) =>this.handleError(error, []))
    );
  }
  

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

}
