import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private ApiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.ApiURL}/register`, userData).pipe(
      tap(response => console.log('Response from server:', response)),
      catchError(error => {
        console.error('Error during registration:', error);
        return throwError(error);
      })
    );
  }

  checkEmailExist(email: string): Observable<any> {
    return this.http.get(`${this.ApiURL}/userExist?email=${email}`).pipe(
      tap(response => console.log('Response from email check:', response)),
      catchError(error => {
        console.error('Error checking email existence:', error);
        return throwError(error);
      })
    );
  }
}



