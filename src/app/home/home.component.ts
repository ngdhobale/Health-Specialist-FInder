import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Hospital } from '../model/hospital';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hospitals: any = []
  city: any = []
  isLoggedin: any = String;
  searchForm: FormGroup;
  searchString:String;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,private router: Router) {
    this.isLoggedin = localStorage.getItem('isLoggedIn');

  }

  get f() { return this.searchForm.controls; }

  ngOnInit() {
    this.loadHospitals()
    this.loadCity()
    this.searchForm = this.formBuilder.group({
      name: [''],
      city: [''],
    });
  }
  search() {
    this.router.navigate(['/search',this.searchForm.controls['name'].value,this.searchForm.controls['city'].value]);
  }
  // Get hospital list
  loadHospitals() {
    return this.apiService.getAllHospital().subscribe((data: {}) => {
      this.hospitals = data;
      console.log(this.hospitals);
    })
  }
  //Get city
  loadCity() {
    return this.apiService.getAllCity().subscribe((data: {}) => {
      this.city = data;
      console.log(this.hospitals);
    })
  }


}
