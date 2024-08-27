import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si quieres redirigir a otras rutas

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.css']
})
export class AuthButtonsComponent {

  constructor(private router: Router) { }

  onRegister() {
    console.log("Register button clicked");
    this.router.navigate(['/register']);
  }


  onLogin() {
    console.log("Login button clicked");
    this.router.navigate(['/login']);
  }
}

