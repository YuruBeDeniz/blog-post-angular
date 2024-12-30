import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import type { User } from "../models/user.model";
import { Token } from "../models/token.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = 'http://localhost:8000/users';

    constructor(private http: HttpClient) {}

    signup(user: User): Observable<User> {
        return new Observable<User>((observer) => {
            this.http.post<User>(`${this.apiUrl}/signup/`, user).subscribe({
              next: (response) => {
                console.log(response)
                return observer.next(response)
            },
              error: (error) => observer.error(error),
              complete: () => observer.complete()
            });
        });
      }

    login(user: User): Observable<Token> {
      return this.http.post<Token>(`${this.apiUrl}/login/`, user);
    }
    logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/logout/`, {}); 
    }
}
