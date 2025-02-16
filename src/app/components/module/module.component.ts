import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module/module.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

interface Module {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-modules',
  standalone: true,
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class ModuleComponent implements OnInit {
  modules: Module[] = [];
  newModule: Omit<Module, 'id'> = { name: '', description: '' };
  selectedModule: Module | null = null;
  editableModule: Partial<Module> | null = null;
  isCreating = false;
  isEditing = false;

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.moduleService.getModules().subscribe((data: Module[]) => {
      this.modules = data;
    });
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addModule(): void {
    this.moduleService.createModule(this.newModule).subscribe(() => {
      this.loadModules();
      this.isCreating = false;
      this.newModule = { name: '', description: '' };
    });
  }

  openEditModal(module: Module): void {
    this.selectedModule = module;
    this.editableModule = { ...module };
    this.isEditing = true;
  }

  updateModule(): void {
    if (this.selectedModule && this.editableModule) {
      this.moduleService.updateModule(this.selectedModule.id, this.editableModule).subscribe(() => {
        this.loadModules();
        this.isEditing = false;
        this.selectedModule = null;
        this.editableModule = null;
      });
    }
  }

  deleteModule(moduleId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce module ?')) {
      this.moduleService.deleteModule(moduleId).subscribe(() => {
        this.loadModules();
      });
    }
  }
}
