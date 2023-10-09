import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { deleteSpecies, loadSpecies } from 'src/app/state-species/actions';
import { getSpecies } from 'src/app/state-species/species-selectors';
import { Species } from '../interface';

@Component({
  selector: 'app-detail-species',
  templateUrl: './detail-species.component.html',
  styleUrls: ['./detail-species.component.scss']
})
export class DetailSpeciesComponent implements OnInit, OnDestroy{
  
  constructor (private route: ActivatedRoute, private router: Router, private store: Store){}
  ngOnDestroy(): void {
    this.store.dispatch(deleteSpecies());
  }
  
  species: Species;
  

  ngOnInit() {
    this.route.params.pipe(
      filter((params) => params?.['id'] != null)
    ).subscribe((params)=>this.store.dispatch(loadSpecies({ speciesId: parseInt(params['id'])})))

    this.store.select(getSpecies)
      .pipe(
        filter(species => !! species),
        take(1))
      .subscribe(species => {
        this.species = species;
      });
  }

  goToStarWarsList(){
    this.router.navigate(['/starwars']);
  }
  goTospeciesList(){
    this.router.navigate(['/starwars-species-list']);
  }
}
