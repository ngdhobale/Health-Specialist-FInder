import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Hospital } from '../model/hospital';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  hospitals: any = []
  public id: any = String;
  request: any = [];
  constructor(private apiService: ApiService, private route: ActivatedRoute) {


  }
  loadHospitals() {
    this.request = { 'id': this.id };
    return this.apiService.getHospitalDetails(this.request).subscribe((data: {}) => {
      this.hospitals = data;
      console.log(this.hospitals);
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.loadHospitals();
  }

}
