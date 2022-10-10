import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: String;
  registerForm: FormGroup;
  formSubmit = false;
  request: any = [];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }
  get f() {
    console.log(this.registerForm.controls);
     return this.registerForm.controls; }


  onFormSubmit() {
    this.formSubmit = true;
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      this.request = {
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
      this.apiService.register(this.request).subscribe((data: {}) => {
        if (data) {
          this.message = "Registration Successful Please Login";
        }
      });
    }
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', Validators.required],
      city: ['', Validators.required],
      hospital: ['', Validators.required],
      speciality: ['', Validators.required],
      doctor: ['', Validators.required]
    });
  }

}
