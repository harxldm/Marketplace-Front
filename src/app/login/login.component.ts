import { LoginService } from './../service/s-login/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.loginService.login(email, password).subscribe(
        response => {

          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']); // Redirigir a un solo tablero

          // Aquí podrías guardar el rol en el servicio de autenticación o en localStorage
          // para usarlo más adelante en las restricciones de funciones.
        },
        error => {
          console.error('Error logging in:', error);
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.';

        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}





