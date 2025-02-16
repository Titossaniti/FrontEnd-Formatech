import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Session {
  id: number;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  establishmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`;

  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}`);
  }

  createSession(session: Omit<Session, 'id'>, establishmentId: number): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}/establishment/${establishmentId}`, session);
  }

  updateSession(sessionId: number, session: Partial<Session>): Observable<Session> {
    return this.http.put<Session>(`${this.apiUrl}/${sessionId}`, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sessionId}`);
  }
}
