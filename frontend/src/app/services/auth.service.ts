/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<any>(this.loadUser());
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private loadUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/register`, { email, password, name })
      .pipe(tap((res: any) => this.handleAuth(res)));
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap((res: any) => this.handleAuth(res)));
  }

  handleAuth(res: any) {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.userSubject.next(res.user);
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/users/me`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  loginWithGoogle() {
    window.location.href = `${this.apiUrl}/auth/google`;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    void this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
