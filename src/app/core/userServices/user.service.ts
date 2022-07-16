import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPersonalDetails } from '../models/personal-details.interface';
import { IPasswordCreds } from '../models/password-creds.interface';
import { getHttpOptions } from '../utils/authorization.headers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getUserById(id: string): Observable<any>{
    const url: string = `https://localhost:7016/api/appuser/users/${id}`;
    return this.httpClient.get<any>(url, getHttpOptions())
  }

  
  updatedUserPersonalDetails(id: string, payload: IPersonalDetails){
    const url: string = "https://localhost:7016/api/appuser/personal-details";
    const body: any = {
       id: id,
       firstName: payload.firstName,
       lastName: payload.lastName,
       email: payload.email,
       userName: payload.userName
    }
    return this.httpClient.post<any>(url, body, getHttpOptions());
  }

  updatedUserLoginCredentials(id: string, payload: IPasswordCreds){
    const url: string = "https://localhost:7016/api/appuser/update-creds";
    const body: any = {
       id: id,
       passwordHash: payload.passwordHash,
       password: payload.password,
       confirmPassword: payload.confirmPassword
    }
    return this.httpClient.post<any>(url, body, getHttpOptions());
  }
  
  
  sendConfirmEmail(id: string, token: string): Observable<any> {
    const url: string = "https://localhost:7016/api/security/confirmemail";
    const body: any = {
      token: token,
      id: id
    }
    return this.httpClient.post<any>(url, body);
  }

  
  sendForgotPasswordCreds(email: string, lastName: string)
  {
      const url: string = "https://localhost:7016/api/security/forgotpassword";
      const body = {
        email: email,
        lastName: lastName
      }
      return this.httpClient.post<any>(url, body);
  }

  
  sendResetPasswordCreds(token: string, id: string, password: string, confirmPassword: string)
    {
      const url: string = "https://localhost:7016/api/security/resetpassword";
      const body = 
      {
        token: token,
        id: id,
        password: password,
        confirmPassword: confirmPassword
      }
      return this.httpClient.post<any>(url, body);
    }

    deleteUserAccount(id: string){
      const url: string = `https://localhost:7016/api/appuser/delete-user/${id}`;
      return this.httpClient.delete<any>(url, getHttpOptions());
    }
}
