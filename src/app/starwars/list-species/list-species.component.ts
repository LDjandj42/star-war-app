import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { GridOptions, ColDef, RowClickedEvent,  RowClassRules, RowClassParams,} from 'ag-grid-community';
import { Observable} from 'rxjs';
import { StarwarsService } from '../starwars.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Species } from '../interface';

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


  constructor(private route: ActivatedRoute, private http:HttpClient, private starwarsService: StarwarsService, private router: Router,){};

  ngOnInit(){
    this.rowData$ = this.starwarsService.getSpeciesList()
    console.log(this.rowData$)  
    
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