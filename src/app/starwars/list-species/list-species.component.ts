import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColDef, RowClassParams, RowClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { loadSpeciesList } from 'src/app/state-species/actions';
import { getSpeciesList } from 'src/app/state-species/species-selectors';
import { Species } from '../interface';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-list-species',
  templateUrl: './list-species.component.html',
  styleUrls: ['./list-species.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListSpeciesComponent implements OnInit{
  


  columnDefs: ColDef[] =[
    {headerName:"Name", field: 'name',  width: 200},
    {headerName:"Classification", field: 'classification',  width: 200},
    {headerName:"Designation", field: 'designation', width: 200 },
    {headerName:"Language", field:'language', width: 200},
    {headerName:"Id", field:'id', width: 200},
  ];
  defaultColDef: ColDef={
    sortable: true, filter:true
    
  }; 
  speciesList$: Observable<Species[]>


  constructor(private route: ActivatedRoute, private http:HttpClient, private starwarsService: StarwarsService, private router: Router, private store: Store){};

  ngOnInit(){
    this.store.dispatch(loadSpeciesList());
    this.speciesList$ = this.store.select(getSpeciesList)
     
  }
  getRowStyle = (params: RowClassParams<Species>) => {
    if (params?.data?.id == null ){
      return null;
    }
    const random: string = this.starwarsService.generateRandomColor(params.data.id);
    return {background: random};

  };

  goToStarWarsList(){
      this.router.navigate(['/starwars']);
  }

  onRowClicked(event: RowClickedEvent<Species>) {
    this.router.navigateByUrl(`/starwars-species-list/${event.data.id}`);
  } 
}