import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface Comment {
  id?: number;
  student: { id: number };
  grade: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getComments(moduleId: number, sessionId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/module/${moduleId}/session/${sessionId}`);
  }

  createComments(moduleId: number, sessionId: number, comments: Comment[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/module/${moduleId}/session/${sessionId}`, comments);
  }

  updateComments(moduleId: number, sessionId: number, comments: Comment[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/comments/module/${moduleId}/session/${sessionId}`, comments);
  }
}
