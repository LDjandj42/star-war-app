export interface ResponseCharacterList {
	count: number
	next: string
	previous: any
	results: Character[]
  }
  
export class Character {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
	speciesName?: string;
	id?: number;

  
	constructor(
		name: string ='Enter un nom',
		height: string= '',
		mass: string = '',
		hair_color: string = 'couleur par defaut',
		skin_color: string = 'couleur par defaut',
		eye_color: string = 'couleur par defaut',
		birth_year: string = 'année de naissance par defaut',
		homeworld: string = 'planet par defaut',
		created: string= 'date de création par defaut',
){
	this.name= name;
	this.height= height;
	this.mass= mass;
	this.hair_color= hair_color;
	this.skin_color=skin_color;
	this.eye_color= eye_color;
	this.birth_year= birth_year;
	this.homeworld= homeworld;
	this.created= created;

}
	

}	
