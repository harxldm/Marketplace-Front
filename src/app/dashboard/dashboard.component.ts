import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/s-login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor( private loginService: LoginService, private router: Router) { }

  logout(): void {
    this.loginService.logout()
    console.log('Token después de eliminar:', localStorage.getItem('authToken'));
    this.router.navigate(['/login']);
  }

  Admin() {
    this.router.navigate(['/admin']);
  }

  Sell() {
     const userRole = this.loginService.getUserRole();

     if (userRole === 'vendedor') {
         this.router.navigate(['/seller']);
    } else {
         alert('No tienes permiso para acceder a esta sección.');
     }


    const token = localStorage.getItem('authToken');
    console.log('Token Almacenado:', token);


    // this.router.navigate(['/seller']);
  }

  Buy() {
    this.router.navigate(['/Buy']);
  }


}
