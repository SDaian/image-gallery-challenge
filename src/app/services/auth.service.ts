import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { servicesApi } from './api';
import { Auth } from './../models/auth';

// Just for testing purposes.
// NEVER DO THIS IN PROD env.

const API_KEY = '23567b218376f79d9415';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  refreshToken(): Observable<string> {
    return this.http.post<Auth>(servicesApi.auth, { "apiKey": API_KEY }).pipe(map(
      (response: Auth) => {
        return response.token;
      }
    ));
  }
}
