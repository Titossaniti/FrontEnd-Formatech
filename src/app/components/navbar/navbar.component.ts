import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: () => this.user = null
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
