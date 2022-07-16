import { Injectable } from '@angular/core';
import { ILogin } from '../models/login-payload.interface';
import { map } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGoogleUser } from '../models/google-user.interface';
import { ILoginTracker } from '../models/login-tracker.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   loginTrackers: ILoginTracker = {
      isAuthenticated: null,
      isEmailConfirmed: null,
      isExternalLogger: null,
      isSubscriber: null,
      isLoggedInFromAnotherDevice: null,
      isVerificationCodesent: null
   }
  constructor(private httpClient: HttpClient, private socialService: SocialAuthService) {}
  
  login(payload: ILogin, ipAddress: any)
  {
    const loginUrl: string = "https://localhost:7016/api/loginuser/login";
    const httpHeaders = new HttpHeaders();
    const body: any = {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
      userIpAddress: ipAddress
    }
    httpHeaders.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(loginUrl, body, { headers: httpHeaders }).pipe(
      map((res: any) => 
      {
        console.log(res);
        this.loginTrackers.isAuthenticated = res.response.isAuthenticated;
        this.loginTrackers.isEmailConfirmed = res.response.isEmailConfirmed;
        this.loginTrackers.isExternalLogger = res.response.isExternalLogger;
        this.loginTrackers.isSubscriber = res.response.isSubscriber;
        this.loginTrackers.isLoggedInFromAnotherDevice = res.response.isLoggedInFromAnotherDevice;
        this.loginTrackers.isVerificationCodesent = res.response.isVerificationCodesent;
        localStorage.setItem('token', res.token.result);
        return this.loginTrackers;
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
    .pipe(map((res: any) =>
    {
      localStorage.setItem('token', res.token.result);
      return res;
    }));
  }
  
}
