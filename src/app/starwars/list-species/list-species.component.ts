import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, RowClassParams, RowClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Species } from '../interface';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-list-species',
  templateUrl: './list-species.component.html',
  styleUrls: ['./list-species.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListSpeciesComponent implements OnInit{
  
  rowData$: Observable<any[]>;

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
  store: any;


  constructor(private route: ActivatedRoute, private http:HttpClient, private starwarsService: StarwarsService, private router: Router,){};

  ngOnInit(){
    this.rowData$ = this.starwarsService.getSpeciesList()
    // this.store.dispatch(speciesList({ ListSpecies: this.rowData$ }));
     
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

  onRowClicked(event: RowClickedEvent<Species>){
    this.router.navigateByUrl(`/starwars-species-list/${event.data.id}`);
  } 
}