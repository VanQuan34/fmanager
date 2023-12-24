// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private redirectUrl: string | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Implement your authentication logic here
    // For simplicity, let's assume a hardcoded check
    if (username === 'admin' && password === 'admin123') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/feature']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';;
  }
}