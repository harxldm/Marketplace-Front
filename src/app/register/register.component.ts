import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir después del registro
import { RegisterService } from '../service/s-register/register.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm!: NgForm;


  model = {email: '', password: '', rol: ''};

  constructor(private registerService: RegisterService , private router: Router) { }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerService.register(this.model).subscribe(
        response => {
          console.log('User registered:', response);
          alert('Registration successful!');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

}
