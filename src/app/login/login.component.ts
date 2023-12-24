// login.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IToggleEvent } from '../components/button/api/toggle-event';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  isPending: boolean;
  isActive: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  ngOnInit(): void {
    // Check if user is already authenticated when the LoginComponent is initialized
    if (this.authService.isAuthenticatedUser()) {
      // Redirect to the feature component if already authenticated
      this.router.navigate(['/feature']);
    } else{
      this.router.navigate(['/login']);
    }
  }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Check for a redirect URL
      const redirectUrl = this.authService.getRedirectUrl();

      // Redirect to the original requested URL or default to '/feature'
      this.router.navigate([redirectUrl || '/feature']);

      // Clear the redirect URL after successful login
      this.authService.setRedirectUrl('');
    } else {
      alert('Invalid credentials');
    }
  }
  
  handleOnSelectTextAlign(type: string){
    this.isPending = true;
    console.log('type=', type);
  }

  handleOnActiveBorder(e: IToggleEvent){
    this.isActive = e.active;
    console.log('e=', e);
  }

}
