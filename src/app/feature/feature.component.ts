import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(){

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
