import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';

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
  private jwtHelper = new JwtHelperService();

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
    console.log('JWT Token:', this.storageService.getItem('token'));
    return this.storageService.getItem('token');
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeUser();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(token?: string): boolean {
    const authToken = token || this.getToken();
    if (!authToken) return true;

    try {
      return this.jwtHelper.isTokenExpired(authToken);
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
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
