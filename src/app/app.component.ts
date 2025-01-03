import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-post-angular-frontend';
  constructor(private authService: AuthService) {}

ngOnInit(): void {
  this.authService.verifyStoredToken().subscribe((isValid) => {
    if (isValid) {
      console.log('Token verified, user loaded');
    } else {
      console.warn('Token verification failed');
    }
  });
}
}

//This ensures the user$ observable emits the user data before any component subscribes to it.