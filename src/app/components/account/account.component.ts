import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {DatePipe} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserInfo} from 'node:os';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [
    DatePipe,
    NavbarComponent
  ],
  standalone: true
})
export class AccountComponent implements OnInit {
  userInfo: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe((profile: any) => {
      this.userInfo = {
        ...profile.userInfo,
        email: profile.email
      };
    });
  }
}
