import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/users/profile`);
  }

  updateUserProfile(userInfo: UserProfile['userInfo']): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/${userInfo.id}`, { userInfo });
  }
}
