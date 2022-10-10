import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchby:boolean;
  hospitals: any = []
  bycity:any=[]
  speciality:any=String;
  public id: any = String;
  request: any = [];
  city:any=String;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { 

  }

  loadHospitals() {
    this.request = { 'id': this.id };
    return this.apiService.getHospitalDetails(this.request).subscribe((data: {}) => {
      this.hospitals = data;
      console.log(this.hospitals);
    })
  }

  loadHospitalsByCity() {
    this.request = { 'city': this.city };
    return this.apiService.getHospitalByCity(this.request).subscribe((data: {}) => {
      this.bycity = data;
      
    })
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.city = params.get('city');
      console.log(this.id);
    });
    if(this.id){
      this.searchby=false;
      this.loadHospitals();
    }
    if(this.city){
      this.searchby=true;
      this.loadHospitalsByCity();
    }
    
  }

}
