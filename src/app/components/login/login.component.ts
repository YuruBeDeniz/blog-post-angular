import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
  
      this.userService.login(user).subscribe({
        next: (response) => {
          console.log('Token:', response);
          this.authService.storeToken(response.token);
          this.authService.verifyStoredToken().subscribe();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
