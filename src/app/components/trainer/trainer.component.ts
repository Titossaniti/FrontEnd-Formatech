import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer/trainer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

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

@Component({
  selector: 'app-trainers',
  standalone: true,
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class TrainerComponent implements OnInit {
  trainers: Trainer[] = [];
  newTrainer: TrainerCreate = {
    email: '',
    password: '',
    userInfo: { firstname: '', lastname: '', phone: '', birthdate: '' }
  };

  selectedTrainer: Trainer | null = null;
  editableTrainer: TrainerUpdate | null = null;
  isCreating = false;
  isEditing = false;

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.trainerService.getTrainers().subscribe((data: Trainer[]) => {
      this.trainers = data;
    });
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addTrainer(): void {
    this.trainerService.createTrainer(this.newTrainer).subscribe(() => {
      this.loadTrainers();
      this.isCreating = false;
      this.newTrainer = { email: '', password: '', userInfo: { firstname: '', lastname: '', phone: '', birthdate: '' } };
    });
  }

  openEditModal(trainer: Trainer): void {
    this.selectedTrainer = trainer;
    this.editableTrainer = {
      user: { email: trainer.email },
      userInfo: { ...trainer.userInfo }
    };
    this.isEditing = true;
  }

  updateTrainer(): void {
    if (this.selectedTrainer && this.editableTrainer) {
      this.trainerService.updateTrainer(this.selectedTrainer.id, this.editableTrainer).subscribe(() => {
        this.loadTrainers();
        this.isEditing = false;
        this.selectedTrainer = null;
        this.editableTrainer = null;
      });
    }
  }

  deleteTrainer(trainerId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce formateur ?')) {
      this.trainerService.deleteTrainer(trainerId).subscribe(() => {
        this.loadTrainers();
      });
    }
  }
}
