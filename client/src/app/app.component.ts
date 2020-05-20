import {Component} from '@angular/core';
import {AuthService} from "./core/services/auth/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.initializeAuthState();
  }
}
