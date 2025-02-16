import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface Admin {
  id: number;
  email: string;
  establishment: {
    id: number;
    name: string;
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class CreateAdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/users?role=ADMIN`);
  }

  addAdmin(email: string, password: string, establishmentId: number): Observable<Admin> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<Admin>(`${this.apiUrl}/users/admin?establishmentId=${establishmentId}`, body);
  }

  deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${adminId}`);
  }
}
