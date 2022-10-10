import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hospital } from './model/hospital';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Define API
  apiURL = 'http://localhost:4000/api'
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loginData = { 'email': String, 'password': String };

  // HttpClient API get() method 
  getAllHospital(): Observable<Hospital> {
    return this.httpClient.get<Hospital>(this.apiURL + '/getAllHospital')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getAllCity(): Observable<Hospital> {
    return this.httpClient.get<Hospital>(this.apiURL + '/getCity')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method 
  getHospitalDetails(hospital: any): Observable<Hospital> {
    console.log(hospital);
    return this.httpClient.post<Hospital>(this.apiURL + '/viewHospital', JSON.stringify(hospital), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API post() method 
  login(hospital: any): Observable<Hospital> {
    return this.httpClient.post<Hospital>(this.apiURL + '/login', JSON.stringify(hospital), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method 
  getHospitalByCity(hospital: any): Observable<Hospital> {
    return this.httpClient.post<Hospital>(this.apiURL + '/getbycity', JSON.stringify(hospital), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // HttpClient API post() method 
  register(hospital: any): Observable<Hospital> {
    return this.httpClient.post<Hospital>(this.apiURL + '/addHospital', JSON.stringify(hospital), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  update(hospital: any): Observable<Hospital> {
    return this.httpClient.post<Hospital>(this.apiURL + '/update', JSON.stringify(hospital), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
