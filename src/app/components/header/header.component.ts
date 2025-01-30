import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  providers: [ AuthService ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(protected authService: AuthService, private router: Router) { }

  exit(): void {
    this.authService.removeToken();

  }

}
