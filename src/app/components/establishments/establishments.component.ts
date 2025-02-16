import { Component, OnInit } from '@angular/core';
import { EstablishmentService} from '../../services/establishments/establishments.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

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
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  currentEstablishment: Establishment = { id: 0, name: '', address: '', city: '', postalCode: '', phone: '', email: '' };

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.loadEstablishments();
  }

  loadEstablishments(): void {
    this.establishmentService.getAllEstablishments().subscribe(data => {
      this.establishments = data;
    });
  }

  openModal(isEdit: boolean, establishment?: Establishment): void {
    this.isEditing = isEdit;
    this.isModalOpen = true;

    if (isEdit && establishment) {
      this.currentEstablishment = { ...establishment };
    } else {
      this.currentEstablishment = { id: 0, name: '', address: '', city: '', postalCode: '', phone: '', email: '' };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentEstablishment = { id: 0, name: '', address: '', city: '', postalCode: '', phone: '', email: '' };
  }


  submitForm(): void {
    if (this.isEditing) {
      // Mode édition
      this.establishmentService.updateEstablishment(this.currentEstablishment.id, this.currentEstablishment)
        .subscribe(() => {
          this.loadEstablishments();
          this.closeModal();
        });
    } else {
      // Mode création
      this.establishmentService.addEstablishment(this.currentEstablishment)
        .subscribe(() => {
          this.loadEstablishments();
          this.closeModal();
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
