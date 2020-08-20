import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calories-intake';
  constructor(public authService: AuthService) {}

}
