import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { IEmailConfirmationAlertModal } from 'src/app/core/models/email-confirmation-alert-modal.interface';
import { UserService } from 'src/app/core/userServices/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
    messages: IEmailConfirmationAlertModal = {
    serverError: null,
    emailConfirmedFailed: null
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.emailConfirmationCreds();
  }

  emailConfirmationCreds(){
    const id: string = this.route.snapshot.queryParams['id'];
    const token: string = this.route.snapshot.queryParams['token'];
    const observer: any = {
      next : (val: any) => {
        console.log(val);
        if(val.isEmailConfirmedSucceeded == true){
            this.router.navigate(['/auth/login']);
          // this.alertService.danger("Email confirmation Successful.");
        }
        
      },
      error : (res: any) => {
        console.log(res.error);
        if(res.error.isServerError){
           this.messages.serverError = res.error.isServerError;
        }
        if(res.error.isEmailConfirmedFailed == true){
             this.messages.emailConfirmedFailed = res.error.isEmailConfirmedFailed;
          // this.alertService.danger("Email confirmation failed, try again later.");
        }
      }
    }
    this.userService.sendConfirmEmail(id, token).subscribe(observer)
  }

}
