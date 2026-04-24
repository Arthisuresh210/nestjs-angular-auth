/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  name: string;
  picture: string;
  google_id: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  activities = [
    { title: 'Logged in successfully', time: '2 mins ago', tag: 'Auth', color: '#6366f1' },
    { title: 'Profile loaded from DB', time: '2 mins ago', tag: 'DB', color: '#10b981' },
    { title: 'JWT token issued', time: '2 mins ago', tag: 'Token', color: '#f59e0b' },
    { title: 'Dashboard accessed', time: 'Just now', tag: 'Nav', color: '#8b5cf6' },
    { title: 'Session started', time: 'Just now', tag: 'Session', color: '#3b82f6' },
  ];

  actions = [
    { icon: '✏️', label: 'Edit Profile' },
    { icon: '🔒', label: 'Security' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '📊', label: 'Analytics' },
    { icon: '💬', label: 'Messages' },
    { icon: '⚙️', label: 'Settings' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      void this.router.navigate(['/login']);
      return;
    }

    this.http
      .get<User>('http://localhost:3000/users/me', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .subscribe({
        next: (u) => {
          this.user = u;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error:', err);
          const stored = localStorage.getItem('user');
          if (stored) {
            this.user = JSON.parse(stored);
            // eslint-disable-next-line prettier/prettier
          this.cdr.detectChanges();
          }
        },
      });
  }

  getInitial(): string {
    if (!this.user) return '?';
    return (this.user.name?.[0] || this.user.email?.[0] || '?').toUpperCase();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    void this.router.navigate(['/login']);
  }
}
