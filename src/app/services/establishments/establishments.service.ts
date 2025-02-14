import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Establishment {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  private apiUrl = `${environment.apiUrl}/establishments`;

  constructor(private http: HttpClient) {}

  getAllEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(this.apiUrl);
  }

  addEstablishment(establishment: Omit<Establishment, 'id'>): Observable<Establishment> {
    return this.http.post<Establishment>(this.apiUrl, establishment);
  }

  updateEstablishment(id: number, establishment: Omit<Establishment, 'id'>): Observable<Establishment> {
    return this.http.put<Establishment>(`${this.apiUrl}/${id}`, establishment);
  }

  deleteEstablishment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
