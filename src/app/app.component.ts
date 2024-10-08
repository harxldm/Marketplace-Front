import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/login' ||
    this.router.url === '/register' ||
    this.router.url === '/dashboard' ||
    this.router.url === '/seller' ||
    this.router.url === '/admin' ||
    this.router.url === '/buy';
  }
}
