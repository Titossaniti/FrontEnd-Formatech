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
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.userRole = this.storageService.getUserRole();
  }

  isSuperAdmin(): boolean {
    return this.userRole === 'SUPERADMIN';
  }
}
