import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { StorageService } from './storage.service';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>; // Moved initialization to constructor
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {
    const hasToken = this.hasToken();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(hasToken);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    const token = this.storageService.getItem('authToken');
    return !!token;
  }

  storeToken(token: string): void {
    this.storageService.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  verifyStoredToken(): Observable<boolean> {
    const token = this.storageService.getItem('authToken');
    if (!token) {
      return of(false);
    }
    this.isLoadingSubject.next(true);
    return this.http.get<User>(`${this.apiUrl}/verify/`).pipe(
      tap(user => {
        this.userSubject.next(user);
        this.isLoggedInSubject.next(true);
      }),
      map(() => true), // Emit true on successful verification
      catchError(() => {
        this.logoutUser();
        return of(false);
      }),
      tap(() => this.isLoadingSubject.next(false))
    );
  }

  logoutUser(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.storageService.removeItem('authToken');
        this.isLoggedInSubject.next(false);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Error during logout:', error);
      }
    });
  }

  redirectToLogin(): void {
    if (!this.hasToken()) {
      this.router.navigate(['/login']);
    }
  }


  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    console.log(user?.group_names);
    return user?.group_names?.includes('Admin') ?? false; 
  }

  canEditPosts(post: BlogPost): boolean {
    const user = this.userSubject.getValue();
    return this.isAdmin() || post.author.id === user?.id;
  }
}



/* 
map(() => true) -> Converts the response (User object) 
from the backend into a simple boolean (true) indicating success.
The calling component doesn’t need the entire User object 
but just needs to know if the verification succeeded.
*/


/* 
tap: Performs side effects (e.g., logging, state updates) on observable streams.
*/