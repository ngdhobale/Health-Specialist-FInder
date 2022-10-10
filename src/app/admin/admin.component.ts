import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Hospital } from '../model/hospital';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hospitals: any = []

  isLoggedin: any = String;


  constructor(private apiService: ApiService, private formBuilder: FormBuilder,private router: Router) {
    this.isLoggedin = localStorage.getItem('isLoggedIn');

  }

  ngOnInit(): void {
    this.loadHospitals()
  }

  // Get hospital list
  loadHospitals() {
    return this.apiService.getAllHospital().subscribe((data: {}) => {
      this.hospitals = data;
      console.log(this.hospitals);
    })
  }


}
