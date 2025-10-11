import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blog Application';

  constructor(public tokenStorage: TokenStorageService) {}

  isLoggedIn(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}