import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    console.log("email", this.email)
    console.log("contraseña", this.password)

    if (this.email === 'admin@admin.com' && this.password === 'admin') {
      // Aquí normalmente guardarias el token de usuario o alguna info en local storage
      // pero como es un ejemplo, simplemente redirigimos
      this.router.navigate(['/dashboard']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}
