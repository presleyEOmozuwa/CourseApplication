import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { IForgotPasswordAlertModal } from 'src/app/core/models/forgot-password-alert-modal.interface';
import { UserService } from 'src/app/core/userServices/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  messages: IForgotPasswordAlertModal = {
    passwordResetLinkSent: null,
    accountDeleted: null,
    emailInvalid: null,
    lastNameInvalid: null
  };
  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm)
  {
    const email: string = f.value.email;
    const lastName: string = f.value.lastName;
    const observer: any = {
      next : (val: any) => {
        console.log(val);
        if(val.isPasswordResetLinkSent == true){
            this.messages.passwordResetLinkSent = val.isPasswordResetLinkSent;
          // this.alertService.danger("Check your inbox for password reset link.");
        }
      },
      error : (res: any) => {
        console.log(res.error);
        if(res.error.isAccountDeleted == true){
             this.messages.accountDeleted = res.error.isAccountDeleted;
          // this.alertService.danger("Invalid! Email belongs to a deleted account.");
        }
        if(res.error.isEmailInvalid == true){
             this.messages.emailInvalid = res.error.isEmailInvalid;
          // this.alertService.danger("Email is invalid.");
        }

        if(res.error.islastNameInvalid == true){
            this.messages.lastNameInvalid = res.error.islastNameInvalid;
        }
      }
    } 

    this.userService.sendForgotPasswordCreds(email, lastName).subscribe(observer)  
  }

}
