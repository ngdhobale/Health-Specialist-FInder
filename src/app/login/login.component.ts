import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidFormSubmitted = false;
  formSubmit = false;
  returnUrl: string;
  email: String;
  password: String;
  response: any = [];
  message: String = '';





  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private apiService: ApiService) {

  }

  get f() { return this.loginForm.controls; }

  onFormSubmit() {
    this.formSubmit = true;
    if (this.loginForm.valid) {

      this.apiService.login({ 'email': this.loginForm.controls['email'].value, 'password': this.loginForm.controls['password'].value }).subscribe((data: {}) => {
        this.response = data;
        if (this.response.status) {
          this.message = this.response.msg;
          localStorage.setItem('currentUser', JSON.stringify(this.response.data));
          localStorage.setItem('isLoggedIn',"true");
          this.router.navigate(['/edit'])
        }else{
          this.message = this.response.msg;

        }
      });
    }

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

}
