import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  template: `
    <div
      style="
      color: white;
      text-align: center;
      padding: 40px;
      background: #0a0a0f;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;"
    >
      Completing sign in...
    </div>
  `,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as Record<string, unknown>;
        this.auth.handleAuth({ access_token: token, user: payload });
        void this.router.navigate(['/dashboard']);
      } catch (e) {
        console.error('Token parse error:', e);
        void this.router.navigate(['/login']);
      }
    } else {
      void this.router.navigate(['/login']);
    }
  }
}
