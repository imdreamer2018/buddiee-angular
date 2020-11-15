import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buddiee-website';


  constructor(private router: Router) {
  }

  gotoLink(url: string): void {
    this.router.navigate([url]);
  }
}
