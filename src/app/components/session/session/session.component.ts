import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session/session.service';
import { EstablishmentService } from '../../../services/establishments/establishments.service';
import { StorageService } from '../../../services/storage/storage.service';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component';

interface Session {
  id: number;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  establishmentId: number;
}

interface Establishment {
  id: number;
  name: string;
}

@Component({
  selector: 'app-session',
  standalone: true,
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class SessionComponent implements OnInit {
  sessions: Session[] = [];
  establishments: Establishment[] = [];
  selectedEstablishmentId: number | null = null;
  isSuperAdmin: boolean = false;

  newSession: Omit<Session, 'id'> = {
    name: '',
    description: '',
    type: '',
    startDate: '',
    endDate: '',
    establishmentId: 0
  };

  selectedSession: Session | null = null;
  isEditing = false;
  isCreating = false;

  constructor(
    private sessionService: SessionService,
    private establishmentService: EstablishmentService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.isSuperAdmin = this.storageService.getUserRole() === 'SUPERADMIN';
    this.loadEstablishments();
    this.loadSessions();
  }

  loadEstablishments(): void {
    this.establishmentService.getAllEstablishments().subscribe(data => {
      this.establishments = data;
    });
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe(data => {
      this.sessions = data;
    });
    console.log("Liste des sessions :", this.sessions);
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addSession(): void {
    if (this.isSuperAdmin && this.selectedEstablishmentId) {
      // SuperAdmin, il choisit un établissement
      this.newSession.establishmentId = this.selectedEstablishmentId;
    } else {
      // Admin, sélectionne automatiquement son établissement
      const user = this.storageService.getUser();
      if (user && user.establishment) {
        this.newSession.establishmentId = Number(user.establishment);
      } else {
        console.error("Impossible de récupérer l'établissement de l'admin.");
        return;
      }
    }

    this.sessionService.createSession(this.newSession, this.newSession.establishmentId).subscribe(() => {
      this.loadSessions();
      this.isCreating = false;
      this.newSession = { name: '', description: '', type: '', startDate: '', endDate: '', establishmentId: 0 };
    });
  }


  editSession(session: Session): void {
    this.selectedSession = { ...session };
    this.isEditing = true;
  }

  updateSession(): void {
    if (this.selectedSession) {
      this.sessionService.updateSession(this.selectedSession.id, this.selectedSession).subscribe(() => {
        this.loadSessions();
        this.isEditing = false;
        this.selectedSession = null;
      });
    }
  }

  deleteSession(sessionId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette session ?')) {
      this.sessionService.deleteSession(sessionId).subscribe(() => {
        this.loadSessions();
      });
    }
  }

}
