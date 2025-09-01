import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService, MatCheckboxModule, FormsModule, MatButtonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'normativas-app';
  isLogged: boolean;
  opened: boolean = false;
  constructor(private auth: AuthService) {
    this.isLogged = auth.isLoggedIn()
  }
}
