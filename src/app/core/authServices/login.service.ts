import { Injectable } from '@angular/core';
import { ILogin } from '../models/login-payload.interface';
import { map } from 'rxjs';
import { IUser } from '../models/current-user.interface';
import { IToken } from '../models/token.interface';
import { authUser } from '../utils/logger.helper';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGoogleUser } from '../models/google-user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUser: IUser = 
    {
      nameid: null,
      family_name: null,
      given_name: null,
      unique_name: null,
      email: null,
      isAuthenticated: null,
      isSubscriber: null,
      isExternalLogger: null,
      isEmailConfirmed: null
    }

  constructor(private httpClient: HttpClient, private socialService: SocialAuthService) {}
  
  
  login(payload: ILogin)
  {
    const loginUrl: string = "https://localhost:7016/api/loginuser/login";
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(loginUrl, payload, { headers: httpHeaders }).pipe(
      map((res: IToken) => 
      {
        localStorage.setItem('token', res.token.result);
        authUser(res, this.loggedInUser);
        return this.loggedInUser;
      })
    );
  }
  
  
  signInIdentityUser(){
    return this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  
  googleIdentityLogger(googleCredentials: IGoogleUser)
  {
    const baseUrl: string = "https://localhost:7016/api/external/externalLogger";
    const body: IGoogleUser = {
      provider: googleCredentials.provider,
      idToken: googleCredentials.idToken
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(baseUrl, body, { headers: headers })
    .pipe(map((res: IToken) =>
    {
      localStorage.setItem('token', res.token.result);
      authUser(res, this.loggedInUser)
      return this.loggedInUser;
    }));
  }
  
}
