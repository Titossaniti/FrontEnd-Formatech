import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Trainer {
  id: number;
  email: string;
  userInfo: {
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string;
  };
}

interface TrainerCreate {
  email: string;
  password: string;
  userInfo: {
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string;
  };
}

interface TrainerUpdate {
  user: {
    email: string;
  };
  userInfo: {
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}?role=TRAINER`);
  }

  createTrainer(trainer: TrainerCreate): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/trainer`, trainer);
  }

  updateTrainer(trainerId: number, trainer: TrainerUpdate): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${trainerId}`, trainer);
  }

  deleteTrainer(trainerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${trainerId}`);
  }
}
