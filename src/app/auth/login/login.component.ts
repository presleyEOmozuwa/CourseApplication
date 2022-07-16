import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ILogin } from 'src/app/core/models/login-payload.interface';
import { IGoogleUser } from 'src/app/core/models/google-user.interface';
import { SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { ILocalStoreToken } from 'src/app/core/models/localstorage-token.interface';
import { ILoginTracker } from 'src/app/core/models/login-tracker.interface';
import { IpAddressService } from 'src/app/core/commonServices/ip-address.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  googleCredentials: IGoogleUser = {
    provider: null,
    idToken: null
  }
  clientIpAddress: any;
  constructor(private fb: FormBuilder, private loginService: LoginService, private alertService: AlertService, private router: Router, private ipService: IpAddressService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      rememberMe: [false, []]
    });
    this.getIpAddress();
  }
   
    
    onSubmit(): void{
      const credentials: ILogin = this.loginForm.value;
    
      const observer: any = {
        next : (trackers: ILocalStoreToken) => {
          console.log(trackers);
          this.router.navigate(['/cart/shopping-cart']);
        },
        error : (error: any) => {
          console.log(error);
          this.alertService.danger(`Login errors : ${error}`);
        }
      }
      
      this.loginService.login(credentials, this.clientIpAddress.ip).subscribe(observer);   
    }

    
    loginWithGoogle(){
      this.loginService.signInIdentityUser().then((user: SocialUser) => {
        console.log(user);
        this.googleCredentials.provider = user.provider
        this.googleCredentials.idToken = user.idToken;
        
        const observer: any = {
          next : (appUser: ILoginTracker) => {
            console.log(appUser);
            this.router.navigate(['/']);
            this.alertService.danger("Credentials verification was successful.");
          },
          error : (error: any) => {
            console.log(error);
            this.alertService.danger(`Login errors : ${error}`);
          }
        }
        
        this.loginService.googleIdentityLogger(this.googleCredentials).subscribe(observer)
      });
    }

    getIpAddress(){
      this.ipService.getClientIpAddress().subscribe(res => {
          this.clientIpAddress = res;
          console.log(this.clientIpAddress.ip);
      })
    }
    
    get g(): { [key: string]: AbstractControl } 
    {
      return this.loginForm.controls;
    }
  
}
