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

  updateUserProfile(user: any, userInfo: any): Observable<any> {
    const formattedUserInfo = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      phone: userInfo.phone,
      birthdate: userInfo.birthdate.split('T')[0]
    };

    const body = {
      user: {
        email: user.email,
        password: user.password || null,
      },
      userInfo: formattedUserInfo
    };

    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


}
