/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.auth.register(this.email, this.password, this.name).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error = e.error?.message || 'Registration failed';
        this.loading = false;
      },
    });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
