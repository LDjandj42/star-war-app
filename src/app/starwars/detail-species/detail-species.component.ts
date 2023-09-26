import { StarwarsService } from './../starwars.service';
import { Species } from '../interface';
import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-species',
  templateUrl: './detail-species.component.html',
  styleUrls: ['./detail-species.component.scss']
})
export class DetailSpeciesComponent implements OnInit{
  
  constructor (private route: ActivatedRoute, private router: Router, private speciesService: StarwarsService){}
  
  speciesList: Species[];
  species: Species;
  

  ngOnInit() {

    const speciesid: string|null= this.route.snapshot.paramMap.get('id');
    
    if(speciesid){
      this.speciesService.getSpeciesIdByUrl(+speciesid)
      .subscribe(species => (this.species = species));
    }
  }

  goToStarWarsList(){
    this.router.navigate(['/starwars']);
  }
  goTospeciesList(){
    this.router.navigate(['/starwars-species-list']);
  }
}
