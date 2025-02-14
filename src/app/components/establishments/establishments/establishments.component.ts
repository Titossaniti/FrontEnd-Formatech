import { Component, OnInit } from '@angular/core';
import { EstablishmentService} from '../../../services/establishments/establishments.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component';

interface Establishment {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-establishments',
  standalone: true,
  templateUrl: './establishments.component.html',
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
  ],
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {
  establishments: Establishment[] = [];
  selectedEstablishment: Establishment | null = null;
  newEstablishment: Omit<Establishment, 'id'> = { name: '', address: '', city: '', postalCode: '', phone: '', email: '' };
  isEditing: boolean = false;
  isCreating: boolean = false;

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.loadEstablishments();
  }

  loadEstablishments(): void {
    this.establishmentService.getAllEstablishments().subscribe(data => {
      this.establishments = data;
    });
  }

  openCreateModal(): void {
    this.isCreating = true;
  }

  addEstablishment(): void {
    this.establishmentService.addEstablishment(this.newEstablishment).subscribe(() => {
      this.loadEstablishments();
      this.newEstablishment = { name: '', address: '', city: '', postalCode: '', phone: '', email: '' };
      this.isCreating = false;
    });
  }

  editEstablishment(establishment: Establishment): void {
    if (establishment) {
      this.selectedEstablishment = { ...establishment };
      this.isEditing = true;
    }
  }

  updateEstablishment(): void {
    if (this.selectedEstablishment) {
      this.establishmentService.updateEstablishment(this.selectedEstablishment.id, this.selectedEstablishment).subscribe(() => {
        this.loadEstablishments();
        this.selectedEstablishment = null;
        this.isEditing = false;
      });
    }
  }

  deleteEstablishment(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cet établissement ?")) {
      this.establishmentService.deleteEstablishment(id).subscribe(() => {
        this.loadEstablishments();
      });
    }
  }

  formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    phone = phone.replace(/^(\+33\s?|0033\s?)/, '0');
    phone = phone.replace(/\s+/g, '');
    return phone;
  }

}
