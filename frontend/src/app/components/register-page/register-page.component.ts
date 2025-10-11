import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {
      username,
      password,
      firstName,
      lastName
    } = this.form

    console.log(this.form);

    this.http.post(`${API_CONFIG.baseUrl}/login/register`, this.form, {
      responseType: 'text'
    }).subscribe({
      next: (data) => {
        console.log('Registration successful:', data);
        alert('Registration successful! Please login.');
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
    })
  }
}