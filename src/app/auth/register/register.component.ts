import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { match } from 'src/app/core/utils/compare.validator';
import { IRegisterUser } from 'src/app/core/models/register-payload.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/core/authServices/register.service';
import { AlertService } from '@full-fledged/alerts';
import { IpAddressService } from 'src/app/core/commonServices/ip-address.service';
import { IRegisterAlertModal } from 'src/app/core/models/register-alert-modal.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  clientIpAddress: any;
  messages: IRegisterAlertModal = {
    emailConfirmationLinkSent: null,
    accountDeleted: null,
    emailAlreadyTaken: null,
    userNameAlreadyTaken: null,
    registrationSucceeded: null
  };

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private registerService: RegisterService, private alertService: AlertService, private ipService: IpAddressService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [match('password', 'confirmPassword')] });
    this.getIpAddress();
  };

  onSubmit(): void {
    const userData: IRegisterUser = this.registerForm.value;
    const observer: any = {
      next: (data: any) => {
        console.log(data);
        if(data.isEmailConfirmationLinkSent == true){
            this.messages.emailConfirmationLinkSent = data.isEmailConfirmationLinkSent;
        }
        // this.alertService.danger("Check your inbox for email confirmation link.");
      },
      error: (res: any) => {
        console.log(res);
        if(res.error.isAccountDeleted == true){
            this.messages.accountDeleted = res.error.isAccountDeleted;
          // this.alertService.danger("Account deleted, provide new email and username to continue registration.");
        }
        if(res.error.isEmailAlreadyTaken == true){
            this.messages.emailAlreadyTaken = res.error.isEmailAlreadyTaken;
          // this.alertService.danger("Email already taken.");
        }
        if(res.error.isUserNameAlreadyTaken == true){
             this.messages.userNameAlreadyTaken = res.error.isUserNameAlreadyTaken;
          // this.alertService.danger("UserName already taken.");
        }
        if(res.error.isRegistrationSucceeded == false){
            this.messages.registrationSucceeded = res.error.isRegistrationSucceeded;
          // this.alertService.danger("Registration failed, Try again later.");
        }
      }
    }
    this.registerService.register(userData, this.clientIpAddress.ip).subscribe(observer);
  }

  getIpAddress() {
    this.ipService.getClientIpAddress().subscribe(res => {
      this.clientIpAddress = res;
      console.log(this.clientIpAddress.ip);
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

}
