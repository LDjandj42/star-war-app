export class Character {
	name: string;
	height: number;
	mass: number;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films:Array<string>;
	species: Array<string>; 
	vehicles: Array<string>;
	starships: Array<string>;
	created: string;
	edited: string;
	url: string;
	id?: number;
	picture: string;

	constructor(
		name: string ='Enter un nom',
		height: number = 2,
		mass: number = 100,
		hair_color: string = 'couleur par defaut',
		skin_color: string = 'couleur par defaut',
		eye_color: string = 'couleur par defaut',
		birth_year: string = 'année de naissance par defaut',
		homeworld: string = 'planet par defaut',
		created: string= 'date de création par defaut',
		picture: string = 'lien de limage',
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
	this.picture= picture;
}
	

	
}