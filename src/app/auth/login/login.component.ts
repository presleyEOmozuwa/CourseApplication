import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ILogin } from 'src/app/core/models/login-payload.interface';
import { IGoogleUser } from 'src/app/core/models/google-user.interface';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { ILoginTracker } from 'src/app/core/models/login-tracker.interface';
import { IpAddressService } from 'src/app/core/commonServices/ip-address.service';
import { ILoginAlertModal } from 'src/app/core/models/login-alert-modal.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  messages: ILoginAlertModal = {
    loggedInFromAnotherDevice: null,
    accountDeleted: null,
    emailInvalid: null,
    passwordInvalid: null
  };
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


  onSubmit(): void {
    const credentials: ILogin = this.loginForm.value;
    const observer: any = {
      next: (trackers: ILoginTracker) => {
        console.log(trackers);
        if(trackers.isLoggedInFromAnotherDevice == true){
          // this.alertService.danger("Check your inbox for verification code");
          this.messages.loggedInFromAnotherDevice = trackers.isLoggedInFromAnotherDevice;
          this.router.navigate(['/auth/auth-code'])
        }
        if(trackers.isAuthenticated == true){
          this.router.navigate(['/cart/shopping-cart']);
        }
      },
      error: (res: any) => {
        console.log(res.error);
        if (res.error.isAccountDeleted == true) {
          this.messages.accountDeleted = res.error.isAccountDeleted;
          // this.alertService.danger("Invalid credentials, Account deleted");
        }
        if(res.error.isEmailInvalid == true){
          this.messages.emailInvalid = res.error.isEmailInvalid;
          // this.alertService.danger("Invalid Email or Password");
        }
        
        if(res.error.isPasswordInvalid == true){
          this.messages.passwordInvalid = res.error.isPasswordInvalid;
          // this.alertService.danger("Invalid Email or Password");
        }
      }
    }

    this.loginService.login(credentials, this.clientIpAddress.ip).subscribe(observer);
  }


  loginWithGoogle() {
    this.loginService.signInIdentityUser().then((user: SocialUser) => {
      console.log(user);
      this.googleCredentials.provider = user.provider
      this.googleCredentials.idToken = user.idToken;

      const observer: any = {
        next: (appUser: ILoginTracker) => {
          console.log(appUser);
          this.router.navigate(['/']);
          this.alertService.danger("Credentials verification was successful.");
        },
        error: (error: any) => {
          console.log(error);
          this.alertService.danger(`Login errors : ${error}`);
        }
      }

      this.loginService.googleIdentityLogger(this.googleCredentials).subscribe(observer)
    });
  }

  getIpAddress() {
    this.ipService.getClientIpAddress().subscribe(res => {
      this.clientIpAddress = res;
      console.log(this.clientIpAddress.ip);
    })
  }

  get g(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
