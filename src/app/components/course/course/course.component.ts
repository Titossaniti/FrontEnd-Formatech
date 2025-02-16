import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session/session.service';
import { ModuleService } from '../../../services/module/module.service';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { CourseService } from '../../../services/course/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

interface Course {
  sessionModuleId: number;
  sessionId: number;
  moduleId: number;
  trainerId: number;
  startDate: string;
  endDate: string;
}

interface Session {
  id: number;
  name: string;
}

interface Module {
  id: number;
  name: string;
}

interface Trainer {
  id: number;
  email: string;
  userInfo: {
    firstname: string;
    lastname: string;
  };
}

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent, DatePipe]
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  sessions: Session[] = [];
  modules: Module[] = [];
  trainers: Trainer[] = [];

  selectedSessionId: number | null = null;
  selectedModuleId: number | null = null;
  selectedTrainerId: number | null = null;

  newCourse: Omit<Course, 'sessionModuleId'> = {
    sessionId: 0,
    moduleId: 0,
    trainerId: 0,
    startDate: '',
    endDate: ''
  };

  isCreating = false;

  constructor(
    private sessionService: SessionService,
    private moduleService: ModuleService,
    private trainerService: TrainerService,
    private courseService: CourseService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadSessions();
    this.loadModules();
    this.loadTrainers();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe(data => {
      this.sessions = data;
    });
  }

  loadModules(): void {
    this.moduleService.getModules().subscribe(data => {
      this.modules = data;
    });
  }

  loadTrainers(): void {
    this.trainerService.getTrainers().subscribe(data => {
      this.trainers = data;
    });
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addCourse(): void {
    if (this.selectedSessionId && this.selectedModuleId && this.selectedTrainerId) {
      this.newCourse.sessionId = this.selectedSessionId;
      this.newCourse.moduleId = this.selectedModuleId;
      this.newCourse.trainerId = this.selectedTrainerId;

      this.courseService.addCourse(this.selectedSessionId, this.selectedModuleId, this.selectedTrainerId, this.newCourse)
        .subscribe(() => {
          this.loadCourses();
          this.isCreating = false;
          this.newCourse = { sessionId: 0, moduleId: 0, trainerId: 0, startDate: '', endDate: '' };
        });
    }
  }

  deleteCourse(course: Course): void {
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.courseService.deleteCourse(course.sessionModuleId).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  formatDate(date: string | null): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy')! : 'N/A';
  }
}
