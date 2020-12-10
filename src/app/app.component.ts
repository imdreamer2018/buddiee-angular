import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './User';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buddiee-website';
  currentUser: User;


  constructor(private router: Router,
              private authService: AuthService) {
    this.authService.currentUser
      .subscribe(x => this.currentUser = x);
  }

  gotoLink(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
