import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseUrl: string = "https://localhost:7016";
  constructor(private httpClient: HttpClient) { }

  sendConfirmEmail(id: string, token: string): Observable<any> {
    const url: string = `${this.baseUrl}/api/security/confirmemail`;
    const body = {
      id: id,
      token: token
    }
    return this.httpClient.post<any>( url, body);
  }
}
