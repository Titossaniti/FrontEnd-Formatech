import { Component, OnInit } from '@angular/core';
import { CreateAdminService} from '../../services/createAdmin/create-admin.service';
import { EstablishmentService } from '../../services/establishments/establishments.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Admin {
  id: number;
  email: string;
  establishment: {
    id: number;
    name: string;
  } | null;
}

interface Establishment {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-admin',
  standalone: true,
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule
  ]
})
export class CreateAdminComponent implements OnInit {
  admins: Admin[] = [];
  establishments: Establishment[] = [];
  newAdminEmail: string = '';
  newAdminPassword: string = '';
  selectedEstablishmentId: number | null = null;
  isModalOpen: boolean = false;

  constructor(private adminService: CreateAdminService, private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadEstablishments();
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins().subscribe(data => {
      this.admins = data;
    });
  }

  loadEstablishments(): void {
    this.establishmentService.getAllEstablishments().subscribe(data => {
      this.establishments = data;
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    this.newAdminEmail = '';
    this.newAdminPassword = '';
    this.selectedEstablishmentId = null;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addAdmin(): void {
    if (this.newAdminEmail && this.newAdminPassword && this.selectedEstablishmentId) {
      this.adminService.addAdmin(this.newAdminEmail, this.newAdminPassword, this.selectedEstablishmentId).subscribe(() => {
        this.loadAdmins();
        this.closeModal();
      });
    }
  }

  deleteAdmin(adminId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet administrateur ?')) {
      this.adminService.deleteAdmin(adminId).subscribe(() => {
        this.loadAdmins();
      });
    }
  }
}
