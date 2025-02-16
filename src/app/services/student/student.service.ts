import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Student {
  id: number;
  email: string;
  userInfo?: {
    firstname?: string;
    lastname?: string;
    phone?: string;
    birthdate?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStudents(sessionId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/session-users/${sessionId}`);
  }

  createStudents(sessionId: number, students: { email: string; password: string }[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/students/${sessionId}`, students);
  }

  updateStudent(studentId: number, studentData: { user: { email: string }, userInfo: { firstname: string, lastname: string, phone: string, birthdate: string } }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${studentId}`, studentData);
  }

  removeStudentFromSession(sessionId: number, studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/session-users/${sessionId}/students/${studentId}`);
  }
}
