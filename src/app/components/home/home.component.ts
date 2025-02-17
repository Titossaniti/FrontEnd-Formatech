import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink,
  ],
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isTrainer: boolean = false;
  isStudent: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const userRole = this.storageService.getUserRole();

    this.isSuperAdmin = userRole === 'SUPERADMIN';
    this.isAdmin = userRole === 'ADMIN';
    this.isTrainer = userRole === 'TRAINER';
    this.isStudent = userRole === 'STUDENT';
  }
}
