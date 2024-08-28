import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode }  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<{ Token: string }>(this.apiUrl, loginData)
      .pipe(
        tap(response => {
          debugger
          localStorage.setItem('authToken', response.Token); // Guardar el token en localStorage

        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error); // Propagar el error
        })
      );
  }

  // Método para decodificar el token y obtener el rol del usuario
  getUserRole(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            console.log('Token Decodificado:', decodedToken); // Agrega este log para ver qué hay dentro del token
            return decodedToken.rol;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }
    return null;
}



  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
