import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

interface UserProfile {
  id: number;
  email: string;
  role: string;
  establishment: string | null;
  userInfo: {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string | Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { responseType: 'text' }).pipe(
      tap((token) => this.saveToken(token))
    );
  }

  saveToken(token: string): void {
    this.storageService.setItem('token', token);
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeUser();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/users/profile`).pipe(
      tap((user) => this.saveUserProfile(user))
    );
  }

  private saveUserProfile(user: UserProfile): void {
    this.storageService.setUser({ id: user.id.toString(), role: user.role });
  }

  getUserId(): string | null {
    return this.storageService.getUserId();
  }

  getUserRole(): string | null {
    return this.storageService.getUserRole();
  }

  updateUserProfile(userInfo: UserProfile['userInfo']): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/${userInfo.id}`, { userInfo });
  }

}
