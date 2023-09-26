import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character, ResponseCharacterList, } from './characters';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of, map, forkJoin, filter } from 'rxjs';
import { ResponseSpeciesList, Species } from './interface';


@Injectable()

export class StarwarsService {

  constructor(private http: HttpClient){}
  
  getSpeciesList(): Observable<Species[]>{
    return this.http.get<ResponseSpeciesList>('https://swapi.dev/api/species/').pipe(
      filter((responseSpeciesList: ResponseSpeciesList)=> (responseSpeciesList!=null)),
      map((responseSpeciesList: ResponseSpeciesList) => {
        return responseSpeciesList.results.map((species: Species)=>{
            const url:string =species.url;
            const match = url.match(/\/(\d+)\/$/);
            return  { ...species, id: match[1]};
      });
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
    getSpeciesIdByUrl(speciesId: number): Observable <Species|undefined>{
      return this.http.get<Species>(`https://swapi.dev/api/species/${speciesId}`).pipe(
        map((species: Species)=>{
          const url:string = species.url;
          const match = url.match(/\/(\d+)\/$/);
          return  { ...species, id: match[1] };
        }
      ),
      catchError((error) =>this.handleError(error, undefined))
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


  generateRandomColor(speciesId: number): string {
    const localStorageKey = `elementColor_${speciesId}`;
    const storedColor = localStorage.getItem(localStorageKey);
  
    if (storedColor) {
      return storedColor;
    }
  
    const randomColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    localStorage.setItem(localStorageKey, randomColor);
  
    return randomColor;
  }

  extractSpeciesIdsFromUrls(speciesUrls: string[]): number[]{
    if (speciesUrls.length === 0) {
      return [1]; // Retourner un tableau avec 1 de façon synchrone.
    }
  
   return speciesUrls.map(url =>{
      const match = url.match(/\/(\d+)\/$/);
        console.log(match[1])
        return match ? parseInt(match[1], 10) : -1;
    })
  }
}
