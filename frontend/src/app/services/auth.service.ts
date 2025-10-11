import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "/";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/login/login`, {username, password});
  }
}