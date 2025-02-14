import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user/user.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

interface UserProfile {
  id: number;
  email: string;
  role: string;
  establishment: string | null;
  userInfo: {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    birthdate: string | Date;
  };
}

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  imports: [
    FormsModule,
    NavbarComponent,
    CommonModule,
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user!: UserProfile;
  editableUserInfo!: UserProfile['userInfo'];
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(user => {
      this.user = user;
      this.editableUserInfo = { ...user.userInfo };
    });
  }

  editMode(): void {
    this.isEditing = true;
    this.editableUserInfo = { ...this.user.userInfo };
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveChanges(): void {
        this.userService.updateUserProfile(this.user, this.editableUserInfo).subscribe({
      next: (updatedUser) => {
        this.user.userInfo = updatedUser.userInfo;
        this.isEditing = false;
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
      }
    });
  }

}
