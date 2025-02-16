import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { SessionService } from '../../services/session/session.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

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

interface StudentForm {
  user: { email: string };
  userInfo: { firstname: string; lastname: string; phone: string; birthdate: string };
}

interface Session {
  id: number;
  name: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class StudentComponent implements OnInit {
  sessions: Session[] = [];
  selectedSessionId: number | null = null;
  students: Student[] = [];

  newStudents: { email: string; password: string }[] = [{ email: '', password: '' }];
  selectedStudent: Student | null = null;
  editableStudent: any = null;

  isCreating = false;
  isEditing = false;

  constructor(private studentService: StudentService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe(data => {
      this.sessions = data;
    });
  }

  loadStudents(): void {
    if (this.selectedSessionId) {
      this.studentService.getStudents(this.selectedSessionId).subscribe(data => {
        this.students = data;
      });
    }
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addStudentRow(): void {
    this.newStudents.push({ email: '', password: '' });
  }

  removeStudentRow(index: number): void {
    this.newStudents.splice(index, 1);
  }

  createStudents(): void {
    if (this.selectedSessionId) {
      this.studentService.createStudents(this.selectedSessionId, this.newStudents).subscribe(() => {
        this.loadStudents();
        this.isCreating = false;
        this.newStudents = [{ email: '', password: '' }];
      });
    }
  }

  openEditModal(student: Student): void {
    this.selectedStudent = student;
    this.editableStudent = {
      user: { email: student.email },
      userInfo: {
        firstname: student.userInfo?.firstname || '',
        lastname: student.userInfo?.lastname || '',
        phone: student.userInfo?.phone || '',
        birthdate: student.userInfo?.birthdate ? student.userInfo.birthdate.split('T')[0] : ''
      }
    };
    this.isEditing = true;
  }

  updateStudent(): void {
    if (this.selectedStudent && this.editableStudent) {
      this.studentService.updateStudent(this.selectedStudent.id, this.editableStudent).subscribe(() => {
        this.loadStudents();
        this.isEditing = false;
        this.selectedStudent = null;
        this.editableStudent = null;
      });
    }
  }

  removeStudent(studentId: number): void {
    if (this.selectedSessionId && confirm('Voulez-vous vraiment retirer cet élève de la session ?')) {
      this.studentService.removeStudentFromSession(this.selectedSessionId, studentId).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
