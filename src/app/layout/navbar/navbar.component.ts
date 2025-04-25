import { Component, inject } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [MatButtonModule, MatMenuModule],
  standalone: true
})
export class NavbarComponent {

  authService = inject(AuthService);
  router = inject(Router);

  isLogin = this.authService.isLoggedIn;
  user = this.authService.userData;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
