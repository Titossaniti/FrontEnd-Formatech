import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';
import { SessionService } from '../../services/session/session.service';
import { ModuleService } from '../../services/module/module.service';
import { StorageService } from '../../services/storage/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

interface Comment {
  id?: number;
  student: {
    userInfo?: {
      firstname?: string;
      lastname?: string;
    } | null;
    id: number };
  grade: number;
  comment: string;
}

interface Session {
  id: number;
  name: string;
}

interface Module {
  id: number;
  name: string;
}

interface Student {
  id: number;
  email: string;
  userInfo?: {
    firstname?: string;
    lastname?: string;
  };
}

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class CommentComponent implements OnInit {
  sessions: Session[] = [];
  modules: Module[] = [];
  students: Student[] = [];
  comments: Comment[] = [];

  selectedSessionId: number | null = null;
  selectedModuleId: number | null = null;

  constructor(
    private commentService: CommentService,
    private sessionService: SessionService,
    private moduleService: ModuleService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe(data => {
      this.sessions = data;
    });
  }

  loadModules(): void {
    if (this.selectedSessionId) {
      this.moduleService.getModulesBySession(this.selectedSessionId).subscribe(
        data => {
          this.modules = data;
          this.selectedModuleId = null;
        }
      );
    }
  }

  loadComments(): void {
    if (this.selectedModuleId && this.selectedSessionId) {
      this.commentService.getComments(this.selectedModuleId, this.selectedSessionId).subscribe(
        data => {
          this.comments = data;
        }
      );
    } else {
      this.comments = [];
    }
  }

  saveComments(): void {
    if (this.selectedModuleId && this.selectedSessionId) {
      const hasExistingComments = this.comments.some(c => c.id);

      if (hasExistingComments) {
        this.commentService.updateComments(this.selectedModuleId, this.selectedSessionId, this.comments).subscribe(() => {
          alert('Notes et commentaires mis à jour !');
        });
      } else {
        this.commentService.createComments(this.selectedModuleId, this.selectedSessionId, this.comments).subscribe(() => {
          alert('Notes et commentaires enregistrés !');
        });
      }
    }
  }
}
