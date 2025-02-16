import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Course {
  sessionId: number;
  moduleId: number;
  trainerId: number;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/session-with-modules`);
  }

  addCourse(sessionId: number, moduleId: number, trainerId: number, courseData: Course): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/session-with-modules/${sessionId}/modules/${moduleId}/trainers/${trainerId}`,
      courseData
    );
  }

  deleteCourse(sessionModuleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/session-with-modules/${sessionModuleId}`
    );
  }
}
