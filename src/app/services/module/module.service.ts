import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Module {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = `${environment.apiUrl}/modules`;

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl);
  }

  createModule(moduleData: Omit<Module, 'id'>): Observable<Module> {
    return this.http.post<Module>(this.apiUrl, moduleData);
  }

  updateModule(moduleId: number, moduleData: Partial<Module>): Observable<Module> {
    return this.http.put<Module>(`${this.apiUrl}/${moduleId}`, moduleData);
  }

  deleteModule(moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${moduleId}`);
  }
}
