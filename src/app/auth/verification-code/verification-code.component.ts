import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { LoginService } from 'src/app/core/authServices/login.service';
import { IVerificationCode } from 'src/app/core/models/verification-code.interface';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {

  model: IVerificationCode = {
     authCode: null
  }
  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
  }
  
  verificationCode(){
    const userId: string = this.loginService.loginTrackers.userId;
    const observer: any = {
      next : (data: any) => {
        console.log(data);
        if(data.isAuthCodeValidationSuccessful == true){
           this.router.navigate(['/cart/shopping-cart']);
        }
      },
      error : (res: any) => {
        console.log(res.error);
        if(res.error.isAuthCodeValidationSuccessful == false){
          this.alertService.danger("Login attempts failed, try later");
       }
      }
    }
    this.loginService.sendVerificationCode(this.model.authCode, userId).subscribe(observer)
  }

}
