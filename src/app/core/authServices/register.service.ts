import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterUser } from '../models/register-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }
  
  register(payload: IRegisterUser, clientIpAddress: any)
  {
    const url: string = "https://localhost:7016/api/registeruser/register";
    const headers = new HttpHeaders();
    const body: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      userName: payload.userName,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
      userIpAddress: clientIpAddress
    }
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(url, body, { headers: headers });
  }
}

