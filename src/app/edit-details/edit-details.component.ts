import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  
  message: String;
  registerForm: FormGroup;
  formSubmit = false;
  request: any = [];
  userDetails: any = [];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router: Router) {
    this.userDetails = localStorage.getItem('currentUser');
    this.userDetails = JSON.parse(this.userDetails);
    console.log(this.userDetails.name);
  }
  get f() {
    console.log(this.registerForm.controls);
    return this.registerForm.controls;
  }
  async onLogout(){
    await window.localStorage.clear();
    this.router.navigate(['/']);
  }
  onFormSubmit() {
    this.formSubmit = true;
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      this.request = {
        'id':this.userDetails._id,
        'username': this.registerForm.controls['name'].value,
        'email': this.registerForm.controls['email'].value,
        'password': this.registerForm.controls['password'].value,
        'name': this.registerForm.controls['hospital'].value,
        'address': this.registerForm.controls['location'].value,
        'city': this.registerForm.controls['city'].value,
        'speciality': this.registerForm.controls['speciality'].value,
        'doctor': this.registerForm.controls['doctor'].value,
        'image': 'f1.jpg'
      };
      console.log(this.request);
      this.apiService.update(this.request).subscribe((data: {}) => {
        if (data) {
          this.message = "Updated Successfully Please Login";
        }
      });
    }
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [this.userDetails.username, Validators.required],
      email: [this.userDetails.email, Validators.required],
      password: [this.userDetails.password, Validators.required],
      location: [this.userDetails.addess, Validators.required],
      city: [this.userDetails.city, Validators.required],
      hospital: [this.userDetails.name, Validators.required],
      speciality: [this.userDetails.speciality, Validators.required],
      doctor: [this.userDetails.doctor, Validators.required]
    });
  }

}
